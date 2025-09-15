# Plan de Optimización SEO para TecnoCrypter

## 1. Análisis de Problemas Actuales

### Estado Actual de Indexación (Google Search Console)
- **11 páginas sin indexar** (73% del contenido)
- **4 páginas indexadas** (27% del contenido)
- **3 errores** detectados en sitemap
- **7 páginas con error 404**
- **1 página con redirección**
- **3 páginas rastreadas sin indexar**

### Problemas Identificados
1. **Errores 404**: Páginas referenciadas en sitemap que no existen
2. **Redirecciones mal configuradas**: Afectan la indexación
3. **Contenido rastreado sin indexar**: Google encuentra las páginas pero no las indexa
4. **Sitemap con errores**: Referencias a URLs inexistentes
5. **Metadatos inconsistentes**: Posible duplicación o falta de optimización

## 2. Plan de Mejoras Técnicas SEO

### 2.1 Corrección de Errores Críticos

#### Solución de Errores 404
```bash
# Verificar URLs en sitemap que devuelven 404
# Revisar estas rutas específicamente:
- /productos/[id] (páginas de productos individuales)
- /blog/[slug] (artículos específicos)
- /tools/* (herramientas específicas)
```

#### Configuración de Redirecciones
```javascript
// next.config.mjs - Agregar redirecciones permanentes
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true, // 301 redirect
      },
      // Redirecciones específicas para URLs rotas
    ]
  },
}
```

### 2.2 Optimización de Sitemap

#### Mejoras en next-sitemap.config.js
```javascript
module.exports = {
  siteUrl: "https://tecnocrypter.com",
  generateRobotsText: true,
  sitemapSize: 5000, // Reducir tamaño para mejor rendimiento
  changefreq: "weekly", // Más conservador
  priority: 0.7,
  exclude: [
    "/admin/**", 
    "/api/**", 
    "/dashboard/**",
    "/auth/**",
    "/_next/**",
    "/static/**",
    "/404", // Excluir página de error
    "/500"  // Excluir página de error del servidor
  ],
  // Validación de URLs antes de incluir en sitemap
  transform: async (config, path) => {
    // Verificar que la página existe antes de incluirla
    const validPaths = await validatePageExists(path);
    if (!validPaths) return null;
    
    return {
      loc: path,
      changefreq: getChangeFreq(path),
      priority: getPriority(path),
      lastmod: new Date().toISOString(),
    }
  }
}
```

### 2.3 Mejoras en robots.txt
```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Disallow: /auth/
Disallow: /_next/
Disallow: /static/

# Permitir específicamente a Googlebot
User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Disallow: /auth/

# Crawl-delay para evitar sobrecarga
Crawl-delay: 1

# Sitemaps
Sitemap: https://tecnocrypter.com/sitemap.xml
Sitemap: https://tecnocrypter.com/sitemap-0.xml
```

## 3. Optimización de Metadatos

### 3.1 Mejoras en metadata.ts
```typescript
// Agregar validación y optimización
export function generatePageMetadata(params: MetadataParams = {}): Metadata {
  const {
    title,
    description = baseMetadata.defaultDescription,
    slug = '',
    image = baseMetadata.defaultImage,
    keywords = [],
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    noIndex = false,
  } = params;

  // Validación de longitud de título y descripción
  const pageTitle = title 
    ? `${title} | ${baseMetadata.siteName}`
    : baseMetadata.defaultTitle;
  
  if (pageTitle.length > 60) {
    console.warn(`Título muy largo: ${pageTitle.length} caracteres`);
  }
  
  if (description.length > 160) {
    console.warn(`Descripción muy larga: ${description.length} caracteres`);
  }

  const pageUrl = `${baseMetadata.siteUrl}${slug ? `/${slug}` : ''}`;
  const imageUrl = image.startsWith('http') ? image : `${baseMetadata.siteUrl}${image}`;

  return {
    metadataBase: new URL(baseMetadata.siteUrl),
    title: pageTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Open Graph optimizado
    openGraph: {
      type: type === 'product' ? 'website' : type,
      locale: 'es_ES',
      url: pageUrl,
      siteName: baseMetadata.siteName,
      title: pageTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || baseMetadata.defaultTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },

    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      site: baseMetadata.twitterHandle,
      creator: baseMetadata.twitterHandle,
      title: pageTitle,
      description,
      images: [imageUrl],
    },

    // URL canónica
    alternates: {
      canonical: pageUrl,
    },

    // Metadatos adicionales
    other: {
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
      'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    },
  };
}
```

