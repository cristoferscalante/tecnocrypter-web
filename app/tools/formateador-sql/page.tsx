import type { Metadata } from "next"
import FormateadorSqlClient from "@/components/tools/formateador-sql-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Formateador de SQL Online",
  description: "Formatea, indenta y embellece consultas SQL automáticamente. Soporta SELECT, INSERT, UPDATE, DELETE, JOINs y más.",
  slug: "tools/formateador-sql",
  keywords: ["formateador sql", "sql beautifier", "sql formatter", "indentar sql", "embellecedor sql", "desarrollo"]
})

export default function FormateadorSqlPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Formateador SQL", url: "https://tecnocrypter.com/tools/formateador-sql" },
      ]} />
      <WebApplicationStructuredData
        name="Formateador de SQL Online - TecnoCrypter"
        description="Formatea y embellece consultas SQL con indentación correcta y resaltado de sintaxis."
        url="https://tecnocrypter.com/tools/formateador-sql"
      />
      <FormateadorSqlClient />
    </>
  )
}
