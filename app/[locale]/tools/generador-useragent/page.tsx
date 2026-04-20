import type { Metadata } from "next"
import GeneradorUseragentClient from "@/components/tools/generador-useragent-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Generador y Analizador de User-Agent",
  description: "Genera User-Agents personalizados y analiza cadenas UA para extraer navegador, SO, dispositivo y motor de renderizado.",
  slug: "tools/generador-useragent",
  keywords: ["user agent", "generador user-agent", "analizador ua", "navegador", "user agent string", "privacidad"]
})

export default function GeneradorUseragentPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador de User-Agent", url: "https://tecnocrypter.com/tools/generador-useragent" },
      ]} />
      <WebApplicationStructuredData
        name="Generador de User-Agent - TecnoCrypter"
        description="Genera y analiza cadenas User-Agent para testing y privacidad."
        url="https://tecnocrypter.com/tools/generador-useragent"
      />
      <GeneradorUseragentClient />
    </>
  )
}
