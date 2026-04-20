"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { useTranslations } from "next-intl"

export function FeaturesSection() {
  const t = useTranslations("home.features")
  return (
    <section className="py-32 md:py-40 bg-gradient-to-b from-background/10 to-background/5">
      <div className="container">
        <AnimatedSection className="text-center max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">{t("title")}</h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
