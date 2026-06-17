import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import ConversorUnidadesClient from "@/components/tools/conversor-unidades-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("conversor-unidades", locale, {
  title: "Conversor de Unidades Online",
  description: "Convierte entre unidades de longitud, peso, temperatura, almacenamiento de datos, tiempo y velocidad. Resultados instantáneos.",
  slug: "tools/conversor-unidades",
  keywords: ["conversor unidades", "convertir metros", "celsius fahrenheit", "bytes megabytes", "calculadora unidades"]
});
}

export default async function ConversorUnidadesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/conversor-unidades" : `https://tecnocrypter.com/${locale}/tools/conversor-unidades`;

  const toolName = tTools("conversor-unidades.name");
  const toolDesc = tTools("conversor-unidades.description");

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
      <ConversorUnidadesClient />
    </>
  )
}
