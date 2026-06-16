import type { Metadata } from "next"
import ValidadorJsonClient from "@/components/tools/validador-json-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("validador-json", locale, {
  title: "Validador y Formateador JSON Online",
  description: "Valida, formatea y minifica JSON con vista de árbol interactiva. Detecta errores de sintaxis al instante. Herramienta gratuita para desarrolladores.",
  slug: "tools/validador-json",
  keywords: ["validador json", "formateador json", "json online", "json formatter", "json validator", "minificar json", "json tree"]
});
}

export default function ValidadorJsonPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Validador JSON", url: "https://tecnocrypter.com/tools/validador-json" },
      ]} />
      <WebApplicationStructuredData
        name="Validador y Formateador JSON Online - TecnoCrypter"
        description="Valida, formatea y minifica JSON con vista de árbol interactiva."
        url="https://tecnocrypter.com/tools/validador-json"
      />
      <ValidadorJsonClient />
    </>
  )
}
