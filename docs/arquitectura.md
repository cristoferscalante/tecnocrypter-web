# Arquitectura del Proyecto

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 16.2.4 | Framework fullstack (App Router) |
| React | 19.1.1 | UI library |
| TypeScript | 5.9.2 | Tipado estático |
| Tailwind CSS | 3.4.17 | Estilos utility-first |
| Supabase | 2.103.3 | Base de datos PostgreSQL + Auth |
| Radix UI | Varias | Componentes accesibles (30+ paquetes) |
| Framer Motion | 12.38.0 | Animaciones |
| Sonner | 1.7.4 | Notificaciones toast |
| Recharts | 2.15.0 | Gráficos |
| Zod | 3.25.76 | Validación de schemas |

## Gestor de Paquetes

- **pnpm 10.16.1** (forzado via `preinstall` script)
- Todas las dependencias fijadas a versiones exactas (sin `^`, `~`)

## Estructura del Proyecto

```
tecnocrypter-platform/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout raíz (fonts, theme, analytics)
│   ├── page.tsx                  # Página principal
│   ├── not-found.tsx             # Página 404
│   ├── globals.css               # Estilos globales
│   ├── api/                      # Route Handlers (API)
│   │   ├── blog/                 # API del blog
│   │   ├── search/               # API de búsqueda global
│   │   ├── seo/                  # Monitoreo SEO
│   │   ├── server-sitemap/       # Sitemap dinámico
│   │   └── verify-url/           # Verificación de URLs
│   ├── blog/                     # Sección blog
│   │   ├── page.tsx              # Listado de posts
│   │   ├── [slug]/page.tsx       # Post individual
│   │   └── layout.tsx            # Layout del blog
│   ├── tools/                    # Herramientas de seguridad
│   │   ├── page.tsx              # Índice de herramientas
│   │   ├── layout.tsx            # Layout de tools
│   │   ├── cifrado-online/       # Herramienta de cifrado
│   │   ├── codificador-base32/   # Codificador Base32
│   │   ├── comparador-archivos/  # Comparador diff
│   │   ├── contador-caracteres/  # Contador de texto
│   │   ├── generador-contrasenas/# Generador de contraseñas
│   │   ├── generador-credenciales/# Credenciales determinísticas
│   │   ├── generador-hash/       # Generador de hashes
│   │   ├── generador-qr/         # Generador de QR
│   │   ├── limpia-metadatos/     # Limpiador EXIF
│   │   └── verificador/          # Verificador de URLs
│   ├── productos/                # Catálogo de servicios
│   ├── contacto/                 # Página de contacto
│   └── [legal pages]/            # cookies, privacidad, terminos
├── components/
│   ├── ads/                      # Google AdSense
│   ├── analytics/                # Google Analytics
│   ├── layout/                   # Header, Footer
│   ├── providers/                # Theme, Motion
│   ├── sections/                 # Secciones de la home
│   ├── seo/                      # Structured Data (JSON-LD)
│   ├── tools/                    # Componentes client de herramientas
│   └── ui/                       # Componentes Radix UI / shadcn
├── content/blog/                 # Posts en Markdown
├── database/                     # SQL de setup
├── hooks/                        # Custom hooks React
├── lib/                          # Utilidades (metadata, supabase, utils)
├── public/                       # Assets estáticos
├── scripts/                      # Scripts de validación SEO
├── services/                     # Servicios (blog, productos)
├── styles/                       # Estilos adicionales
└── types/                        # Interfaces TypeScript
```

## Patrones de Arquitectura

### Patrón Server Wrapper + Client Component

Las herramientas usan un patrón donde:
1. `app/tools/[tool]/page.tsx` → Server Component que exporta `metadata` y structured data
2. `components/tools/[tool]-client.tsx` → Client Component con `'use client'` que tiene la lógica interactiva

```tsx
// app/tools/cifrado-online/page.tsx (Server)
import { generateToolMetadata } from "@/lib/metadata"
import CifradoOnline from "@/components/tools/cifrado-online-client"

export const metadata = generateToolMetadata({ ... })

export default function Page() {
  return (
    <>
      <BreadcrumbStructuredData items={[...]} />
      <WebApplicationStructuredData name="..." />
      <CifradoOnline />
    </>
  )
}
```

### Servicios

- **BlogService**: Lee archivos `.md` de `content/blog/`, parsea frontmatter con `gray-matter` y renderiza HTML con `marked`
- **ProductService**: Consulta Supabase para productos/servicios activos con imágenes

### Layout Raíz

Fonts: **Orbitron** (títulos) + **Space Grotesk** (cuerpo)  
Theme: dark/light via `next-themes` (class-based)  
Componentes globales: MatrixBackground, Header, Footer, Toaster, StructuredData, GoogleAnalytics

### Tipos Principales

```typescript
interface BlogPost {
  slug, title, excerpt, content, date, author
  category: "seguridad" | "encriptacion" | "criptomonedas" | "noticias"
  tags: string[], readTime: number, featured?: boolean
}

interface Product {
  id: number, name, description, price
  crypto_price_btc, crypto_price_eth, crypto_price_usdt
  category, vendor, features: string[]
  images: ProductImage[], is_active, is_featured
}
```
