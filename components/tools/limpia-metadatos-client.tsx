"use client"

import MetadataCleanerTool from "@/components/tools/metadata-cleaner"
import { ToolSeoSection } from './tool-seo-section'
import { Shield, Image, Download, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

export default function LimpiaMetadatosClient() {
  const features = [
    {
      icon: Shield,
      title: "Procesamiento Local",
      description: "100% privado, sin subir archivos",
    },
    {
      icon: Trash2,
      title: "Eliminación Completa",
      description: "Remueve todos los metadatos EXIF",
    },
    {
      icon: Download,
      title: "Descarga Instantánea",
      description: "Obtén tu imagen limpia al instante",
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
                  Protección de Privacidad
                </span>
              </motion.div>
              <motion.h1
                className="text-4xl lg:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Limpiador de <span className="text-primary">Metadatos</span> de Imágenes
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Elimina ubicación y datos ocultos de tus imágenes antes de compartirlas. 
                Protege tu privacidad eliminando metadatos EXIF, GPS y otra información sensible.
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
          <MetadataCleanerTool />
        </div>
      </section>

      {/* Información de Privacidad */}
      <section className="py-16 px-4 bg-gradient-to-br from-background/20 via-background/10 to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Protege tu Privacidad Digital</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los metadatos en las imágenes pueden revelar información sensible como tu ubicación, 
              dispositivo usado y fecha exacta. Aprende por qué es importante eliminarlos.
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
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ubicación GPS</h3>
              <p className="text-muted-foreground">
                Las coordenadas exactas donde se tomó la foto pueden estar ocultas.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 rounded-lg bg-background/50 backdrop-blur-sm border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-orange-100 dark:bg-orange-900/20">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Información del Dispositivo</h3>
              <p className="text-muted-foreground">
                Modelo de cámara, configuraciones y software utilizado.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 rounded-lg bg-background/50 backdrop-blur-sm border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/20">
                <span className="text-2xl">🕐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fecha y Hora</h3>
              <p className="text-muted-foreground">
                Timestamp preciso de cuándo se capturó la imagen.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <ToolSeoSection
        title="Limpiador de Metadatos EXIF: Protege tu Privacidad en Imágenes"
        paragraphs={[
          "Cada foto que tomas contiene metadatos EXIF ocultos: ubicación GPS, modelo de cámara, fecha, hora y más. Nuestro limpiador de metadatos elimina toda esta información sensible antes de compartir tus imágenes.",
          "Los metadatos EXIF pueden revelar tu ubicación exacta, rutinas diarias y el dispositivo que usas. Periodistas, activistas y cualquier persona preocupada por la privacidad debe limpiar los metadatos antes de publicar fotos online.",
          "Todo el procesamiento se realiza en tu navegador. Tus imágenes nunca se suben a ningún servidor. Soporta formatos JPEG, PNG y WebP."
        ]}
        howTo={[
          { step: "Sube tu imagen", description: "Arrastra o selecciona la imagen cuyos metadatos quieres eliminar." },
          { step: "Revisa los metadatos", description: "Visualiza todos los metadatos EXIF que contiene la imagen original." },
          { step: "Descarga limpia", description: "Descarga la imagen sin metadatos, lista para compartir de forma segura." },
        ]}
        faqs={[
          { question: "¿Qué metadatos EXIF contienen las fotos?", answer: "Pueden incluir: coordenadas GPS, altitud, dirección, modelo de cámara/teléfono, configuración de la cámara (apertura, ISO, velocidad), fecha y hora exacta, software de edición, y en algunos casos datos del propietario." },
          { question: "¿Las redes sociales eliminan los metadatos?", answer: "Algunas como Facebook e Instagram eliminan la mayoría de metadatos EXIF al subir fotos, pero no todas las plataformas lo hacen. Es mejor eliminarlos tú mismo antes de compartir para tener control total." },
          { question: "¿Se pierde calidad al limpiar metadatos?", answer: "No. El limpiador solo modifica los datos EXIF incrustados, sin recomprimir ni alterar los píxeles de la imagen. La calidad visual permanece exactamente igual." },
        ]}
        relatedTools={[
          { name: "Verificador de URLs", href: "/tools/verificador" },
          { name: "Cifrado Online", href: "/tools/cifrado-online" },
          { name: "Generador QR", href: "/tools/generador-qr" },
          { name: "Generador de Contraseñas", href: "/tools/generador-contrasenas" },
        ]}
      />
    </div>
  )
}