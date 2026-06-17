import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorContrasenasClient from "@/components/tools/generador-contrasenas-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-contrasenas", locale, {
  title: "Generador de Contraseñas Seguras",
  description: "Genera contraseñas seguras y aleatorias con nuestro generador avanzado. Incluye validadores, recomendaciones automáticas y consejos de seguridad.",
  slug: "tools/generador-contrasenas",
  image: "/Seo/generador-contrasenas.png",
  keywords: ["generador contraseñas", "contraseñas seguras", "seguridad", "ciberseguridad", "protección", "passwords"]
});
}

export default async function GeneradorContrasenasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-contrasenas" : `https://tecnocrypter.com/${locale}/tools/generador-contrasenas`;

  const toolName = tTools("generador-contrasenas.name");
  const toolDesc = tTools("generador-contrasenas.description");

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
      <GeneradorContrasenasClient />
    </>
  )
}
