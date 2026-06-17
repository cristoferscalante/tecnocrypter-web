import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import AnalizadorCookiesClient from "@/components/tools/analizador-cookies-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("analizador-cookies", locale, {
  title: "Analizador de Cookies HTTP",
  description: "Analiza cookies HTTP y verifica sus atributos de seguridad: Secure, HttpOnly, SameSite, expiración y más.",
  slug: "tools/analizador-cookies",
  keywords: ["analizador cookies", "cookies http", "seguridad cookies", "SameSite", "HttpOnly", "Secure", "privacidad"]
});
}

export default async function AnalizadorCookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/analizador-cookies" : `https://tecnocrypter.com/${locale}/tools/analizador-cookies`;

  const toolName = tTools("analizador-cookies.name");
  const toolDesc = tTools("analizador-cookies.description");

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
      <AnalizadorCookiesClient />
    </>
  )
}
