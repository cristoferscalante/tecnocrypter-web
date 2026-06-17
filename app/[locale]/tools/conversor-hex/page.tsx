import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import ConversorHexClient from "@/components/tools/conversor-hex-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("conversor-hex", locale, {
  title: "Conversor Hexadecimal Online",
  description: "Convierte entre texto, hexadecimal, decimal, binario y colores RGB. Herramienta gratuita de conversión hex 100% en tu navegador.",
  slug: "tools/conversor-hex",
  keywords: ["hexadecimal", "conversor hex", "hex a texto", "hex a decimal", "hex a rgb", "binario", "colores hex"]
});
}

export default async function ConversorHexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/conversor-hex" : `https://tecnocrypter.com/${locale}/tools/conversor-hex`;

  const toolName = tTools("conversor-hex.name");
  const toolDesc = tTools("conversor-hex.description");

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
      <ConversorHexClient />
    </>
  )
}
