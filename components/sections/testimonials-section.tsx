"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "CriptoSecure ha transformado nuestra estrategia de seguridad digital. Su enfoque en encriptación avanzada nos ha dado la tranquilidad que necesitábamos.",
      author: "María González",
      role: "CTO, TechInnovate",
      avatar: "/placeholder.svg?height=100&width=100&query=professional woman portrait",
    },
    {
      quote:
        "Desde que implementamos las soluciones de CriptoSecure, hemos reducido los incidentes de seguridad en un 95%. Su servicio es excepcional.",
      author: "Carlos Mendoza",
      role: "Director de Seguridad, FinanceSecure",
      avatar: "/placeholder.svg?height=100&width=100&query=professional man portrait",
    },
    {
      quote:
        "La pasarela de pagos con criptomonedas de CriptoSecure es la más segura que hemos utilizado. Altamente recomendable para cualquier negocio digital.",
      author: "Laura Sánchez",
      role: "CEO, CryptoShop",
      avatar: "/placeholder.svg?height=100&width=100&query=professional woman ceo portrait",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-background/5 to-primary/3 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-xl text-muted-foreground">
            Empresas y profesionales confían en nuestras soluciones de seguridad para proteger sus activos digitales.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={0.1 * index} className="h-full">
              <Card className="h-full bg-card/30 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="h-10 w-10 text-primary/20 mb-4" />
                  <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                      <AvatarFallback>
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
