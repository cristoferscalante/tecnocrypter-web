import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import QrGeneratorClient from "@/components/tools/qr-generator-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-qr", locale, {
  title: "Generador de Códigos QR",
  description: "Genera códigos QR personalizados para enlaces, textos y más. Personaliza colores, tamaño y añade tu logo.",
  slug: "tools/generador-qr",
  image: "/Seo/generador-qr.png",
  keywords: ["generador QR", "códigos QR", "QR personalizado", "crear QR", "QR con logo", "herramientas seguridad"]
});
}

export default async function GeneradorQrPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-qr" : `https://tecnocrypter.com/${locale}/tools/generador-qr`;

  const toolName = tTools("generador-qr.name");
  const toolDesc = tTools("generador-qr.description");

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
        category="UtilitiesApplication"
      />
      <QrGeneratorClient />
    </>
  )
}
