import { NextResponse } from "next/server"
import { BlogService } from "@/services/blog-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get("locale") || "es"
    const posts = await BlogService.getAllPosts(locale)
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error en API blog:", error)
    return NextResponse.json({ error: "Error al cargar posts" }, { status: 500 })
  }
}
