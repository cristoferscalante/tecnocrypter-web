# Guía de Desarrollo

## Requisitos Previos

- Node.js 20+
- pnpm 10.16.1 (se fuerza en `preinstall`)

## Configuración Inicial

```bash
git clone https://github.com/cristoferscalante/tecnocrypter-web.git
cd tecnocrypter-platform
pnpm install
cp .env.example .env.local   # Configurar variables de entorno
pnpm dev                      # http://localhost:3000
```

## Convenciones

### Estructura de Archivos

- **Componentes UI**: `components/ui/` (shadcn/Radix)
- **Secciones de la home**: `components/sections/`
- **Tools (client)**: `components/tools/[nombre]-client.tsx`
- **Pages (server)**: `app/tools/[nombre]/page.tsx`
- **Tipos**: `types/index.ts`
- **Hooks**: `hooks/use-[nombre].ts`
- **Servicios**: `services/[nombre]-service.ts`

### Naming

- Archivos: kebab-case (`generador-hash-client.tsx`)
- Componentes: PascalCase (`GeneradorHash`)
- Hooks: camelCase con prefijo `use` (`useBlog`)
- Rutas: kebab-case en español (`/tools/cifrado-online`)

### Crear una Nueva Herramienta

1. **Crear el componente client**:
   ```
   components/tools/mi-herramienta-client.tsx
   ```
   - Añadir `'use client'` al inicio
   - Exportar el componente por defecto

2. **Crear la carpeta y page**:
   ```
   app/tools/mi-herramienta/page.tsx
   ```
   ```tsx
   import type { Metadata } from "next"
   import { generateToolMetadata } from "@/lib/metadata"
   import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"
   import MiHerramientaClient from "@/components/tools/mi-herramienta-client"

   export const metadata: Metadata = generateToolMetadata({
     title: "Mi Herramienta",
     description: "Descripción de 120-160 caracteres para SEO.",
     slug: "tools/mi-herramienta",
     keywords: ["keyword1", "keyword2", "keyword3"]
   })

   export default function MiHerramientaPage() {
     return (
       <>
         <BreadcrumbStructuredData items={[
           { name: "Inicio", url: "https://tecnocrypter.com" },
           { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
           { name: "Mi Herramienta", url: "https://tecnocrypter.com/tools/mi-herramienta" },
         ]} />
         <WebApplicationStructuredData
           name="Mi Herramienta - TecnoCrypter"
           description="Descripción corta"
           url="https://tecnocrypter.com/tools/mi-herramienta"
         />
         <MiHerramientaClient />
       </>
     )
   }
   ```

3. **Añadir al índice**: Actualizar `app/tools/page.tsx` con la nueva herramienta en el array y en el ItemList schema

4. **Build y test**: `pnpm build` para verificar

### Crear un Nuevo Post de Blog

1. Crear `content/blog/mi-post.md` con frontmatter completo
2. Colocar imágenes en `public/blogs/`
3. `pnpm build` para generar estáticamente

## Componentes UI Disponibles (shadcn)

Accordion, Alert, AlertDialog, Avatar, Badge, Button, Calendar, Card, Checkbox, Collapsible, Command, ContextMenu, Dialog, DropdownMenu, HoverCard, Input, Label, Menubar, NavigationMenu, Popover, Progress, RadioGroup, ScrollArea, Select, Separator, Slider, Switch, Tabs, Textarea, Toast, Toggle, Tooltip

## Dependencias Clave

| Paquete | Uso |
|---------|-----|
| `gray-matter` | Parsear frontmatter de Markdown |
| `marked` | Convertir Markdown → HTML |
| `qrcode` + `react-qrcode-logo` | Generación de QR |
| `recharts` | Gráficos |
| `framer-motion` | Animaciones |
| `zod` | Validación de schemas |
| `react-hook-form` | Formularios |
| `cmdk` | Command palette |
| `vaul` | Drawer/sheet |
| `sonner` | Toasts |

## Comandos Útiles

```bash
pnpm dev                # Desarrollo
pnpm build              # Build producción
pnpm seo:validate       # Validar SEO
pnpm lint               # Linting
```
