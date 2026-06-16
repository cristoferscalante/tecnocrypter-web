import type { Metadata } from "next"
import QrGeneratorClient from "@/components/tools/qr-generator-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-qr", locale, {
  title: "Generador de Códigos QR",
  description: "Genera códigos QR personalizados para enlaces, textos y más. Personaliza colores, tamaño y añade tu logo.",
  slug: "tools/generador-qr",
  image: "/Seo/generador-qr.jpg",
  keywords: ["generador QR", "códigos QR", "QR personalizado", "crear QR", "QR con logo", "herramientas seguridad"]
});
}

export default function GeneradorQrPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador de Códigos QR", url: "https://tecnocrypter.com/tools/generador-qr" },
      ]} />
      <WebApplicationStructuredData
        name="Generador de Códigos QR - TecnoCrypter"
        description="Genera códigos QR personalizados con colores, tamaño y logo personalizado."
        url="https://tecnocrypter.com/tools/generador-qr"
        category="UtilitiesApplication"
      />
      <QrGeneratorClient />
    </>
  )
}