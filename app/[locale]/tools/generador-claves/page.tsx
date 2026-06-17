import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorClavesClient from "@/components/tools/generador-claves-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-claves", locale, {
  title: "Generador de Claves RSA/ECDSA",
  description: "Genera pares de claves RSA y ECDSA en tu navegador con Web Crypto API. Exporta en formato PEM para uso en servidores y aplicaciones.",
  slug: "tools/generador-claves",
  keywords: ["generador claves RSA", "ECDSA", "par de claves", "clave pública", "clave privada", "PEM", "criptografía"]
});
}

export default async function GeneradorClavesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-claves" : `https://tecnocrypter.com/${locale}/tools/generador-claves`;

  const toolName = tTools("generador-claves.name");
  const toolDesc = tTools("generador-claves.description");

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
      <GeneradorClavesClient />
    </>
  )
}
