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
import SeoPage from "@/components/seo/SeoPage"

export default function HomePage() {
  return (
    <>
      <SeoPage
        title="TecnoCrypter - Plataforma de Herramientas de Ciberseguridad"
        description="Descubre las mejores herramientas de ciberseguridad, análisis de vulnerabilidades, encriptación y protección digital. Recursos educativos y productos especializados."
        slug=""
        image="https://tecnocrypter.com/seo/home.webp"
        keywords="ciberseguridad, herramientas seguridad, encriptación, vulnerabilidades, hacking ético, pentesting"
      />
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
    </>
  )
}
