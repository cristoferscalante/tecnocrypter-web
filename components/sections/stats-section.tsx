"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { motion } from "framer-motion"

export function StatsSection() {
  const stats = [
    { value: "99.9%", label: "Tiempo de Actividad", description: "Disponibilidad garantizada" },
    { value: "10M+", label: "Amenazas Bloqueadas", description: "Cada mes" },
    { value: "256-bit", label: "Encriptación", description: "Estándar militar" },
    { value: "24/7", label: "Soporte", description: "Asistencia continua" },
  ]

  return (
    <section className="py-20 bg-primary/5">
      <div className="container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Seguridad en Números</h2>
          <p className="text-xl text-muted-foreground">
            Nuestras soluciones de seguridad ofrecen protección de clase mundial respaldada por estadísticas
            impresionantes.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection
              key={index}
              delay={0.1 * index}
              className="text-center p-6 rounded-xl border bg-card/30 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2 + index * 0.1,
                }}
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-primary text-2xl font-bold">{index + 1}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
