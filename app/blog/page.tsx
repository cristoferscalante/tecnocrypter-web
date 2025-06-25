import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog | TecnoCrypter",
  description: "Artículos sobre seguridad cibernética, encriptación y criptomonedas.",
}

export default function BlogPage() {
  // Datos de ejemplo para la página
  const categories = [
    { id: "todos", name: "Todos" },
    { id: "seguridad", name: "Seguridad" },
    { id: "encriptacion", name: "Encriptación" },
    { id: "criptomonedas", name: "Criptomonedas" },
    { id: "noticias", name: "Noticias" },
  ]

  const posts = [
    {
      slug: "seguridad-blockchain",
      title: "Seguridad en la Blockchain: Protegiendo tus Activos Digitales",
      excerpt: "Descubre las mejores prácticas para mantener tus criptomonedas seguras y protegidas contra ataques.",
      date: "2025-05-20",
      author: "Ana Martínez",
      category: "seguridad",
      tags: ["blockchain", "seguridad", "criptomonedas"],
      readTime: 8,
      featured: true,
    },
    {
      slug: "encriptacion-end-to-end",
      title: "Encriptación End-to-End: La Clave para Comunicaciones Seguras",
      excerpt: "Análisis profundo de los protocolos de encriptación más seguros para tus comunicaciones diarias.",
      date: "2025-05-15",
      author: "Carlos Segura",
      category: "encriptacion",
      tags: ["encriptación", "privacidad", "comunicaciones"],
      readTime: 6,
      featured: true,
    },
    {
      slug: "tendencias-crypto-2025",
      title: "Tendencias en Criptomonedas para 2025",
      excerpt: "Las principales tendencias que definirán el mercado de criptomonedas este año.",
      date: "2025-05-10",
      author: "Elena Blockchain",
      category: "criptomonedas",
      tags: ["tendencias", "mercado", "inversiones"],
      readTime: 5,
      featured: true,
    },
    {
      slug: "ataques-phishing-avanzados",
      title: "Cómo Detectar y Prevenir Ataques de Phishing Avanzados",
      excerpt: "Guía completa para identificar y protegerte contra las técnicas de phishing más sofisticadas.",
      date: "2025-05-08",
      author: "Roberto Seguridad",
      category: "seguridad",
      tags: ["phishing", "ciberseguridad", "prevención"],
      readTime: 7,
    },
    {
      slug: "wallets-hardware",
      title: "Comparativa de Wallets Hardware: Seguridad Máxima para tus Criptomonedas",
      excerpt: "Análisis detallado de las mejores carteras hardware del mercado para almacenar tus activos digitales.",
      date: "2025-05-05",
      author: "Laura Crypto",
      category: "criptomonedas",
      tags: ["wallets", "hardware", "almacenamiento"],
      readTime: 9,
    },
    {
      slug: "zero-knowledge-proofs",
      title: "Zero-Knowledge Proofs: El Futuro de la Privacidad Digital",
      excerpt:
        "Cómo esta tecnología revolucionaria está transformando la forma en que verificamos información sin revelarla.",
      date: "2025-05-01",
      author: "Miguel Técnico",
      category: "encriptacion",
      tags: ["privacidad", "criptografía", "blockchain"],
      readTime: 10,
    },
  ]

  return (
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
              <Input placeholder="Buscar artículos..." className="pl-10" />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blog?categoria=${category.id}`}
                    className="block py-2 px-3 rounded-md hover:bg-muted transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Artículos Populares</h3>
              <div className="space-y-4">
                {posts.slice(0, 3).map((post) => (
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
            <Tabs defaultValue="todos" className="mb-8">
              <TabsList>
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Card key={post.slug} className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
                  <div className="aspect-video relative bg-muted">
                    <img
                      src={`/placeholder.svg?height=250&width=500&query=${post.title}`}
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
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</span>
                      <Button asChild variant="ghost" size="sm" className="text-xs">
                        <Link href={`/blog/${post.slug}`}>Leer más</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline">Cargar Más Artículos</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
