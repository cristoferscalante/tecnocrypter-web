import type { Metadata } from "next"
import GeneradorClavesClient from "@/components/tools/generador-claves-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-claves", locale, {
  title: "Generador de Claves RSA/ECDSA",
  description: "Genera pares de claves RSA y ECDSA en tu navegador con Web Crypto API. Exporta en formato PEM para uso en servidores y aplicaciones.",
  slug: "tools/generador-claves",
  keywords: ["generador claves RSA", "ECDSA", "par de claves", "clave pública", "clave privada", "PEM", "criptografía"]
});
}

export default function GeneradorClavesPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador de Claves", url: "https://tecnocrypter.com/tools/generador-claves" },
      ]} />
      <WebApplicationStructuredData
        name="Generador de Claves RSA/ECDSA - TecnoCrypter"
        description="Genera pares de claves RSA y ECDSA con Web Crypto API directamente en tu navegador."
        url="https://tecnocrypter.com/tools/generador-claves"
      />
      <GeneradorClavesClient />
    </>
  )
}
