import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import VerificadorContrasenasClient from "@/components/tools/verificador-contrasenas-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("verificador-contrasenas", locale, {
  title: "Verificador de Contraseñas Filtradas",
  description: "Comprueba si tu contraseña ha sido expuesta en filtraciones de datos usando Have I Been Pwned. Tu contraseña nunca se envía al servidor.",
  slug: "tools/verificador-contrasenas",
  keywords: ["verificador contraseñas", "contraseñas filtradas", "have i been pwned", "data breach", "seguridad contraseñas", "k-anonymity"]
});
}

export default async function VerificadorContrasenasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/verificador-contrasenas" : `https://tecnocrypter.com/${locale}/tools/verificador-contrasenas`;

  const toolName = tTools("verificador-contrasenas.name");
  const toolDesc = tTools("verificador-contrasenas.description");

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
      <VerificadorContrasenasClient />
    </>
  )
}
