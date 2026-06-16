import type { Metadata } from "next"
import RegexTesterClient from "@/components/tools/regex-tester-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("regex-tester", locale, {
  title: "Regex Tester Online",
  description: "Prueba expresiones regulares en tiempo real con resaltado de coincidencias, grupos de captura y flags configurables. Herramienta gratuita para probar regex.",
  slug: "tools/regex-tester",
  keywords: ["regex tester", "expresiones regulares", "regex online", "probar regex", "regexp", "regular expressions", "regex javascript"]
});
}

export default function RegexTesterPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Inicio", url: "https://tecnocrypter.com" },
        { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        { name: "Regex Tester", url: "https://tecnocrypter.com/tools/regex-tester" },
      ]} />
      <WebApplicationStructuredData
        name="Regex Tester Online - TecnoCrypter"
        description="Prueba expresiones regulares en tiempo real con resaltado de coincidencias y grupos de captura."
        url="https://tecnocrypter.com/tools/regex-tester"
      />
      <RegexTesterClient />
    </>
  )
}
