import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"
import CifradoOnline from "@/components/tools/cifrado-online-client"

export const metadata: Metadata = generateToolMetadata({
  title: "Cifrado Online",
  description: "Cifra y descifra textos y archivos de forma segura directamente en tu navegador. Soporta AES-256-GCM, ChaCha20 y mÃ¡s algoritmos de encriptaciÃ³n modernos sin enviar datos al servidor.",
  slug: "tools/cifrado-online",
  keywords: [
    "cifrado online",
    "encriptar texto",
    "descifrar texto",
    "AES-256",
    "encriptaciÃ³n online",
    "cifrado de archivos",
    "herramienta cifrado",
    "encriptar gratis",
  ],
})

export default function CifradoOnlinePage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Cifrado Online", url: "https://tecnocrypter.com/tools/cifrado-online" },
      ]} />
      <WebApplicationStructuredData
        name="Cifrado Online - TecnoCrypter"
        description="Cifra y descifra textos y archivos con AES-256-GCM y mÃ¡s algoritmos de encriptaciÃ³n."
        url="https://tecnocrypter.com/tools/cifrado-online"
      />
      <CifradoOnline />
    </>
  )
}
