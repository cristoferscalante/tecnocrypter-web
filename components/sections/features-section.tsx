"use client"

import { AnimatedSection } from "@/components/ui/animated-section"

export function FeaturesSection() {
  return (
    <section className="py-32 md:py-40 bg-gradient-to-b from-background/10 to-background/5">
      <div className="container">
        <AnimatedSection className="text-center max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">Características de Seguridad de Vanguardia</h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Nuestras soluciones incorporan tecnologías avanzadas para garantizar la máxima protección de tus activos
            digitales. Ofrecemos protección integral, encriptación de última generación, monitoreo constante,
            almacenamiento seguro, infraestructura robusta, respuesta inmediata ante incidentes, autenticación biométrica,
            gestión granular de accesos y actualizaciones automáticas de seguridad.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
