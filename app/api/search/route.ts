import { NextRequest, NextResponse } from "next/server"
import { BlogService } from "@/services/blog-service"
import { ProductService } from "@/services/product-service"

interface SearchResult {
  id: string
  title: string
  excerpt: string
  type: 'blog' | 'product' | 'page'
  url: string
  image?: string
  category?: string
}

// Páginas estáticas para búsqueda
const staticPages = [
  {
    id: 'seguridad',
    title: 'Seguridad Digital',
    excerpt: 'Protege tus datos y dispositivos con nuestras soluciones de seguridad avanzadas.',
    url: '/seguridad',
    category: 'seguridad'
  },
  {
    id: 'generador-contrasenas',
    title: 'Generador de Contraseñas',
    excerpt: 'Crea contraseñas seguras y únicas para proteger tus cuentas online.',
    url: '/tools/generador-contrasenas',
    category: 'herramientas'
  },
  {
    id: 'limpia-metadatos',
    title: 'Limpiador de Metadatos',
    excerpt: 'Elimina metadatos sensibles de tus archivos para proteger tu privacidad.',
    url: '/tools/limpia-metadatos',
    category: 'herramientas'
  },
  {
    id: 'verificador-urls',
    title: 'Verificador de URLs',
    excerpt: 'Analiza la seguridad de cualquier URL antes de visitarla.',
    url: '/tools/verificador',
    category: 'herramientas'
  },
  {
    id: 'contacto',
    title: 'Contacto',
    excerpt: 'Ponte en contacto con nuestro equipo de expertos en ciberseguridad.',
    url: '/contacto',
    category: 'general'
  },
  {
    id: 'privacidad',
    title: 'Política de Privacidad',
    excerpt: 'Conoce cómo protegemos y manejamos tu información personal.',
    url: '/privacidad',
    category: 'legal'
  },
  {
    id: 'terminos',
    title: 'Términos y Condiciones',
    excerpt: 'Lee nuestros términos de uso y condiciones de servicio.',
    url: '/terminos',
    category: 'legal'
  }
]

function normalizeText(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function searchInText(searchTerm: string, text: string): boolean {
  const normalizedSearch = normalizeText(searchTerm)
  const normalizedText = normalizeText(text)
  return normalizedText.includes(normalizedSearch)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    
    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] })
    }

    const searchTerm = query.trim()
    const results: SearchResult[] = []

    // Buscar en blogs
    try {
      const blogs = await BlogService.getAllPosts()
      const blogResults = blogs
        .filter(blog => 
          searchInText(searchTerm, blog.title) ||
          searchInText(searchTerm, blog.excerpt) ||
          searchInText(searchTerm, blog.category) ||
          blog.tags.some(tag => searchInText(searchTerm, tag))
        )
        .slice(0, 5) // Limitar resultados
        .map(blog => ({
          id: blog.slug,
          title: blog.title,
          excerpt: blog.excerpt,
          type: 'blog' as const,
          url: `/blog/${blog.slug}`,
          image: blog.image,
          category: blog.category
        }))
      
      results.push(...blogResults)
    } catch (error) {
      console.error('Error searching blogs:', error)
    }

    // Buscar en productos
    try {
      const products = await ProductService.getAllProducts()
      const productResults = products
        .filter(product => 
          searchInText(searchTerm, product.name) ||
          searchInText(searchTerm, product.description) ||
          searchInText(searchTerm, product.category)
        )
        .slice(0, 5) // Limitar resultados
        .map(product => ({
          id: product.id,
          title: product.name,
          excerpt: product.description,
          type: 'product' as const,
          url: `/productos/${product.id}`,
          image: product.images?.[0]?.url,
          category: product.category
        }))
      
      results.push(...productResults)
    } catch (error) {
      console.error('Error searching products:', error)
    }

    // Buscar en páginas estáticas
    const pageResults = staticPages
      .filter(page => 
        searchInText(searchTerm, page.title) ||
        searchInText(searchTerm, page.excerpt) ||
        searchInText(searchTerm, page.category)
      )
      .slice(0, 5) // Limitar resultados
      .map(page => ({
        ...page,
        type: 'page' as const
      }))
    
    results.push(...pageResults)

    // Ordenar por relevancia (título exacto primero, luego por tipo)
    const sortedResults = results.sort((a, b) => {
      const aExactTitle = normalizeText(a.title).includes(normalizeText(searchTerm))
      const bExactTitle = normalizeText(b.title).includes(normalizeText(searchTerm))
      
      if (aExactTitle && !bExactTitle) return -1
      if (!aExactTitle && bExactTitle) return 1
      
      // Prioridad por tipo: pages > blogs > products
      const typeOrder = { page: 0, blog: 1, product: 2 }
      return typeOrder[a.type] - typeOrder[b.type]
    })

    return NextResponse.json({ 
      results: sortedResults.slice(0, 10), // Máximo 10 resultados
      query: searchTerm
    })

  } catch (error) {
    console.error('Error en búsqueda global:', error)
    return NextResponse.json(
      { error: 'Error al realizar la búsqueda' },
      { status: 500 }
    )
  }
}