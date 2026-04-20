import type { Metadata } from "next"
import { generateBlogMetadata } from "@/lib/metadata"
import BlogClientPage from "../blog/BlogClientPage"

export const metadata: Metadata = generateBlogMetadata({
  title: "Criptomonedas",
  description:
    "Noticias, análisis y educación sobre Bitcoin, Ethereum, blockchain y el ecosistema cripto.",
  slug: "criptomonedas",
  image: "https://tecnocrypter.com/Seo/blog.webp",
  keywords: ["criptomonedas", "bitcoin", "ethereum", "blockchain", "crypto"],
})

export default function CriptomonedasPage() {
  return <BlogClientPage initialCategory="criptomonedas" />
}