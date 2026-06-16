import type { Metadata } from "next"
import GeneradorLoremClient from "@/components/tools/generador-lorem-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-lorem", locale, {
  title: "Generador Lorem Ipsum Online",
  description: "Genera texto placeholder Lorem Ipsum para diseño y desarrollo. Párrafos, oraciones o palabras personalizables al instante. Herramienta gratuita.",
  slug: "tools/generador-lorem",
  keywords: ["lorem ipsum", "generador lorem ipsum", "texto placeholder", "texto de relleno", "dummy text", "lorem ipsum generator"]
});
}

export default function GeneradorLoremPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador Lorem Ipsum", url: "https://tecnocrypter.com/tools/generador-lorem" },
      ]} />
      <WebApplicationStructuredData
        name="Generador Lorem Ipsum Online - TecnoCrypter"
        description="Genera texto placeholder Lorem Ipsum personalizable para diseño y desarrollo web."
        url="https://tecnocrypter.com/tools/generador-lorem"
      />
      <GeneradorLoremClient />
    </>
  )
}
