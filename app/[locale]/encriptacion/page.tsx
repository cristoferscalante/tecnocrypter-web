import type { Metadata } from "next"
import { generateBlogMetadata } from "@/lib/metadata"
import BlogClientPage from "../blog/BlogClientPage"

export const metadata: Metadata = generateBlogMetadata({
  title: "Encriptación",
  description:
    "Guías, técnicas y herramientas de encriptación para proteger tu información y privacidad digital.",
  slug: "encriptacion",
  image: "https://tecnocrypter.com/Seo/blog.webp",
  keywords: ["encriptación", "cifrado", "privacidad", "seguridad"],
})

export default function EncriptacionPage() {
  return <BlogClientPage initialCategory="encriptacion" />
}