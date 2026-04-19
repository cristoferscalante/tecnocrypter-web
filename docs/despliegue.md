# Despliegue y Configuración

## Hosting

- **Plataforma**: Vercel
- **Dominio**: tecnocrypter.com
- **Repositorio**: github.com/cristoferscalante/tecnocrypter-web
- **Branch de producción**: `main`
- **Deploy automático**: Push a `main` → build en Vercel

## Variables de Entorno

Archivo: `.env.local` (no se versiona)

Variables requeridas:
- `NEXT_PUBLIC_SUPABASE_URL` - URL del proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clave pública de Supabase
- `GOOGLE_SITE_VERIFICATION` - ID de verificación de Google Search Console

## Configuración de Next.js (`next.config.mjs`)

```javascript
{
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  redirects: [/* 301 redirects para SEO */]
}
```

- **Turbopack**: Habilitado por defecto en Next 16
- **Imágenes**: No optimizadas (unoptimized: true)
- **TypeScript**: Errores ignorados en build (temporal)

## Vercel Config (`vercel.json`)

```json
{
  "rewrites": [
    { "source": "/server-sitemap.xml", "destination": "/api/server-sitemap" }
  ]
}
```

## Scripts de Build

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción (+ postbuild: next-sitemap)
pnpm start        # Servidor de producción local
pnpm lint         # Linting
pnpm seo:validate # Validación SEO
pnpm seo:check    # Validación SEO con mensaje
```

## Proceso de Deploy

1. Hacer cambios en el código
2. `pnpm build` → Verificar que compila sin errores
3. `git add -A && git commit -m "descripción"`
4. `git push origin main`
5. Vercel detecta el push y despliega automáticamente
6. Verificar en https://tecnocrypter.com que todo funciona

## Archivos Generados en Build

- `public/sitemap.xml` - Índice de sitemaps
- `public/sitemap-0.xml` - Sitemap con todas las URLs
- `public/robots.txt` - Directivas para crawlers
- `.next/` - Build output (no se versiona)

## Google AdSense

- **Client ID**: `ca-pub-9286345048405462`
- **Implementación**: Tag `<script>` nativo en `app/layout.tsx` (en `<head>`)
- **Meta verificación**: `<meta name="google-adsense-account">` en `<head>`
- **Componente de anuncios**: `components/ads/adsense-ad.tsx`

## Google Analytics

- Componente: `components/analytics/GoogleAnalytics.tsx`
- Se carga en el layout raíz
