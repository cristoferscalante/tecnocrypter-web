"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Shield, Lock, Eye, Database, Server, Zap, Fingerprint, Key, RefreshCw } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Protección Total",
      description:
        "Soluciones de seguridad integral para proteger todos tus activos digitales contra amenazas avanzadas.",
    },
    {
      icon: Lock,
      title: "Encriptación Avanzada",
      description: "Algoritmos de encriptación de última generación que garantizan la confidencialidad de tus datos.",
    },
    {
      icon: Eye,
      title: "Monitoreo 24/7",
      description: "Vigilancia constante de tus sistemas para detectar y neutralizar amenazas en tiempo real.",
    },
    {
      icon: Database,
      title: "Almacenamiento Seguro",
      description: "Sistemas de almacenamiento con múltiples capas de seguridad y respaldos automáticos.",
    },
    {
      icon: Server,
      title: "Servidores Blindados",
      description: "Infraestructura robusta con protección contra ataques DDoS y vulnerabilidades.",
    },
    {
      icon: Zap,
      title: "Respuesta Rápida",
      description: "Protocolos de respuesta inmediata ante incidentes de seguridad para minimizar daños.",
    },
    {
      icon: Fingerprint,
      title: "Autenticación Biométrica",
      description: "Sistemas de verificación de identidad mediante reconocimiento biométrico avanzado.",
    },
    {
      icon: Key,
      title: "Gestión de Accesos",
      description: "Control granular de permisos y accesos para proteger recursos sensibles.",
    },
    {
      icon: RefreshCw,
      title: "Actualizaciones Automáticas",
      description: "Parches de seguridad y actualizaciones automáticas para mantener tus sistemas protegidos.",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/95">
      <div className="container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Características de Seguridad de Vanguardia</h2>
          <p className="text-xl text-muted-foreground">
            Nuestras soluciones incorporan tecnologías avanzadas para garantizar la máxima protección de tus activos
            digitales.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              delay={0.1 * index}
              className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors"
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
