import type { Metadata } from "next"
import { generateBlogMetadata } from "@/lib/metadata"
import BlogClientPage from "./BlogClientPage"

export const metadata: Metadata = generateBlogMetadata({
  title: "Blog de Seguridad y Criptomonedas",
  description:
    "Artículos, guías y noticias sobre seguridad cibernética, encriptación y el mundo crypto.",
  slug: "blog",
  image: "https://tecnocrypter.com/seo/blog.webp",
  keywords: [
    "seguridad cibernética",
    "encriptación",
    "criptomonedas",
    "blockchain",
    "privacidad digital",
    "tecnología",
    "hacking ético",
  ],
})

export default function BlogPage() {
  return <BlogClientPage />
}
