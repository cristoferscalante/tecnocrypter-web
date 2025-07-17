"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Lock, LockOpen } from "lucide-react"

interface FallingIcon {
  id: number
  x: number
  delay: number
  duration: number
  isLocked: boolean
  size: number
  opacity: number
  weight: 'small' | 'medium' | 'large' | 'xlarge'
  baseOpacity: number
}

export function MatrixBackground() {
  const [icons, setIcons] = useState<FallingIcon[]>([])
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null)

  useEffect(() => {
    const generateIcons = () => {
      const newIcons: FallingIcon[] = []
      const iconCount = 40 // Aumentamos un poco para más densidad

      // Definimos los diferentes pesos y tamaños
      const weights = [
        { weight: 'small' as const, size: 16, opacity: 0.06 },
        { weight: 'medium' as const, size: 20, opacity: 0.1 },
        { weight: 'large' as const, size: 24, opacity: 0.15 },
        { weight: 'xlarge' as const, size: 28, opacity: 0.2 },
      ]

      for (let i = 0; i < iconCount; i++) {
        const weightConfig = weights[Math.floor(Math.random() * weights.length)]
        const sizeVariation = Math.random() * 4 - 2 // ±2px de variación
        
        newIcons.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 15,
          duration: 18 + Math.random() * 12, // 18-30s para más variedad
          isLocked: Math.random() > 0.3, // 70% cerrados, 30% abiertos inicialmente
          size: weightConfig.size + sizeVariation,
          opacity: weightConfig.opacity + (Math.random() * 0.05 - 0.025), // Pequeña variación
          weight: weightConfig.weight,
          baseOpacity: weightConfig.opacity,
        })
      }
      setIcons(newIcons)
    }

    generateIcons()
  }, [])

  const handleMouseEnter = (iconId: number) => {
    setHoveredIcon(iconId)
    // Cambiamos el estado del candado
    setIcons(prevIcons => 
      prevIcons.map(icon => 
        icon.id === iconId 
          ? { ...icon, isLocked: false } // Siempre se abre al hover
          : icon
      )
    )
  }

  const handleMouseLeave = (iconId: number) => {
    setHoveredIcon(null)
    // Después de un pequeño delay, puede volver a cerrarse aleatoriamente
    setTimeout(() => {
      setIcons(prevIcons => 
        prevIcons.map(icon => 
          icon.id === iconId 
            ? { ...icon, isLocked: Math.random() > 0.4 } // 60% chance de cerrarse
            : icon
        )
      )
    }, 800)
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map((icon) => {
        const isHovered = hoveredIcon === icon.id
        const currentOpacity = isHovered ? Math.min(icon.baseOpacity * 2, 0.8) : icon.opacity
        
        return (
          <motion.div
            key={icon.id}
            className="absolute cursor-pointer"
            style={{
              left: `${icon.x}%`,
              fontSize: `${icon.size}px`,
              opacity: currentOpacity,
              color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--primary))',
              pointerEvents: 'auto', // Habilitamos interacción
            }}
            initial={{ y: -100 }}
            animate={{ 
              y: "calc(100vh + 100px)",
              scale: isHovered ? 1.3 : 1,
              rotate: isHovered ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              y: {
                duration: icon.duration,
                delay: icon.delay,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 0.3,
                ease: "easeOut",
              },
              rotate: {
                duration: 0.6,
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.3,
              }
            }}
            onMouseEnter={() => handleMouseEnter(icon.id)}
            onMouseLeave={() => handleMouseLeave(icon.id)}
            whileHover={{
              filter: "drop-shadow(0 0 8px hsl(var(--primary)))",
            }}
          >
            <motion.div
              animate={{
                rotate: icon.isLocked ? 0 : 45,
                scale: icon.isLocked ? 1 : 1.1,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              {icon.isLocked ? (
                <Lock 
                  className="w-full h-full drop-shadow-sm" 
                  strokeWidth={icon.weight === 'small' ? 1.5 : icon.weight === 'medium' ? 1.8 : icon.weight === 'large' ? 2 : 2.2}
                />
              ) : (
                <LockOpen 
                  className="w-full h-full drop-shadow-sm" 
                  strokeWidth={icon.weight === 'small' ? 1.5 : icon.weight === 'medium' ? 1.8 : icon.weight === 'large' ? 2 : 2.2}
                />
              )}
            </motion.div>
            
            {/* Efecto de partículas al abrir */}
            {isHovered && !icon.isLocked && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="w-full h-full border-2 border-primary/30 rounded-full" />
              </motion.div>
            )}
            
            {/* Efecto de pulso en hover */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full bg-primary/20 rounded-full blur-sm" />
              </motion.div>
            )}
          </motion.div>
        )
      })}
      
      {/* Gradiente sutil para que los iconos se desvanezcan en los bordes */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent via-transparent to-background/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 pointer-events-none" />
    </div>
  )
}
