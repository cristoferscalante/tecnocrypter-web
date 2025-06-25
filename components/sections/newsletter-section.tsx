"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle2 } from "lucide-react"

export function NewsletterSection() {
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
      setError("Ocurrió un error al suscribirte. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Mantente Informado</h2>
        <p className="text-muted-foreground mb-8">
          Suscríbete a nuestro boletín para recibir las últimas noticias sobre seguridad cibernética, encriptación y
          criptomonedas directamente en tu bandeja de entrada.
        </p>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-lg">
            <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">¡Gracias por suscribirte!</h3>
            <p className="text-muted-foreground">
              Te hemos enviado un correo de confirmación. Revisa tu bandeja de entrada para completar el proceso.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Suscribiendo..." : "Suscribirse"}
            </Button>
          </form>
        )}

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <p className="text-xs text-muted-foreground mt-4">
          Al suscribirte, aceptas nuestra{" "}
          <a href="/privacidad" className="underline hover:text-primary">
            Política de Privacidad
          </a>
          . No hacemos spam y puedes darte de baja en cualquier momento.
        </p>
      </div>
    </section>
  )
}
