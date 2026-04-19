import type { Metadata } from "next"
import ConversorColoresClient from "@/components/tools/conversor-colores-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Conversor de Colores Online",
  description: "Convierte colores entre HEX, RGB, HSL y RGBA. Selector visual con vista previa en tiempo real. Genera valores para CSS y Tailwind CSS. Herramienta gratuita.",
  slug: "tools/conversor-colores",
  keywords: ["conversor colores", "hex a rgb", "rgb a hsl", "color picker", "convertir colores", "hex to rgb", "css colors", "tailwind colors"]
})

export default function ConversorColoresPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Conversor de Colores", url: "https://tecnocrypter.com/tools/conversor-colores" },
      ]} />
      <WebApplicationStructuredData
        name="Conversor de Colores Online - TecnoCrypter"
        description="Convierte colores entre HEX, RGB, HSL y RGBA con selector visual en tiempo real."
        url="https://tecnocrypter.com/tools/conversor-colores"
      />
      <ConversorColoresClient />
    </>
  )
}
