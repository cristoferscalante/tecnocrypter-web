import type { Metadata } from "next"
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

export default function GeneradorCronPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador Cron", url: "https://tecnocrypter.com/tools/generador-cron" },
      ]} />
      <WebApplicationStructuredData
        name="Generador de Expresiones Cron - TecnoCrypter"
        description="Construye expresiones cron visualmente con presets y próximas ejecuciones."
        url="https://tecnocrypter.com/tools/generador-cron"
      />
      <GeneradorCronClient />
    </>
  )
}
