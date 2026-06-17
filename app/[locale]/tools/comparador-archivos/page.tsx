import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import ComparadorArchivosClient from "@/components/tools/comparador-archivos-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("comparador-archivos", locale, {
  title: "Comparador de Archivos",
  description: "Compara dos archivos o textos línea por línea y visualiza las diferencias al instante. Detecta cambios, adiciones y eliminaciones con resaltado visual. Todo funciona en tu navegador.",
  slug: "tools/comparador-archivos",
  keywords: [
    "comparador archivos",
    "comparar textos",
    "diff online",
    "diferencias entre archivos",
    "comparar código",
    "comparador de texto online",
    "diff checker",
    "herramienta comparación",
  ],
});
}

export default async function ComparadorArchivos({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/comparador-archivos" : `https://tecnocrypter.com/${locale}/tools/comparador-archivos`;

  const toolName = tTools("comparador-archivos.name");
  const toolDesc = tTools("comparador-archivos.description");

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
        category="DeveloperApplication"
      />
      <ComparadorArchivosClient />
    </>
  )
}
