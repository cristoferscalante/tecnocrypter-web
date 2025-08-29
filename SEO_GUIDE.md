# Guía de SEO para TecnoCrypter

## Introducción

Esta guía documenta el sistema SEO completo implementado en TecnoCrypter, que incluye:

- **next-seo**: Para metadatos dinámicos y optimización SEO
- **Componente SeoPage**: Componente reutilizable para SEO
- **Structured Data (JSON-LD)**: Para datos estructurados
- **Sitemap automático**: Generación automática con next-sitemap
- **Configuración base**: Configuración centralizada de SEO

## Componente SeoPage

### Ubicación
`components/seo/SeoPage.tsx`

### Propiedades

```typescript
interface SeoPageProps {
  title: string;           // Título de la página
  description: string;     // Descripción meta
  slug: string;           // Slug para URL canónica
  image?: string;         // Imagen Open Graph/Twitter
  keywords?: string;      // Palabras clave
  canonicalOverride?: string; // URL canónica personalizada
}
```

### Uso Básico

```tsx
import SeoPage from '@/components/seo/SeoPage'

export default function MiPagina() {
  return (
    <>
      <SeoPage
        title="Mi Página | TecnoCrypter"
        description="Descripción de mi página para SEO"
        slug="mi-pagina"
        image="https://tecnocrypter.com/images/og/mi-pagina.jpg"
        keywords="palabra1, palabra2, palabra3"
      />
      {/* Contenido de la página */}
    </>
  )
}
```

## Configuración SEO Base

### Archivo: `lib/seo-config.ts`

Contiene la configuración base de SEO que se aplica a todo el sitio:

```typescript
import { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | TecnoCrypter',
  defaultTitle: 'TecnoCrypter - Ciberseguridad y Tecnología',
  description: 'Plataforma líder en ciberseguridad...',
  canonical: 'https://tecnocrypter.com',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tecnocrypter.com',
    siteName: 'TecnoCrypter',
    images: [{
      url: 'https://tecnocrypter.com/images/og/default.jpg',
      width: 1200,
      height: 630,
      alt: 'TecnoCrypter'
    }]
  },
  twitter: {
    handle: '@tecnocrypter',
    site: '@tecnocrypter',
    cardType: 'summary_large_image'
  }
}
```

## Structured Data (JSON-LD)

### Archivo: `components/seo/structured-data.tsx`

#### Tipos Disponibles

1. **Website**: Para el sitio web principal
2. **Organization**: Para información de la empresa
3. **Article**: Para artículos de blog
4. **Product**: Para páginas de productos

#### Ejemplos de Uso

```tsx
// En app/layout.tsx (sitio web y organización)
<StructuredData type="website" />
<StructuredData type="organization" />

// En páginas de blog
<StructuredData 
  type="article" 
  data={{
    headline: "Título del artículo",
    description: "Descripción del artículo",
    author: "Autor",
    datePublished: "2024-01-01",
    dateModified: "2024-01-02",
    image: "url-imagen.jpg"
  }} 
/>

// En páginas de productos
<StructuredData 
  type="product" 
  data={{
    name: "Nombre del producto",
    description: "Descripción del producto",
    price: "99.99",
    currency: "EUR",
    image: "url-imagen.jpg",
    brand: "TecnoCrypter"
  }} 
/>
```

## Sitemap Automático

### Configuración: `next-sitemap.config.js`

```javascript
module.exports = {
  siteUrl: 'https://tecnocrypter.com',
  generateRobotsText: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/tools/verificador'),
    await config.transform(config, '/tools/generador-contrasenas'),
    await config.transform(config, '/tools/limpia-metadatos')
  ]
}
```

### Generación

```bash
# Generar sitemap
npm run postbuild
```

## Ejemplos de Implementación

### 1. Página Principal

```tsx
// app/page.tsx
import SeoPage from '@/components/seo/SeoPage'

export default function HomePage() {
  return (
    <>
      <SeoPage
        title="TecnoCrypter - Ciberseguridad y Tecnología"
        description="Plataforma líder en ciberseguridad con herramientas avanzadas, análisis de amenazas y soluciones de protección digital."
        slug=""
        image="https://tecnocrypter.com/images/og/home.jpg"
        keywords="ciberseguridad, tecnología, herramientas seguridad, análisis amenazas"
      />
      {/* Contenido */}
    </>
  )
}
```

### 2. Página de Herramienta

