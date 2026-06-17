import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
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

export default async function MinificadorCssPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/minificador-css" : `https://tecnocrypter.com/${locale}/tools/minificador-css`;

  const toolName = tTools("minificador-css.name");
  const toolDesc = tTools("minificador-css.description");

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
      <MinificadorCssClient />
    </>
  )
}
