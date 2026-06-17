import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import ConversorBase64Client from "@/components/tools/conversor-base64-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("conversor-base64", locale, {
  title: "Conversor Base64 Online",
  description: "Codifica y decodifica texto, archivos e imágenes en Base64. Convierte imágenes a Data URI. Herramienta gratuita 100% en tu navegador.",
  slug: "tools/conversor-base64",
  keywords: ["base64", "codificar base64", "decodificar base64", "data uri", "conversor", "encode", "decode"]
});
}

export default async function ConversorBase64Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/conversor-base64" : `https://tecnocrypter.com/${locale}/tools/conversor-base64`;

  const toolName = tTools("conversor-base64.name");
  const toolDesc = tTools("conversor-base64.description");

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
      <ConversorBase64Client />
    </>
  )
}
