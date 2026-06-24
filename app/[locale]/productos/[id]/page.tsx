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

              {/* Contacto / Soporte */}
              <div className="border rounded-lg p-6 bg-muted/30">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-semibold">{t("card.contactSupport")}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">(4.8)</span>
                  </div>
                </div>
                <Button className="w-full font-semibold bg-green-600 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-700 border-none" size="lg" asChild>
                  <Link href={`https://wa.me/573228836494?text=${encodeURIComponent(t("card.whatsappMessage") + " " + name)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.284 1.447 5.361 1.448 5.4 0 9.79-4.385 9.793-9.772a9.697 9.697 0 0 0-2.87-6.916A9.684 9.684 0 0 0 12.01 1.18c-5.4 0-9.793 4.386-9.796 9.774-.001 2.052.493 3.655 1.472 5.29L2.68 21.23l5.006-1.314zM16.5 13.56c-.235-.118-1.393-.688-1.608-.767-.215-.078-.372-.118-.529.117-.157.235-.607.767-.744.922-.137.156-.274.176-.51.059a9.552 9.552 0 0 1-2.91-1.796c-.84-.748-1.407-1.672-1.572-1.957-.165-.284-.018-.438.12-.576.123-.124.274-.323.411-.484.137-.16.183-.274.274-.457.09-.182.046-.343-.023-.48-.069-.138-.529-1.272-.725-1.745-.19-.46-.382-.397-.529-.404-.137-.007-.294-.007-.451-.007-.157 0-.411.059-.626.294-.215.235-.822.802-.822 1.957s.84 2.27 1.057 2.564c.215.294 1.654 2.525 4.007 3.54.56.242.996.386 1.337.495.563.18 1.076.155 1.482.094.453-.068 1.393-.568 1.59-.1117.195-.55.195-1.02.137-1.1-.059-.08-.215-.118-.45-.236z"/>
                    </svg>
                    WhatsApp
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
                        <div className="flex justify-end items-center mt-auto w-full">
                          <Button size="sm" variant="outline" className="w-full" asChild>
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