# Plan de Internacionalización (i18n) — TecnoCrypter

## Resumen Ejecutivo

Traducir tecnocrypter.com de español (es) a **4 idiomas**: español (es, actual), inglés (en), francés (fr) y portugués (pt).

- **~4,800 strings** a traducir por idioma
- **Herramienta elegida**: `next-intl` (la más popular para Next.js App Router)
- **Estrategia de URLs**: subpath routing (`/en/`, `/fr/`, `/pt/`) — sin prefijo para español
- **Fases estimadas**: 7 fases

---

## Arquitectura Propuesta

### Estructura de URLs

| Idioma | URL Ejemplo |
|--------|-------------|
| Español (default) | `tecnocrypter.com/tools/generador-contrasenas` |
| Inglés | `tecnocrypter.com/en/tools/password-generator` |
| Francés | `tecnocrypter.com/fr/tools/generateur-mots-de-passe` |
| Portugués | `tecnocrypter.com/pt/tools/gerador-senhas` |

### Estructura de Archivos (Antes → Después)

```
ANTES:                           DESPUÉS:
app/                             app/
├── layout.tsx                   ├── [locale]/
├── page.tsx                     │   ├── layout.tsx
├── blog/                        │   ├── page.tsx
│   ├── page.tsx                 │   ├── blog/
│   └── [slug]/                  │   │   ├── page.tsx
├── tools/                       │   │   └── [slug]/
│   ├── page.tsx                 │   ├── tools/
│   └── generador-contrasenas/   │   │   ├── page.tsx
├── contacto/                    │   │   └── [...slug]/  ← catch-all para slugs localizados
├── not-found.tsx                │   ├── contacto/       (o /en/contact/)
                                 │   ├── not-found.tsx
                                 ├── sitemap.ts          (fuera de [locale])
                                 ├── robots.ts           (fuera de [locale])
i18n/
├── config.ts                    ← configuración de locales
├── request.ts                   ← proveedor de mensajes
├── routing.ts                   ← rutas localizadas
messages/
├── es/
│   ├── common.json              ← header, footer, nav, botones
│   ├── home.json                ← secciones del home
│   ├── tools.json               ← nombres y descripciones de herramientas
│   ├── tools/
│   │   ├── password-generator.json
│   │   ├── hash-generator.json
│   │   └── ... (1 archivo por herramienta)
│   ├── blog.json                ← UI del blog
│   ├── products.json            ← UI de productos
│   ├── legal.json               ← privacidad, términos, cookies
│   ├── seo.json                 ← metadata, structured data
│   └── errors.json              ← 404, errores
├── en/
│   └── ... (misma estructura)
├── fr/
│   └── ... (misma estructura)
└── pt/
    └── ... (misma estructura)
content/
├── blog/
│   ├── es/                      ← posts en español (mover aquí los actuales)
│   ├── en/                      ← posts traducidos
│   ├── fr/
│   └── pt/
```

---

## Inventario Completo de Strings por Área

| Área | ~Strings | Archivos Afectados | Prioridad |
|------|----------|---------------------|-----------|
| Header (nav + mega menu) | 90 | `components/layout/header.tsx` | P0 |
| Footer | 15 | `components/layout/footer.tsx` | P0 |
| Home page (12 secciones) | 175 | `components/sections/*.tsx` | P0 |
| Metadata/SEO base | 50 | `lib/metadata.ts`, `layout.tsx` | P0 |
| Structured data | 30 | `components/seo/structured-data.tsx` | P0 |
| 40 tool page.tsx (metadata) | 200 | `app/tools/*/page.tsx` | P1 |
| 44 tool client components | 2,200 | `components/tools/*-client.tsx` | P1 |
| Tool SEO sections | 150 | `components/tools/tool-seo-section.tsx` + props | P1 |
| Blog UI | 40 | `BlogClientPage.tsx`, `[slug]/page.tsx` | P1 |
| Blog markdown (25 posts) | 1,250 | `content/blog/*.md` | P2 |
| Páginas legales | 220 | `privacidad/`, `terminos/`, `cookies/` | P2 |
| Contacto | 30 | `app/contacto/page.tsx` | P1 |
| Seguridad | 30 | `app/seguridad/page.tsx` | P1 |
| Productos UI | 50 | `app/productos/page.tsx` | P1 |
| Categorías blog | 15 | `criptomonedas/`, `encriptacion/`, `noticias/` | P1 |
| Not-found + errores | 15 | `app/not-found.tsx` | P2 |
| FAQs (todas las ubicaciones) | 350 | Distribuido en múltiples archivos | P2 |
| API routes (mensajes) | 20 | `app/api/*/route.ts` | P3 |
| UI components | 10 | `share-button.tsx`, `search-dropdown.tsx` | P2 |
| **TOTAL** | **~4,800** | | |

