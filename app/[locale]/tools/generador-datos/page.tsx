import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorDatosClient from "@/components/tools/generador-datos-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-datos", locale, {
  title: "Generador de Datos Ficticios",
  description: "Genera identidades ficticias realistas con nombre, email, teléfono, dirección y más. Ideal para testing y proteger tu privacidad.",
  slug: "tools/generador-datos",
  keywords: ["datos ficticios", "generador identidades", "datos prueba", "faker", "testing", "privacidad"]
});
}

export default async function GeneradorDatosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-datos" : `https://tecnocrypter.com/${locale}/tools/generador-datos`;

  const toolName = tTools("generador-datos.name");
  const toolDesc = tTools("generador-datos.description");

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
      <GeneradorDatosClient />
    </>
  )
}
