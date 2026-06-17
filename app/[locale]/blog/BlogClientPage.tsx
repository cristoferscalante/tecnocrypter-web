"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Search } from "lucide-react"
import { useBlog } from "@/hooks/use-blog"
import { useTranslations } from "next-intl"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export type BlogCategory = "todos" | "seguridad" | "encriptacion" | "criptomonedas" | "noticias"

type BlogClientPageProps = {
  initialCategory?: BlogCategory
  title?: string
  description?: string
  editorialIntro?: string[]
}

export default function BlogClientPage({
  initialCategory = "todos" as BlogCategory,
  title,
  description,
  editorialIntro = [],
}: BlogClientPageProps) {
  const t = useTranslations("blog.client")
  const { posts, loading, error, searchPosts } = useBlog()
  
  const categories: { id: BlogCategory; name: string }[] = useMemo(() => [
    { id: "todos", name: t("categoryAll") },
    { id: "seguridad", name: t("categorySecurity") },
    { id: "encriptacion", name: t("categoryEncryption") },
    { id: "criptomonedas", name: t("categoryCrypto") },
    { id: "noticias", name: t("categoryNews") },
  ], [t])

  const validInitial = categories.some(c => c.id === initialCategory) ? initialCategory : "todos"
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>(validInitial)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Reset page to 1 when search query or category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  // Permitir seleccionar categoría vía query (?category=seguridad) si se navega desde enlaces
  useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const qp = params.get("category") as BlogCategory | null
    if (qp && categories.find(c => c.id === qp)) {
      setSelectedCategory(qp)
      setCurrentPage(1)
    }
  }, [categories])

  const getFilteredPosts = () => {
    let filteredPosts = posts

    if (searchQuery.trim()) {
      filteredPosts = searchPosts(searchQuery)
    }

    if (selectedCategory !== "todos") {
      filteredPosts = filteredPosts.filter((post) => post.category === selectedCategory)
    }

    return filteredPosts
  }

  const filteredPosts = getFilteredPosts()
  const popularPosts = posts.filter((post) => post.featured).slice(0, 3)

  // Lógica de paginación
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)

      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 2) {
        end = 4
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3
      }

      if (start > 2) {
        pageNumbers.push("ellipsis-start")
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      if (end < totalPages - 1) {
        pageNumbers.push("ellipsis-end")
      }

      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">{t("title")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("description")}
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">{t("errorLoading")}</h1>
            <p className="text-xl text-muted-foreground mb-8">{error}</p>
            <Button onClick={() => window.location.reload()}>{t("retry")}</Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{title || t("title")}</h1>
          <p className="text-xl text-muted-foreground">
            {description || t("description")}
          </p>
        </div>

        {editorialIntro.length > 0 && (
          <section className="max-w-4xl mx-auto mb-12 rounded-lg border bg-background/70 p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {editorialIntro.map((item) => (
                <p key={item} className="text-sm leading-6 text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("searchPlaceholder")}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">{t("categories")}</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left py-2 px-3 rounded-md hover:bg-muted transition-colors ${
                      selectedCategory === category.id ? "bg-muted font-medium" : ""
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">{t("popularArticles")}</h3>
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
            <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as BlogCategory)} className="mb-8">
              <TabsList>
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="grid md:grid-cols-2 gap-6">
              {paginatedPosts.length === 0 ? (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {searchQuery ? t("noResultsFor", { query: searchQuery }) : t("noArticlesInCategory")}
                  </p>
                </div>
              ) : (
                paginatedPosts.map((post) => (
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
                            {t("readMore")}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50 select-none" : "cursor-pointer"}
                      >
                        {t("paginationPrevious")}
                      </PaginationPrevious>
                    </PaginationItem>

                    {getPageNumbers().map((page, index) => {
                      if (page === "ellipsis-start" || page === "ellipsis-end") {
                        return (
                          <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )
                      }

                      const pageNum = page as number
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(pageNum)
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50 select-none" : "cursor-pointer"}
                      >
                        {t("paginationNext")}
                      </PaginationNext>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}