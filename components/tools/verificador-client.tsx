"use client"

import URLVerifier from "@/components/tools/url-verifier"
import { Shield, Search, AlertTriangle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function VerificadorClient() {
  const features = [
    {
      icon: Shield,
      title: "Análisis en Tiempo Real",
      description: "Verificación instantánea de seguridad",
    },
    {
      icon: AlertTriangle,
      title: "Detección de Amenazas",
      description: "Identifica malware y phishing",
    },
    {
      icon: CheckCircle,
      title: "Reporte Detallado",
      description: "Información completa de seguridad",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background/20 via-background/10 to-primary/5 min-h-[60vh] flex items-center">
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

        <div className="container py-24 relative z-10">
          <div className="text-center space-y-8">
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
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4">
                  Verificación de Enlaces
                </span>
              </motion.div>
              <motion.h1
                className="text-4xl lg:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Verificador de <span className="text-primary">URL</span> Seguro
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Analiza la seguridad de URLs y detecta posibles amenazas antes de visitarlas. 
                Verifica dominios, certificados SSL y reputación en tiempo real.
              </motion.p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-3 gap-6 pt-8 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-background/50 backdrop-blur-sm border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  <div className="p-3 rounded-full bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Herramienta Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <URLVerifier />
        </div>
      </section>

      {/* Información de Seguridad */}
      <section className="py-16 px-4 bg-gradient-to-br from-background/20 via-background/10 to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Protégete de Enlaces Maliciosos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los enlaces maliciosos pueden robar tu información personal, instalar malware 
              o redirigirte a sitios de phishing. Aprende a identificarlos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6 rounded-lg bg-background/50 backdrop-blur-sm border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-100 dark:bg-red-900/20">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Phishing</h3>
              <p className="text-muted-foreground">
                Sitios falsos que imitan servicios legítimos para robar credenciales.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 rounded-lg bg-background/50 backdrop-blur-sm border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-orange-100 dark:bg-orange-900/20">
                <span className="text-2xl">🦠</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Malware</h3>
              <p className="text-muted-foreground">
                Enlaces que descargan software malicioso o explotan vulnerabilidades.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 rounded-lg bg-background/50 backdrop-blur-sm border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/20">
                <span className="text-2xl">🎣</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Scam</h3>
              <p className="text-muted-foreground">
                Estafas que prometen premios falsos o solicitan información personal.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}