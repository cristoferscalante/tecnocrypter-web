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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "home.meta" })

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    slug: "",
    image: "https://tecnocrypter.com/seo/home.webp",
    keywords: t("keywords").split(", ")
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
