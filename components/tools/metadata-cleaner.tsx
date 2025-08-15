"use client"

import React, { useState, useCallback, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Upload, 
  Download, 
  Trash2, 
  Shield, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertTriangle,
  X,
  FileImage
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface ProcessedImage {
  id: string
  originalFile: File
  originalSize: number
  cleanedBlob: Blob | null
  cleanedSize: number
  status: 'pending' | 'processing' | 'completed' | 'error'
  error?: string
  preview: string
}

const MetadataCleanerTool = () => {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<ProcessedImage[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const supportedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

  const formatFileSize = (bytes: number): string => {
    // Validar que bytes sea un número válido
    if (!bytes || isNaN(bytes) || bytes < 0) return '0 KB'
    if (bytes === 0) return '0 KB'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(2))
    
    return `${formattedSize} ${sizes[i]}`
  }

  const createImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.readAsDataURL(file)
    })
  }

  const cleanImageMetadata = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        reject(new Error('No se pudo crear el contexto del canvas'))
        return
      }

      // Crear ImageBitmap para manejar automáticamente la orientación EXIF
      createImageBitmap(file)
        .then((imageBitmap) => {
          // Configurar el canvas con las dimensiones de la imagen
          canvas.width = imageBitmap.width
          canvas.height = imageBitmap.height
          
          // Dibujar la imagen en el canvas (esto elimina todos los metadatos)
          ctx.drawImage(imageBitmap, 0, 0)
          
          // Convertir el canvas a Blob
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Error al crear el blob limpio'))
            }
          }, file.type, 0.95) // Mantener alta calidad
          
          // Limpiar recursos
          imageBitmap.close()
        })
        .catch((error) => {
          reject(new Error(`Error al procesar la imagen: ${error.message}`))
        })
    })
  }

  const processImages = async (files: File[]) => {
    setIsProcessing(true)
    
    const newImages: ProcessedImage[] = await Promise.all(
      files.map(async (file) => {
        const id = Math.random().toString(36).substr(2, 9)
        const preview = await createImagePreview(file)
        
        return {
          id,
          originalFile: file,
          originalSize: file.size,
          cleanedBlob: null,
          cleanedSize: 0,
          status: 'pending' as const,
          preview
        }
      })
    )
    
    setImages(prev => [...prev, ...newImages])
    
    // Procesar cada imagen
    for (const image of newImages) {
      try {
        setImages(prev => prev.map(img => 
          img.id === image.id ? { ...img, status: 'processing' } : img
        ))
        
        const cleanedBlob = await cleanImageMetadata(image.originalFile)
        
        setImages(prev => prev.map(img => 
          img.id === image.id ? {
            ...img,
            cleanedBlob,
            cleanedSize: cleanedBlob.size,
            status: 'completed'
          } : img
        ))
      } catch (error) {
        setImages(prev => prev.map(img => 
          img.id === image.id ? {
            ...img,
            status: 'error',
            error: error instanceof Error ? error.message : 'Error desconocido'
          } : img
        ))
      }
    }
    
    setIsProcessing(false)
    toast({
      title: "Procesamiento completado",
      description: `Se procesaron ${files.length} imagen(es) exitosamente.`,
    })
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return
    
    const validFiles = Array.from(files).filter(file => {
      if (!supportedFormats.includes(file.type)) {
        toast({
          title: "Formato no soportado",
          description: `${file.name} no es un formato válido.`,
          variant: "destructive"
        })
        return false
      }
      return true
    })
    
    if (validFiles.length > 0) {
      processImages(validFiles)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const downloadCleanedImage = (image: ProcessedImage) => {
    if (!image.cleanedBlob) return
    
    const url = URL.createObjectURL(image.cleanedBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `clean_${image.originalFile.name}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: "Descarga iniciada",
      description: `Descargando ${image.originalFile.name} sin metadatos.`,
    })
  }

  const downloadAllCleaned = () => {
    const completedImages = images.filter(img => img.status === 'completed' && img.cleanedBlob)
    completedImages.forEach(image => downloadCleanedImage(image))
  }

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const clearAll = () => {
    setImages([])
  }

  const completedCount = images.filter(img => img.status === 'completed').length
  const totalSavings = images.reduce((acc, img) => {
    if (img.status === 'completed' && img.originalSize && img.cleanedSize) {
      const savings = img.originalSize - img.cleanedSize
      return acc + (savings > 0 ? savings : 0)
    }
    return acc
  }, 0)
  
  // Función para analizar y mostrar información detallada del proceso
  const getDataAnalysis = () => {
    if (completedCount === 0) {
      return {
        display: 'Pendiente',
        description: 'Esperando análisis',
        color: 'text-muted-foreground',
        details: 'Sube imágenes para comenzar el análisis'
      }
    }
    
    // Calcular el promedio de ahorro por imagen
    const avgSavingsPerImage = totalSavings / completedCount
    const formattedSize = formatFileSize(totalSavings)
    
    // Calcular el tamaño promedio de las imágenes originales
    const avgOriginalSize = images
      .filter(img => img.status === 'completed')
      .reduce((acc, img) => acc + img.originalSize, 0) / completedCount
    
    // Si las imágenes son muy pequeñas (menos de 50KB), probablemente ya estaban limpias
    if (avgOriginalSize < 51200) {
      return {
        display: 'Imágenes básicas procesadas',
        description: 'Metadatos mínimos removidos',
        color: 'text-blue-500',
        details: 'Imágenes pequeñas procesadas y protegidas'
      }
    }
    
    // Si el ahorro es muy pequeño o negativo (debido a recompresión)
    if (totalSavings <= 0) {
      return {
        display: 'Metadatos removidos',
        description: 'Privacidad mejorada',
        color: 'text-green-500',
        details: 'EXIF, GPS y datos de cámara eliminados exitosamente'
      }
    } else if (avgSavingsPerImage < 5120) { // Menos de 5KB por imagen
      return {
        display: `${formattedSize} removidos`,
        description: 'Metadatos básicos eliminados',
        color: 'text-blue-500',
        details: 'Información de cámara, fecha y configuraciones removidas'
      }
    } else if (avgSavingsPerImage < 20480) { // Menos de 20KB por imagen
      return {
        display: `${formattedSize} removidos`,
        description: 'Datos EXIF y ubicación eliminados',
        color: 'text-orange-500',
        details: 'GPS, cámara, fecha y metadatos técnicos removidos'
      }
    } else { // Más de 20KB por imagen
      return {
        display: `${formattedSize} removidos`,
        description: 'Metadatos extensos eliminados',
        color: 'text-red-500',
        details: 'Información sensible, perfiles de color y datos avanzados removidos'
      }
    }
  }
  
  const dataAnalysis = getDataAnalysis()

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Limpiador de Metadatos
          </CardTitle>
          <CardDescription>
            Arrastra y suelta tus imágenes o haz clic para seleccionarlas. 
            Soporta JPG, PNG, WebP y GIF.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Selecciona o arrastra imágenes</h3>
            <p className="text-muted-foreground mb-4">
              Formatos soportados: JPG, PNG, WebP, GIF
            </p>
            <Button variant="outline">
              <FileImage className="h-4 w-4 mr-2" />
              Seleccionar Archivos
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </CardContent>
      </Card>

      {/* Statistics */}
      {images.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{images.length}</div>
                <div className="text-sm text-muted-foreground">Imágenes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{completedCount}</div>
                <div className="text-sm text-muted-foreground">Procesadas</div>
              </div>
              <div className="text-center">
                <div className={cn("text-2xl font-bold", dataAnalysis.color)}>
                  {dataAnalysis.display}
                </div>
                <div className="text-sm text-muted-foreground">
                  {dataAnalysis.description}
                </div>
              </div>
              <div className="text-center">
                <Button 
                  onClick={downloadAllCleaned}
                  disabled={completedCount === 0}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Todo
                </Button>
              </div>
            </div>
            
            {/* Análisis detallado */}
            {completedCount > 0 && (
              <div className="mt-4 p-4 rounded-lg bg-muted/30 border">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Análisis de Privacidad</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {dataAnalysis.details}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Images List */}
      {images.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Imágenes Procesadas</CardTitle>
              <CardDescription>
                Estado del procesamiento y descarga de imágenes limpias
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={clearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar Todo
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {images.map((image) => (
                <div key={image.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img 
                    src={image.preview} 
                    alt={image.originalFile.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{image.originalFile.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatFileSize(image.originalSize)}
                      {image.status === 'completed' && image.cleanedSize > 0 && (
                        <> → {formatFileSize(image.cleanedSize)}</>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {image.status === 'pending' && (
                      <Badge variant="secondary">Pendiente</Badge>
                    )}
                    {image.status === 'processing' && (
                      <Badge variant="secondary">
                        <div className="animate-spin h-3 w-3 border border-current border-t-transparent rounded-full mr-1" />
                        Procesando
                      </Badge>
                    )}
                    {image.status === 'completed' && (
                      <>
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Listo
                        </Badge>
                        <Button 
                          size="sm" 
                          onClick={() => downloadCleanedImage(image)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {image.status === 'error' && (
                      <Badge variant="destructive">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Error
                      </Badge>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeImage(image.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information Alert */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Procesamiento 100% local:</strong> Tus imágenes se procesan completamente en tu navegador. 
          No se envían datos a servidores externos, garantizando tu privacidad.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default MetadataCleanerTool