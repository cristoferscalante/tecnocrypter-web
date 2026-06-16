import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { ToolsSection } from "@/components/sections/tools-section"
import { ShieldSection } from "@/components/sections/shield-section"
import { SecuritySection } from "@/components/sections/security-section"
import { FeaturedPosts } from "@/components/sections/featured-posts"
import { ProductShowcase } from "@/components/sections/product-showcase"
import { StatsSection } from "@/components/sections/stats-section"
import { FaqSection } from "@/components/sections/faq-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { CtaSection } from "@/components/sections/cta-section"

import { getTranslations } from "next-intl/server"

const INDEXABLE_LOCALES = new Set(["es", "en", "fr", "pt"])
const DEFAULT_HOME_META = {
  title: "TecnoCrypter - Ciberseguridad, privacidad y herramientas online",
  description: "Aprende ciberseguridad, protege tu privacidad y usa herramientas gratuitas para contraseñas, cifrado, análisis de URLs, hashes y datos digitales.",
  keywords: "ciberseguridad, privacidad digital, herramientas online, encriptación, contraseñas seguras, criptomonedas",
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const shouldIndex = INDEXABLE_LOCALES.has(locale)
  const t = shouldIndex ? await getTranslations({ locale, namespace: "home.meta" }) : null
  const meta = {
    title: t ? t("title") : DEFAULT_HOME_META.title,
    description: t ? t("description") : DEFAULT_HOME_META.description,
    keywords: t ? t("keywords") : DEFAULT_HOME_META.keywords,
  }

  return generatePageMetadata({
    title: meta.title,
    description: meta.description,
    slug: "",
    locale: locale,
    image: "https://tecnocrypter.com/seo/home.webp",
    keywords: meta.keywords.split(", "),
    noIndex: !shouldIndex,
  })
}

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen">
        <HeroSection />
        <ToolsSection />
        <FeaturesSection />
        <SecuritySection />
        <ShieldSection />
        <ProductShowcase />
        <FeaturedPosts />
        <FaqSection />
        <NewsletterSection />
        <CtaSection />
      </main>
    </>
  )
}
