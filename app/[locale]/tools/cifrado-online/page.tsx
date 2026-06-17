import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import CifradoOnline from "@/components/tools/cifrado-online-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("cifrado-online", locale, {
  title: "Cifrado Online - AES-256 y ChaCha20 Gratis",
  description: "Cifra y descifra textos y archivos de forma segura directamente en tu navegador. Soporta AES-256-GCM, ChaCha20 y más algoritmos modernos sin enviar datos al servidor.",
  slug: "tools/cifrado-online",
  keywords: [
    "cifrado online",
    "encriptar texto",
    "descifrar texto",
    "AES-256",
    "encriptación online",
    "cifrado de archivos",
    "herramienta cifrado",
    "encriptar gratis",
  ],
});
}

export default async function CifradoOnlinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/cifrado-online" : `https://tecnocrypter.com/${locale}/tools/cifrado-online`;

  const toolName = tTools("cifrado-online.name");
  const toolDesc = tTools("cifrado-online.description");

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
      <CifradoOnline />
    </>
  )
}
