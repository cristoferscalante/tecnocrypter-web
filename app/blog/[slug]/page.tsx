import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, Calendar, User, ArrowLeft, Share2, Twitter, Facebook, Linkedin, Copy } from "lucide-react"
import { BlogService } from "@/services/blog-service"
import type { BlogPost } from "@/types"
import type { Metadata } from "next"
import { ShareButton } from "@/components/share-button"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await BlogService.getPostBySlug(slug)
    
    if (!post) {
      return {
        title: "Post no encontrado | TecnoCrypter",
        description: "El artículo que buscas no existe."
      }
    }

    return {
      title: `${post.title} | TecnoCrypter Blog`,
      description: post.excerpt,
      keywords: post.tags.join(", "),
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
      },
    }
  } catch (error) {
    return {
      title: "Error | TecnoCrypter",
      description: "Error al cargar el artículo."
    }
  }
}

export async function generateStaticParams() {
  try {
    const posts = await BlogService.getAllPosts()
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post: BlogPost | null = null
  let relatedPosts: BlogPost[] = []

  try {
    const { slug } = await params
    post = await BlogService.getPostBySlug(slug)
    
    if (!post) {
      notFound()
    }

    // Obtener posts relacionados de la misma categoría
    const allPosts = await BlogService.getAllPosts()
    relatedPosts = allPosts
      .filter(p => p.slug !== post!.slug && p.category === post!.category)
      .slice(0, 3)
  } catch (error) {
    console.error("Error loading blog post:", error)
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      seguridad: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      encriptacion: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      criptomonedas: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      noticias: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    }
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="mb-12">
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className={getCategoryColor(post.category)}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </Badge>
              {post.featured && (
                <Badge variant="secondary">Destacado</Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min de lectura</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Article Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Share Section */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-2">¿Te gustó este artículo?</h3>
                <p className="text-sm text-muted-foreground">
                  Compártelo con tu comunidad
                </p>
              </div>
              <ShareButton 
                title={post.title}
                text={post.excerpt}
                url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug}`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Artículos relacionados
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-video relative bg-muted" />
                  <CardContent className="p-4">
                    <Badge className={`${getCategoryColor(relatedPost.category)} mb-2`}>
                      {relatedPost.category.charAt(0).toUpperCase() + relatedPost.category.slice(1)}
                    </Badge>
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      <Link 
                        href={`/blog/${relatedPost.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(relatedPost.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{relatedPost.readTime} min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}