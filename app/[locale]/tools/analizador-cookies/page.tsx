import type { Metadata } from "next"
import AnalizadorCookiesClient from "@/components/tools/analizador-cookies-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("analizador-cookies", locale, {
  title: "Analizador de Cookies HTTP",
  description: "Analiza cookies HTTP y verifica sus atributos de seguridad: Secure, HttpOnly, SameSite, expiración y más.",
  slug: "tools/analizador-cookies",
  keywords: ["analizador cookies", "cookies http", "seguridad cookies", "SameSite", "HttpOnly", "Secure", "privacidad"]
});
}

export default function AnalizadorCookiesPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Analizador de Cookies", url: "https://tecnocrypter.com/tools/analizador-cookies" },
      ]} />
      <WebApplicationStructuredData
        name="Analizador de Cookies HTTP - TecnoCrypter"
        description="Analiza cookies HTTP y verifica sus atributos de seguridad."
        url="https://tecnocrypter.com/tools/analizador-cookies"
      />
      <AnalizadorCookiesClient />
    </>
  )
}
