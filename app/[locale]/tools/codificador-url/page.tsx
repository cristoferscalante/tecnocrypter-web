import type { Metadata } from "next"
import CodificadorUrlClient from "@/components/tools/codificador-url-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("codificador-url", locale, {
  title: "Codificador URL Online",
  description: "Codifica y decodifica URLs y parámetros. Soporta encodeURIComponent y encodeURI. Herramienta gratuita para percent-encoding, 100% en tu navegador.",
  slug: "tools/codificador-url",
  keywords: ["codificar url", "decodificar url", "url encode", "url decode", "percent encoding", "encodeURIComponent", "query string"]
});
}

export default function CodificadorUrlPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Codificador URL", url: "https://tecnocrypter.com/tools/codificador-url" },
      ]} />
      <WebApplicationStructuredData
        name="Codificador URL Online - TecnoCrypter"
        description="Codifica y decodifica URLs y parámetros con encodeURIComponent y encodeURI."
        url="https://tecnocrypter.com/tools/codificador-url"
      />
      <CodificadorUrlClient />
    </>
  )
}
