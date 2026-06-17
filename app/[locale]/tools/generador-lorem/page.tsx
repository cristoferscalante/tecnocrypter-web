import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorLoremClient from "@/components/tools/generador-lorem-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-lorem", locale, {
  title: "Generador Lorem Ipsum Online",
  description: "Genera texto placeholder Lorem Ipsum para diseño y desarrollo. Párrafos, oraciones o palabras personalizables al instante. Herramienta gratuita.",
  slug: "tools/generador-lorem",
  keywords: ["lorem ipsum", "generador lorem ipsum", "texto placeholder", "texto de relleno", "dummy text", "lorem ipsum generator"]
});
}

export default async function GeneradorLoremPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-lorem" : `https://tecnocrypter.com/${locale}/tools/generador-lorem`;

  const toolName = tTools("generador-lorem.name");
  const toolDesc = tTools("generador-lorem.description");

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
      <GeneradorLoremClient />
    </>
  )
}
