import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import GeneradorPassphraseClient from "@/components/tools/generador-passphrase-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("generador-passphrase", locale, {
  title: "Generador de Passphrase Diceware",
  description: "Genera contraseñas memorables combinando palabras aleatorias al estilo Diceware. Más seguras que contraseñas cortas y fáciles de recordar.",
  slug: "tools/generador-passphrase",
  keywords: ["passphrase", "diceware", "contraseña memorable", "palabras aleatorias", "generador contraseñas", "seguridad"]
});
}

export default async function GeneradorPassphrasePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/generador-passphrase" : `https://tecnocrypter.com/${locale}/tools/generador-passphrase`;

  const toolName = tTools("generador-passphrase.name");
  const toolDesc = tTools("generador-passphrase.description");

  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: tNav("home"), url: homeUrl },
        { name: tNav("tools"), url: toolsUrl },
        { name: toolName, url: toolUrl },
      ]} />
      <WebApplicationStructuredData
        name={`${toolName} - TecnoCrypter`}
        description={toolDesc}
        url={toolUrl}
        inLanguage={locale}
        
      />
      <GeneradorPassphraseClient />
    </>
  )
}
