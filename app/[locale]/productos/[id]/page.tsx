import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ShoppingCart, Shield, Check, Star } from "lucide-react"
import type { Product } from "@/types"
import type { Metadata } from "next"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductService } from "@/services/product-service"
import { StructuredData, BreadcrumbStructuredData, FAQStructuredData } from "@/components/seo/structured-data"
import { getAlternateLanguages } from "@/lib/metadata"
import { getTranslations } from "next-intl/server"
import { ReusableFaqSection } from "@/components/sections/reusable-faq-section"

interface ProductPageProps {
  params: Promise<{
    locale: string
    id: string
  }>
}

const getTranslationKey = (name: string) => {
  if (name.includes("Desarrollo Web") || name.includes("Web y Aplicaciones")) return "web_dev";
  if (name.includes("Seguridad Digital")) return "sec_training";
  if (name.includes("IA Segura")) return "ai_training";
  if (name.includes("Prevención de Ataques") || name.includes("Prevención")) return "attack_prevention";
  if (name.includes("Respuesta Rápida") || name.includes("Respuesta")) return "incident_response";
  return null;
}

const getCategoryTranslation = (category: string, t: any) => {
  switch (category) {
    case "web-development": return t("filters.webDevelopment");
    case "security-training": return t("filters.securityTraining");
    case "ai-training": return t("filters.aiTraining");
    case "cybersecurity": return t("filters.cybersecurity");
    case "incident-response": return t("filters.incidentResponse");
    default: return category;
  }
}

