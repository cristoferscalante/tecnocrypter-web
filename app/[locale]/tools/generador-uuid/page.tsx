import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorUuidClient from "@/components/tools/generador-uuid-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-uuid", locale, {
  title: "Generador UUID, ULID y Nano ID Online",
  description: "Genera identificadores únicos UUID v4, UUID v7, ULID y Nano ID con generación en lote. Herramienta gratuita con crypto seguro.",
  slug: "tools/generador-uuid",
  keywords: ["generador uuid", "uuid v4", "uuid v7", "ulid", "nanoid", "identificador único", "id generator"]
});
}

export default async function GeneradorUuidPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-uuid" : `https://tecnocrypter.com/${locale}/tools/generador-uuid`;

  const toolName = tTools("generador-uuid.name");
  const toolDesc = tTools("generador-uuid.description");

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
      <GeneradorUuidClient />
    </>
  )
}
