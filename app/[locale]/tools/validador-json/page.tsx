import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import ValidadorJsonClient from "@/components/tools/validador-json-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("validador-json", locale, {
  title: "Validador y Formateador JSON Online",
  description: "Valida, formatea y minifica JSON con vista de árbol interactiva. Detecta errores de sintaxis al instante. Herramienta gratuita para desarrolladores.",
  slug: "tools/validador-json",
  keywords: ["validador json", "formateador json", "json online", "json formatter", "json validator", "minificar json", "json tree"]
});
}

export default async function ValidadorJsonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/validador-json" : `https://tecnocrypter.com/${locale}/tools/validador-json`;

  const toolName = tTools("validador-json.name");
  const toolDesc = tTools("validador-json.description");

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
      <ValidadorJsonClient />
    </>
  )
}
