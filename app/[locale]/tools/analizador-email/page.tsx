import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import AnalizadorEmailClient from "@/components/tools/analizador-email-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("analizador-email", locale, {
  title: "Analizador de Cabeceras de Email",
  description: "Analiza cabeceras de email para detectar spoofing, verificar SPF/DKIM/DMARC y rastrear el origen de los mensajes.",
  slug: "tools/analizador-email",
  keywords: ["analizador email", "cabeceras email", "spoofing", "SPF", "DKIM", "DMARC", "phishing"]
});
}

export default async function AnalizadorEmailPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/analizador-email" : `https://tecnocrypter.com/${locale}/tools/analizador-email`;

  const toolName = tTools("analizador-email.name");
  const toolDesc = tTools("analizador-email.description");

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
      <AnalizadorEmailClient />
    </>
  )
}
