import type { Metadata } from "next"
import QrGeneratorClient from "@/components/tools/qr-generator-client"
import { generateToolMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateToolMetadata({
  title: "Generador de Códigos QR",
  description: "Genera códigos QR personalizados para enlaces, textos y más. Personaliza colores, tamaño y añade tu logo.",
  slug: "tools/generador-qr",
  image: "/Seo/generador-qr.jpg",
  keywords: ["generador QR", "códigos QR", "QR personalizado", "crear QR", "QR con logo", "herramientas seguridad"]
})

export default function GeneradorQrPage() {
  return (
    <QrGeneratorClient />
  )
}