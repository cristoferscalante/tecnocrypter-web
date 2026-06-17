import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import RegexTesterClient from "@/components/tools/regex-tester-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("regex-tester", locale, {
  title: "Regex Tester Online",
  description: "Prueba expresiones regulares en tiempo real con resaltado de coincidencias, grupos de captura y flags configurables. Herramienta gratuita para probar regex.",
  slug: "tools/regex-tester",
  keywords: ["regex tester", "expresiones regulares", "regex online", "probar regex", "regexp", "regular expressions", "regex javascript"]
});
}

export default async function RegexTesterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/regex-tester" : `https://tecnocrypter.com/${locale}/tools/regex-tester`;

  const toolName = tTools("regex-tester.name");
  const toolDesc = tTools("regex-tester.description");

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
      <RegexTesterClient />
    </>
  )
}
