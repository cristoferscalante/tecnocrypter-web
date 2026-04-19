import type { Metadata } from "next"
import GeneradorAliasClient from "@/components/tools/generador-alias-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Generador de Alias de Email",
  description: "Crea variaciones de tu email con +tags y puntos para rastrear quién comparte tus datos y filtrar spam automáticamente.",
  slug: "tools/generador-alias",
  keywords: ["alias email", "email tags", "subaddressing", "privacidad email", "anti spam", "gmail trucos"]
})

export default function GeneradorAliasPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador de Alias", url: "https://tecnocrypter.com/tools/generador-alias" },
      ]} />
      <WebApplicationStructuredData
        name="Generador de Alias de Email - TecnoCrypter"
        description="Genera alias de email con +tags y puntos para filtrar spam y detectar filtraciones."
        url="https://tecnocrypter.com/tools/generador-alias"
      />
      <GeneradorAliasClient />
    </>
  )
}
