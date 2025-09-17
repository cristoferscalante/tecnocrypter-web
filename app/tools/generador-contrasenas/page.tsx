import type { Metadata } from "next"
import GeneradorContrasenasClient from "@/components/tools/generador-contrasenas-client"
import { generateToolMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateToolMetadata({
  title: "Generador de Contraseñas Seguras",
  description: "Genera contraseñas seguras y aleatorias con nuestro generador avanzado. Incluye validadores, recomendaciones automáticas y consejos de seguridad.",
  slug: "tools/generador-contrasenas",
  image: "/Seo/generador-contrasenas.jpg",
  keywords: ["generador contraseñas", "contraseñas seguras", "seguridad", "ciberseguridad", "protección", "passwords"]
})

export default function GeneradorContrasenasPage() {
  return (
    <GeneradorContrasenasClient />
  )
}