### 3.2 Structured Data Mejorado
```typescript
// components/seo/structured-data.tsx - Mejoras
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TecnoCrypter',
  url: 'https://tecnocrypter.com',
  description: 'Plataforma líder en ciberseguridad, encriptación y tecnología blockchain.',
  publisher: {
    '@type': 'Organization',
    name: 'TecnoCrypter',
    logo: {
      '@type': 'ImageObject',
      url: 'https://tecnocrypter.com/Tecno.svg',
      width: 512,
      height: 512
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://tecnocrypter.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string',
  },
  sameAs: [
    'https://twitter.com/tecnocrypter',
    'https://linkedin.com/company/tecnocrypter'
  ]
};

// Breadcrumb Schema para navegación
export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});
```

## 4. Mejoras en Core Web Vitals

### 4.1 Optimización de Imágenes
```typescript
// Componente de imagen optimizada
import Image from 'next/image'

const OptimizedImage = ({ src, alt, width, height, priority = false }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
```

### 4.2 Lazy Loading y Preloading
```typescript
// app/layout.tsx - Preload crítico
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Preload recursos críticos */}
        <link rel="preload" href="/fonts/orbitron.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/images/hero.webp" as="image" />
        
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        <StructuredData type="website" />
        <StructuredData type="organization" />
      </head>
      <body className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  )
}
```

## 5. Estrategias de Indexación

### 5.1 Implementación de Internal Linking
```typescript
// components/seo/internal-links.tsx
const InternalLinks = ({ currentPage }: { currentPage: string }) => {
  const relatedLinks = getRelatedPages(currentPage);
  
  return (
    <nav aria-label="Páginas relacionadas">
      <h3>Contenido Relacionado</h3>
      <ul>
        {relatedLinks.map(link => (
          <li key={link.url}>
            <Link href={link.url} title={link.description}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

### 5.2 Generación de Contenido Dinámico
```typescript
// Asegurar que todas las páginas dinámicas se generen
// app/productos/[id]/page.tsx
export async function generateStaticParams() {
  const products = await getProducts();
  
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    return {
      title: 'Producto no encontrado | TecnoCrypter',
      robots: { index: false, follow: false }
    };
  }
  
  return generateProductMetadata({
    title: product.name,
    description: product.description,
    slug: `productos/${product.id}`,
    image: product.image,
    keywords: product.tags
  });
}
```

## 6. Monitoreo y Validación

### 6.1 Script de Validación SEO
```javascript
// scripts/validate-seo.js
const fs = require('fs');
const path = require('path');

async function validateSEO() {
  console.log('🔍 Validando configuración SEO...');
  
  // Verificar sitemap
  const sitemapExists = fs.existsSync('./public/sitemap.xml');
  console.log(`✅ Sitemap existe: ${sitemapExists}`);
  
  // Verificar robots.txt
  const robotsExists = fs.existsSync('./public/robots.txt');
  console.log(`✅ Robots.txt existe: ${robotsExists}`);
  
  // Verificar metadatos en páginas principales
  const pages = ['/', '/blog', '/productos', '/contacto'];
  for (const page of pages) {
    console.log(`🔍 Verificando metadatos para: ${page}`);
    // Lógica de verificación
  }
}

validateSEO();
```

### 6.2 Configuración de Google Analytics 4
```typescript
// lib/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

## 7. Plan de Implementación

### Fase 1: Corrección Inmediata (Semana 1)
1. ✅ Corregir errores 404 en sitemap
2. ✅ Implementar redirecciones necesarias
3. ✅ Actualizar robots.txt
4. ✅ Validar todas las URLs del sitemap

### Fase 2: Optimización Técnica (Semana 2)
1. ✅ Mejorar metadatos y structured data
2. ✅ Optimizar Core Web Vitals
3. ✅ Implementar lazy loading
4. ✅ Configurar internal linking

### Fase 3: Monitoreo y Mejora Continua (Semana 3+)
1. ✅ Configurar Google Analytics 4
2. ✅ Implementar monitoreo de rendimiento
3. ✅ Crear reportes automáticos de SEO
4. ✅ Optimización continua basada en datos

## 8. Métricas de Éxito

### KPIs a Monitorear
- **Páginas indexadas**: Objetivo 95% (de 27% actual)
- **Errores 404**: Objetivo 0 (de 7 actuales)
- **Core Web Vitals**: Todos en verde
- **Posicionamiento orgánico**: Mejora en palabras clave objetivo
- **Tráfico orgánico**: Incremento del 50% en 3 meses

### Herramientas de Monitoreo
- Google Search Console
- Google Analytics 4
- PageSpeed Insights
- Lighthouse CI
- SEMrush/Ahrefs (opcional)

---

**Nota**: Este plan debe implementarse de forma gradual, monitoreando el impacto de cada cambio antes de proceder con el siguiente. La indexación puede tomar entre 1-4 semanas después de implementar las mejoras.