```tsx
// app/tools/verificador/page.tsx
import SeoPage from '@/components/seo/SeoPage'
import VerificadorClient from '@/components/tools/verificador-client'

export default function VerificadorPage() {
  return (
    <>
      <SeoPage
        title="Verificador de URL | TecnoCrypter"
        description="Analiza la seguridad de URLs y detecta posibles amenazas antes de visitarlas."
        slug="tools/verificador"
        image="https://tecnocrypter.com/images/og/verificador-url.jpg"
        keywords="verificador URL, seguridad web, phishing, malware"
      />
      <VerificadorClient />
    </>
  )
}
```

### 3. Artículo de Blog

```tsx
// app/blog/[slug]/page.tsx
import SeoPage from '@/components/seo/SeoPage'
import StructuredData from '@/components/seo/structured-data'

export default function BlogPost({ post }) {
  return (
    <>
      <SeoPage
        title={`${post.title} | Blog TecnoCrypter`}
        description={post.excerpt}
        slug={`blog/${post.slug}`}
        image={post.image}
        keywords={post.tags.join(', ')}
      />
      <StructuredData 
        type="article" 
        data={{
          headline: post.title,
          description: post.excerpt,
          author: post.author,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          image: post.image
        }} 
      />
      {/* Contenido del artículo */}
    </>
  )
}
```

### 4. Página de Producto

```tsx
// app/productos/[id]/page.tsx
import SeoPage from '@/components/seo/SeoPage'
import StructuredData from '@/components/seo/structured-data'

export default function ProductPage({ product }) {
  return (
    <>
      <SeoPage
        title={`${product.name} | TecnoCrypter`}
        description={product.description}
        slug={`productos/${product.id}`}
        image={product.image}
        keywords={product.keywords}
      />
      <StructuredData 
        type="product" 
        data={{
          name: product.name,
          description: product.description,
          price: product.price,
          currency: "EUR",
          image: product.image,
          brand: "TecnoCrypter"
        }} 
      />
      {/* Contenido del producto */}
    </>
  )
}
```

## Mejores Prácticas

### 1. Títulos
- Máximo 60 caracteres
- Incluir palabras clave principales
- Ser descriptivo y único
- Seguir el patrón: "Título Específico | TecnoCrypter"

### 2. Descripciones
- Entre 150-160 caracteres
- Incluir call-to-action
- Ser persuasiva y descriptiva
- Evitar duplicados

### 3. Palabras Clave
- 3-5 palabras clave principales
- Separadas por comas
- Relevantes al contenido
- Incluir variaciones y sinónimos

### 4. Imágenes Open Graph
- Tamaño: 1200x630 píxeles
- Formato: JPG o PNG
- Peso: < 1MB
- Incluir texto legible

### 5. URLs Canónicas
- Siempre especificar
- Usar HTTPS
- Sin parámetros innecesarios
- Consistentes con la estructura del sitio

## Estructura de Archivos SEO

```
components/seo/
├── SeoPage.tsx          # Componente principal SEO
└── structured-data.tsx  # Datos estructurados JSON-LD

lib/
└── seo-config.ts        # Configuración base SEO

# Archivos generados automáticamente
public/
├── sitemap.xml          # Sitemap principal
├── sitemap-0.xml        # Sitemap páginas
└── robots.txt           # Robots.txt
```

## Troubleshooting

### Problema: Metadatos no aparecen
**Solución**: Verificar que el componente SeoPage esté importado y usado correctamente.

### Problema: Sitemap no se genera
**Solución**: 
1. Ejecutar `npm run build`
2. Verificar configuración en `next-sitemap.config.js`
3. Comprobar que las rutas existan

### Problema: Structured Data no válido
**Solución**: 
1. Usar [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Verificar que todos los campos requeridos estén presentes
3. Comprobar formato de fechas y URLs

### Problema: Duplicación de metadatos
**Solución**: 
1. No usar `export const metadata` junto con `SeoPage`
2. Elegir una sola estrategia por página
3. SeoPage tiene prioridad sobre metadata estático

### Problema: Imágenes Open Graph no cargan
**Solución**: 
1. Verificar que las URLs sean absolutas
2. Comprobar que las imágenes existan
3. Verificar permisos de acceso

## Comandos Útiles

```bash
# Construir proyecto y generar sitemap
npm run build

# Verificar SEO en desarrollo
npm run dev

# Validar structured data
# Usar: https://search.google.com/test/rich-results

# Verificar sitemap
# Visitar: http://localhost:3000/sitemap.xml
```

## Recursos Adicionales

- [Documentación next-seo](https://github.com/garmeeh/next-seo)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

---

**Nota**: Esta guía cubre la implementación actual de SEO en TecnoCrypter. Para actualizaciones o nuevas funcionalidades, consultar la documentación oficial de las librerías utilizadas.