---

## Plan de Implementación por Fases

### FASE 0: Setup Inicial (Pre-requisito)
**Objetivo**: Instalar next-intl y crear la estructura base sin romper nada existente.

**Tareas**:
1. `pnpm add next-intl`
2. Crear `i18n/config.ts`:
   ```ts
   export const locales = ['es', 'en', 'fr', 'pt'] as const
   export const defaultLocale = 'es' as const
   export type Locale = (typeof locales)[number]
   ```
3. Crear `i18n/routing.ts` con las rutas localizadas (mapeo de pathnames)
4. Crear `i18n/request.ts` (proveedor de mensajes por request)
5. Crear `middleware.ts` para detección de locale
6. Mover `app/*` → `app/[locale]/*` (reestructurar directorio)
7. Actualizar `app/[locale]/layout.tsx` con `<html lang={locale}>`
8. Crear estructura base de `messages/es/common.json` (vacío por ahora)
9. Verificar que la web sigue funcionando en español sin cambios

**Archivos nuevos**: `i18n/config.ts`, `i18n/routing.ts`, `i18n/request.ts`, `middleware.ts`
**Archivos movidos**: Todos los de `app/` → `app/[locale]/`

---

### FASE 1: Extracción de Strings — Layout Global (P0)
**Objetivo**: Extraer todo el texto del header, footer, layout raíz y home.

**Tareas**:
1. Crear `messages/es/common.json` con strings de:
   - Header: 4 nav items, 40 tool entries (nombre + desc), categorías
   - Footer: enlaces, copyright, descripción
   - Selector de idioma (nuevo componente)
2. Crear `messages/es/home.json` con strings de las 12 secciones:
   - hero, features, tools, security, shield, product-showcase, featured-posts, stats, faq, newsletter, cta, reusable-faq
3. Refactorizar `header.tsx` para usar `useTranslations('common')`
4. Refactorizar `footer.tsx` para usar `useTranslations('common')`
5. Refactorizar cada sección del home
6. Crear componente `<LanguageSwitcher />`
7. Actualizar `lib/metadata.ts` para recibir `locale` y buscar traducciones

**Archivos a modificar**: `header.tsx`, `footer.tsx`, `layout.tsx`, 12 archivos de secciones, `lib/metadata.ts`
**Archivos nuevos**: `messages/es/common.json`, `messages/es/home.json`, `components/layout/language-switcher.tsx`

---

### FASE 2: Herramientas — Metadata + UI Compartida (P1)
**Objetivo**: Traducir los 40 page.tsx de herramientas y los componentes compartidos.

**Tareas**:
1. Crear `messages/es/tools.json` con:
   - Nombres y descripciones de las 40 herramientas (para el mega menu y listados)
   - UI compartida: "Copiar", "Generar", "Limpiar", "Descargar", badges, etc.
2. Refactorizar `app/tools/page.tsx` (índice de herramientas)
3. Refactorizar `components/tools/tool-seo-section.tsx` ("¿Cómo funciona?", "Preguntas Frecuentes", etc.)
4. Crear mapeo de pathnames localizados para las 40 herramientas en `i18n/routing.ts`
5. Actualizar `generateStaticParams` para generar todas las combinaciones locale × tool

**Archivos a modificar**: `app/tools/page.tsx`, 40 × `app/tools/*/page.tsx`, `tool-seo-section.tsx`
**Archivos nuevos**: `messages/es/tools.json`

---

### FASE 3: Herramientas — 44 Client Components (P1)
**Objetivo**: Extraer strings de los 44 componentes client de herramientas. Esta es la fase más laboriosa.

**Tareas**:
1. Para cada herramienta, crear un namespace en `messages/es/tools/`:
   - `password-generator.json`, `hash-generator.json`, etc.
   - Contenido: labels, placeholders, resultados, mensajes de error, FAQs, howTo steps
