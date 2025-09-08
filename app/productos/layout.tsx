import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Productos | TecnoCrypter",
  description: "Descubre nuestros productos especializados en seguridad digital, encriptación y protección de datos. Herramientas profesionales para mantener tu información segura.",
}

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}