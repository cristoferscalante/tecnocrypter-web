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
import { StructuredData, BreadcrumbStructuredData } from "@/components/seo/structured-data"

interface ProductPageProps {
  params: {
    id: string
  }
}

// Función para obtener el producto desde Supabase
async function getProduct(id: string): Promise<Product | null> {
  return await ProductService.getProductById(id)
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)
  
  if (!product) {
    return {
      title: "Producto no encontrado | TecnoCrypter",
      description: "El producto que buscas no existe."
    }
  }

  return {
    title: `${product.name} | TecnoCrypter`,
    description: product.description,
    openGraph: {
      title: `${product.name} | TecnoCrypter`,
      description: product.description,
      images: product.images.length > 0 ? [product.images[0].url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | TecnoCrypter`,
      description: product.description,
      images: product.images.length > 0 ? [product.images[0].url] : undefined,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <StructuredData 
        type="product" 
        data={{
          name: product.name,
          description: product.description,
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
          { name: "Inicio", url: "https://tecnocrypter.com" },
          { name: "Productos", url: "https://tecnocrypter.com/productos" },
          { name: product.name, url: `https://tecnocrypter.com/productos/${product.id}` },
        ]}
      />
      <main className="min-h-screen py-8">
        <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/productos" className="hover:text-foreground transition-colors">
            Productos
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/productos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a productos
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Galería de Imágenes */}
          <div className="space-y-4">
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Información del Producto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="capitalize">
                  {product.category}
                </Badge>
                <Badge variant="secondary">
                  {product.vendor}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-4">{product.name}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
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
              <Button className="w-full" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Comprar con Crypto
              </Button>
            </div>

            {/* Características */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Características principales
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
              <h4 className="font-medium mb-2">Información del producto</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Categoría:</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Proveedor:</span>
                  <span>{product.vendor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Entrega:</span>
                  <span>Descarga inmediata</span>
                </div>
                <div className="flex justify-between">
                  <span>Soporte:</span>
                  <span>24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Productos relacionados */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Productos relacionados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Aquí se mostrarían productos relacionados */}
            <Card className="overflow-hidden">
              <div className="aspect-video relative bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Imagen del producto</span>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2">Producto relacionado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  Descripción del producto relacionado...
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$99.99</span>
                  <Button size="sm" variant="outline">
                    Ver detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        </div>
      </main>
    </>
  )
}