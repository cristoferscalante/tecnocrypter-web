import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"
import ComparadorArchivosClient from "@/components/tools/comparador-archivos-client"

export const metadata: Metadata = generateToolMetadata({
  title: "Comparador de Archivos",
  description: "Compara dos archivos o textos lÃ­nea por lÃ­nea y visualiza las diferencias al instante. Detecta cambios, adiciones y eliminaciones con resaltado visual. Todo funciona en tu navegador.",
  slug: "tools/comparador-archivos",
  keywords: [
    "comparador archivos",
    "comparar textos",
    "diff online",
    "diferencias entre archivos",
    "comparar cÃ³digo",
    "comparador de texto online",
    "diff checker",
    "herramienta comparaciÃ³n",
  ],
})

export default function ComparadorArchivos() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Comparador de Archivos", url: "https://tecnocrypter.com/tools/comparador-archivos" },
      ]} />
      <WebApplicationStructuredData
        name="Comparador de Archivos - TecnoCrypter"
        description="Compara dos textos o archivos lÃ­nea por lÃ­nea con resaltado visual de diferencias."
        url="https://tecnocrypter.com/tools/comparador-archivos"
        category="DeveloperApplication"
      />
      <ComparadorArchivosClient />
    </>
  )
}