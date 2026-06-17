import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorTotpClient from "@/components/tools/generador-totp-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-totp", locale, {
  title: "Generador TOTP/2FA Online",
  description: "Genera códigos TOTP (Time-based One-Time Password) para autenticación de dos factores. Compatible con Google Authenticator, Authy y más.",
  slug: "tools/generador-totp",
  keywords: ["generador totp", "2fa", "autenticación dos factores", "otp", "google authenticator", "seguridad"]
});
}

export default async function GeneradorTotpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-totp" : `https://tecnocrypter.com/${locale}/tools/generador-totp`;

  const toolName = tTools("generador-totp.name");
  const toolDesc = tTools("generador-totp.description");

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
      <GeneradorTotpClient />
    </>
  )
}
