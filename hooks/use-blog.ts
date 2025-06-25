"use client"

import { useState, useEffect } from "react"
import type { BlogPost } from "@/types"

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/blog")
        if (!response.ok) throw new Error("Error al cargar posts")
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const getPostsByCategory = (category: BlogPost["category"]) => {
    return posts.filter((post) => post.category === category)
  }

  const getFeaturedPosts = () => {
    return posts.filter((post) => post.featured)
  }

  const searchPosts = (query: string) => {
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
    )
  }

  return {
    posts,
    loading,
    error,
    getPostsByCategory,
    getFeaturedPosts,
    searchPosts,
  }
}
