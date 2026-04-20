import type { Metadata } from "next"
import ConversorUnidadesClient from "@/components/tools/conversor-unidades-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Conversor de Unidades Online",
  description: "Convierte entre unidades de longitud, peso, temperatura, almacenamiento de datos, tiempo y velocidad. Resultados instantáneos.",
  slug: "tools/conversor-unidades",
  keywords: ["conversor unidades", "convertir metros", "celsius fahrenheit", "bytes megabytes", "calculadora unidades"]
})

export default function ConversorUnidadesPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Conversor de Unidades", url: "https://tecnocrypter.com/tools/conversor-unidades" },
      ]} />
      <WebApplicationStructuredData
        name="Conversor de Unidades Online - TecnoCrypter"
        description="Convierte entre unidades de longitud, peso, temperatura, datos, tiempo y velocidad."
        url="https://tecnocrypter.com/tools/conversor-unidades"
      />
      <ConversorUnidadesClient />
    </>
  )
}
