"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface DecryptTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  scrambleChars?: string
  onComplete?: () => void
}

export function DecryptText({
  text,
  className = "",
  delay = 0,
  duration = 2000,
  scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>?",
  onComplete
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDecrypting, setIsDecrypting] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (hasStarted) return // Prevent re-execution
    
    setHasStarted(true)
    const timer = setTimeout(() => {
      setIsDecrypting(true)
      let currentIndex = 0
      const chars = text.split("")
      const scrambledText = new Array(text.length).fill("").map(() => 
        scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
      )
      
      setDisplayText(scrambledText.join(""))

      const decryptInterval = setInterval(() => {
        if (currentIndex < chars.length) {
          const newText = chars.map((char, index) => {
            if (index < currentIndex) {
              return char
            } else if (index === currentIndex) {
              // Scramble current character a few times before revealing
              return Math.random() > 0.7 ? char : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
            } else {
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
            }
          })
          
          setDisplayText(newText.join(""))
          
          // Move to next character with some randomness
          if (Math.random() > 0.3) {
            currentIndex++
          }
        } else {
          // Final pass to ensure all characters are correct
          setDisplayText(text)
          setIsDecrypting(false)
          clearInterval(decryptInterval)
          onComplete?.()
        }
      }, duration / (text.length * 3))

      return () => clearInterval(decryptInterval)
    }, delay)

    return () => clearTimeout(timer)
  }, []) // Remove dependencies to prevent re-execution

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
    >
      <span className="relative">
        {displayText}
        {isDecrypting && (
          <motion.span
            className="absolute -right-2 top-0 w-0.5 h-full bg-primary"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        )}
      </span>
    </motion.span>
  )
}

// Hook para manejar múltiples textos con desencriptación secuencial
export function useSequentialDecrypt(texts: string[], baseDelay = 0, textDelay = 500) {
  const [completedTexts, setCompletedTexts] = useState<number[]>([])

  const handleTextComplete = (index: number) => {
    setCompletedTexts(prev => [...prev, index])
  }

  const getTextDelay = (index: number) => {
    return baseDelay + (index * textDelay)
  }

  return {
    completedTexts,
    handleTextComplete,
    getTextDelay,
    allCompleted: completedTexts.length === texts.length
  }
}