2. Refactorizar cada `*-client.tsx` para usar `useTranslations('tools.passwordGenerator')`
3. Validar que la funcionalidad no se rompe

**Orden sugerido** (por complejidad, empezar por las más simples):
1. Conversores (base64, hex, colores, markdown, timestamp, unidades) — ~6 herramientas
2. Generadores simples (uuid, lorem, qr, cron, csv, datos) — ~6 herramientas
3. Validadores (json, regex-tester) — 2 herramientas
4. Herramientas de seguridad (contraseñas, hash, cifrado, passphrase, totp) — ~6 herramientas
5. Analizadores (cookies, email, huella-digital) — 3 herramientas
6. Resto — ~21 herramientas

**Archivos a modificar**: 44 × `components/tools/*-client.tsx`
**Archivos nuevos**: 44 × `messages/es/tools/*.json`

---

### FASE 4: Blog + Productos + Otras Páginas (P1-P2)
**Objetivo**: Traducir la UI del blog, productos y páginas de contenido.

**Tareas**:
1. Crear `messages/es/blog.json`: UI del blog (filtros, categorías, "Leer más", etc.)
2. Crear `messages/es/products.json`: UI de productos (filtros, precios, FAQs)
3. Refactorizar `BlogClientPage.tsx`, `[slug]/page.tsx`
4. Refactorizar `app/productos/page.tsx`, `app/productos/[id]/page.tsx`
5. Refactorizar `app/contacto/page.tsx` (labels de formulario)
6. Refactorizar `app/seguridad/page.tsx`
7. Refactorizar `app/criptomonedas/page.tsx`, `app/encriptacion/page.tsx`, `app/noticias/page.tsx`
8. Crear `messages/es/legal.json` y refactorizar privacidad, términos, cookies
9. Refactorizar `app/not-found.tsx`
10. Supabase: crear tabla `product_translations(id, product_id, locale, title, description, features)`

**Archivos a modificar**: ~15 archivos de páginas
**Archivos nuevos**: `messages/es/blog.json`, `messages/es/products.json`, `messages/es/legal.json`, `messages/es/errors.json`

---

### FASE 5: SEO Multi-idioma (P0-P1)
**Objetivo**: Que cada idioma tenga su propio sitemap, hreflang, metadata y structured data.

**Tareas**:
1. Actualizar `app/sitemap.ts`:
   ```ts
   // Generar URLs para todos los locales con alternates
   locales.flatMap(locale => routes.map(route => ({
     url: `${BASE_URL}/${locale}${route}`,
     alternates: { languages: { es: `${BASE_URL}${route}`, en: `${BASE_URL}/en${route}`, ... } }
   })))
   ```
2. Actualizar `app/robots.ts` para referenciar el sitemap correcto
3. Actualizar `lib/metadata.ts`:
   - `generateMetadata()` recibe `locale` y carga traducciones
   - Añadir `alternates.languages` en todos los metadatos (hreflang)
   - Actualizar OpenGraph `locale` por idioma
4. Actualizar `components/seo/structured-data.tsx`:
   - `inLanguage` dinámico
   - `availableLanguage` actualizado
5. Re-enviar sitemaps en Google Search Console

---

### FASE 6: Traducción del Contenido (P2)
**Objetivo**: Traducir los archivos JSON de mensajes y el contenido del blog.

**Tareas**:
1. **Copiar** `messages/es/` → `messages/en/`, `messages/fr/`, `messages/pt/`
2. **Traducir** cada archivo JSON (se puede usar API de traducción para borrador + revisión humana):
   - `common.json` (~105 strings) × 3 idiomas
   - `home.json` (~175 strings) × 3 idiomas
   - `tools.json` (~200 strings) × 3 idiomas
   - 44 tool JSONs (~2,200 strings total) × 3 idiomas
   - `blog.json`, `products.json`, `legal.json`, `errors.json` (~355 strings) × 3 idiomas
3. **Blog markdown**: Crear `content/blog/{en,fr,pt}/` y traducir 25 posts × 3 idiomas
4. **Supabase products**: Insertar traducciones en `product_translations`
5. **Validar** que no falte ninguna key (next-intl tiene validación de keys faltantes)

---

## Mapeo de Pathnames Localizados

Las rutas de la web cambiarán según el idioma. Ejemplo para herramientas principales:

