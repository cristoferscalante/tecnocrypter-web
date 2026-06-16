import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"
import type { BlogPost } from "@/types"

const postsDirectory = path.join(process.cwd(), "content/blog")

export class BlogService {
  static async getAllPosts(locale: string = "es"): Promise<BlogPost[]> {
    try {
      if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true })
        return []
      }

      // 1. Obtener slugs por defecto en content/blog/es/ (default / es)
      const esDirectory = path.join(postsDirectory, "es")
      let defaultSlugs: string[] = []
      if (fs.existsSync(esDirectory)) {
        const fileNames = fs.readdirSync(esDirectory)
        defaultSlugs = fileNames
          .filter((name) => name.endsWith(".md"))
          .map((name) => name.replace(/\.md$/, ""))
      }

      // 2. Obtener slugs específicos de content/blog/${locale}/ si el subdirectorio existe
      let localeSlugs: string[] = []
      const localeDir = path.join(postsDirectory, locale)
      if (fs.existsSync(localeDir) && fs.statSync(localeDir).isDirectory()) {
        const localeFiles = fs.readdirSync(localeDir)
        localeSlugs = localeFiles
          .filter((name) => name.endsWith(".md"))
          .map((name) => name.replace(/\.md$/, ""))
      }

      // Unificar slugs (los localizados tienen prioridad sobre los default)
      const allSlugs = Array.from(new Set([...localeSlugs, ...defaultSlugs]))

      const posts = await Promise.all(
        allSlugs.map(async (slug) => {
          return this.getPostBySlug(slug, locale)
        }),
      )

      return posts
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (error) {
      console.error("Error al cargar posts:", error)
      return []
    }
  }

  static async getPostBySlug(slug: string, locale: string = "es"): Promise<BlogPost | null> {
    try {
      // 1. Buscar en content/blog/${locale}/${slug}.md
      let fullPath = path.join(postsDirectory, locale, `${slug}.md`)

      // 2. Si no existe, buscar en content/blog/es/${slug}.md
      if (!fs.existsSync(fullPath)) {
        fullPath = path.join(postsDirectory, "es", `${slug}.md`)
      }

      // 3. Si sigue sin existir, retornar null
      if (!fs.existsSync(fullPath)) {
        return null
      }

      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      // Configurar marked para mejor renderizado
      marked.setOptions({
        breaks: true,
        gfm: true,
      })

      // Convertir markdown a HTML
      const htmlContent = await marked(content)

      return {
        slug,
        title: data.title || "Sin título",
        excerpt: data.excerpt || content.substring(0, 160) + "...",
        content: htmlContent,
        date: data.date || new Date().toISOString(),
        author: data.author || "CriptoSecure Team",
        category: data.category || "seguridad",
        tags: data.tags || [],
        readTime: this.calculateReadTime(content),
        featured: data.featured || false,
        image: data.image || null,
        faqs: data.faqs || null,
      }
    } catch (error) {
      console.error(`Error al cargar post ${slug} (locale: ${locale}):`, error)
      return null
    }
  }

  private static calculateReadTime(content: string): number {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  static async getPostsByCategory(category: BlogPost["category"], locale: string = "es"): Promise<BlogPost[]> {
    const allPosts = await this.getAllPosts(locale)
    return allPosts.filter((post) => post.category === category)
  }
}
