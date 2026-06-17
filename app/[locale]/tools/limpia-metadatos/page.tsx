import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import LimpiaMetadatosClient from "@/components/tools/limpia-metadatos-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("limpia-metadatos", locale, {
  title: "Limpiador de Metadatos de Imágenes",
  description: "Elimina metadatos EXIF, GPS y datos ocultos de tus imágenes antes de compartirlas. Protege tu privacidad con nuestro limpiador 100% cliente.",
  slug: "tools/limpia-metadatos",
  image: "/Seo/limpia-metadatos.png",
  keywords: ["limpiador metadatos", "EXIF", "GPS", "privacidad", "imágenes", "seguridad", "metadata cleaner"]
});
}

export default async function LimpiaMetadatosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/limpia-metadatos" : `https://tecnocrypter.com/${locale}/tools/limpia-metadatos`;

  const toolName = tTools("limpia-metadatos.name");
  const toolDesc = tTools("limpia-metadatos.description");

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
      <LimpiaMetadatosClient />
    </>
  )
}
