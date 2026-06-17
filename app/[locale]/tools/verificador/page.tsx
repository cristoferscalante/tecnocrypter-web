import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import VerificadorClient from "@/components/tools/verificador-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("verificador", locale, {
  title: "Verificador de URL",
  description: "Analiza la seguridad de URLs y detecta posibles amenazas antes de visitarlas. Verifica dominios, certificados SSL y reputación.",
  slug: "tools/verificador",
  image: "/Seo/verificador.png",
  keywords: ["verificador URL", "seguridad web", "phishing", "malware", "análisis de enlaces", "ciberseguridad"]
});
}

export default async function VerificadorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/verificador" : `https://tecnocrypter.com/${locale}/tools/verificador`;

  const toolName = tTools("verificador.name");
  const toolDesc = tTools("verificador.description");

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
      <VerificadorClient />
    </>
  )
}
