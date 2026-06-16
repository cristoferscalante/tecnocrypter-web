import type { Metadata } from "next"
import OfuscadorTextoClient from "@/components/tools/ofuscador-texto-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("ofuscador-texto", locale, {
  title: "Ofuscador de Texto",
  description: "Ofusca texto usando homoglifos, Zalgo, caracteres invisibles y más técnicas Unicode para proteger tu privacidad o evitar filtros.",
  slug: "tools/ofuscador-texto",
  keywords: ["ofuscador texto", "homoglifos", "zalgo text", "unicode", "caracteres invisibles", "privacidad"]
});
}

export default function OfuscadorTextoPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Ofuscador de Texto", url: "https://tecnocrypter.com/tools/ofuscador-texto" },
      ]} />
      <WebApplicationStructuredData
        name="Ofuscador de Texto Unicode - TecnoCrypter"
        description="Ofusca texto con homoglifos, Zalgo y técnicas Unicode avanzadas."
        url="https://tecnocrypter.com/tools/ofuscador-texto"
      />
      <OfuscadorTextoClient />
    </>
  )
}
