import type { Metadata } from "next"
import GeneradorContrasenasClient from "@/components/tools/generador-contrasenas-client"

export const metadata: Metadata = {
  title: "Generador de Contraseñas Seguras | TecnoCrypter",
  description: "Genera contraseñas seguras y aleatorias con nuestro generador avanzado. Incluye validadores, recomendaciones automáticas y consejos de seguridad.",
  keywords: ["generador contraseñas", "contraseñas seguras", "seguridad", "ciberseguridad", "protección"],
}

export default function GeneradorContrasenasPage() {
  return <GeneradorContrasenasClient />
}