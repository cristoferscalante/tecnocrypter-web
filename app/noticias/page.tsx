import type { Metadata } from "next"
import { generateBlogMetadata } from "@/lib/metadata"
import BlogClientPage from "../blog/BlogClientPage"

export const metadata: Metadata = generateBlogMetadata({
  title: "Noticias Tech",
  description:
    "Actualidad tecnológica y ciberseguridad: lo último en IA, seguridad y tendencias del mundo digital.",
  slug: "noticias",
  image: "https://tecnocrypter.com/Seo/blog.webp",
  keywords: ["noticias", "tecnología", "ciberseguridad", "IA"],
})

export default function NoticiasPage() {
  return <BlogClientPage initialCategory="noticias" />
}