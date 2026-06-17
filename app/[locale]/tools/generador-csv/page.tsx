import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorCsvClient from "@/components/tools/generador-csv-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-csv", locale, {
  title: "Generador de Tablas CSV Online",
  description: "Crea tablas de datos visualmente y expórtalas como CSV. Edita celdas, añade columnas y descarga archivos CSV perfectos.",
  slug: "tools/generador-csv",
  keywords: ["generador csv", "crear csv", "tabla csv", "exportar csv", "datos tabulares", "excel"]
});
}

export default async function GeneradorCsvPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-csv" : `https://tecnocrypter.com/${locale}/tools/generador-csv`;

  const toolName = tTools("generador-csv.name");
  const toolDesc = tTools("generador-csv.description");

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
      <GeneradorCsvClient />
    </>
  )
}
