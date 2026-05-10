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
import { useTranslations } from "next-intl"

const getTranslationKey = (name: string) => {
  if (name.includes("Desarrollo Web")) return "web_dev";
  if (name.includes("Seguridad Digital")) return "sec_training";
  if (name.includes("IA Segura")) return "ai_training";
  return null;
}

export default function ProductosPage() {
  const t = useTranslations("products")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])
  
  const categories = [
    { id: "todos", name: t("filters.all") },
    { id: "web-development", name: t("filters.webDevelopment") },
    { id: "security-training", name: t("filters.securityTraining") },
    { id: "ai-training", name: t("filters.aiTraining") },
    { id: "cybersecurity", name: t("filters.cybersecurity") },
    { id: "incident-response", name: t("filters.incidentResponse") },
  ]

  const priceRanges = [
    { id: "range-1", label: t("filters.priceRange1"), min: 0, max: 1000 },
    { id: "range-2", label: t("filters.priceRange2"), min: 1000, max: 2000 },
    { id: "range-3", label: t("filters.priceRange3"), min: 2000, max: 4000 },
    { id: "range-4", label: t("filters.priceRange4"), min: 4000, max: Infinity },
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
                  <AccordionTrigger className="py-2">{t("filters.price")}</AccordionTrigger>
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
                    <SelectItem value="price-low">{t("filters.sortPriceLow")}</SelectItem>
                    <SelectItem value="price-high">{t("filters.sortPriceHigh")}</SelectItem>
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
                <Card key={product.id} className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
                  <div className="aspect-video relative bg-muted">
                    <img
                      src={product.images[0]?.url || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
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
                        {product.rating}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 mt-3 group-hover:text-primary transition-colors">
                      {getTranslationKey(product.name) && t.has(`dbMapping.${getTranslationKey(product.name) as string}.name`) 
                        ? t(`dbMapping.${getTranslationKey(product.name) as string}.name`) 
                        : product.name}
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
                  <CardFooter className="pt-2 flex-col items-start gap-2">
                    <div className="flex justify-center items-center w-full">
                      <Button asChild size="sm" className="w-full">
                        <Link href={`https://wa.me/15551234567?text=${encodeURIComponent(t("card.whatsappMessage") + " " + product.name)}`} target="_blank" rel="noopener noreferrer">
                          {t("card.contactSupport")}
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
