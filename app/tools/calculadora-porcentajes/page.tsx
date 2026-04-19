import type { Metadata } from "next"
import CalculadoraPorcentajesClient from "@/components/tools/calculadora-porcentajes-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Calculadora de Porcentajes Online",
  description: "Calcula porcentajes, cambios porcentuales, aumentos y descuentos al instante. 5 modos de cálculo diferentes.",
  slug: "tools/calculadora-porcentajes",
  keywords: ["calculadora porcentajes", "porcentaje", "descuento", "IVA", "cambio porcentual", "aumento"]
})

export default function CalculadoraPorcentajesPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Calculadora de Porcentajes", url: "https://tecnocrypter.com/tools/calculadora-porcentajes" },
      ]} />
      <WebApplicationStructuredData
        name="Calculadora de Porcentajes - TecnoCrypter"
        description="Calcula porcentajes, descuentos, IVA y variaciones porcentuales al instante."
        url="https://tecnocrypter.com/tools/calculadora-porcentajes"
      />
      <CalculadoraPorcentajesClient />
    </>
  )
}
