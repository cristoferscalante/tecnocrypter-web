"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"

export function NewsletterSection() {
  const t = useTranslations("home.newsletter")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Simulamos una petición a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // En un entorno real, aquí iría la llamada a la API
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      setIsSubmitted(true)
      setEmail("")
    } catch (err) {
      setError(t("error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">{t("title")}</h2>
        <p className="text-muted-foreground mb-8">
          {t("description")}
        </p>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-lg">
            <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t("thankYou")}</h3>
            <p className="text-muted-foreground">
              {t("confirmEmail")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder={t("placeholder")}
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("submitting") : t("subscribe")}
            </Button>
          </form>
        )}

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <p className="text-xs text-muted-foreground mt-4">
          {t("consent")}
          <a href="/privacidad" className="underline hover:text-primary">
            {t("privacyLink")}
          </a>
          {t("consentEnd")}
        </p>
      </div>
    </section>
  )
}
