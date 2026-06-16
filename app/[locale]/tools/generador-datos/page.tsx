import type { Metadata } from "next"
import GeneradorDatosClient from "@/components/tools/generador-datos-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-datos", locale, {
  title: "Generador de Datos Ficticios",
  description: "Genera identidades ficticias realistas con nombre, email, teléfono, dirección y más. Ideal para testing y proteger tu privacidad.",
  slug: "tools/generador-datos",
  keywords: ["datos ficticios", "generador identidades", "datos prueba", "faker", "testing", "privacidad"]
});
}

export default function GeneradorDatosPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador de Datos Ficticios", url: "https://tecnocrypter.com/tools/generador-datos" },
      ]} />
      <WebApplicationStructuredData
        name="Generador de Datos Ficticios - TecnoCrypter"
        description="Genera datos ficticios realistas para testing y protección de privacidad."
        url="https://tecnocrypter.com/tools/generador-datos"
      />
      <GeneradorDatosClient />
    </>
  )
}
