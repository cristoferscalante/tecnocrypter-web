import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import FormateadorSqlClient from "@/components/tools/formateador-sql-client"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolPageMetadata("formateador-sql", locale, {
  title: "Formateador de SQL Online",
  description: "Formatea, indenta y embellece consultas SQL automáticamente. Soporta SELECT, INSERT, UPDATE, DELETE, JOINs y más.",
  slug: "tools/formateador-sql",
  keywords: ["formateador sql", "sql beautifier", "sql formatter", "indentar sql", "embellecedor sql", "desarrollo"]
});
}

export default async function FormateadorSqlPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : `https://tecnocrypter.com/${locale}`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : `https://tecnocrypter.com/${locale}/tools`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/formateador-sql" : `https://tecnocrypter.com/${locale}/tools/formateador-sql`;

  const toolName = tTools("formateador-sql.name");
  const toolDesc = tTools("formateador-sql.description");

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
      <FormateadorSqlClient />
    </>
  )
}
