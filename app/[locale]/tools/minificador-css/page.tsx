import type { Metadata } from "next"
import MinificadorCssClient from "@/components/tools/minificador-css-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("minificador-css", locale, {
  title: "Minificador de CSS y JavaScript",
  description: "Minifica CSS y JavaScript eliminando espacios, comentarios y caracteres innecesarios. Reduce el tamaño de tus archivos web.",
  slug: "tools/minificador-css",
  keywords: ["minificador css", "minificador javascript", "minify", "compresión web", "optimización", "rendimiento web"]
});
}

export default function MinificadorCssPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Minificador CSS/JS", url: "https://tecnocrypter.com/tools/minificador-css" },
      ]} />
      <WebApplicationStructuredData
        name="Minificador CSS/JS - TecnoCrypter"
        description="Minifica CSS y JavaScript para mejorar el rendimiento de tu sitio web."
        url="https://tecnocrypter.com/tools/minificador-css"
      />
      <MinificadorCssClient />
    </>
  )
}
