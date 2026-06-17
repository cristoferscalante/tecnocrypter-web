import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
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

export default async function CodificadorUrlPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/codificador-url" : `https://tecnocrypter.com/${locale}/tools/codificador-url`;

  const toolName = tTools("codificador-url.name");
  const toolDesc = tTools("codificador-url.description");

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
      <CodificadorUrlClient />
    </>
  )
}
