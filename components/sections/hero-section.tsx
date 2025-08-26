"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Lock, TrendingUp } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { DecryptText, useSequentialDecrypt } from "@/components/ui/decrypt-text"

export function HeroSection() {
  const { getTextDelay, handleTextComplete } = useSequentialDecrypt([
    "Bienvenido a TecnoCrypter - Donde la Seguridad se Encuentra con la Innovación",
    "Explora el universo de la ciberseguridad, encriptación y cripto-tecnología con la información más avanzada y actualizada. Aquí transformamos datos en confianza digital y convertimos el conocimiento en tu mejor defensa contra un mundo en constante cambio. Conviértete en un experto en blindar tu presente y futuro digital. Seguridad no es solo protección, es evolución."
  ], 500, 800)

  const features = [
    {
      icon: Shield,
      title: "Seguridad Avanzada",
      description: "Protección de última generación",
    },
    {
      icon: Lock,
      title: "Encriptación Robusta",
      description: "Algoritmos de encriptación seguros",
    },
    {
      icon: TrendingUp,
      title: "Análisis de Mercado",
      description: "Tendencias en criptomonedas",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background/20 via-background/10 to-primary/5 min-h-[90vh] flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4 font-space-grotesk">
                  Innovación en Seguridad
                </span>
              </motion.div>
              <motion.h1
                className="text-4xl lg:text-6xl font-bold font-orbitron tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              >
                <DecryptText
                  text="Bienvenido a "
                  delay={getTextDelay(0)}
                  duration={1500}
                  onComplete={() => handleTextComplete(0)}
                />
                <span className="text-primary">
                  <DecryptText
                    text="TecnoCrypter"
                    delay={getTextDelay(0) + 800}
                    duration={1200}
                    scrambleChars="01010101ABCDEF#$%&*"
                  />
                </span>
                <br />
                <DecryptText
                  text="Donde la Seguridad se Encuentra con la Innovación"
                  delay={getTextDelay(0) + 1500}
                  duration={1800}
                />
              </motion.h1>
              <motion.p
                className="text-xl font-space-grotesk text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              >
                <DecryptText
                  text="Explora el universo de la ciberseguridad, encriptación y cripto-tecnología con la información más avanzada y actualizada. Aquí transformamos datos en confianza digital y convertimos el conocimiento en tu mejor defensa contra un mundo en constante cambio. Conviértete en un experto en blindar tu presente y futuro digital. Seguridad no es solo protección, es evolución."
                  delay={getTextDelay(1) + 2000}
                  duration={2500}
                  onComplete={() => handleTextComplete(1)}
                />
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.5, duration: 1, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 4.8, duration: 0.6, ease: "backOut" }}
              >
                <Button asChild size="lg" className="group relative overflow-hidden">
                  <Link href="/blog">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Explorar Contenido</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 relative z-10" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 5.1, duration: 0.6, ease: "backOut" }}
              >
                <Button asChild variant="outline" size="lg" className="group relative overflow-hidden border-2 hover:border-primary/50">
                  <Link href="/productos">
                    <motion.div
                      className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 group-hover:text-primary transition-colors duration-300">Ver Productos</span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              className="grid sm:grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.5, duration: 0.8 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border group hover:bg-background/70 hover:border-primary/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 5.8 + index * 0.2, 
                    duration: 0.8, 
                    ease: "backOut",
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="flex-shrink-0 mt-1"
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ 
                      delay: 6 + index * 0.2, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <feature.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="font-semibold group-hover:text-primary transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 6.2 + index * 0.2, duration: 0.5 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 6.4 + index * 0.2, duration: 0.5 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5, rotateY: 45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ 
              delay: 2.5, 
              duration: 1.2, 
              ease: "backOut",
              type: "spring",
              stiffness: 80
            }}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="relative w-full h-full"
              >
                <img
                  src="/hero.png"      
                  alt="Experto en ciberseguridad"
                  className="w-full h-auto"
                />
              </motion.div>
              
              {/* Animated overlay effects */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2, duration: 0.6 }}
              />
              
              <motion.div 
                className="absolute inset-0 ring-1 ring-white/10" 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.4, duration: 0.5 }}
              />
              
              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ 
                  boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" 
                }}
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 20px 2px rgba(59, 130, 246, 0.3)",
                    "0 0 0 0 rgba(59, 130, 246, 0)"
                  ]
                }}
                transition={{
                  delay: 3.6,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span className="text-sm text-muted-foreground mb-2">Descubre más</span>
          <motion.div
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-1"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{
                y: [0, 6, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
