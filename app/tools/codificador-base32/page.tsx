import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"
import CodificadorBase32 from "@/components/tools/codificador-base32-client"

export const metadata: Metadata = generateToolMetadata({
  title: "Codificador Base32",
  description: "Codifica y decodifica textos y archivos en Base32, Base32Hex, z-base-32 y Crockford. Herramienta online gratuita que funciona completamente en tu navegador sin enviar datos.",
  slug: "tools/codificador-base32",
  keywords: [
    "codificador base32",
    "decodificador base32",
    "base32 online",
    "convertir base32",
    "base32hex",
    "crockford base32",
    "codificaciÃ³n binaria",
    "herramienta base32",
  ],
})

export default function CodificadorBase32Page() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Codificador Base32", url: "https://tecnocrypter.com/tools/codificador-base32" },
      ]} />
      <WebApplicationStructuredData
        name="Codificador Base32 - TecnoCrypter"
        description="Codifica y decodifica en Base32, Base32Hex, z-base-32 y Crockford."
        url="https://tecnocrypter.com/tools/codificador-base32"
        category="DeveloperApplication"
      />
      <CodificadorBase32 />
    </>
  )
}
