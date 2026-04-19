"use client"

import React, { useState, useRef, useCallback } from "react"
import { QRCode } from "react-qrcode-logo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolSeoSection } from './tool-seo-section'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { QrCode, Download, Image, Palette, RefreshCw, Info } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function QrGeneratorClient() {
  const { toast } = useToast()
  const [text, setText] = useState("")
  const [qrSize, setQrSize] = useState(250)
  const [qrColor, setQrColor] = useState("#000000")
  const [qrBgColor, setQrBgColor] = useState("#FFFFFF")
  const [qrBorderColor, setQrBorderColor] = useState("#000000")
  const [logoImage, setLogoImage] = useState<string | null>(null)
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<"L" | "M" | "Q" | "H">("M")
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const qrRef = useRef<HTMLDivElement>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tamaño (max 1MB)
    if (file.size > 1024 * 1024) {
      toast({
        title: "Error",
        description: "El logo no debe superar 1MB",
        variant: "destructive",
      })
      return
    }

    // Validar tipo
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "El archivo debe ser una imagen",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setLogoImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setLogoImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const downloadQR = useCallback(() => {
    if (!qrRef.current) return

    const canvas = qrRef.current.querySelector("canvas")
    if (!canvas) return

    const link = document.createElement("a")
    link.download = `tecnocrypter-qr-${Date.now()}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()

    toast({
      title: "QR descargado",
      description: "El código QR se ha descargado correctamente",
    })
  }, [toast])

  const features = [
    {
      icon: QrCode,
      title: "Personalización Completa",
      description: "Colores, tamaño y logo personalizable",
    },
    {
      icon: Palette,
      title: "Diseño Flexible",
      description: "Ajusta colores y bordes a tu gusto",
    },
    {
      icon: Download,
      title: "Descarga Inmediata",
      description: "Exporta en alta calidad para usar donde quieras",
    },
  ]

  return (
    <div className="min-h-screen py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background/20 via-background/10 to-primary/5 py-16 flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col items-center gap-8">
            <motion.div
              className="flex-1 text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Generador de Códigos QR
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Crea códigos QR personalizados para enlaces, textos y más. Personaliza colores, 
                tamaño y añade tu logo para crear QRs únicos y profesionales.
              </motion.p>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-3 gap-6 pt-8 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-background/50 backdrop-blur-sm border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="p-3 rounded-full bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Herramienta Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="w-full max-w-4xl mx-auto space-y-8">
            {/* Generador Principal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  Generador de Códigos QR
                </CardTitle>
                <CardDescription>
                  Crea códigos QR personalizados para enlaces, textos y más
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Básico</TabsTrigger>
                    <TabsTrigger value="advanced">Avanzado</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4 pt-4">
                    {/* Texto/URL */}
                    <div className="space-y-2">
                      <Label htmlFor="qr-text">URL o Texto</Label>
                      <Input
                        id="qr-text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="https://ejemplo.com o texto"
                      />
                    </div>

                    {/* Tamaño */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Tamaño del QR</Label>
                        <Badge variant="outline">{qrSize}px</Badge>
                      </div>
                      <Slider
                        value={[qrSize]}
                        onValueChange={(value) => setQrSize(value[0])}
                        max={500}
                        min={100}
                        step={10}
                        className="w-full"
                      />
                    </div>

                    {/* Color */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="qr-color">Color del QR</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-10 h-10 rounded-md border" 
                            style={{ backgroundColor: qrColor }}
                          />
                          <Input
                            id="qr-color"
                            type="color"
                            value={qrColor}
                            onChange={(e) => setQrColor(e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="qr-bg-color">Color de fondo</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-10 h-10 rounded-md border" 
                            style={{ backgroundColor: qrBgColor }}
                          />
                          <Input
                            id="qr-bg-color"
                            type="color"
                            value={qrBgColor}
                            onChange={(e) => setQrBgColor(e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4 pt-4">
                    {/* Color del borde */}
                    <div className="space-y-2">
                      <Label htmlFor="qr-border-color">Color del borde</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-10 h-10 rounded-md border" 
                          style={{ backgroundColor: qrBorderColor }}
                        />
                        <Input
                          id="qr-border-color"
                          type="color"
                          value={qrBorderColor}
                          onChange={(e) => setQrBorderColor(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Logo */}
                    <div className="space-y-2">
                      <Label htmlFor="qr-logo">Subir Logo (opcional, max 1MB)</Label>
                      <div className="flex gap-2">
                        <Input
                          id="qr-logo"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          ref={fileInputRef}
                          className="w-full"
                        />
                        {logoImage && (
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={removeLogo}
                            className="flex-shrink-0"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Nivel de corrección de errores */}
                    <div className="space-y-2">
                      <Label>Nivel de corrección de errores</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['L', 'M', 'Q', 'H'] as const).map((level) => (
                          <Button
                            key={level}
                            variant={errorCorrectionLevel === level ? "default" : "outline"}
                            onClick={() => setErrorCorrectionLevel(level)}
                            className="w-full"
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        L: 7% | M: 15% | Q: 25% | H: 30% (mayor nivel = mejor corrección de errores)
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <Separator />

                {/* Vista previa y descarga */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                  <div 
                    ref={qrRef} 
                    className="p-4 rounded-lg border bg-white flex items-center justify-center"
                    style={{ backgroundColor: qrBgColor }}
                  >
                    <QRCode
                      value={text || "https://tecnocrypter.com"}
                      size={qrSize}
                      fgColor={qrColor}
                      bgColor={qrBgColor}
                      logoImage={logoImage || undefined}
                      logoWidth={qrSize * 0.2}
                      logoHeight={qrSize * 0.2}
                      qrStyle="dots"
                      eyeRadius={5}
                      quietZone={10}
                      removeQrCodeBehindLogo={true}
                      logoPadding={5}
                      logoPaddingStyle="circle"
                      ecLevel={errorCorrectionLevel}
                      enableCORS={true}
                    />
                  </div>

                  <div className="space-y-4">
                    <Button 
                      onClick={downloadQR} 
                      className="w-full md:w-auto flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Descargar QR
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      El código QR se descargará como imagen PNG
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Panel Informativo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  Información sobre Códigos QR
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">¿Qué son los códigos QR?</h4>
                    <p className="text-sm text-muted-foreground">
                      Los códigos QR (Quick Response) son códigos de barras bidimensionales que pueden ser escaneados 
                      por dispositivos móviles para acceder rápidamente a información, sitios web, contactos y más.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Usos comunes</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Enlaces a sitios web y redes sociales</li>
                      <li>• Información de contacto (vCard)</li>
                      <li>• Menús digitales en restaurantes</li>
                      <li>• Pagos móviles y transacciones</li>
                      <li>• Acceso a eventos y boletos</li>
                    </ul>
                  </div>
                </div>
                
                <Separator />
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    💡 Consejo de seguridad
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Al escanear códigos QR de fuentes desconocidas, verifica siempre la URL antes de acceder. 
                    Los códigos QR pueden dirigir a sitios maliciosos o de phishing. Utiliza un escáner de QR 
                    que muestre la URL antes de abrirla.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ToolSeoSection
        title="Generador de Códigos QR Online: Crea QR Personalizados"
        paragraphs={[
          "Los códigos QR son la forma más rápida de compartir URLs, textos, datos de contacto WiFi y cualquier información. Nuestro generador QR online permite crear códigos personalizados con colores, logos y múltiples formatos de descarga.",
          "Ideal para marketing digital, menús de restaurantes, tarjetas de presentación, empaques de productos, campañas publicitarias y cualquier escenario donde necesites conectar el mundo físico con contenido digital.",
          "Los códigos QR incluyen corrección de errores Reed-Solomon que permite escanearlos incluso si están parcialmente dañados u obstruidos por un logo. Genera en PNG o SVG para máxima versatilidad."
        ]}
        howTo={[
          { step: "Introduce el contenido", description: "Escribe la URL, texto, datos WiFi o cualquier información que quieras codificar." },
          { step: "Personaliza el diseño", description: "Elige colores, añade un logo central y ajusta el nivel de corrección de errores." },
          { step: "Descarga tu QR", description: "Descarga en formato PNG para impresión o SVG para escalado sin pérdida." },
        ]}
        faqs={[
          { question: "¿Cuánta información cabe en un QR?", answer: "Un código QR puede almacenar hasta 4,296 caracteres alfanuméricos o 7,089 dígitos numéricos. Para URLs, se recomienda usar acortadores si la URL supera los 300 caracteres para mantener un QR fácilmente escaneable." },
          { question: "¿PNG o SVG para imprimir?", answer: "SVG para impresión profesional: se escala a cualquier tamaño sin perder calidad. PNG es mejor para uso digital (web, redes sociales, emails) donde necesitas un formato de imagen rasterizado." },
          { question: "¿El logo afecta al escaneo?", answer: "Con nivel de corrección de errores H (High, 30%), el QR soporta que hasta un 30% de los datos estén ocultos por un logo central. Nuestro generador ajusta automáticamente para garantizar la escaneabilidad." },
        ]}
        relatedTools={[
          { name: "Codificador URL", href: "/tools/codificador-url" },
          { name: "Cifrado Online", href: "/tools/cifrado-online" },
          { name: "Conversor Base64", href: "/tools/conversor-base64" },
          { name: "Limpiador de Metadatos", href: "/tools/limpia-metadatos" },
        ]}
      />
    </div>
  )
}