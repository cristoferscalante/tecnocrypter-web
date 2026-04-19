import type { Metadata } from "next"
import GeneradorUuidClient from "@/components/tools/generador-uuid-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Generador UUID, ULID y Nano ID Online",
  description: "Genera identificadores únicos UUID v4, UUID v7, ULID y Nano ID con generación en lote. Herramienta gratuita con crypto seguro.",
  slug: "tools/generador-uuid",
  keywords: ["generador uuid", "uuid v4", "uuid v7", "ulid", "nanoid", "identificador único", "id generator"]
})

export default function GeneradorUuidPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador UUID", url: "https://tecnocrypter.com/tools/generador-uuid" },
      ]} />
      <WebApplicationStructuredData
        name="Generador UUID, ULID y Nano ID Online - TecnoCrypter"
        description="Genera identificadores únicos UUID v4, UUID v7, ULID y Nano ID con generación en lote."
        url="https://tecnocrypter.com/tools/generador-uuid"
      />
      <GeneradorUuidClient />
    </>
  )
}
