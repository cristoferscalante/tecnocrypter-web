import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import CodificadorBase32 from "@/components/tools/codificador-base32-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("codificador-base32", locale, {
  title: "Codificador Base32",
  description: "Codifica y decodifica textos y archivos en Base32, Base32Hex, z-base-32 y Crockford. Herramienta online gratuita que funciona completamente en tu navegador sin enviar datos.",
  slug: "tools/codificador-base32",
  keywords: [
    "codificador base32",
    "decodificador base32",
    "base32 online",
    "convertir base32",
    "base32hex",
    "crockford base32",
    "codificación binaria",
    "herramienta base32",
  ],
});
}

export default async function CodificadorBase32Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/codificador-base32" : `https://tecnocrypter.com/${locale}/tools/codificador-base32`;

  const toolName = tTools("codificador-base32.name");
  const toolDesc = tTools("codificador-base32.description");

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
        category="DeveloperApplication"
      />
      <CodificadorBase32 />
    </>
  )
}
