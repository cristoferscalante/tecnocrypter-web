import type { Metadata } from "next"
import { generateBlogMetadata } from "@/lib/metadata"
import BlogClientPage from "../blog/BlogClientPage"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "categories.noticias" })

  return generateBlogMetadata({
    title: t("title"),
    description: t("description"),
    slug: "noticias",
    locale,
    image: "https://tecnocrypter.com/Seo/blog.webp",
    keywords: t.raw("keywords"),
  })
}

export default async function NoticiasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "categories.noticias" })

  return (
    <BlogClientPage
      initialCategory="noticias"
      title={t("landingTitle")}
      description={t("landingDescription")}
      editorialIntro={[t("intro1"), t("intro2"), t("intro3")]}
    />
  )
}
