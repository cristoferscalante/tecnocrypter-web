"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQ {
  question: string
  answer: string
}

interface ReusableFaqSectionProps {
  title?: string
  description?: string
  faqs: FAQ[]
  className?: string
}

export function ReusableFaqSection({ 
  title = "Preguntas Frecuentes", 
  description = "Respuestas a las preguntas más comunes.",
  faqs,
  className = ""
}: ReusableFaqSectionProps) {
  return (
    <section className={`py-24 bg-background/5 ${className}`}>
      <div className="container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground">
            {description}
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={0.1 * index}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </AnimatedSection>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}