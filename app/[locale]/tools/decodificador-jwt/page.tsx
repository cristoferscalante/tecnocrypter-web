import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import DecodificadorJwtClient from "@/components/tools/decodificador-jwt-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("decodificador-jwt", locale, {
  title: "Decodificador JWT Online",
  description: "Decodifica y analiza JSON Web Tokens (JWT). Inspecciona header, payload, claims y verifica expiración. Herramienta gratuita y segura, 100% en tu navegador.",
  slug: "tools/decodificador-jwt",
  keywords: ["jwt", "decodificar jwt", "json web token", "jwt decoder", "jwt online", "token jwt", "oauth", "autenticación"]
});
}

export default async function DecodificadorJwtPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/decodificador-jwt" : `https://tecnocrypter.com/${locale}/tools/decodificador-jwt`;

  const toolName = tTools("decodificador-jwt.name");
  const toolDesc = tTools("decodificador-jwt.description");

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
      <DecodificadorJwtClient />
    </>
  )
}
