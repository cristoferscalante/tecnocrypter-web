"use client"

import { Button } from "@/components/ui/button"
import { Shield, Lock, AlertTriangle, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { DecryptText } from "@/components/ui/decrypt-text"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background/20 via-background/10 to-primary/5">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      </div>

      <div className="container px-4 py-16 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Icon Animation */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.68, -0.55, 0.265, 1.55],
              type: "spring",
              stiffness: 60,
              damping: 15
            }}
          >
            <div className="relative">
              <motion.div
                className="p-6 rounded-full bg-destructive/10 border-2 border-destructive/20"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(239, 68, 68, 0.3)",
                    "0 0 40px rgba(239, 68, 68, 0.5)",
                    "0 0 20px rgba(239, 68, 68, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <AlertTriangle className="h-16 w-16 text-destructive" />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 p-2 rounded-full bg-primary/20 border border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="h-6 w-6 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          {/* Error Code */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-8xl lg:text-9xl font-bold font-orbitron text-destructive tracking-wider"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.0, ease: "easeOut" }}
            >
              <DecryptText
                text="404"
                delay={500}
                duration={1500}
                scrambleChars="0123456789ABCDEF#$%&*"
              />
            </motion.h1>
          </motion.div>

          {/* Main Message */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-orbitron text-foreground">
              <DecryptText
                text="Acceso Denegado"
                delay={1500}
                duration={1200}
                scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              />
            </h2>
            
            <motion.p
              className="text-xl font-space-grotesk text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <DecryptText
                text="Ruta No Encontrada en el Sistema"
                delay={2200}
                duration={1000}
              />
            </motion.p>

            <motion.div
              className="max-w-lg mx-auto p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary mr-2" />
                <span className="text-sm font-medium text-primary font-space-grotesk">SISTEMA DE SEGURIDAD</span>
              </div>
              <p className="text-muted-foreground font-space-grotesk leading-relaxed">
                La página solicitada ha sido <span className="text-primary font-medium">encriptada</span> o 
                <span className="text-primary font-medium"> reubicada</span> por nuestros protocolos de seguridad. 
                Nuestros sistemas de <span className="text-primary font-medium">ciberseguridad</span> mantienen 
                la integridad de la plataforma en todo momento.
              </p>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.8, duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <Button asChild size="lg" className="group relative overflow-hidden">
                <Link href="/">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                  <Home className="mr-2 h-5 w-5 transition-all duration-500 ease-out group-hover:scale-110 relative z-10" />
                  <span className="relative z-10">Volver al Inicio</span>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.1, duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <Button asChild variant="outline" size="lg" className="group relative overflow-hidden border-2 hover:border-primary/50">
                <Link href="/blog">
                  <motion.div
                    className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                  <ArrowLeft className="mr-2 h-5 w-5 transition-all duration-500 ease-out group-hover:-translate-x-1 group-hover:scale-110 relative z-10" />
                  <span className="relative z-10 group-hover:text-primary transition-colors duration-500 ease-out">Explorar Contenido</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Security Badge */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 1.0 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary font-space-grotesk">Protegido por TecnoCrypter Security</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}