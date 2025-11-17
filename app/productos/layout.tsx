import type { Metadata } from "next"
import { generateProductMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateProductMetadata({
  title: "Servicios Profesionales de Seguridad Digital | TecnoCrypter",
  description: "Desarrollo web seguro, capacitaciones en ciberseguridad e IA, prevención de ataques y respuesta a incidentes. Servicios profesionales para proteger tu negocio digital.",
  slug: "productos",
  image: "/Seo/productos.webp",
  keywords: ["desarrollo web seguro", "capacitación ciberseguridad", "IA segura", "prevención ataques", "respuesta incidentes", "servicios seguridad", "V1tr0"]  
})

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}