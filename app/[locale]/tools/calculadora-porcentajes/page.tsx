import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import CalculadoraPorcentajesClient from "@/components/tools/calculadora-porcentajes-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("calculadora-porcentajes", locale, {
  title: "Calculadora de Porcentajes Online",
  description: "Calcula porcentajes, cambios porcentuales, aumentos y descuentos al instante. 5 modos de cálculo diferentes.",
  slug: "tools/calculadora-porcentajes",
  keywords: ["calculadora porcentajes", "porcentaje", "descuento", "IVA", "cambio porcentual", "aumento"]
});
}

export default async function CalculadoraPorcentajesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/calculadora-porcentajes" : `https://tecnocrypter.com/${locale}/tools/calculadora-porcentajes`;

  const toolName = tTools("calculadora-porcentajes.name");
  const toolDesc = tTools("calculadora-porcentajes.description");

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
      <CalculadoraPorcentajesClient />
    </>
  )
}
