import type { Metadata } from "next"
import ConversorBase64Client from "@/components/tools/conversor-base64-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Conversor Base64 Online",
  description: "Codifica y decodifica texto, archivos e imágenes en Base64. Convierte imágenes a Data URI. Herramienta gratuita 100% en tu navegador.",
  slug: "tools/conversor-base64",
  keywords: ["base64", "codificar base64", "decodificar base64", "data uri", "conversor", "encode", "decode"]
})

export default function ConversorBase64Page() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Conversor Base64", url: "https://tecnocrypter.com/tools/conversor-base64" },
      ]} />
      <WebApplicationStructuredData
        name="Conversor Base64 Online - TecnoCrypter"
        description="Codifica y decodifica texto, archivos e imágenes en Base64. Convierte imágenes a Data URI."
        url="https://tecnocrypter.com/tools/conversor-base64"
      />
      <ConversorBase64Client />
    </>
  )
}
