import type { Metadata } from "next"
import GeneradorContrasenasClient from "@/components/tools/generador-contrasenas-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-contrasenas", locale, {
  title: "Generador de Contraseñas Seguras",
  description: "Genera contraseñas seguras y aleatorias con nuestro generador avanzado. Incluye validadores, recomendaciones automáticas y consejos de seguridad.",
  slug: "tools/generador-contrasenas",
  image: "/Seo/generador-contrasenas.jpg",
  keywords: ["generador contraseñas", "contraseñas seguras", "seguridad", "ciberseguridad", "protección", "passwords"]
});
}

export default function GeneradorContrasenasPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador de Contraseñas", url: "https://tecnocrypter.com/tools/generador-contrasenas" },
      ]} />
      <WebApplicationStructuredData
        name="Generador de Contraseñas Seguras - TecnoCrypter"
        description="Genera contraseñas seguras y aleatorias con validadores y recomendaciones."
        url="https://tecnocrypter.com/tools/generador-contrasenas"
      />
      <GeneradorContrasenasClient />
    </>
  )
}