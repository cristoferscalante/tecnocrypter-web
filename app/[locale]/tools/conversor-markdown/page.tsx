import type { Metadata } from "next"
import ConversorMarkdownClient from "@/components/tools/conversor-markdown-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("conversor-markdown", locale, {
  title: "Conversor Markdown a HTML Online",
  description: "Convierte Markdown a HTML y viceversa con vista previa en tiempo real. Soporta encabezados, listas, enlaces, imágenes y más. Herramienta gratuita.",
  slug: "tools/conversor-markdown",
  keywords: ["markdown a html", "conversor markdown", "markdown to html", "html to markdown", "markdown online", "markdown converter"]
});
}

export default function ConversorMarkdownPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Conversor Markdown", url: "https://tecnocrypter.com/tools/conversor-markdown" },
      ]} />
      <WebApplicationStructuredData
        name="Conversor Markdown a HTML Online - TecnoCrypter"
        description="Convierte Markdown a HTML y HTML a Markdown con vista previa en tiempo real."
        url="https://tecnocrypter.com/tools/conversor-markdown"
      />
      <ConversorMarkdownClient />
    </>
  )
}
