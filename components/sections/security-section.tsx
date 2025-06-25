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
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-background relative overflow-hidden">
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
            <div className="relative rounded-2xl overflow-hidden shadow-xl border">
              <div className="aspect-square">
                <img
                  src="/placeholder.svg?height=600&width=600&query=3D cybersecurity shield with digital lock and encryption visualization"
                  alt="Seguridad multicapa"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Animated overlay elements */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />

              {/* Animated security elements */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full border-4 border-primary/10 rounded-2xl"
                  initial={{
                    opacity: 0,
                    scale: 0.8 + i * 0.05,
                  }}
                  whileInView={{
                    opacity: 0.3 - i * 0.05,
                    scale: 1 + i * 0.05,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2,
                    delay: 0.3 + i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-6 -right-6 bg-card shadow-lg rounded-lg p-3 border"
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
              className="absolute -bottom-6 -left-6 bg-card shadow-lg rounded-lg p-3 border"
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
