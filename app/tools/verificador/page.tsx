import type { Metadata } from "next"
import VerificadorClient from "@/components/tools/verificador-client"

export const metadata: Metadata = {
  title: "Verificador de URL | TecnoCrypter",
  description: "Analiza la seguridad de URLs y detecta posibles amenazas antes de visitarlas. Verifica dominios, certificados SSL y reputación.",
  keywords: ["verificador URL", "seguridad web", "phishing", "malware", "análisis de enlaces"],
}

export default function VerificadorPage() {
  return <VerificadorClient />
}