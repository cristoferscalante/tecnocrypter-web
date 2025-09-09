import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata: Metadata = generatePageMetadata({
  title: "Productos de Seguridad - TecnoCrypter",
  description: "Descubre nuestra selección de productos de seguridad cibernética y encriptación. Soluciones avanzadas con pago en criptomonedas para proteger tus activos digitales.",
  slug: "productos",
  image: "/blogs/seguridad_en_la_blockchain.webp",
  keywords: ["productos seguridad", "encriptación", "ciberseguridad", "VPN", "gestores contraseñas", "pago criptomonedas"]
})

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}