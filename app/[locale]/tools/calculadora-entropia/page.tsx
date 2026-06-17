import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import CalculadoraEntropiaClient from "@/components/tools/calculadora-entropia-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("calculadora-entropia", locale, {
  title: "Calculadora de Entropía de Contraseñas",
  description: "Calcula la entropía y fortaleza de tus contraseñas. Muestra bits de entropía, tiempo estimado de crackeo y recomendaciones de seguridad.",
  slug: "tools/calculadora-entropia",
  keywords: ["entropía contraseña", "fortaleza password", "bits entropía", "seguridad contraseñas", "crackeo"]
});
}

export default async function CalculadoraEntropiaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/calculadora-entropia" : `https://tecnocrypter.com/${locale}/tools/calculadora-entropia`;

  const toolName = tTools("calculadora-entropia.name");
  const toolDesc = tTools("calculadora-entropia.description");

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
      <CalculadoraEntropiaClient />
    </>
  )
}
