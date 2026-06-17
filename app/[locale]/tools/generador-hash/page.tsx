import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorHash from "@/components/tools/generador-hash-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-hash", locale, {
  title: "Generador de Hash",
  description: "Genera hashes MD5, SHA-1, SHA-256, SHA-384 y SHA-512 de textos y archivos. Compara hashes para verificar integridad. Herramienta gratuita que funciona en tu navegador.",
  slug: "tools/generador-hash",
  keywords: [
    "generador hash",
    "hash online",
    "SHA-256",
    "MD5 online",
    "SHA-512",
    "verificar hash",
    "hash de archivo",
    "generador hash online",
  ],
});
}

export default async function GeneradorHashPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-hash" : `https://tecnocrypter.com/${locale}/tools/generador-hash`;

  const toolName = tTools("generador-hash.name");
  const toolDesc = tTools("generador-hash.description");

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
      <GeneradorHash />
    </>
  )
}
