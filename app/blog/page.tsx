"use client"

import type { Metadata } from "next"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Clock, Search } from "lucide-react"
import { useBlog } from "@/hooks/use-blog"
import type { BlogPost } from "@/types"
import SeoPage from "@/components/seo/SeoPage"
import { ReusableFaqSection } from "@/components/sections/reusable-faq-section"

// Note: metadata export removed due to 'use client' directive
// This should be handled at layout level or with generateMetadata

export default function BlogPage() {
  const { posts, loading, error, getPostsByCategory, searchPosts } = useBlog()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "seguridad", name: "Seguridad" },
    { id: "encriptacion", name: "Encriptación" },
    { id: "criptomonedas", name: "Criptomonedas" },
    { id: "noticias", name: "Noticias" },
  ]

  // FAQ específicas para blog
  const blogFaqs = [
    {
      question: "¿Con qué frecuencia publican nuevos artículos?",
      answer: "Publicamos nuevos artículos de seguridad cibernética y criptomonedas semanalmente. Nuestro equipo de expertos trabaja constantemente para traerte el contenido más actualizado y relevante del sector."
    },
    {
      question: "¿Puedo sugerir temas para futuros artículos?",
      answer: "¡Por supuesto! Valoramos mucho las sugerencias de nuestra comunidad. Puedes enviarnos tus ideas a través de nuestro formulario de contacto o redes sociales, y nuestro equipo editorial las considerará para futuros contenidos."
    },
    {
      question: "¿Los artículos están escritos por expertos certificados?",
      answer: "Sí, todos nuestros artículos son escritos y revisados por profesionales certificados en ciberseguridad, criptografía y blockchain con años de experiencia en el sector."
    },
    {
      question: "¿Puedo compartir los artículos del blog?",
      answer: "Absolutamente. Todos nuestros artículos pueden ser compartidos libremente. Incluimos botones de compartir en redes sociales y agradecemos que cites la fuente cuando compartas nuestro contenido."
    },
    {
      question: "¿Ofrecen contenido para principiantes?",
      answer: "Sí, tenemos contenido para todos los niveles. Categorizamos nuestros artículos por dificultad y incluimos guías paso a paso para principiantes, así como análisis técnicos avanzados para profesionales."
    },
    {
      question: "¿Cómo puedo estar al día con las últimas publicaciones?",
      answer: "Puedes suscribirte a nuestro newsletter, seguirnos en redes sociales o activar las notificaciones del navegador. También ofrecemos un feed RSS para que no te pierdas ninguna actualización."
    }
  ]

  const getFilteredPosts = () => {
    let filteredPosts = posts

    if (searchQuery.trim()) {
      filteredPosts = searchPosts(searchQuery)
    }

    if (selectedCategory !== "todos") {
      filteredPosts = filteredPosts.filter(post => post.category === selectedCategory)
    }

    return filteredPosts
  }

  const filteredPosts = getFilteredPosts()
  const popularPosts = posts.filter(post => post.featured).slice(0, 3)

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Blog de Seguridad y Criptomonedas</h1>
            <p className="text-xl text-muted-foreground">
              Artículos, guías y noticias sobre seguridad cibernética, encriptación y el mundo crypto.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Error al cargar el blog</h1>
            <p className="text-xl text-muted-foreground mb-8">{error}</p>
            <Button onClick={() => window.location.reload()}>Intentar de nuevo</Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      <SeoPage
        title="Blog de Seguridad y Criptomonedas | TecnoCrypter"
        description="Artículos sobre seguridad cibernética, encriptación y criptomonedas. Mantente actualizado con las últimas tendencias y mejores prácticas en el mundo de la tecnología y la seguridad digital."
        slug="blog"
        image="tecnocrypter-web\public\Seo\blog.webp"
        keywords="seguridad cibernética, encriptación, criptomonedas, blockchain, privacidad digital, tecnología, hacking ético"
      />
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Blog de Seguridad y Criptomonedas</h1>
            <p className="text-xl text-muted-foreground">
              Artículos, guías y noticias sobre seguridad cibernética, encriptación y el mundo crypto.
            </p>
          </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar artículos..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left py-2 px-3 rounded-md hover:bg-muted transition-colors ${
                      selectedCategory === category.id ? 'bg-muted font-medium' : ''
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Artículos Populares</h3>
              <div className="space-y-4">
                {popularPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(post.date).toLocaleDateString()}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
              <TabsList>
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.length === 0 ? (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {searchQuery ? `No se encontraron artículos para "${searchQuery}"` : 'No hay artículos en esta categoría'}
                  </p>
                </div>
              ) : (
                filteredPosts.map((post) => (
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
                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <div className="flex justify-between items-center w-full">
                          <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</span>
                          <Button variant="ghost" size="sm" className="text-xs pointer-events-none">
                            Leer más
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline">Cargar Más Artículos</Button>
            </div>
          </div>
        </div>
      </div>
      
      <ReusableFaqSection 
        title="Preguntas Frecuentes sobre el Blog"
        description="Respuestas a las preguntas más comunes sobre nuestro blog de ciberseguridad."
        faqs={blogFaqs}
      />
    </main>
    </>
  )
}
