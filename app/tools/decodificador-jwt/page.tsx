import type { Metadata } from "next"
import DecodificadorJwtClient from "@/components/tools/decodificador-jwt-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Decodificador JWT Online",
  description: "Decodifica y analiza JSON Web Tokens (JWT). Inspecciona header, payload, claims y verifica expiración. Herramienta gratuita y segura, 100% en tu navegador.",
  slug: "tools/decodificador-jwt",
  keywords: ["jwt", "decodificar jwt", "json web token", "jwt decoder", "jwt online", "token jwt", "oauth", "autenticación"]
})

export default function DecodificadorJwtPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Decodificador JWT", url: "https://tecnocrypter.com/tools/decodificador-jwt" },
      ]} />
      <WebApplicationStructuredData
        name="Decodificador JWT Online - TecnoCrypter"
        description="Decodifica y analiza JSON Web Tokens. Inspecciona header, payload y verifica expiración."
        url="https://tecnocrypter.com/tools/decodificador-jwt"
      />
      <DecodificadorJwtClient />
    </>
  )
}
