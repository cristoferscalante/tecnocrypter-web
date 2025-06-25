"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingCart } from "lucide-react"
import type { Product } from "@/types"

export function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        // En un entorno real, esto vendría de la API
        // Simulamos datos para la preview
        setProducts([
          {
            id: "secure-vpn-1",
            name: "SecureVPN Premium",
            description: "VPN de alta seguridad con encriptación de grado militar y política de no logs.",
            price: 99.99,
            cryptoPrice: {
              btc: 0.0025,
              eth: 0.035,
              usdt: 99.99,
            },
            category: "vpn",
            vendor: "CryptoSecure",
            features: ["Encriptación AES-256", "Sin logs", "Servidores en 90 países", "Hasta 10 dispositivos"],
            images: ["/placeholder.svg?height=300&width=500&query=VPN secure connection"],
          },
          {
            id: "password-manager-1",
            name: "CryptoPass Manager",
            description: "Gestor de contraseñas con encriptación de extremo a extremo y generador de claves seguras.",
            price: 79.99,
            cryptoPrice: {
              btc: 0.002,
              eth: 0.028,
              usdt: 79.99,
            },
            category: "password-manager",
            vendor: "CryptoSecure",
            features: [
              "Encriptación Zero-Knowledge",
              "Autenticación 2FA",
              "Sincronización en la nube",
              "Alertas de seguridad",
            ],
            images: ["/placeholder.svg?height=300&width=500&query=Password manager secure vault"],
          },
          {
            id: "secure-messenger-1",
            name: "SecureChat Messenger",
            description: "Mensajería instantánea con encriptación de extremo a extremo y mensajes autodestructivos.",
            price: 49.99,
            cryptoPrice: {
              btc: 0.0012,
              eth: 0.018,
              usdt: 49.99,
            },
            category: "messaging",
            vendor: "SecureComm",
            features: [
              "Encriptación E2E",
              "Mensajes autodestructivos",
              "Verificación de identidad",
              "Sin almacenamiento en servidores",
            ],
            images: ["/placeholder.svg?height=300&width=500&query=Encrypted messaging app"],
          },
        ])
      } catch (error) {
        console.error("Error cargando productos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="container py-16 bg-muted/30">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
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
      </section>
    )
  }

  return (
    <section className="container py-16 bg-muted/30">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Productos Destacados</h2>
        <Button asChild variant="ghost" className="group">
          <Link href="/productos">
            Ver todos
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
            <div className="aspect-video relative bg-muted">
              <img
                src={product.images[0] || "/placeholder.svg"}
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
                    {product.cryptoPrice.btc.toFixed(4)} BTC / {product.cryptoPrice.eth.toFixed(3)} ETH
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
    </section>
  )
}
