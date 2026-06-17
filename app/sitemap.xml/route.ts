import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://tecnocrypter.com'
const LOCALES = ['es', 'en', 'fr', 'pt']

// Helper to generate alternates
function getAlternates(routePath: string) {
  const cleanPath = routePath === '/' ? '' : routePath;
  return {
    languages: {
      es: `${BASE_URL}${cleanPath}`,
      en: `${BASE_URL}/en${cleanPath}`,
      fr: `${BASE_URL}/fr${cleanPath}`,
      pt: `${BASE_URL}/pt${cleanPath}`,
      'x-default': `${BASE_URL}${cleanPath}`,
    },
  }
}

// Helper to get locale path
function getLocalePath(routePath: string, locale: string) {
  const cleanPath = routePath === '/' ? '' : routePath;
  const prefix = locale === 'es' ? '' : `/${locale}`;
  return `${BASE_URL}${prefix}${cleanPath}`;
}

// Get blog slugs from content directory
function getBlogSlugs(): string[] {
  const blogDir = path.join(process.cwd(), 'content', 'blog', 'es')
  try {
    return fs.readdirSync(blogDir)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''))
  } catch {
    return []
  }
}

// Get blog file modification date
function getBlogLastMod(slug: string): Date {
  const blogDir = path.join(process.cwd(), 'content', 'blog', 'es')
  try {
    const stats = fs.statSync(path.join(blogDir, `${slug}.md`))
    return stats.mtime
  } catch {
    return new Date()
  }
}

// Get tool directories from app/[locale]/tools
function getToolSlugs(): string[] {
  const toolsDir = path.join(process.cwd(), 'app', '[locale]', 'tools')
  try {
    return fs.readdirSync(toolsDir)
      .filter(item => {
        const fullPath = path.join(toolsDir, item)
        return fs.statSync(fullPath).isDirectory() && 
               fs.existsSync(path.join(fullPath, 'page.tsx'))
      })
  } catch {
    return []
  }
}

export async function GET() {
  const now = new Date()

  // Base routes for static pages
  const staticRoutes = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
    { path: '/productos', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/tools', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/seguridad', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/criptomonedas', priority: 0.8, changeFrequency: 'daily' },
    { path: '/encriptacion', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/noticias', priority: 0.8, changeFrequency: 'daily' },
    { path: '/contacto', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacidad', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terminos', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
  ]

  const entries = []

  // Generate static pages
  for (const locale of LOCALES) {
    for (const route of staticRoutes) {
      entries.push({
        url: getLocalePath(route.path, locale),
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: getAlternates(route.path)
      })
    }
  }

  // Generate blog pages
  for (const locale of LOCALES) {
    for (const slug of getBlogSlugs()) {
      entries.push({
        url: getLocalePath(`/blog/${slug}`, locale),
        lastModified: getBlogLastMod(slug),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: getAlternates(`/blog/${slug}`)
      })
    }
  }

  // Generate tool pages
  for (const locale of LOCALES) {
    for (const slug of getToolSlugs()) {
      entries.push({
        url: getLocalePath(`/tools/${slug}`, locale),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: getAlternates(`/tools/${slug}`)
      })
    }
  }

  // Build formatted XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  for (const entry of entries) {
    xml += '  <url>\n';
    xml += `    <loc>${entry.url}</loc>\n`;
    if (entry.lastModified) {
      xml += `    <lastmod>${entry.lastModified.toISOString()}</lastmod>\n`;
    }
    if (entry.changeFrequency) {
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
    }
    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    }
    if (entry.alternates?.languages) {
      for (const [lang, href] of Object.entries(entry.alternates.languages)) {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />\n`;
      }
    }
    xml += '  </url>\n';
  }

  xml += '</urlset>';

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
