import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorAliasClient from "@/components/tools/generador-alias-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-alias", locale, {
  title: "Generador de Alias de Email",
  description: "Crea variaciones de tu email con +tags y puntos para rastrear quién comparte tus datos y filtrar spam automáticamente.",
  slug: "tools/generador-alias",
  keywords: ["alias email", "email tags", "subaddressing", "privacidad email", "anti spam", "gmail trucos"]
});
}

export default async function GeneradorAliasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-alias" : `https://tecnocrypter.com/${locale}/tools/generador-alias`;

  const toolName = tTools("generador-alias.name");
  const toolDesc = tTools("generador-alias.description");

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
      <GeneradorAliasClient />
    </>
  )
}
