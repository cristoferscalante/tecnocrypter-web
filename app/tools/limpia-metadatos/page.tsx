import type { Metadata } from "next"
import LimpiaMetadatosClient from "@/components/tools/limpia-metadatos-client"

export const metadata: Metadata = {
  title: "Limpiador de Metadatos de Imágenes | TecnoCrypter",
  description: "Elimina metadatos EXIF, GPS y datos ocultos de tus imágenes antes de compartirlas. Protege tu privacidad con nuestro limpiador 100% cliente.",
  keywords: ["limpiador metadatos", "EXIF", "GPS", "privacidad", "imágenes", "seguridad"],
}

export default function LimpiaMetadatosPage() {
  return <LimpiaMetadatosClient />
}