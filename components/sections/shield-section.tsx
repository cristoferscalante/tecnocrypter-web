"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { motion } from "framer-motion"
import Image from "next/image"

export function ShieldSection() {

  return (
    <section className="py-24 relative overflow-hidden">

      <div className="container relative z-10">
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Character - tecno2.png with 3D Effects */}
          <AnimatedSection delay={0.2} className="order-1 lg:order-1">
            <motion.div
              className="relative w-full max-w-sm mx-auto lg:ml-8"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              animate={{
                y: [0, -12, -8, -15, -5, 0],
                scale: [1, 1.03, 0.98, 1.05, 1.01, 1],
                rotateZ: [0, 1.5, -1, 2, -0.5, 0],
                filter: [
                  "brightness(1) saturate(1)",
                  "brightness(1.1) saturate(1.2)",
                  "brightness(0.95) saturate(0.9)",
                  "brightness(1.08) saturate(1.15)",
                  "brightness(1.02) saturate(1.05)",
                  "brightness(1) saturate(1)"
                ],
                transition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                }
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Image
                src="/images/tecno2.png"
                alt="Personaje de seguridad TecnoCrypter"
                width={320}
                height={320}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
            
            {/* Text Below tecno2.png */}
            <motion.div
              className="text-center mt-8 max-w-sm mx-auto lg:ml-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Guardián Digital
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nuestro avanzado sistema de protección vigila constantemente tus activos digitales con tecnología de vanguardia.
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Right Character - 11.png */}
          <AnimatedSection delay={0.6} className="order-2 lg:order-2">
            <motion.div
              className="relative w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <Image
                src="/images/11.png"
                alt="Personaje de protección digital"
                width={600}
                height={600}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </AnimatedSection>
        </div>


      </div>
    </section>
  )
}