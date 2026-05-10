import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"
import GeneradorCredencialesClient from "@/components/tools/generador-credenciales-client"

export const metadata: Metadata = generateToolMetadata({
  title: "Generador de Credenciales Determinísticas",
  description: "Genera usuarios y contraseñas determinísticas a partir de una palabra clave maestra. Las credenciales se recrean siempre iguales sin almacenar nada. Todo funciona en tu navegador.",
  slug: "tools/generador-credenciales",
  keywords: [
    "generador credenciales",
    "credenciales determinísticas",
    "generador usuarios",
    "contraseña maestra",
    "gestor contraseñas",
    "credenciales seguras",
    "generador determinístico",
    "seguridad contraseñas",
  ],
})

export default function GeneradorCredenciales() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador de Credenciales", url: "https://tecnocrypter.com/tools/generador-credenciales" },
      ]} />
      <WebApplicationStructuredData
        name="Generador de Credenciales Determinísticas - TecnoCrypter"
        description="Genera usuarios y contraseñas determinísticas a partir de una palabra clave maestra."
        url="https://tecnocrypter.com/tools/generador-credenciales"
      />
      <GeneradorCredencialesClient />
    </>
  )
}