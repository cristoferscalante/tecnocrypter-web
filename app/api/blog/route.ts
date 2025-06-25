import { NextResponse } from "next/server"
import { BlogService } from "@/services/blog-service"

export async function GET() {
  try {
    const posts = await BlogService.getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error en API blog:", error)
    return NextResponse.json({ error: "Error al cargar posts" }, { status: 500 })
  }
}
