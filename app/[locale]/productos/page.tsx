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
import { ReusableFaqSection } from "@/components/sections/reusable-faq-section"
import type { Product } from "@/types"


export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])
  
  const categories = [
    { id: "todos", name: "Todos" },
    { id: "web-development", name: "Desarrollo Web" },
    { id: "security-training", name: "Capacitaciones" },
    { id: "ai-training", name: "IA Segura" },
    { id: "cybersecurity", name: "Ciberseguridad" },
    { id: "incident-response", name: "Respuesta a Incidentes" },
  ]

  const priceRanges = [
    { id: "range-1", label: "Menos de $1,000", min: 0, max: 1000 },
    { id: "range-2", label: "$1,000 - $2,000", min: 1000, max: 2000 },
    { id: "range-3", label: "$2,000 - $4,000", min: 2000, max: 4000 },
    { id: "range-4", label: "Más de $4,000", min: 4000, max: Infinity },
  ]

  const vendors = [
    { id: "V1tr0", name: "V1tr0" },
    { id: "TecnoCrypter", name: "TecnoCrypter" },
  ]

  const handlePriceChange = (rangeId: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(rangeId)
        ? prev.filter(id => id !== rangeId)
        : [...prev, rangeId]
    )
  }

  const handleVendorChange = (vendorId: string) => {
    setSelectedVendors(prev =>
      prev.includes(vendorId)
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    )
  }

  const clearFilters = () => {
    setSelectedCategory("todos")
    setSelectedPriceRanges([])
    setSelectedVendors([])
    setSearchQuery("")
  }

  // FAQ específicas para productos
  const productFaqs = [
    {
      question: "¿Qué servicios de desarrollo web ofrecen?",
      answer: "Ofrecemos desarrollo de sitios web y aplicaciones web seguras de alta calidad, con enfoque en seguridad desde el diseño. Utilizamos las mejores prácticas de la industria y tecnologías modernas para garantizar aplicaciones robustas y protegidas."
    },
    {
      question: "¿Qué incluyen las capacitaciones de seguridad?",
      answer: "Nuestras capacitaciones cubren desde conceptos básicos de seguridad digital hasta el uso avanzado de herramientas de seguridad. Incluyen prácticas hands-on, certificados de finalización y soporte continuo después del curso."
    },
    {
      question: "¿Cómo funcionan las capacitaciones en IA segura?",
      answer: "Enseñamos a usar herramientas de inteligencia artificial de manera responsable, sin exponer datos sensibles. Aprenderás técnicas de anonimización, mejores prácticas de privacidad y cómo implementar IA en tu empresa de forma segura."
    },
    {
      question: "¿Qué incluye el servicio de prevención de ataques?",
      answer: "Incluye análisis de vulnerabilidades, implementación de medidas preventivas, monitoreo continuo, configuración de firewalls y sistemas de detección de intrusiones. Ofrecemos planes personalizados según el tamaño de tu empresa."
    },
    {
      question: "¿Cómo funciona el soporte ante ataques informáticos?",
      answer: "Ofrecemos respuesta rápida 24/7 ante incidentes de seguridad. Nuestro equipo analiza el ataque, contiene la amenaza, recupera sistemas afectados y proporciona un informe detallado con recomendaciones para prevenir futuros incidentes."
    },
    {
      question: "¿Ofrecen planes corporativos?",
      answer: "Sí, ofrecemos planes empresariales personalizados que combinan varios servicios. Contacta con nuestro equipo para una consulta gratuita y una cotización ajustada a las necesidades específicas de tu organización."
    }
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
    
    // Filtro de precio
    const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(rangeId => {
      const range = priceRanges.find(r => r.id === rangeId)
      if (!range) return false
      return product.price >= range.min && product.price < range.max
    })
    
    // Filtro de proveedor
    const matchesVendor = selectedVendors.length === 0 || selectedVendors.includes(product.vendor)
    
    return matchesSearch && matchesCategory && matchesPrice && matchesVendor
  })

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Servicios Profesionales de Seguridad Digital</h1>
            <p className="text-xl text-muted-foreground">
              Desarrollo web seguro, capacitaciones especializadas y servicios de ciberseguridad empresarial.
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
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Servicios Profesionales de Seguridad Digital</h1>
            <p className="text-xl text-muted-foreground">
              Desarrollo web seguro, capacitaciones especializadas y servicios de ciberseguridad empresarial.
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
                <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={clearFilters}>
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
                      {priceRanges.map((range) => (
                        <div key={range.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={range.id}
                            checked={selectedPriceRanges.includes(range.id)}
                            onCheckedChange={() => handlePriceChange(range.id)}
                          />
                          <label
                            htmlFor={range.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {range.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="vendor">
                  <AccordionTrigger className="py-2">Proveedor</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {vendors.map((vendor) => (
                        <div key={vendor.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`vendor-${vendor.id}`}
                            checked={selectedVendors.includes(vendor.id)}
                            onCheckedChange={() => handleVendorChange(vendor.id)}
                          />
                          <label
                            htmlFor={`vendor-${vendor.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {vendor.name}
                          </label>
                        </div>
                      ))}
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
      
      <ReusableFaqSection 
        title="Preguntas Frecuentes sobre Productos"
        description="Respuestas a las preguntas más comunes sobre nuestros productos de seguridad."
        faqs={productFaqs}
      />
    </main>
    </>
  )
}
