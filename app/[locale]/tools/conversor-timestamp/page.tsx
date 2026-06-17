import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import ConversorTimestampClient from "@/components/tools/conversor-timestamp-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("conversor-timestamp", locale, {
  title: "Conversor Unix Timestamp Online",
  description: "Convierte entre Unix timestamp y fecha legible con soporte de zonas horarias. Herramienta gratuita para desarrolladores 100% en tu navegador.",
  slug: "tools/conversor-timestamp",
  keywords: ["unix timestamp", "conversor timestamp", "epoch", "fecha unix", "timestamp a fecha", "fecha a timestamp", "zonas horarias"]
});
}

export default async function ConversorTimestampPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/conversor-timestamp" : `https://tecnocrypter.com/${locale}/tools/conversor-timestamp`;

  const toolName = tTools("conversor-timestamp.name");
  const toolDesc = tTools("conversor-timestamp.description");

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
      <ConversorTimestampClient />
    </>
  )
}
