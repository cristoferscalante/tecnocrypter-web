import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Lock, Eye, Server, Zap, Fingerprint } from "lucide-react"
import Link from "next/link"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata: Metadata = generatePageMetadata({
  title: "Seguridad Cibernética - TecnoCrypter",
  description: "Soluciones avanzadas de seguridad cibernética y encriptación para proteger tus activos digitales. Protección personal y empresarial.",
  slug: "seguridad",
  image: "https://tecnocrypter.com/og/seguridad.jpg",
  keywords: ["seguridad cibernética", "encriptación", "protección digital", "antivirus", "VPN", "seguridad empresarial"]
});

export default function SeguridadPage() {
  const securityCategories = [
    {
      id: "personal",
      name: "Seguridad Personal",
      description: "Protección para individuos y dispositivos personales",
      solutions: [
        {
          icon: Shield,
          title: "Protección Antivirus",
          description: "Protección en tiempo real contra malware, virus y ransomware para tus dispositivos personales.",
        },
        {
          icon: Lock,
          title: "VPN Segura",
          description: "Navega de forma anónima y segura con nuestra VPN de alta velocidad y sin registros.",
        },
        {
          icon: Fingerprint,
          title: "Gestor de Contraseñas",
          description: "Almacena y genera contraseñas seguras con encriptación de extremo a extremo.",
        },
      ],
    },
    {
      id: "empresarial",
      name: "Seguridad Empresarial",
      description: "Soluciones robustas para empresas y organizaciones",
      solutions: [
        {
          icon: Server,
          title: "Seguridad de Red",
          description: "Protección avanzada para redes empresariales contra intrusiones y ataques externos.",
        },
        {
          icon: Eye,
          title: "Monitoreo Continuo",
          description: "Vigilancia 24/7 de tus sistemas con alertas en tiempo real ante comportamientos sospechosos.",
        },
        {
          icon: Zap,
          title: "Respuesta a Incidentes",
          description: "Equipo especializado para responder rápidamente ante brechas de seguridad.",
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen py-12">
      <section className="container mb-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Soluciones de Seguridad Avanzada</h1>
          <p className="text-xl text-muted-foreground">
            Protege tus activos digitales con nuestras soluciones de seguridad cibernética de vanguardia.
          </p>
        </div>

        <Tabs defaultValue="personal" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            {securityCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {securityCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {category.solutions.map((solution, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <solution.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{solution.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription>{solution.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/productos?categoria=${category.id}`}>Ver Detalles</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="container py-12 bg-muted/30 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas una Solución Personalizada?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Nuestro equipo de expertos en seguridad puede diseñar una solución adaptada a tus necesidades específicas.
          </p>
          <Button asChild size="lg">
            <Link href="/contacto">Contactar con un Especialista</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
