import type { Metadata } from "next"
import { generateProductMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateProductMetadata({
  title: "Servicios de Seguridad Digital | TecnoCrypter",
  description: "Desarrollo web seguro, capacitaciones en ciberseguridad, prevención de ataques y respuesta a incidentes.",
  slug: "productos",
  image: "/Seo/productos.webp",
  keywords: ["desarrollo web seguro", "capacitación ciberseguridad", "prevención ataques", "servicios seguridad"]  
})

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}