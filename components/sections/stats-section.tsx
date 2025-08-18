"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function StatsSection() {
  const tools = [
    {
      badge: "Gratis",
      badgeVariant: "secondary" as const,
      name: "Generador de Contraseñas",
      description: "Crea contraseñas aleatorias y robustas con un clic. Personaliza longitud y símbolos.",
      cta: "Usar ahora",
      link: "/generador-contrasenas"
    },
    {
      badge: "Nuevo",
      badgeVariant: "default" as const,
      name: "Limpiador de Metadatos",
      description: "Elimina EXIF/GPS y propiedades de tus fotos directamente en el navegador.",
      cta: "Usar ahora",
      link: "/limpia-metadatos"
    },
    {
      badge: "Gratis",
      badgeVariant: "secondary" as const,
      name: "Verificador de URLs",
      description: "No ingreses a URLs peligrosas.",
      cta: "Probar",
      link: "/verificador"
    }
  ]

  return (
    <section className="py-20 bg-primary/5">
      <div className="container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Herramientas Gratuitas</h2>
          <p className="text-xl text-muted-foreground">
            Utilidades rápidas y seguras para tu día a día. Todo corre en tu navegador: no subimos ni guardamos tus datos.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <AnimatedSection
              key={index}
              delay={0.1 * index}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/20 flex flex-col">
                <CardHeader className="flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={tool.badgeVariant}>{tool.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 mt-auto">
                  <Button asChild className="w-full group/btn">
                    <Link href={tool.link}>
                      {tool.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
