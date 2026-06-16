import type { Metadata } from "next"
import GeneradorCsvClient from "@/components/tools/generador-csv-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-csv", locale, {
  title: "Generador de Tablas CSV Online",
  description: "Crea tablas de datos visualmente y expórtalas como CSV. Edita celdas, añade columnas y descarga archivos CSV perfectos.",
  slug: "tools/generador-csv",
  keywords: ["generador csv", "crear csv", "tabla csv", "exportar csv", "datos tabulares", "excel"]
});
}

export default function GeneradorCsvPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador CSV", url: "https://tecnocrypter.com/tools/generador-csv" },
      ]} />
      <WebApplicationStructuredData
        name="Generador de Tablas CSV - TecnoCrypter"
        description="Crea tablas de datos visualmente y expórtalas como archivos CSV."
        url="https://tecnocrypter.com/tools/generador-csv"
      />
      <GeneradorCsvClient />
    </>
  )
}
