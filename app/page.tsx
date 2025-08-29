import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { ToolsSection } from "@/components/sections/tools-section"
import { SecuritySection } from "@/components/sections/security-section"
import { FeaturedPosts } from "@/components/sections/featured-posts"
import { ProductShowcase } from "@/components/sections/product-showcase"
import { StatsSection } from "@/components/sections/stats-section"
import { FaqSection } from "@/components/sections/faq-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { CtaSection } from "@/components/sections/cta-section"
import { generatePageMetadata } from "@/lib/metadata"
import { Metadata } from "next"

export const metadata: Metadata = generatePageMetadata({
  title: "TecnoCrypter - Plataforma de Herramientas de Ciberseguridad",
  description: "Descubre las mejores herramientas de ciberseguridad, análisis de vulnerabilidades, encriptación y protección digital. Recursos educativos y productos especializados.",
  slug: "",
  image: "https://tecnocrypter.com/og/home.jpg",
  keywords: ["ciberseguridad", "herramientas seguridad", "encriptación", "vulnerabilidades", "hacking ético", "pentesting"]
});

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ToolsSection />
      <SecuritySection />
      
      <FeaturedPosts />
      <ProductShowcase />
      <FaqSection />
      <NewsletterSection />
      <CtaSection />
    </main>
  )
}
