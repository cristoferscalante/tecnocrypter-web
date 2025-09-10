"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

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
          <AnimatedSection direction="right" className="relative">
            <div className="flex justify-center mb-8 relative z-20 py-12">
              <motion.div
                className="relative"
                initial={{ y: 0, rotateY: 0, scale: 0.8 }}
                animate={{ 
                  y: [-15, 15, -15],
                  rotateY: [0, 20, -20, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                   src="/images/tecno2.png"
                   alt="Escudo de seguridad 3D"
                   width={320}
                   height={320}
                   className="w-80 h-80 object-contain drop-shadow-2xl transform transition-transform duration-500 ease-out hover:scale-110 cursor-pointer"
                   style={{
                     filter: "drop-shadow(0 35px 70px rgba(0, 0, 0, 0.4))"
                   }}
                 />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-full blur-2xl transform scale-90 -z-10" />
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform scale-110 -z-20" />
              </motion.div>
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Seguridad Multicapa para Protección Total</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Nuestro enfoque de seguridad en capas proporciona múltiples niveles de protección para defender tus
                activos digitales contra amenazas sofisticadas.
              </p>
            </div>

            <div className="flex justify-center">
               <Button asChild size="lg">
                 <Link href="/seguridad">Explorar Soluciones de Seguridad</Link>
               </Button>
             </div>
          </AnimatedSection>

          <AnimatedSection direction="left" className="relative">
            <div className="relative py-8">
              <div className="aspect-square">
                <img
                  src="/images/11.png"
                  alt="Seguridad multicapa"
                  className="w-full h-full object-contain transform transition-transform duration-500 ease-out hover:scale-110 cursor-pointer"
                />
              </div>
            </div>

            {/* Floating badges */}

          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
