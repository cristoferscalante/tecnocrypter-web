import type { Metadata } from "next"
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

export default function GeneradorTotpPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador TOTP", url: "https://tecnocrypter.com/tools/generador-totp" },
      ]} />
      <WebApplicationStructuredData
        name="Generador TOTP/2FA - TecnoCrypter"
        description="Genera códigos TOTP para autenticación de dos factores desde tu navegador."
        url="https://tecnocrypter.com/tools/generador-totp"
      />
      <GeneradorTotpClient />
    </>
  )
}
