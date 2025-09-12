"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function SecuritySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const [isGlowing, setIsGlowing] = useState(false)
  
  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % securityFeatures.length)
  }
  
  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + securityFeatures.length) % securityFeatures.length)
  }
  
  const securityFeatures = [
    {
      image: "/images/optimizadas/almacenamiento_seguro.webp",
      title: "Almacenamiento Seguro",
      description: "Sistemas de almacenamiento con múltiples capas de seguridad y respaldos automáticos.",
      color: "from-orange-500 to-red-500",
      delay: 0
    },
    {
      image: "/images/optimizadas/servidores_blindados.webp",
      title: "Servidores Blindados",
      description: "Infraestructura robusta con protección contra ataques DDoS y vulnerabilidades.",
      color: "from-teal-500 to-cyan-500",
      delay: 0.1
    },
    {
      image: "/images/optimizadas/repuesta_rapida.webp",
      title: "Respuesta Rápida",
      description: "Protocolos de respuesta inmediata ante incidentes de seguridad para minimizar daños.",
      color: "from-yellow-500 to-orange-500",
      delay: 0.2
    },
    {
      image: "/images/optimizadas/autenticación_biometrica.webp",
      title: "Autenticación Biométrica",
      description: "Sistemas de verificación de identidad mediante reconocimiento biométrico avanzado.",
      color: "from-pink-500 to-rose-500",
      delay: 0.3
    },
    {
      image: "/images/optimizadas/proteccion_total.webp",
      title: "Protección Total",
      description: "Soluciones de seguridad integral para proteger todos tus activos digitales contra amenazas avanzadas.",
      color: "from-blue-500 to-cyan-500",
      delay: 0.4
    },
    {
      image: "/images/optimizadas/encriptación_avanzada.webp",
      title: "Encriptación Avanzada",
      description: "Algoritmos de encriptación de última generación que garantizan la confidencialidad de tus datos.",
      color: "from-green-500 to-emerald-500",
      delay: 0.5
    },
    {
      image: "/images/optimizadas/monitoreo.webp",
      title: "Monitoreo 24/7",
      description: "Vigilancia constante de tus sistemas para detectar y neutralizar amenazas en tiempo real.",
      color: "from-purple-500 to-violet-500",
      delay: 0.6
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-primary/3 via-background/10 to-background/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header Section */}
      <div className="text-center mb-16 container relative z-10">

      </div>

      {/* Security Features Carousel */}
      <div className="relative max-w-6xl mx-auto mb-16 container relative z-10">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-primary/10 hover:bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-primary" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-primary/10 hover:bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-primary" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 400, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -400, scale: 0.9 }}
              transition={{ 
                duration: 0.2,
                type: "spring",
                stiffness: 120,
                damping: 25
              }}
              className="group"
            >
              {(() => {
                const feature = securityFeatures[currentIndex]
                return (
                  <Card className="relative bg-transparent border-0 min-h-[400px] md:min-h-[500px]">
                    <CardContent className="p-4 md:p-8 lg:p-16 text-center flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
                      {/* Animated large image */}
                       <div className="mb-8 mx-auto cursor-pointer" onClick={() => {
                         setIsGlowing(!isGlowing)
                         setTimeout(() => {
                           window.location.href = '/seguridad'
                         }, 500)
                       }}>
                         <motion.div 
                           className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[36rem] lg:h-[36rem] mx-auto relative"
                           whileHover={{ scale: 1.05 }}
                           transition={{ duration: 0.3, ease: "easeOut" }}
                         >
                           <motion.img
                             src={feature.image}
                             alt={feature.title}
                             width={448}
                             height={448}
                             className={`object-contain drop-shadow-lg transition-all duration-500 ease-out w-full h-full ${
                               isGlowing 
                                 ? 'drop-shadow-[0_0_20px_rgba(16,185,129,0.8)] filter brightness-110 contrast-110' 
                                 : ''
                             }`}
                             animate={{
                               filter: isGlowing 
                                 ? [
                                     'drop-shadow(0 0 20px rgba(16,185,129,0.8)) brightness(110%) contrast(110%)',
                                     'drop-shadow(0 0 30px rgba(16,185,129,1)) brightness(120%) contrast(120%)',
                                     'drop-shadow(0 0 20px rgba(16,185,129,0.8)) brightness(110%) contrast(110%)'
                                   ]
                                 : 'drop-shadow(0 0 0px rgba(16,185,129,0)) brightness(100%) contrast(100%)'
                             }}
                             transition={{
                               duration: isGlowing ? 2 : 0.5,
                               repeat: isGlowing ? Infinity : 0,
                               repeatType: 'reverse',
                               ease: 'easeInOut'
                             }}
                           />
                         </motion.div>
                       </div>


                      {/* Content */}
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xs md:max-w-md px-2">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 md:mt-8 space-x-2">
          {securityFeatures.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      </div>


    </section>
  )
}
