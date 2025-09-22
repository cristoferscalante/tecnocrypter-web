"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Key, FileCheck, ArrowRight, QrCode } from "lucide-react"
import SeoPage from "@/components/seo/SeoPage"
import { ReusableFaqSection } from "@/components/sections/reusable-faq-section"

const tools = [
  {
    title: "Generador de Contraseñas",
    description: "Genera contraseñas seguras y personalizables con diferentes niveles de complejidad.",
    href: "/tools/generador-contrasenas",
    icon: Key,
    category: "Seguridad"
  },
  {
    title: "Limpiador de Metadatos",
    description: "Elimina metadatos sensibles de tus archivos para proteger tu privacidad.",
    href: "/tools/limpia-metadatos",
    icon: FileCheck,
    category: "Privacidad"
  },
  {
    title: "Verificador de Seguridad",
    description: "Analiza y verifica la seguridad de URLs, archivos y sistemas.",
    href: "/tools/verificador",
    icon: Shield,
    category: "Análisis"
  },
  {
    title: "Generador de Códigos QR",
    description: "Crea códigos QR personalizados para enlaces, textos y contactos con opciones de personalización.",
    href: "/tools/generador-qr",
    icon: QrCode,
    category: "Utilidades"
  }
]

// FAQ específicas para tools
const toolsFaqs = [
  {
    question: "¿Las herramientas son completamente gratuitas?",
    answer: "Sí, todas nuestras herramientas básicas son completamente gratuitas y no requieren registro. Algunas funciones avanzadas pueden requerir una cuenta premium, pero las funcionalidades principales están disponibles sin costo."
  },
  {
    question: "¿Mis datos se almacenan en sus servidores?",
    answer: "No, la mayoría de nuestras herramientas procesan los datos localmente en tu navegador por seguridad. Los datos no se envían a nuestros servidores, garantizando tu privacidad y confidencialidad."
  },
  {
    question: "¿Puedo usar las herramientas sin conexión a internet?",
    answer: "Algunas herramientas como el generador de contraseñas funcionan completamente offline una vez cargadas. Otras que requieren verificaciones en tiempo real necesitan conexión a internet."
  },
  {
    question: "¿Con qué frecuencia actualizan las herramientas?",
    answer: "Actualizamos nuestras herramientas regularmente para mejorar la seguridad, agregar nuevas funciones y corregir errores. Las actualizaciones se implementan automáticamente sin interrumpir tu experiencia."
  },
  {
    question: "¿Puedo integrar estas herramientas en mi sitio web?",
    answer: "Ofrecemos APIs y widgets embebibles para algunas de nuestras herramientas. Contacta con nuestro equipo técnico para conocer las opciones de integración disponibles."
  },
  {
    question: "¿Las herramientas son seguras para uso empresarial?",
    answer: "Sí, nuestras herramientas están diseñadas con estándares de seguridad empresarial. Ofrecemos versiones premium con funciones adicionales de auditoría y cumplimiento para entornos corporativos."
  }
]

export default function ToolsPage() {
  return (
    <>
      <SeoPage
        title="Herramientas de Seguridad Digital | TecnoCrypter"
        description="Accede a nuestras herramientas gratuitas de seguridad digital: generador de contraseñas, limpiador de metadatos, verificador de seguridad y más."
        slug="tools"
        image="tecnocrypter-web\public\Seo\tools.webp"
        keywords="herramientas seguridad, generador contraseñas, limpiador metadatos, verificador seguridad, ciberseguridad gratuita"
      />
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Herramientas de Seguridad</h1>
            <p className="text-xl text-muted-foreground">
              Utiliza nuestras herramientas gratuitas para mejorar tu seguridad digital y proteger tu información.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tools.map((tool) => {
              const IconComponent = tool.icon
              return (
                <Card key={tool.href} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={tool.href}>
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        Usar Herramienta
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-muted/50 rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">¿Necesitas más herramientas?</h2>
              <p className="text-muted-foreground mb-6">
                Estamos constantemente desarrollando nuevas herramientas de seguridad. 
                Síguenos para estar al día con las últimas incorporaciones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contacto">
                  <Button variant="outline">
                    Sugerir Herramienta
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button>
                    Ver Blog de Seguridad
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <ReusableFaqSection 
          title="Preguntas Frecuentes sobre Herramientas"
          description="Respuestas a las preguntas más comunes sobre nuestras herramientas de seguridad."
          faqs={toolsFaqs}
        />
      </main>
    </>
  )
}