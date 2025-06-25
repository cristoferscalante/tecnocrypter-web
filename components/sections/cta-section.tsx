"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-20 bg-primary/10 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Protege Tu Mundo Digital Hoy</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descubre nuestras soluciones de seguridad avanzada y productos de encriptación para mantener tus activos
              digitales protegidos contra amenazas cibernéticas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/productos">
                  Explorar Productos
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contacto">Contactar con Expertos</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
