# Sistema SEO

## Arquitectura

El sistema SEO usa el **sistema nativo de metadatos de Next.js** (no next-seo). Todo se genera en build-time con type-safety completo.

## Funciones de Metadatos (`lib/metadata.ts`)

### `generatePageMetadata(params)`
Para páginas estáticas generales (home, contacto, legal).

### `generateToolMetadata(params)`
Para herramientas. Añade automáticamente keywords base: `['herramientas', 'ciberseguridad', 'privacidad', 'online', 'gratuito']`.

### `generateBlogMetadata(params)`
Para posts del blog. Type `article`, título con sufijo " | Blog TecnoCrypter".

### `generateProductMetadata(params)`
Para páginas de productos/servicios.

### Validaciones Automáticas

```
Título: warn si <30 o >60 caracteres
Descripción: warn si <120 o >160 caracteres
Keywords: máximo 10 (trunca automáticamente)
```

## Structured Data (JSON-LD)

Archivo: `components/seo/structured-data.tsx` (Server Component)

### Componentes Disponibles

| Componente | Schema | Uso |
|------------|--------|-----|
| `StructuredData` | Website + Organization | Layout raíz |
| `BreadcrumbStructuredData` | BreadcrumbList | Todas las tool pages + blog |
| `FAQStructuredData` | FAQPage | /tools index + /blog index |
| `WebApplicationStructuredData` | WebApplication | Cada herramienta individual |

### Schemas Globales (layout raíz)

- **Organization**: TecnoCrypter, foundingDate 2024, logo, sameAs (redes sociales)
- **WebSite**: SearchAction con query-input para búsqueda

### WebApplication (por herramienta)

```json
{
  "@type": "WebApplication",
  "name": "Cifrado Online - TecnoCrypter",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "All",
  "offers": { "price": "0", "priceCurrency": "USD" },
  "provider": { "@type": "Organization", "name": "TecnoCrypter" }
}
```

## Sitemap

- **Generador**: `next-sitemap` (se ejecuta en `postbuild`)
- **Config**: `next-sitemap.config.js`
- **URL base**: https://tecnocrypter.com
- **Límite**: 7000 URLs por sitemap
- **Archivos generados**:
  - `public/sitemap.xml` (índice)
  - `public/sitemap-0.xml` (URLs)
  - `public/robots.txt`
- **Sitemap dinámico**: `/api/server-sitemap` (rewritten a `/server-sitemap.xml` en vercel.json)

## OpenGraph + Twitter Cards

Todas las páginas generan automáticamente:
- OG: tipo, título, descripción, imagen (1200x630), locale es_ES
- Twitter: summary_large_image, @tecnocrypter

## Google Analytics & AdSense

- **Analytics**: Componente `GoogleAnalytics` en layout raíz
- **AdSense**: `ca-pub-9286345048405462`, script nativo en `<head>`
- **Componente de anuncios**: `components/ads/adsense-ad.tsx` (reutilizable)

## Redirects SEO (next.config.mjs)

| Origen | Destino | Tipo |
|--------|---------|------|
| /sobre-nosotros, /acerca-de | /contacto | 301 |
| /herramientas, /utilidades | /tools | 301 |
| /articulos/:slug, /noticias/:slug | /blog/:slug | 301 |
| /servicios, /catalogo | /productos | 301 |
| /generador-contrasenas | /tools/generador-contrasenas | 301 |

## Script de Validación

```bash
pnpm seo:validate    # Ejecuta scripts/seo-validation.js
pnpm seo:check       # Valida y muestra resultado
```

Genera reportes en `seo-reports/` (HTML + JSON).
