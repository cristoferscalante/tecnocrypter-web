import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://tecnocrypter.com'

// Get blog slugs from content directory
function getBlogSlugs(): string[] {
  const blogDir = path.join(process.cwd(), 'content', 'blog')
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
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  try {
    const stats = fs.statSync(path.join(blogDir, `${slug}.md`))
    return stats.mtime
  } catch {
    return new Date()
  }
}

// Get tool directories from app/tools
function getToolSlugs(): string[] {
  const toolsDir = path.join(process.cwd(), 'app', 'tools')
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

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/productos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/seguridad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/criptomonedas`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/encriptacion`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/noticias`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terminos`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Blog posts - with real last modified dates
  const blogPages: MetadataRoute.Sitemap = getBlogSlugs().map(slug => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: getBlogLastMod(slug),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = getToolSlugs().map(slug => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages, ...toolPages]
}
