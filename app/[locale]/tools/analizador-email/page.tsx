import type { Metadata } from "next"
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

export default function AnalizadorEmailPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Analizador de Email", url: "https://tecnocrypter.com/tools/analizador-email" },
      ]} />
      <WebApplicationStructuredData
        name="Analizador de Cabeceras de Email - TecnoCrypter"
        description="Analiza cabeceras de email para detectar spoofing y verificar autenticación."
        url="https://tecnocrypter.com/tools/analizador-email"
      />
      <AnalizadorEmailClient />
    </>
  )
}
