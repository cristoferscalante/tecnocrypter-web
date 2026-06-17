import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import HuellaDigitalClient from "@/components/tools/huella-digital-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("huella-digital", locale, {
  title: "Calculadora de Huella Digital del Navegador",
  description: "Descubre qué información revela tu navegador a los sitios web. Calcula tu huella digital y evalúa cuán rastreable eres online.",
  slug: "tools/huella-digital",
  keywords: ["huella digital navegador", "browser fingerprint", "privacidad", "rastreo web", "fingerprinting", "tracking"]
});
}

export default async function HuellaDigitalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/huella-digital" : `https://tecnocrypter.com/${locale}/tools/huella-digital`;

  const toolName = tTools("huella-digital.name");
  const toolDesc = tTools("huella-digital.description");

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
      <HuellaDigitalClient />
    </>
  )
}
