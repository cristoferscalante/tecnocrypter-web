import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/metadata"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Key, FileCheck, ArrowRight, QrCode } from "lucide-react"
import { FaqSection } from "@/components/sections/faq-section"

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

export const metadata: Metadata = generateToolMetadata({
  title: "Herramientas de Seguridad Digital",
  description: "Accede a nuestras herramientas gratuitas de seguridad digital: generador de contraseñas, limpiador de metadatos, verificador de seguridad y más.",
  slug: "tools",
  image: "https://tecnocrypter.com/seo/tools.webp",
  keywords: ["herramientas seguridad", "generador contraseñas", "limpiador metadatos", "verificador seguridad", "ciberseguridad gratuita"]
})

export default function ToolsPage() {
  return (
    <>
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
          
          {/* FAQ Section */}
          <FaqSection 
            title="Preguntas Frecuentes sobre Herramientas"
            subtitle="Respuestas a las preguntas más comunes sobre nuestras herramientas de seguridad online."
            faqs={[
              {
                question: "¿Las herramientas son completamente gratuitas?",
                answer: "Sí, todas nuestras herramientas online son completamente gratuitas. No requieren registro ni tienen límites de uso. Nuestro objetivo es democratizar el acceso a herramientas de seguridad."
              },
              {
                question: "¿Necesito registrarme para usar las herramientas?",
                answer: "No, ninguna de nuestras herramientas requiere registro. Puedes usarlas de forma anónima y sin proporcionar información personal. Simplemente accede y comienza a usar la herramienta que necesites."
              },
              {
                question: "¿Qué tan seguras son sus herramientas online?",
                answer: "Nuestras herramientas procesan toda la información localmente en tu navegador. No enviamos datos a nuestros servidores, garantizando máxima privacidad y seguridad para tu información."
              },
              {
                question: "¿Guardan información de lo que proceso en las herramientas?",
                answer: "No, no guardamos ninguna información. Todo el procesamiento se realiza en tu dispositivo y los datos no salen de tu navegador. Una vez que cierras la página, toda la información se elimina automáticamente."
              },
              {
                question: "¿Puedo usar las herramientas desde móvil?",
                answer: "Sí, todas nuestras herramientas están optimizadas para dispositivos móviles. Funcionan perfectamente en smartphones y tablets con cualquier navegador moderno."
              },
              {
                question: "¿Van a agregar más herramientas en el futuro?",
                answer: "¡Absolutamente! Estamos constantemente desarrollando nuevas herramientas basadas en las necesidades de nuestra comunidad. Si tienes sugerencias, no dudes en contactarnos."
              }
            ]}
          />
        </div>
      </main>
    </>
  )
}