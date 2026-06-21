export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { ProductService } from '@/services/product-service'

// Función para obtener todos los archivos de blog
function getBlogSlugs(): string[] {
  const blogDir = path.join(process.cwd(), 'content', 'blog', 'es')
  
  try {
    const files = fs.readdirSync(blogDir)
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''))
  } catch (error) {
    console.error('Error reading blog directory:', error)
    return []
  }
}

// Función para generar el XML del sitemap
async function generateSitemapXML(blogSlugs: string[]): Promise<string> {
  const baseUrl = 'https://tecnocrypter.com'
  const currentDate = new Date().toISOString()
  
  let urls = blogSlugs.map(slug => `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('')

  try {
    const products = await ProductService.getAllProducts()
    const productUrls = products.map(product => `
  <url>
    <loc>${baseUrl}/productos/${product.id}</loc>
    <lastmod>${product.updated_at ? new Date(product.updated_at).toISOString() : currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')
    urls += productUrls
  } catch (error) {
    console.error('Error fetching products for server sitemap:', error)
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`
}

export async function GET() {
  try {
    const blogSlugs = getBlogSlugs()
    const sitemapXML = await generateSitemapXML(blogSlugs)
    
    return new NextResponse(sitemapXML, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Error generating server sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}