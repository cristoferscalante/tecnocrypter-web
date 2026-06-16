import type { Metadata } from "next"
import CalculadoraEntropiaClient from "@/components/tools/calculadora-entropia-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("calculadora-entropia", locale, {
  title: "Calculadora de Entropía de Contraseñas",
  description: "Calcula la entropía y fortaleza de tus contraseñas. Muestra bits de entropía, tiempo estimado de crackeo y recomendaciones de seguridad.",
  slug: "tools/calculadora-entropia",
  keywords: ["entropía contraseña", "fortaleza password", "bits entropía", "seguridad contraseñas", "crackeo"]
});
}

export default function CalculadoraEntropiaPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Calculadora de Entropía", url: "https://tecnocrypter.com/tools/calculadora-entropia" },
      ]} />
      <WebApplicationStructuredData
        name="Calculadora de Entropía de Contraseñas - TecnoCrypter"
        description="Calcula la entropía y fortaleza de tus contraseñas con estimaciones de tiempo de crackeo."
        url="https://tecnocrypter.com/tools/calculadora-entropia"
      />
      <CalculadoraEntropiaClient />
    </>
  )
}
