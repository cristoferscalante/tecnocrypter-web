import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "Productos | TecnoCrypter",
  description: "Productos de seguridad cibernética y encriptación con pago en criptomonedas.",
}

export default function ProductosPage() {
  // Datos de ejemplo para la página
  const categories = [
    { id: "todos", name: "Todos" },
    { id: "vpn", name: "VPN" },
    { id: "password-manager", name: "Gestores de Contraseñas" },
    { id: "encryption", name: "Encriptación" },
    { id: "security", name: "Seguridad" },
  ]

  const products = [
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
      category: "encryption",
      vendor: "SecureComm",
      features: [
        "Encriptación E2E",
        "Mensajes autodestructivos",
        "Verificación de identidad",
        "Sin almacenamiento en servidores",
      ],
      images: ["/placeholder.svg?height=300&width=500&query=Encrypted messaging app"],
    },
    {
      id: "file-encryptor-1",
      name: "FileShield Encryptor",
      description: "Software de encriptación de archivos con algoritmos de nivel militar para máxima protección.",
      price: 129.99,
      cryptoPrice: {
        btc: 0.0032,
        eth: 0.045,
        usdt: 129.99,
      },
      category: "encryption",
      vendor: "DataGuard",
      features: ["Encriptación AES-256", "Protección de contraseña", "Borrado seguro", "Integración con la nube"],
      images: ["/placeholder.svg?height=300&width=500&query=File encryption software"],
    },
    {
      id: "security-suite-1",
      name: "CryptoGuard Security Suite",
      description: "Suite completa de seguridad con antivirus, firewall, VPN y protección de identidad.",
      price: 149.99,
      cryptoPrice: {
        btc: 0.0037,
        eth: 0.052,
        usdt: 149.99,
      },
      category: "security",
      vendor: "CryptoSecure",
      features: ["Antivirus avanzado", "Firewall inteligente", "VPN integrada", "Protección de identidad"],
      images: ["/placeholder.svg?height=300&width=500&query=Security suite software"],
    },
    {
      id: "hardware-wallet-1",
      name: "CryptoVault Hardware Wallet",
      description: "Cartera hardware para almacenamiento seguro de criptomonedas con chip de seguridad EAL6+.",
      price: 199.99,
      cryptoPrice: {
        btc: 0.005,
        eth: 0.07,
        usdt: 199.99,
      },
      category: "security",
      vendor: "CryptoSecure",
      features: [
        "Chip de seguridad EAL6+",
        "Soporte para 1500+ criptomonedas",
        "Pantalla integrada",
        "Respaldo de semilla",
      ],
      images: ["/placeholder.svg?height=300&width=500&query=Hardware wallet crypto"],
    },
  ]

  return (
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
              <Input placeholder="Buscar productos..." className="pl-10" />
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
              <Tabs defaultValue="todos" className="w-full sm:w-auto">
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

            <div className="mt-8 flex justify-center">
              <Button variant="outline">Cargar Más Productos</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
