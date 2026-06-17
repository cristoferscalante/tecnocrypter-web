import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorUseragentClient from "@/components/tools/generador-useragent-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-useragent", locale, {
  title: "Generador y Analizador de User-Agent",
  description: "Genera User-Agents personalizados y analiza cadenas UA para extraer navegador, SO, dispositivo y motor de renderizado.",
  slug: "tools/generador-useragent",
  keywords: ["user agent", "generador user-agent", "analizador ua", "navegador", "user agent string", "privacidad"]
});
}

export default async function GeneradorUseragentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-useragent" : `https://tecnocrypter.com/${locale}/tools/generador-useragent`;

  const toolName = tTools("generador-useragent.name");
  const toolDesc = tTools("generador-useragent.description");

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
      <GeneradorUseragentClient />
    </>
  )
}
