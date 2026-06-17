import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorCronClient from "@/components/tools/generador-cron-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-cron", locale, {
  title: "Generador de Expresiones Cron",
  description: "Construye expresiones cron visualmente con descripción en español y vista previa de las próximas ejecuciones.",
  slug: "tools/generador-cron",
  keywords: ["generador cron", "cron expression", "crontab", "programar tareas", "cron builder", "desarrollo"]
});
}

export default async function GeneradorCronPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-cron" : `https://tecnocrypter.com/${locale}/tools/generador-cron`;

  const toolName = tTools("generador-cron.name");
  const toolDesc = tTools("generador-cron.description");

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
      <GeneradorCronClient />
    </>
  )
}