| Español (actual) | Inglés | Francés | Portugués |
|---|---|---|---|
| `/tools/generador-contrasenas` | `/en/tools/password-generator` | `/fr/tools/generateur-mots-de-passe` | `/pt/tools/gerador-senhas` |
| `/tools/cifrado-online` | `/en/tools/online-encryption` | `/fr/tools/chiffrement-en-ligne` | `/pt/tools/criptografia-online` |
| `/tools/generador-hash` | `/en/tools/hash-generator` | `/fr/tools/generateur-hash` | `/pt/tools/gerador-hash` |
| `/tools/verificador-contrasenas` | `/en/tools/password-checker` | `/fr/tools/verificateur-mots-de-passe` | `/pt/tools/verificador-senhas` |
| `/blog` | `/en/blog` | `/fr/blog` | `/pt/blog` |
| `/contacto` | `/en/contact` | `/fr/contact` | `/pt/contato` |
| `/seguridad` | `/en/security` | `/fr/securite` | `/pt/seguranca` |
| `/productos` | `/en/products` | `/fr/produits` | `/pt/produtos` |
| `/privacidad` | `/en/privacy` | `/fr/confidentialite` | `/pt/privacidade` |

---

## Componente Selector de Idioma

Añadir en el header un selector con banderas/códigos:

```
🇪🇸 ES | 🇬🇧 EN | 🇫🇷 FR | 🇧🇷 PT
```

Al cambiar idioma: redirigir a la URL equivalente localizada (e.g., `/tools/generador-hash` → `/en/tools/hash-generator`).

---

## Checklist para No Dejar Nada Sin Traducir

### Validación Automática
- [ ] Activar `next-intl` strict mode (error en keys faltantes en desarrollo)
- [ ] Crear script `validate-translations.ts` que compare keys entre `messages/es/` y cada idioma
- [ ] CI check: fallar build si hay keys faltantes

### Checklist Manual por Idioma
- [ ] Header: logo, nav items, mega menu (40 tools × nombre + desc)
- [ ] Footer: enlaces, descripción, copyright
- [ ] Home: 12 secciones completas
- [ ] 40 tools: metadata (title, description, keywords)
- [ ] 44 tool clients: todos los labels, placeholders, resultados, errores, FAQs, howTo
- [ ] Blog UI: filtros, categorías, "Leer más", paginación, búsqueda
- [ ] Blog contenido: 25 posts completos
- [ ] Productos UI: filtros, cards, precios, FAQs
- [ ] Productos datos: traducciones en Supabase
- [ ] Contacto: formulario labels + placeholders + validaciones
- [ ] Seguridad: tabs, cards, descripciones
- [ ] Legal: privacidad, términos, cookies (documentos completos)
- [ ] 404: título, descripción, botones
- [ ] Structured data: `inLanguage`, `description`, `articleSection`
- [ ] Metadata: title, description, og:title, og:description, twitter:title
- [ ] Sitemap: URLs localizadas con hreflang
- [ ] Robots: referencia a sitemap correcto
- [ ] API search: resultados estáticos traducidos
- [ ] Toasts/notificaciones: "Copiado", "Error", etc.

---

## Dependencias Técnicas

| Paquete | Propósito |
|---------|-----------|
| `next-intl` | Framework de i18n para App Router |
| (ningún otro) | next-intl incluye middleware, routing y client provider |

---

## Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Romper SEO actual al reestructurar URLs | Alto | Añadir redirects 301 desde URLs antiguas si cambian |
| Traducciones de baja calidad | Medio | Usar IA para borrador + revisión humana |
| Keys faltantes en algún idioma | Medio | Script de validación + strict mode |
| Blog posts sin traducir | Bajo | Mostrar versión en español como fallback |
| Supabase products sin traducción | Bajo | Fallback al español |
| Performance por cargar diccionarios | Bajo | next-intl tree-shakes por namespace |

---

## Orden de Ejecución Recomendado

```
FASE 0 (Setup)          → 1 sesión
FASE 1 (Layout global)  → 2-3 sesiones
FASE 5 (SEO)            → 1-2 sesiones (hacer junto con Fase 1)
FASE 2 (Tools metadata)  → 1-2 sesiones
FASE 3 (Tool components) → 5-8 sesiones (la más larga)
FASE 4 (Blog/Productos)  → 2-3 sesiones
FASE 6 (Traducciones)    → Depende de método (IA vs. humano)
```
