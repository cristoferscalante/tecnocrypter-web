import type { Metadata } from "next"
import LimpiaMetadatosClient from "@/components/tools/limpia-metadatos-client"
import { generateToolMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateToolMetadata({
  title: "Limpiador de Metadatos de Imágenes",
  description: "Elimina metadatos EXIF, GPS y datos ocultos de tus imágenes antes de compartirlas. Protege tu privacidad con nuestro limpiador 100% cliente.",
  slug: "tools/limpia-metadatos",
  image: "/Seo/limpia-metadatos.jpg",
  keywords: ["limpiador metadatos", "EXIF", "GPS", "privacidad", "imágenes", "seguridad", "metadata cleaner"]
})

export default function LimpiaMetadatosPage() {
  return (
    <LimpiaMetadatosClient />
  )
}