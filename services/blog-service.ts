import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost } from "@/types"

const postsDirectory = path.join(process.cwd(), "content/blog")

export class BlogService {
  static async getAllPosts(): Promise<BlogPost[]> {
    try {
      // Crear directorio si no existe
      if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true })
        return []
      }

      const fileNames = fs.readdirSync(postsDirectory)
      const posts = await Promise.all(
        fileNames
          .filter((name) => name.endsWith(".md"))
          .map(async (fileName) => {
            const slug = fileName.replace(/\.md$/, "")
            return this.getPostBySlug(slug)
          }),
      )

      return posts.filter(Boolean).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (error) {
      console.error("Error al cargar posts:", error)
      return []
    }
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const fullPath = path.join(postsDirectory, `${slug}.md`)

      if (!fs.existsSync(fullPath)) {
        return null
      }

      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || "Sin título",
        excerpt: data.excerpt || content.substring(0, 160) + "...",
        content,
        date: data.date || new Date().toISOString(),
        author: data.author || "CriptoSecure Team",
        category: data.category || "seguridad",
        tags: data.tags || [],
        readTime: this.calculateReadTime(content),
        featured: data.featured || false,
      }
    } catch (error) {
      console.error(`Error al cargar post ${slug}:`, error)
      return null
    }
  }

  private static calculateReadTime(content: string): number {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  static async getPostsByCategory(category: BlogPost["category"]): Promise<BlogPost[]> {
    const allPosts = await this.getAllPosts()
    return allPosts.filter((post) => post.category === category)
  }
}
