import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import ConversorColoresClient from "@/components/tools/conversor-colores-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("conversor-colores", locale, {
  title: "Conversor de Colores Online",
  description: "Convierte colores entre HEX, RGB, HSL y RGBA. Selector visual con vista previa en tiempo real. Genera valores para CSS y Tailwind CSS. Herramienta gratuita.",
  slug: "tools/conversor-colores",
  keywords: ["conversor colores", "hex a rgb", "rgb a hsl", "color picker", "convertir colores", "hex to rgb", "css colors", "tailwind colors"]
});
}

export default async function ConversorColoresPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/conversor-colores" : `https://tecnocrypter.com/${locale}/tools/conversor-colores`;

  const toolName = tTools("conversor-colores.name");
  const toolDesc = tTools("conversor-colores.description");

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
      <ConversorColoresClient />
    </>
  )
}
