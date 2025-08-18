import type { Metadata } from "next"
import MetadataCleanerTool from "@/components/tools/metadata-cleaner"
import { MatrixBackground } from "@/components/ui/matrix-background"
import { Shield, Image, Download, Trash2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Limpiador de Metadatos de Imágenes | TecnoCrypter",
  description: "Elimina metadatos EXIF, GPS y datos ocultos de tus imágenes antes de compartirlas. Protege tu privacidad con nuestro limpiador 100% cliente.",
  keywords: ["limpiador metadatos", "EXIF", "GPS", "privacidad", "imágenes", "seguridad"],
}

export default function LimpiaMetadatosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      <MatrixBackground />
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              <div className="relative bg-primary/10 p-4 rounded-full">
                <Image className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Limpiador de Metadatos
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Elimina ubicación y datos ocultos de tus imágenes antes de compartirlas. 
            Protege tu privacidad eliminando metadatos EXIF, GPS y otra información sensible.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>100% procesamiento local</span>
            </div>
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-red-500" />
              <span>Elimina datos EXIF/GPS</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-blue-500" />
              <span>Descarga instantánea</span>
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
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Protege tu Privacidad Digital</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los metadatos en las imágenes pueden revelar información sensible como tu ubicación, 
              dispositivo usado y fecha exacta. Aprende por qué es importante eliminarlos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="font-semibold mb-2">Datos de Ubicación</h3>
              <p className="text-sm text-muted-foreground">
                Las fotos pueden contener coordenadas GPS exactas que revelan 
                dónde fueron tomadas, comprometiendo tu privacidad.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold mb-2">Información del Dispositivo</h3>
              <p className="text-sm text-muted-foreground">
                Los metadatos EXIF revelan el modelo de cámara, configuraciones 
                y software usado, información que puede ser sensible.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold mb-2">Procesamiento Seguro</h3>
              <p className="text-sm text-muted-foreground">
                Nuestra herramienta procesa las imágenes completamente en tu navegador, 
                sin enviar datos a servidores externos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}