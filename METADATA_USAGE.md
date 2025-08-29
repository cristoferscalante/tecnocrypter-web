# Guía de Uso del Sistema de Metadatos Nativo de Next.js 15.2.4

## Introducción

Este proyecto ha migrado del sistema `next-seo` al sistema nativo de metadatos de Next.js 15.2.4. El nuevo sistema ofrece mejor rendimiento, integración nativa con el framework y mayor flexibilidad para manejar metadatos SEO.

## Funciones Disponibles

El archivo `lib/metadata.ts` proporciona las siguientes funciones para generar metadatos:

### 1. `generatePageMetadata(params: MetadataParams)`
Para páginas estáticas generales (inicio, contacto, privacidad, etc.)

### 2. `generateToolMetadata(params: MetadataParams)`
Para páginas de herramientas específicas

### 3. `generateBlogMetadata(params: MetadataParams)`
Para artículos de blog

### 4. `generateProductMetadata(params: MetadataParams)`
Para páginas de productos

## Estructura de Parámetros

```typescript
interface MetadataParams {
  title: string
  description: string
  slug: string
  image?: string
  keywords?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  category?: string
  tags?: string[]
  price?: string
  currency?: string
  availability?: string
}
```

## Ejemplos de Uso

### Página Principal

```typescript
// app/page.tsx
import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata: Metadata = generatePageMetadata({
  title: "TecnoCrypter - Herramientas de Ciberseguridad",
  description: "Plataforma líder en herramientas de ciberseguridad...",
  slug: "",
  image: "https://tecnocrypter.com/images/og/home.jpg",
  keywords: "ciberseguridad, herramientas, seguridad digital"
})

export default function HomePage() {
  return (
    // Tu contenido aquí
  )
}
```

### Página de Herramienta

```typescript
// app/tools/verificador/page.tsx
import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateToolMetadata({
  title: "Verificador de URL",
  description: "Analiza la seguridad de URLs y detecta posibles amenazas...",
  slug: "tools/verificador",
  image: "https://tecnocrypter.com/images/og/verificador-url.jpg",
  keywords: "verificador URL, seguridad web, phishing, malware"
})

export default function VerificadorPage() {
  return (
    // Tu contenido aquí
  )
}
```

### Artículo de Blog

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from "next"
import { generateBlogMetadata } from "@/lib/metadata"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Obtener datos del artículo
  const post = await getPostBySlug(params.slug)
  
  return generateBlogMetadata({
    title: post.title,
    description: post.excerpt,
    slug: `blog/${params.slug}`,
    image: post.featuredImage,
    keywords: post.tags.join(", "),
    author: post.author,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    category: post.category,
    tags: post.tags
  })
}

export default function BlogPost({ params }: Props) {
  return (
    // Tu contenido aquí
  )
}
```

### Página de Producto

```typescript
// app/productos/[id]/page.tsx
import type { Metadata } from "next"
import { generateProductMetadata } from "@/lib/metadata"

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Obtener datos del producto
  const product = await getProductById(params.id)
  
  return generateProductMetadata({
    title: product.name,
    description: product.description,
    slug: `productos/${params.id}`,
    image: product.image,
    keywords: product.keywords,
    price: product.price,
    currency: "USD",
    availability: product.inStock ? "in stock" : "out of stock"
  })
}

export default function ProductPage({ params }: Props) {
  return (
    // Tu contenido aquí
  )
}
```

## Comparación con el Sistema Anterior (next-seo)

### Antes (next-seo)

```typescript
// ❌ Sistema anterior
import { NextSeo } from "next-seo"
import SeoPage from "@/components/seo/SeoPage"

export default function Page() {
  return (
    <>
      <SeoPage
        title="Mi Página"
        description="Descripción de mi página"
        slug="mi-pagina"
        image="/image.jpg"
        keywords="palabra1, palabra2"
      />
      {/* Contenido */}
    </>
  )
}
```

### Ahora (Sistema Nativo)

```typescript
// ✅ Sistema actual
import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata: Metadata = generatePageMetadata({
  title: "Mi Página",
  description: "Descripción de mi página",
  slug: "mi-pagina",
  image: "/image.jpg",
  keywords: "palabra1, palabra2"
})

export default function Page() {
  return (
    // Solo el contenido, sin componentes SEO
  )
}
```

## Ventajas del Sistema Nativo

1. **Mejor Rendimiento**: Los metadatos se generan en tiempo de build
2. **Integración Nativa**: No requiere librerías externas
3. **Mejor SEO**: Soporte completo para Open Graph, Twitter Cards y JSON-LD
4. **Menos Código**: Eliminación de componentes SEO redundantes
5. **Type Safety**: Tipado completo con TypeScript

## Mejores Prácticas

### 1. Títulos
- Mantén los títulos entre 50-60 caracteres
- Incluye palabras clave principales
- Usa el formato: "Título Principal | TecnoCrypter"

### 2. Descripciones
- Entre 150-160 caracteres para óptimo SEO
- Incluye llamadas a la acción
- Describe claramente el contenido

### 3. Imágenes
- Usa imágenes de 1200x630px para Open Graph
- Formato JPG o PNG
- Optimiza el tamaño del archivo

### 4. Keywords
- Usa palabras clave relevantes separadas por comas
- No excedas 10-15 palabras clave
- Incluye variaciones y sinónimos

### 5. URLs (slugs)
- Usa URLs descriptivas y amigables
- Incluye palabras clave principales
- Evita caracteres especiales

## Estructura de Metadatos Generados

Cada función genera un objeto `Metadata` completo que incluye:

```typescript
{
  title: string,
  description: string,
  keywords: string,
  authors: [{ name: string }],
  creator: string,
  publisher: string,
  robots: {
    index: boolean,
    follow: boolean,
    googleBot: {
      index: boolean,
      follow: boolean,
      "max-video-preview": number,
      "max-image-preview": string,
      "max-snippet": number
    }
  },
  openGraph: {
    title: string,
    description: string,
    url: string,
    siteName: string,
    images: [{
      url: string,
      width: number,
      height: number,
      alt: string
    }],
    locale: string,
    type: string
  },
  twitter: {
    card: string,
    title: string,
    description: string,
    creator: string,
    images: [string]
  },
  alternates: {
    canonical: string
  }
}
```

## Datos Estructurados (JSON-LD)

Los datos estructurados se mantienen en `components/seo/structured-data.tsx` y se incluyen automáticamente en el layout principal:

- **Organization Schema**: Información de la empresa
- **Website Schema**: Información del sitio web
- **Article Schema**: Para artículos de blog (automático)
- **Product Schema**: Para páginas de productos (automático)

## Migración Completada

La migración incluye:

- ✅ Desinstalación de `next-seo`
- ✅ Creación de `lib/metadata.ts`
- ✅ Eliminación de `components/seo/SeoPage.tsx`
- ✅ Migración de todas las páginas estáticas
- ✅ Migración de todas las páginas de herramientas
- ✅ Verificación del build sin errores

## Soporte

Para dudas o problemas con el sistema de metadatos, consulta:
- [Documentación oficial de Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- El archivo `lib/metadata.ts` para ver la implementación completa
- Los ejemplos en las páginas existentes del proyecto