import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Productos | TecnoCrypter",
  description: "Productos de seguridad cibernética y encriptación con pago en criptomonedas.",
}

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}