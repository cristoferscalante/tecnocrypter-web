import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import ContadorCaracteresClient from "@/components/tools/contador-caracteres-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("contador-caracteres", locale, {
  title: "Contador de Caracteres",
  description: "Cuenta caracteres, palabras, oraciones y párrafos en tiempo real. Incluye límites para Twitter, Instagram, LinkedIn y más. Analiza la densidad de palabras y legibilidad de tu texto.",
  slug: "tools/contador-caracteres",
  keywords: [
    "contador caracteres",
    "contador palabras",
    "contar caracteres online",
    "contador de texto",
    "límite caracteres twitter",
    "contador palabras online",
    "herramienta texto",
    "análisis de texto",
  ],
});
}

export default async function ContadorCaracteres({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/contador-caracteres" : `https://tecnocrypter.com/${locale}/tools/contador-caracteres`;

  const toolName = tTools("contador-caracteres.name");
  const toolDesc = tTools("contador-caracteres.description");

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
        category="UtilitiesApplication"
      />
      <ContadorCaracteresClient />
    </>
  )
}
