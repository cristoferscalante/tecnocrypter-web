"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Key, KeyRound, ArrowRight, Shield, QrCode, Lock, Binary, Type, GitCompare, Hash, FileCheck } from "lucide-react"
import { motion } from "framer-motion"

export function ToolsSection() {
  const tools = [
    {
      icon: Key,
      title: "Generador de Contraseñas",
      description: "Crea contraseñas seguras y personalizables con opciones avanzadas de configuración.",
      href: "/tools/generador-contrasenas",
    },
    {
      icon: KeyRound,
      title: "Generador de Credenciales Determinísticas",
      description: "Crea usuarios y contraseñas determinísticas desde una palabra clave maestra.",
      href: "/tools/generador-credenciales",
    },
    {
      icon: FileCheck,
      title: "Limpiador de Metadatos",
      description: "Elimina metadatos EXIF y GPS de tus imágenes para proteger tu privacidad.",
      href: "/tools/limpia-metadatos",
    },
    {
      icon: Shield,
      title: "Verificador de URL",
      description: "Analiza la seguridad de URLs y detecta amenazas antes de visitarlas.",
      href: "/tools/verificador",
    },
    {
      icon: QrCode,
      title: "Generador de QR",
      description: "Crea códigos QR personalizados con logo y colores.",
      href: "/tools/generador-qr",
    },
    {
      icon: Lock,
      title: "Cifrado Online",
      description: "Cifra y descifra mensajes de forma local en tu navegador.",
      href: "/tools/cifrado-online",
    },
    {
      icon: Binary,
      title: "Codificador Base32",
      description: "Codifica y decodifica texto y archivos en Base32.",
      href: "/tools/codificador-base32",
    },
    {
      icon: GitCompare,
      title: "Comparador de Archivos y Texto (Diff Viewer)",
      description: "Compara líneas, ignora espacios y exporta patches.",
      href: "/tools/comparador-archivos",
    },
    {
      icon: Type,
      title: "Contador de Caracteres",
      description: "Cuenta caracteres y palabras en tiempo real.",
      href: "/tools/contador-caracteres",
    },
    {
      icon: Hash,
      title: "Generador de Hash",
      description: "Calcula MD5, SHA-1, SHA-256 de texto y archivos.",
      href: "/tools/generador-hash",
    },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon
            return (
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
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-7 w-7 text-primary" />
                        </div>
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
          )})}
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