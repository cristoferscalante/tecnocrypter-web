import type { Metadata } from "next"
import GeneradorPassphraseClient from "@/components/tools/generador-passphrase-client"
import { generateToolMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateToolMetadata({
  title: "Generador de Passphrase Diceware",
  description: "Genera contraseñas memorables combinando palabras aleatorias al estilo Diceware. Más seguras que contraseñas cortas y fáciles de recordar.",
  slug: "tools/generador-passphrase",
  keywords: ["passphrase", "diceware", "contraseña memorable", "palabras aleatorias", "generador contraseñas", "seguridad"]
})

export default function GeneradorPassphrasePage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Generador de Passphrase", url: "https://tecnocrypter.com/tools/generador-passphrase" },
      ]} />
      <WebApplicationStructuredData
        name="Generador de Passphrase Diceware - TecnoCrypter"
        description="Genera passphrases memorables y seguras con el método Diceware."
        url="https://tecnocrypter.com/tools/generador-passphrase"
      />
      <GeneradorPassphraseClient />
    </>
  )
}
