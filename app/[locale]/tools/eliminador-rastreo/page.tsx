import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import EliminadorRastreoClient from "@/components/tools/eliminador-rastreo-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("eliminador-rastreo", locale, {
  title: "Eliminador de Rastreo URL",
  description: "Elimina parámetros de rastreo (UTM, fbclid, gclid, etc.) de URLs para proteger tu privacidad al compartir enlaces.",
  slug: "tools/eliminador-rastreo",
  keywords: ["eliminar tracking url", "limpiar utm", "privacidad url", "fbclid", "gclid", "rastreo enlaces"]
});
}

export default async function EliminadorRastreoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/eliminador-rastreo" : `https://tecnocrypter.com/${locale}/tools/eliminador-rastreo`;

  const toolName = tTools("eliminador-rastreo.name");
  const toolDesc = tTools("eliminador-rastreo.description");

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
      <EliminadorRastreoClient />
    </>
  )
}
