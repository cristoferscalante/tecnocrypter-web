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

export const metadata: Metadata = generatePageMetadata({
  title: "TecnoCrypter - Herramientas Gratuitas de Ciberseguridad y Cifrado",
  description: "+40 herramientas gratuitas de ciberseguridad: generador de contraseñas, cifrado AES-256, verificador de filtraciones y más. Todo funciona en tu navegador, sin enviar datos.",
  slug: "",
  image: "https://tecnocrypter.com/seo/home.webp",
  keywords: ["ciberseguridad", "herramientas seguridad", "encriptación", "generador contraseñas", "cifrado online", "privacidad digital"]
})

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
