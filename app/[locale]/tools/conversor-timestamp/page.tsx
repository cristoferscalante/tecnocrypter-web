import type { Metadata } from "next"
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

export default function ConversorTimestampPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Conversor Timestamp", url: "https://tecnocrypter.com/tools/conversor-timestamp" },
      ]} />
      <WebApplicationStructuredData
        name="Conversor Unix Timestamp Online - TecnoCrypter"
        description="Convierte entre Unix timestamp y fecha legible con soporte de zonas horarias."
        url="https://tecnocrypter.com/tools/conversor-timestamp"
      />
      <ConversorTimestampClient />
    </>
  )
}
