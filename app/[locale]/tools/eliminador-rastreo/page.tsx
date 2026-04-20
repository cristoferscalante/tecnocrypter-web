import type { Metadata } from "next"
import EliminadorRastreoClient from "@/components/tools/eliminador-rastreo-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Eliminador de Rastreo URL",
  description: "Elimina parámetros de rastreo (UTM, fbclid, gclid, etc.) de URLs para proteger tu privacidad al compartir enlaces.",
  slug: "tools/eliminador-rastreo",
  keywords: ["eliminar tracking url", "limpiar utm", "privacidad url", "fbclid", "gclid", "rastreo enlaces"]
})

export default function EliminadorRastreoPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Eliminador de Rastreo URL", url: "https://tecnocrypter.com/tools/eliminador-rastreo" },
      ]} />
      <WebApplicationStructuredData
        name="Eliminador de Rastreo URL - TecnoCrypter"
        description="Limpia parámetros de rastreo de tus URLs para proteger tu privacidad."
        url="https://tecnocrypter.com/tools/eliminador-rastreo"
      />
      <EliminadorRastreoClient />
    </>
  )
}
