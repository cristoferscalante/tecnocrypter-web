"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Key, ImageIcon, ArrowRight, Shield, Search } from "lucide-react"

export function ToolsSection() {
  const tools = [
    {
      icon: Key,
      title: "Generador de Contraseñas",
      description: "Crea contraseñas seguras y personalizables con opciones avanzadas de configuración.",
      href: "/tools/generador-contrasenas",
      badge: "Gratis",
      features: ["Múltiples opciones", "Verificación de seguridad", "Sin almacenamiento"]
    },
    {
      icon: ImageIcon,
      title: "Limpiador de Metadatos",
      description: "Elimina metadatos EXIF y GPS de tus imágenes para proteger tu privacidad.",
      href: "/tools/limpia-metadatos",
      badge: "Nuevo",
      features: ["Procesamiento local", "Múltiples formatos", "Sin subida a servidor"]
    },
    {
      icon: Search,
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
            <Shield className="h-8 w-8 text-primary" />
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
                  <div className="flex items-start justify-between mb-4">
                    <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge 
                      variant={tool.badge === "Nuevo" ? "default" : "secondary"}
                      className={tool.badge === "Nuevo" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {tool.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col justify-end">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {tool.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
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