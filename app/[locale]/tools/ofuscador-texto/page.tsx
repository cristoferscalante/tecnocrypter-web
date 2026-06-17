import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import OfuscadorTextoClient from "@/components/tools/ofuscador-texto-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("ofuscador-texto", locale, {
  title: "Ofuscador de Texto",
  description: "Ofusca texto usando homoglifos, Zalgo, caracteres invisibles y más técnicas Unicode para proteger tu privacidad o evitar filtros.",
  slug: "tools/ofuscador-texto",
  keywords: ["ofuscador texto", "homoglifos", "zalgo text", "unicode", "caracteres invisibles", "privacidad"]
});
}

export default async function OfuscadorTextoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/ofuscador-texto" : `https://tecnocrypter.com/${locale}/tools/ofuscador-texto`;

  const toolName = tTools("ofuscador-texto.name");
  const toolDesc = tTools("ofuscador-texto.description");

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
      <OfuscadorTextoClient />
    </>
  )
}
