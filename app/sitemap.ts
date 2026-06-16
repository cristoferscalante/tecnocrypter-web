import { MetadataRoute } from 'next'
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
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  try {
    return fs.readdirSync(blogDir)
      .filter(file => {
        if (!file.endsWith('.md')) return false
        const nameWithoutExt = file.replace(/\.md$/, "")
        const suffixPattern = /[-.](en|fr|pt)$/
        return !suffixPattern.test(nameWithoutExt)
      })
      .map(file => file.replace('.md', ''))
  } catch {
    return []
  }
}

// Get blog file modification date
function getBlogLastMod(slug: string): Date {
  const blogDir = path.join(process.cwd(), 'content', 'blog')
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Base routes for static pages
  const staticRoutes = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/productos', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/tools', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/seguridad', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/criptomonedas', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/encriptacion', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/noticias', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/contacto', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/privacidad', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terminos', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  // Generate sitemap items for static routes
  const staticPages: MetadataRoute.Sitemap = []
  for (const locale of LOCALES) {
    for (const route of staticRoutes) {
      staticPages.push({
        url: getLocalePath(route.path, locale),
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: getAlternates(route.path)
      })
    }
  }

  // Blog posts - with real last modified dates
  const blogPages: MetadataRoute.Sitemap = []
  for (const locale of LOCALES) {
    for (const slug of getBlogSlugs()) {
      blogPages.push({
        url: getLocalePath(`/blog/${slug}`, locale),
        lastModified: getBlogLastMod(slug),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        alternates: getAlternates(`/blog/${slug}`)
      })
    }
  }

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = []
  for (const locale of LOCALES) {
    for (const slug of getToolSlugs()) {
      toolPages.push({
        url: getLocalePath(`/tools/${slug}`, locale),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: getAlternates(`/tools/${slug}`)
      })
    }
  }

  return [...staticPages, ...blogPages, ...toolPages]
}
