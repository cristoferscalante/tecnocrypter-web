import type { Metadata } from "next"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"
import GeneradorHash from "@/components/tools/generador-hash-client"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-hash", locale, {
  title: "Generador de Hash",
  description: "Genera hashes MD5, SHA-1, SHA-256, SHA-384 y SHA-512 de textos y archivos. Compara hashes para verificar integridad. Herramienta gratuita que funciona en tu navegador.",
  slug: "tools/generador-hash",
  keywords: [
    "generador hash",
    "hash online",
    "SHA-256",
    "MD5 online",
    "SHA-512",
    "verificar hash",
    "hash de archivo",
    "generador hash online",
  ],
});
}

export default function GeneradorHashPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador de Hash", url: "https://tecnocrypter.com/tools/generador-hash" },
      ]} />
      <WebApplicationStructuredData
        name="Generador de Hash - TecnoCrypter"
        description="Genera hashes MD5, SHA-1, SHA-256, SHA-384 y SHA-512 de textos y archivos."
        url="https://tecnocrypter.com/tools/generador-hash"
      />
      <GeneradorHash />
    </>
  )
}
