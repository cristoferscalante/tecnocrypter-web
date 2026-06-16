import { getTranslations } from "next-intl/server"
import { generatePageMetadata } from "@/lib/metadata"
import PrivacyEs from "./content-es"
import PrivacyEn from "./content-en"
import PrivacyFr from "./content-fr"
import PrivacyPt from "./content-pt"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "footer" })
  return generatePageMetadata({
    title: t("privacy"),
    description: locale === "es"
      ? "Conoce cómo TecnoCrypter protege tu privacidad y maneja tus datos personales bajo un modelo privacy-first con cifrado extremo a extremo."
      : "Learn how TecnoCrypter protects your privacy and handles your personal data under a privacy-first model with end-to-end encryption.",
    slug: "privacidad",
    locale,
    image: "/Seo/politicas de privacidad.webp",
    keywords: locale === "es"
      ? ["política privacidad", "protección datos", "privacy-first", "cifrado extremo", "ciberseguridad"]
      : ["privacy policy", "data protection", "privacy-first", "end-to-end encryption", "cybersecurity"]
  })
}

export default async function PrivacidadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (locale === "en") return <PrivacyEn />
  if (locale === "fr") return <PrivacyFr />
  if (locale === "pt") return <PrivacyPt />
  return <PrivacyEs />
}