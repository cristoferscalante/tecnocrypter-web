"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ShoppingCart, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { ProductService } from "@/services/product-service"
import type { Product } from "@/types"
import SeoPage from "@/components/seo/SeoPage"

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const categories = [
    { id: "todos", name: "Todos" },
    { id: "vpn", name: "VPN" },
    { id: "password-manager", name: "Gestores de Contraseñas" },
    { id: "encryption", name: "Encriptación" },
    { id: "security", name: "Seguridad" },
  ]

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await ProductService.getAllProducts()
        setProducts(productsData)
      } catch (error) {
        console.error("Error cargando productos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Productos de Seguridad y Encriptación</h1>
            <p className="text-xl text-muted-foreground">
              Soluciones avanzadas para proteger tus activos digitales con pago en criptomonedas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-48 bg-muted" />
                <CardContent className="space-y-2 pt-6">
                  <div className="h-6 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      <SeoPage
        title="Productos de Seguridad Digital | TecnoCrypter"
        description="Descubre nuestros productos especializados en seguridad digital, encriptación y protección de datos. Herramientas profesionales para mantener tu información segura."
        slug="productos"
        image="https://tecnocrypter.com/seo/productos.webp"
        keywords="productos seguridad, herramientas encriptación, software protección datos, seguridad digital, ciberseguridad"
      />
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Productos de Seguridad y Encriptación</h1>
            <p className="text-xl text-muted-foreground">
              Soluciones avanzadas para proteger tus activos digitales con pago en criptomonedas.
            </p>
          </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-1/4 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar productos..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Filtros</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Limpiar
                </Button>
              </div>

              <Accordion type="multiple" className="w-full">
                <AccordionItem value="category">
                  <AccordionTrigger className="py-2">Categoría</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox id={`category-${category.id}`} />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger className="py-2">Precio</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price-1" />
                        <label
                          htmlFor="price-1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Menos de $50
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price-2" />
                        <label
                          htmlFor="price-2"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          $50 - $100
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price-3" />
                        <label
                          htmlFor="price-3"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          $100 - $200
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price-4" />
                        <label
                          htmlFor="price-4"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Más de $200
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="vendor">
                  <AccordionTrigger className="py-2">Proveedor</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="vendor-1" />
                        <label
                          htmlFor="vendor-1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          CryptoSecure
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="vendor-2" />
                        <label
                          htmlFor="vendor-2"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          SecureComm
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="vendor-3" />
                        <label
                          htmlFor="vendor-3"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          DataGuard
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
                <TabsList>
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select defaultValue="featured">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Destacados</SelectItem>
                    <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                    <SelectItem value="newest">Más Recientes</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
                  <div className="aspect-video relative bg-muted">
                    <img
                      src={product.images[0]?.url || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {product.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {product.vendor}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">
                      <Link href={`/productos/${product.id}`} className="hover:text-primary transition-colors">
                        {product.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <p className="text-muted-foreground line-clamp-3 mb-4">{product.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-primary/5">
                          {feature}
                        </Badge>
                      ))}
                      {product.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.features.length - 2} más
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex-col items-start gap-2">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground">
                          {product.crypto_price_btc.toFixed(4)} BTC / {product.crypto_price_eth.toFixed(3)} ETH
                        </span>
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/productos/${product.id}`}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Comprar
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline">Cargar Más Productos</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
