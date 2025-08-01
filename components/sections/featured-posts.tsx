"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"
import type { BlogPost } from "@/types"
import { useBlog } from "@/hooks/use-blog"

export function FeaturedPosts() {
  const { posts, loading, error, getFeaturedPosts } = useBlog()
  const featuredPosts = getFeaturedPosts().slice(0, 3)

  if (loading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Artículos Destacados</h2>
            <p className="text-muted-foreground">
              Los últimos insights sobre seguridad, encriptación y criptomonedas.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-muted" />
                <CardHeader className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-6 bg-muted rounded" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || featuredPosts.length === 0) {
    return null // No mostrar la sección si hay error o no hay posts destacados
  }

  return (
    <section className="container py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Artículos Destacados</h2>
        <Button asChild variant="ghost" className="group">
          <Link href="/blog">
            Ver todos
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="cursor-pointer">
            <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
              <div className="aspect-video relative bg-muted">
                <img
                  src={post.image || `/placeholder.svg?height=250&width=500&query=${post.title}`}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs capitalize">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm" className="text-xs pointer-events-none">
                    Leer más
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
