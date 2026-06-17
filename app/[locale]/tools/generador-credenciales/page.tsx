import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorCredencialesClient from "@/components/tools/generador-credenciales-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-credenciales", locale, {
  title: "Generador de Credenciales Determinísticas",
  description: "Genera usuarios y contraseñas determinísticas a partir de una palabra clave maestra. Las credenciales se recrean siempre iguales sin almacenar nada. Todo funciona en tu navegador.",
  slug: "tools/generador-credenciales",
  keywords: [
    "generador credenciales",
    "credenciales determinísticas",
    "generador usuarios",
    "contraseña maestra",
    "gestor contraseñas",
    "credenciales seguras",
    "generador determinístico",
    "seguridad contraseñas",
  ],
});
}

export default async function GeneradorCredenciales({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-credenciales" : `https://tecnocrypter.com/${locale}/tools/generador-credenciales`;

  const toolName = tTools("generador-credenciales.name");
  const toolDesc = tTools("generador-credenciales.description");

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
      <GeneradorCredencialesClient />
    </>
  )
}
