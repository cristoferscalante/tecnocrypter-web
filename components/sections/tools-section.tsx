"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Key, ImageIcon, ArrowRight, Shield, Search } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function ToolsSection() {
  const tools = [
    {
      icon: Key,
      image: "/images/32.png",
      title: "Generador de Contraseñas",
      description: "Crea contraseñas seguras y personalizables con opciones avanzadas de configuración.",
      href: "/tools/generador-contrasenas",
      badge: "Gratis",
      features: ["Múltiples opciones", "Verificación de seguridad", "Sin almacenamiento"]
    },
    {
      icon: ImageIcon,
      image: "/images/33.png",
      title: "Limpiador de Metadatos",
      description: "Elimina metadatos EXIF y GPS de tus imágenes para proteger tu privacidad.",
      href: "/tools/limpia-metadatos",
      badge: "Nuevo",
      features: ["Procesamiento local", "Múltiples formatos", "Sin subida a servidor"]
    },
    {
      icon: Search,
      image: "/images/34.png",
      title: "Verificador de URL",
      description: "Analiza la seguridad de URLs y detecta posibles amenazas antes de visitarlas.",
      href: "/tools/verificador",
      badge: "Beta",
      features: ["Análisis en tiempo real", "Detección de malware", "Reporte detallado"]
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-background/5 to-background/10">
      <div className="container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              whileHover={{
                scale: 1.2,
                rotate: [0, -15, 15, 0],
                filter: "drop-shadow(0 0 10px hsl(var(--primary)))"
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut"
              }}
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold">Herramientas de Seguridad</h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Utiliza nuestras herramientas gratuitas para mejorar tu seguridad digital y proteger tu privacidad en línea.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <AnimatedSection
              key={index}
              delay={0.2 * index}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/20 flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center mb-4">
                    <Link href={tool.href}>
                      <motion.div
                        className="mb-4 cursor-pointer"
                        whileHover={{
                          scale: 1.1,
                          rotate: tool.title === "Generador de Contraseñas" ? [0, 360] :
                                  tool.title === "Limpiador de Metadatos" ? { y: [0, -8, 0] } :
                                  tool.title === "Verificador de URL" ? { scale: [1, 1.3, 1] } : {}
                        }}
                        transition={{
                          duration: tool.title === "Generador de Contraseñas" ? 0.8 : 0.6,
                          ease: "easeInOut",
                          repeat: tool.title === "Verificador de URL" ? 1 : 0
                        }}
                      >
                        <Image
                       src={tool.image}
                       alt={tool.title}
                       width={120}
                       height={120}
                       className="w-32 h-32 object-contain"
                     />
                      </motion.div>
                    </Link>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors text-center">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-base text-center">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col justify-end">
                  <div className="space-y-4">
                    <Button asChild className="w-full group/btn">
                      <Link href={tool.href}>
                        Usar Herramienta
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6} className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Necesitas más herramientas de seguridad?
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/contacto">
              Solicitar Nueva Herramienta
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}