// Función para obtener el producto desde Supabase
async function getProduct(id: string): Promise<Product | null> {
  return await ProductService.getProductById(id)
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id, locale } = await params
  const product = await getProduct(id)
  
  if (!product) {
    return {
      title: "Producto no encontrado | TecnoCrypter",
      description: "El producto que buscas no existe."
    }
  }

  const t = await getTranslations({ locale, namespace: "products" })
  const key = getTranslationKey(product.name)
  const name = key && t.has(`dbMapping.${key}.name`) ? t(`dbMapping.${key}.name`) : product.name
  const description = key && t.has(`dbMapping.${key}.description`) ? t(`dbMapping.${key}.description`) : product.description

  return {
    title: `${name} | TecnoCrypter`,
    description: description,
    openGraph: {
      title: `${name} | TecnoCrypter`,
      description: description,
      images: product.images.length > 0 ? [product.images[0].url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | TecnoCrypter`,
      description: description,
      images: product.images.length > 0 ? [product.images[0].url] : undefined,
    },
    alternates: {
      canonical: locale === "es" ? `https://tecnocrypter.com/productos/${id}` : `https://tecnocrypter.com/${locale}/productos/${id}`,
      languages: getAlternateLanguages(`productos/${id}`),
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id, locale } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: "products" })
  const key = getTranslationKey(product.name)
  const name = key && t.has(`dbMapping.${key}.name`) ? t(`dbMapping.${key}.name`) : product.name
  const description = key && t.has(`dbMapping.${key}.description`) ? t(`dbMapping.${key}.description`) : product.description
  const categoryLabel = getCategoryTranslation(product.category, t)

  // Cargar FAQs específicas del producto
  let productFaqs: Array<{ question: string; answer: string }> = []
  if (t.has(`productFaqs.${id}`)) {
    productFaqs = t.raw(`productFaqs.${id}`) as any
  }

  // Obtener productos relacionados
  let relatedProducts = await ProductService.getProductsByCategory(product.category)
  relatedProducts = relatedProducts.filter(p => p.id !== product.id).slice(0, 3)

  if (relatedProducts.length === 0) {
    const featured = await ProductService.getFeaturedProducts(4)
    relatedProducts = featured.filter(p => p.id !== product.id).slice(0, 3)
  }

  return (
    <>
      <StructuredData 
        type="product" 
        data={{
          name: name,
          description: description,
          image: product.images.length > 0 ? product.images[0].url : undefined,
          price: product.price,
          currency: "USD",
          availability: "InStock",
          brand: product.vendor,
          category: product.category,
          sku: product.id,
          features: product.features,
        }}
      />
      <BreadcrumbStructuredData 
        items={[
          { name: t("detail.home"), url: locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}` },
          { name: t("meta.title"), url: locale === "es" ? "https://tecnocrypter.com/productos" : `https://tecnocrypter.com/${locale}/productos` },
          { name: name, url: locale === "es" ? `https://tecnocrypter.com/productos/${product.id}` : `https://tecnocrypter.com/${locale}/productos/${product.id}` },
        ]}
      />
      {productFaqs.length > 0 && <FAQStructuredData faqs={productFaqs} />}
      
      <main className="min-h-screen py-8">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              {t("detail.home")}
            </Link>
            <span>/</span>
            <Link href="/productos" className="hover:text-foreground transition-colors">
              {t("detail.backToProducts")}
            </Link>
            <span>/</span>
            <span className="text-foreground">{name}</span>
          </div>

          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/productos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("detail.backToProducts")}
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Galería de Imágenes */}
            <div className="space-y-4">
              <ProductImageGallery images={product.images} productName={name} />
            </div>

            {/* Información del Producto */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="capitalize">
                    {categoryLabel}
                  </Badge>
                  <Badge variant="secondary">
                    {product.vendor}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-4">{name}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Precio */}
              <div className="border rounded-lg p-6 bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">(4.8)</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  <div className="flex justify-between">
                    <span>Bitcoin (BTC):</span>
                    <span className="font-mono">{product.crypto_price_btc.toFixed(6)} BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ethereum (ETH):</span>
                    <span className="font-mono">{product.crypto_price_eth.toFixed(4)} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tether (USDT):</span>
                    <span className="font-mono">{product.crypto_price_usdt.toFixed(2)} USDT</span>
                  </div>
                </div>
                <Button className="w-full font-semibold" size="lg" asChild>
                  <Link href={`https://wa.me/573228836494?text=${encodeURIComponent(t("card.whatsappMessage") + " " + name)}`} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {t("payWith")}
                  </Link>
                </Button>
              </div>

              {/* Características */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {t("detail.mainFeatures")}
                </h3>
                <div className="grid gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Información adicional */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <h4 className="font-medium mb-2">{t("detail.productInfo")}</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>{t("detail.category")}:</span>
                    <span className="capitalize">{categoryLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("detail.vendor")}:</span>
                    <span>{product.vendor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("detail.delivery")}:</span>
                    <span>{t("detail.instantDelivery")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("detail.support")}:</span>
                    <span>{t("detail.support247")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-12" />

          {/* FAQs de este producto */}
          {productFaqs.length > 0 && (
            <div className="mb-12">
              <ReusableFaqSection 
                title={t("faq.title")} 
                description={t("faq.description")} 
                faqs={productFaqs} 
              />
              <Separator className="my-12" />
            </div>
          )}

          {/* Productos relacionados */}
          {relatedProducts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-6">{t("detail.relatedProducts")}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relProduct) => {
                  const relKey = getTranslationKey(relProduct.name)
                  const relName = relKey && t.has(`dbMapping.${relKey}.name`) ? t(`dbMapping.${relKey}.name`) : relProduct.name
                  const relDesc = relKey && t.has(`dbMapping.${relKey}.description`) ? t(`dbMapping.${relKey}.description`) : relProduct.description
                  
                  return (
                    <Card key={relProduct.id} className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md group">
                      <Link href={`/productos/${relProduct.id}`} className="block overflow-hidden">
                        <div className="aspect-video relative bg-muted">
                          <img
                            src={relProduct.images[0]?.url || "/placeholder.svg"}
                            alt={relName}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                      <CardHeader className="pb-2">
                        <CardTitle className="line-clamp-2 text-lg hover:text-primary transition-colors">
                          <Link href={`/productos/${relProduct.id}`}>
                            {relName}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow">
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {relDesc}
                        </p>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="font-bold">${relProduct.price.toFixed(2)}</span>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/productos/${relProduct.id}`}>
                              {t("detail.viewDetails")}
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  )
}