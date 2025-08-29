import type { Metadata } from "next"
import VerificadorClient from "@/components/tools/verificador-client"
import { generateToolMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateToolMetadata({
  title: "Verificador de URL",
  description: "Analiza la seguridad de URLs y detecta posibles amenazas antes de visitarlas. Verifica dominios, certificados SSL y reputación.",
  slug: "tools/verificador",
  image: "https://tecnocrypter.com/images/og/verificador-url.jpg",
  keywords: "verificador URL, seguridad web, phishing, malware, análisis de enlaces, ciberseguridad"
})

export default function VerificadorPage() {
  return (
    <VerificadorClient />
  )
}