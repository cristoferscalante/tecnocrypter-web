"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function ShieldSection() {

  return (
    <section className="py-24 relative overflow-hidden">

      <div className="container relative z-10">
        {/* Main Content Layout - Centered */}
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
          {/* Centered Character - tecno2.png with 3D Effects */}
          <AnimatedSection delay={0.2} className="text-center">
            <motion.div
              className="relative w-full max-w-sm mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
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
              <Link href="/productos" className="block cursor-pointer">
                <Image
                  src="/images/tecno2.png"
                  alt="Personaje de seguridad TecnoCrypter"
                  width={320}
                  height={320}
                  className="w-full h-auto object-contain drop-shadow-2xl transition-transform hover:scale-105"
                  priority
                />
              </Link>
            </motion.div>
            
            {/* Text Below tecno2.png */}
            <motion.div
              className="text-center mt-8 max-w-sm mx-auto"
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
        </div>


      </div>
    </section>
  )
}