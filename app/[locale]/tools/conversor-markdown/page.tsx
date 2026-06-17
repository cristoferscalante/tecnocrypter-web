import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
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

export default async function ConversorMarkdownPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/conversor-markdown" : `https://tecnocrypter.com/${locale}/tools/conversor-markdown`;

  const toolName = tTools("conversor-markdown.name");
  const toolDesc = tTools("conversor-markdown.description");

  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: tNav("home"), url: homeUrl },
        { name: tNav("tools"), url: toolsUrl },
        { name: toolName, url: toolUrl },
      ]} />
      <WebApplicationStructuredData
        name={`${toolName} - TecnoCrypter`}
        description={toolDesc}
        url={toolUrl}
        inLanguage={locale}
        
      />
      <ConversorMarkdownClient />
    </>
  )
}
