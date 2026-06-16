import type { Metadata } from "next"
import ConversorHexClient from "@/components/tools/conversor-hex-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("conversor-hex", locale, {
  title: "Conversor Hexadecimal Online",
  description: "Convierte entre texto, hexadecimal, decimal, binario y colores RGB. Herramienta gratuita de conversión hex 100% en tu navegador.",
  slug: "tools/conversor-hex",
  keywords: ["hexadecimal", "conversor hex", "hex a texto", "hex a decimal", "hex a rgb", "binario", "colores hex"]
});
}

export default function ConversorHexPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Conversor Hexadecimal", url: "https://tecnocrypter.com/tools/conversor-hex" },
      ]} />
      <WebApplicationStructuredData
        name="Conversor Hexadecimal Online - TecnoCrypter"
        description="Convierte entre texto, hexadecimal, decimal, binario y colores RGB."
        url="https://tecnocrypter.com/tools/conversor-hex"
      />
      <ConversorHexClient />
    </>
  )
}
