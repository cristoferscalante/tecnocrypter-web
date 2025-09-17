import type { Metadata } from "next"
import { generateProductMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateProductMetadata({
  title: "Productos de Seguridad Digital | TecnoCrypter",
  description: "Descubre nuestros productos especializados en seguridad digital, encriptación y protección de datos. Herramientas profesionales para mantener tu información segura.",
  slug: "productos",
  image: "/Seo/productos.webp",
  keywords: ["productos seguridad", "herramientas encriptación", "software protección datos", "seguridad digital", "ciberseguridad"]  
})

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}