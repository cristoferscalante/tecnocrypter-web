# Sistema de Blog

## Resumen

Blog basado en archivos Markdown con frontmatter, parseado con `gray-matter` + `marked`. Sin CMS externo, todo se genera estáticamente en build-time.

## Estructura de Archivos

```
content/blog/
├── seguridad-blockchain.md
├── encriptacion-end-to-end.md
├── tendencias-crypto-2025.md
├── ataques-phishing-avanzados.md
└── wallets-hardware.md

app/blog/
├── layout.tsx              # Layout del blog
├── page.tsx                # Listado + filtros + FAQs
├── loading.tsx             # Skeleton loader
├── BlogClientPage.tsx      # Componente client del listado
└── [slug]/
    ├── page.tsx            # Post individual (SSG)
    └── not-found.tsx       # 404 para posts no encontrados
```

## Frontmatter de un Post

```yaml
---
title: "Título del artículo"
excerpt: "Resumen breve para listados y SEO"
date: "2025-03-15"
author: "Nombre del Autor"
category: "seguridad"          # seguridad | encriptacion | criptomonedas | noticias
tags: ["blockchain", "crypto"]
featured: true                  # Aparece en la sección destacados de la home
image: "/blogs/mi-imagen.jpg"   # Opcional
---

Contenido en Markdown aquí...
```

## Servicio (`services/blog-service.ts`)

```typescript
class BlogService {
  getAllPosts()              // Todos los posts, ordenados por fecha DESC
  getPostBySlug(slug)       // Post individual, convierte MD → HTML
  getPostsByCategory(cat)   // Filtrado por categoría
}
```

- **Tiempo de lectura**: Calculado automáticamente (200 palabras/minuto)
- **Markdown**: GFM (GitHub Flavored Markdown) habilitado
- **Imágenes**: Se colocan en `public/blogs/`

## Funcionalidades

- Búsqueda en tiempo real (títulos, excerpts, tags)
- Filtrado por categorías
- Posts destacados (featured) en la home
- Posts relacionados por categoría
- Navegación entre posts (anterior/siguiente)
- Botones de compartir en redes sociales
- Skeleton loaders durante la carga
- Breadcrumbs de navegación

## SEO del Blog

- Metadatos dinámicos por post via `generateBlogMetadata()`
- OG + Twitter Cards con imagen del post
- Generación estática via `generateStaticParams()`
- BreadcrumbStructuredData en la página índice
- FAQStructuredData con preguntas frecuentes del blog

## Hook (`hooks/use-blog.ts`)

Custom hook para la página client del blog:
- Estado de posts, categoría activa, búsqueda
- Fetching automático via API `/api/blog`
- Manejo de loading y errores

## Crear un Nuevo Post

1. Crear archivo `.md` en `content/blog/nombre-del-post.md`
2. Añadir frontmatter con todos los campos requeridos
3. Escribir contenido en Markdown
4. Si tiene imagen, colocarla en `public/blogs/`
5. Hacer build (`pnpm build`) → se genera estáticamente
