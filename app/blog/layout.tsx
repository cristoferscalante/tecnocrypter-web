import type { Metadata } from "next"
import { generateBlogMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateBlogMetadata({
  title: "Blog de Seguridad y Criptomonedas",
  description: "Artículos sobre seguridad cibernética, encriptación y criptomonedas. Mantente actualizado con las últimas tendencias y mejores prácticas en el mundo de la tecnología y la seguridad digital.",
  slug: "blog",
  image: "https://tecnocrypter.com/seo/blog.webp",
  keywords: ["seguridad cibernética", "encriptación", "criptomonedas", "blockchain", "privacidad digital", "tecnología", "hacking ético"]
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}