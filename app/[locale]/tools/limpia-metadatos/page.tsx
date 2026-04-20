import type { Metadata } from "next"
import LimpiaMetadatosClient from "@/components/tools/limpia-metadatos-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Limpiador de Metadatos de Imágenes",
  description: "Elimina metadatos EXIF, GPS y datos ocultos de tus imágenes antes de compartirlas. Protege tu privacidad con nuestro limpiador 100% cliente.",
  slug: "tools/limpia-metadatos",
  image: "/Seo/limpia-metadatos.jpg",
  keywords: ["limpiador metadatos", "EXIF", "GPS", "privacidad", "imágenes", "seguridad", "metadata cleaner"]
})

export default function LimpiaMetadatosPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Limpiador de Metadatos", url: "https://tecnocrypter.com/tools/limpia-metadatos" },
      ]} />
      <WebApplicationStructuredData
        name="Limpiador de Metadatos - TecnoCrypter"
        description="Elimina metadatos EXIF, GPS y datos ocultos de tus imágenes."
        url="https://tecnocrypter.com/tools/limpia-metadatos"
      />
      <LimpiaMetadatosClient />
    </>
  )
}