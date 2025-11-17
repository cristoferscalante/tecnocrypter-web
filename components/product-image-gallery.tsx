"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProductImage } from "@/types"

interface ProductImageGalleryProps {
  images: ProductImage[] | string[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Sin imágenes disponibles</span>
      </div>
    )
  }

  // Normalizar imágenes a un formato consistente
  const normalizedImages = images.map(img => 
    typeof img === 'string' ? { url: img, alt: productName } : img
  ).sort((a, b) => {
    // Si tienen display_order, usarlo para ordenar
    const orderA = 'display_order' in a ? a.display_order : 0
    const orderB = 'display_order' in b ? b.display_order : 0
    return orderA - orderB
  })

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % normalizedImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length)
  }

  const currentImage = normalizedImages[selectedImage]

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden group">
        <img
          src={currentImage.url}
          alt={currentImage.alt || `${productName} - Imagen ${selectedImage + 1}`}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        
        {/* Botón de expandir */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Expand className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={currentImage.url}
                alt={currentImage.alt || `${productName} - Imagen ${selectedImage + 1}`}
                className="object-cover w-full h-full"
              />
              
              {/* Controles de navegación en el modal */}
              {normalizedImages.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Controles de navegación */}
        {normalizedImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {/* Indicador de imagen actual */}
        {normalizedImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {normalizedImages.length}
          </div>
        )}
      </div>
      
      {/* Miniaturas */}
      {normalizedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {normalizedImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-all",
                selectedImage === index
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-muted-foreground/20"
              )}
            >
              <img
                src={image.url}
                alt={image.alt || `${productName} - Miniatura ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}