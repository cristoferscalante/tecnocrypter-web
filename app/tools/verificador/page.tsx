import type { Metadata } from "next"
import VerificadorClient from "@/components/tools/verificador-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Verificador de URL",
  description: "Analiza la seguridad de URLs y detecta posibles amenazas antes de visitarlas. Verifica dominios, certificados SSL y reputación.",
  slug: "tools/verificador",
  image: "/Seo/verificador-url.jpg",
  keywords: ["verificador URL", "seguridad web", "phishing", "malware", "análisis de enlaces", "ciberseguridad"]
})

export default function VerificadorPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Verificador de URL", url: "https://tecnocrypter.com/tools/verificador" },
      ]} />
      <WebApplicationStructuredData
        name="Verificador de URL - TecnoCrypter"
        description="Analiza la seguridad de URLs y detecta phishing, malware y amenazas."
        url="https://tecnocrypter.com/tools/verificador"
      />
      <VerificadorClient />
    </>
  )
}