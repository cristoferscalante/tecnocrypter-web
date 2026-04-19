import type { Metadata } from "next"
import VerificadorContrasenasClient from "@/components/tools/verificador-contrasenas-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Verificador de Contraseñas Filtradas",
  description: "Comprueba si tu contraseña ha sido expuesta en filtraciones de datos usando Have I Been Pwned. Tu contraseña nunca se envía al servidor.",
  slug: "tools/verificador-contrasenas",
  keywords: ["verificador contraseñas", "contraseñas filtradas", "have i been pwned", "data breach", "seguridad contraseñas", "k-anonymity"]
})

export default function VerificadorContrasenasPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Verificador de Contraseñas", url: "https://tecnocrypter.com/tools/verificador-contrasenas" },
      ]} />
      <WebApplicationStructuredData
        name="Verificador de Contraseñas Filtradas - TecnoCrypter"
        description="Comprueba si tu contraseña ha sido expuesta en filtraciones de datos usando k-anonymity."
        url="https://tecnocrypter.com/tools/verificador-contrasenas"
      />
      <VerificadorContrasenasClient />
    </>
  )
}
