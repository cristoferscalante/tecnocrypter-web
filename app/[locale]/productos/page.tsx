"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ShoppingCart, Filter, Star } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { ProductService } from "@/services/product-service"
import { ReusableFaqSection } from "@/components/sections/reusable-faq-section"
import type { Product } from "@/types"
import { useTranslations } from "next-intl"

const getTranslationKey = (name: string) => {
  if (name.includes("Desarrollo Web") || name.includes("Web y Aplicaciones")) return "web_dev";
  if (name.includes("Seguridad Digital")) return "sec_training";
  if (name.includes("IA Segura")) return "ai_training";
  if (name.includes("Prevención de Ataques") || name.includes("Prevención")) return "attack_prevention";
  if (name.includes("Respuesta Rápida") || name.includes("Respuesta")) return "incident_response";
  return null;
}

export default function ProductosPage() {
  const t = useTranslations("products")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])
  
  const categories = [
    { id: "todos", name: t("filters.all") },
    { id: "web-development", name: t("filters.webDevelopment") },
    { id: "security-training", name: t("filters.securityTraining") },
    { id: "ai-training", name: t("filters.aiTraining") },
    { id: "cybersecurity", name: t("filters.cybersecurity") },
    { id: "incident-response", name: t("filters.incidentResponse") },
  ]


  const vendors = [
    { id: "V1tr0", name: "V1tr0" },
    { id: "TecnoCrypter", name: "TecnoCrypter" },
  ]


  const handleVendorChange = (vendorId: string) => {
    setSelectedVendors(prev =>
      prev.includes(vendorId)
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    )
  }

  const clearFilters = () => {
    setSelectedCategory("todos")
    setSelectedVendors([])
    setSearchQuery("")
  }

  // FAQ específicas para productos
  const productFaqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") },
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
    
    // Filtro de proveedor
    const matchesVendor = selectedVendors.length === 0 || selectedVendors.includes(product.vendor)
    
    return matchesSearch && matchesCategory && matchesVendor
  })

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">{t("heading.title")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("heading.description")}
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">{t("heading.title")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("heading.description")}
            </p>
          </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-1/4 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t("filters.search")} 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{t("filters.title")}</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={clearFilters}>
                  {t("empty.clear")}
                </Button>
              </div>

              <Accordion type="multiple" className="w-full">
                <AccordionItem value="category">
                  <AccordionTrigger className="py-2">{t("filters.category")}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category.id}`} 
                            checked={selectedCategory === category.id}
                            onCheckedChange={() => setSelectedCategory(category.id)}
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 animate-none select-none cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="vendor">
                  <AccordionTrigger className="py-2">{t("filters.vendor")}</AccordionTrigger>
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
                    <SelectValue placeholder={t("filters.sortBy")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">{t("filters.sortPopular")}</SelectItem>
                    <SelectItem value="newest">{t("filters.sortNewest")}</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md group">
                  <Link href={`/productos/${product.id}`} className="block overflow-hidden">
                    <div className="aspect-video relative bg-muted">
                      <img
                        src={product.images[0]?.url || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-background/50">
                          {product.category}
                        </Badge>
                        {product.is_featured && (
                          <Badge className="bg-primary hover:bg-primary/90">{t("card.featured")}</Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                        4.8
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 mt-3 hover:text-primary transition-colors">
                      <Link href={`/productos/${product.id}`}>
                        {getTranslationKey(product.name) && t.has(`dbMapping.${getTranslationKey(product.name) as string}.name`) 
                          ? t(`dbMapping.${getTranslationKey(product.name) as string}.name`) 
                          : product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {getTranslationKey(product.name) && t.has(`dbMapping.${getTranslationKey(product.name) as string}.description`) 
                        ? t(`dbMapping.${getTranslationKey(product.name) as string}.description`) 
                        : product.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-primary/5">
                          {feature}
                        </Badge>
                      ))}
                      {product.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          {t("card.moreFeatures", { count: product.features.length - 2 })}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 mt-auto">
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <Button asChild size="sm" variant="default" className="w-full font-semibold">
                        <Link href={`/productos/${product.id}`}>
                          {t("card.viewDetails")}
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="w-full border-green-500/30 hover:bg-green-500/10 hover:text-green-500 text-green-600 dark:text-green-400">
                        <Link 
                          href={`https://wa.me/573228836494?text=${encodeURIComponent(
                            t("card.whatsappMessage") + " " + 
                            (getTranslationKey(product.name) && t.has(`dbMapping.${getTranslationKey(product.name) as string}.name`) 
                              ? t(`dbMapping.${getTranslationKey(product.name) as string}.name`) 
                              : product.name)
                          )}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center justify-center gap-1"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.284 1.447 5.361 1.448 5.4 0 9.79-4.385 9.793-9.772a9.697 9.697 0 0 0-2.87-6.916A9.684 9.684 0 0 0 12.01 1.18c-5.4 0-9.793 4.386-9.796 9.774-.001 2.052.493 3.655 1.472 5.29L2.68 21.23l5.006-1.314zM16.5 13.56c-.235-.118-1.393-.688-1.608-.767-.215-.078-.372-.118-.529.117-.157.235-.607.767-.744.922-.137.156-.274.176-.51.059a9.552 9.552 0 0 1-2.91-1.796c-.84-.748-1.407-1.672-1.572-1.957-.165-.284-.018-.438.12-.576.123-.124.274-.323.411-.484.137-.16.183-.274.274-.457.09-.182.046-.343-.023-.48-.069-.138-.529-1.272-.725-1.745-.19-.46-.382-.397-.529-.404-.137-.007-.294-.007-.451-.007-.157 0-.411.059-.626.294-.215.235-.822.802-.822 1.957s.84 2.27 1.057 2.564c.215.294 1.654 2.525 4.007 3.54.56.242.996.386 1.337.495.563.18 1.076.155 1.482.094.453-.068 1.393-.568 1.59-.1117.195-.55.195-1.02.137-1.1-.059-.08-.215-.118-.45-.236z"/>
                          </svg>
                          WhatsApp
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline">{t("loadMore")}</Button>
            </div>
          </div>
        </div>
      </div>
      
      <ReusableFaqSection 
        title={t("faq.title")}
        description={t("faq.description")}
        faqs={productFaqs}
      />
    </main>
    </>
  )
}
