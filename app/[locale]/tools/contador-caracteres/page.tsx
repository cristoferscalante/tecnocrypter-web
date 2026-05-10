import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"
import ContadorCaracteresClient from "@/components/tools/contador-caracteres-client"

export const metadata: Metadata = generateToolMetadata({
  title: "Contador de Caracteres",
  description: "Cuenta caracteres, palabras, oraciones y párrafos en tiempo real. Incluye límites para Twitter, Instagram, LinkedIn y más. Analiza la densidad de palabras y legibilidad de tu texto.",
  slug: "tools/contador-caracteres",
  keywords: [
    "contador caracteres",
    "contador palabras",
    "contar caracteres online",
    "contador de texto",
    "límite caracteres twitter",
    "contador palabras online",
    "herramienta texto",
    "análisis de texto",
  ],
})

export default function ContadorCaracteres() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Contador de Caracteres", url: "https://tecnocrypter.com/tools/contador-caracteres" },
      ]} />
      <WebApplicationStructuredData
        name="Contador de Caracteres - TecnoCrypter"
        description="Cuenta caracteres, palabras y párrafos con límites para redes sociales."
        url="https://tecnocrypter.com/tools/contador-caracteres"
        category="UtilitiesApplication"
      />
      <ContadorCaracteresClient />
    </>
  )
}