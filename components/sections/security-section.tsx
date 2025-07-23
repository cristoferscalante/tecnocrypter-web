"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function SecuritySection() {
  const securityLayers = [
    { name: "Encriptación", percentage: 100 },
    { name: "Autenticación", percentage: 95 },
    { name: "Firewall", percentage: 90 },
    { name: "Detección de Intrusos", percentage: 85 },
    { name: "Análisis de Vulnerabilidades", percentage: 80 },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-primary/3 via-background/10 to-background/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 800 800">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="right">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Seguridad Multicapa para Protección Total</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Nuestro enfoque de seguridad en capas proporciona múltiples niveles de protección para defender tus
              activos digitales contra amenazas sofisticadas.
            </p>

            <div className="space-y-6 mb-8">
              {securityLayers.map((layer, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{layer.name}</span>
                    <span className="text-muted-foreground">{layer.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${layer.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 * index }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button asChild size="lg">
              <Link href="/seguridad">Explorar Soluciones de Seguridad</Link>
            </Button>
          </AnimatedSection>

          <AnimatedSection direction="left" className="relative">
            <div className="relative">
              <div className="aspect-square">
                <img
                  src="/11.png"
                  alt="Seguridad multicapa"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-6 -right-6 bg-card/40 backdrop-blur-sm shadow-lg rounded-lg p-3 border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="font-medium">Protección Activa</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-card/40 backdrop-blur-sm shadow-lg rounded-lg p-3 border"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="font-medium">Encriptación 256-bit</span>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
