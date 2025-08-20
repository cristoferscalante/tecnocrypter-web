import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { SecuritySection } from "@/components/sections/security-section"
import { FeaturedPosts } from "@/components/sections/featured-posts"
import { ProductShowcase } from "@/components/sections/product-showcase"
import { StatsSection } from "@/components/sections/stats-section"
import { FaqSection } from "@/components/sections/faq-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { CtaSection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SecuritySection />
      <StatsSection />
      <FeaturedPosts />
      <ProductShowcase />
      <FaqSection />
      <NewsletterSection />
      <CtaSection />
    </main>
  )
}
