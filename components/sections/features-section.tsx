"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Shield, Lock, Eye, Database, Server, Zap, Fingerprint, Key, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

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
    <section className="py-24 bg-gradient-to-b from-background/10 to-background/5">
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
              className="relative p-6 rounded-xl border bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors group overflow-hidden"
            >
              {/* Binary border effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent overflow-hidden">
                  <motion.div
                    className="absolute inset-0 text-[8px] font-mono text-primary/80 whitespace-nowrap leading-none flex items-center"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    1010110010101100101011001010110010101100101011001010110010101100
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent overflow-hidden">
                  <motion.div
                    className="absolute inset-0 text-[8px] font-mono text-primary/80 whitespace-nowrap leading-none flex items-center"
                    animate={{
                      x: ["100%", "-100%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1.5
                    }}
                  >
                    0101001101010011010100110101001101010011010100110101001101010011
                  </motion.div>
                </div>
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary to-transparent overflow-hidden">
                  <motion.div
                    className="absolute inset-0 text-[8px] font-mono text-primary/80 whitespace-nowrap leading-none flex flex-col justify-center transform -rotate-90 origin-center"
                    animate={{
                      y: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.5
                    }}
                  >
                    1100110011001100110011001100110011001100
                  </motion.div>
                </div>
                <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary to-transparent overflow-hidden">
                  <motion.div
                    className="absolute inset-0 text-[8px] font-mono text-primary/80 whitespace-nowrap leading-none flex flex-col justify-center transform -rotate-90 origin-center"
                    animate={{
                      y: ["100%", "-100%"]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 2
                    }}
                  >
                    0011001100110011001100110011001100110011
                  </motion.div>
                </div>
              </motion.div>
              <motion.div 
                className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors"
                whileHover={{
                  scale: 1.1,
                  rotate: feature.title === "Protección Total" ? [0, -10, 10, 0] :
                          feature.title === "Encriptación Avanzada" ? [0, 360] :
                          feature.title === "Monitoreo 24/7" ? { scale: [1, 1.2, 1] } :
                          feature.title === "Almacenamiento Seguro" ? { y: [0, -5, 0] } :
                          feature.title === "Servidores Blindados" ? { x: [0, -3, 3, 0] } :
                          feature.title === "Respuesta Rápida" ? { rotate: [0, 15, -15, 0] } :
                          feature.title === "Autenticación Biométrica" ? { scale: [1, 0.9, 1.1, 1] } :
                          feature.title === "Gestión de Accesos" ? { rotate: [0, 45, -45, 0] } :
                          feature.title === "Actualizaciones Automáticas" ? { rotate: [0, 180, 360] } : {}
                }}
                transition={{
                  duration: feature.title === "Encriptación Avanzada" || feature.title === "Actualizaciones Automáticas" ? 0.8 : 0.6,
                  ease: "easeInOut",
                  repeat: feature.title === "Monitoreo 24/7" ? 2 : 0
                }}
              >
                <motion.div
                  whileHover={{
                    color: "hsl(var(--primary))",
                    filter: "drop-shadow(0 0 8px hsl(var(--primary)))"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="h-6 w-6 text-primary" />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
