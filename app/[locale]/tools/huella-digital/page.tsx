import type { Metadata } from "next"
import HuellaDigitalClient from "@/components/tools/huella-digital-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Calculadora de Huella Digital del Navegador",
  description: "Descubre qué información revela tu navegador a los sitios web. Calcula tu huella digital y evalúa cuán rastreable eres online.",
  slug: "tools/huella-digital",
  keywords: ["huella digital navegador", "browser fingerprint", "privacidad", "rastreo web", "fingerprinting", "tracking"]
})

export default function HuellaDigitalPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Huella Digital", url: "https://tecnocrypter.com/tools/huella-digital" },
      ]} />
      <WebApplicationStructuredData
        name="Calculadora de Huella Digital - TecnoCrypter"
        description="Analiza tu huella digital del navegador y evalúa tu nivel de rastreabilidad."
        url="https://tecnocrypter.com/tools/huella-digital"
      />
      <HuellaDigitalClient />
    </>
  )
}
