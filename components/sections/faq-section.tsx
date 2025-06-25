"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  const faqs = [
    {
      question: "¿Qué es la encriptación de extremo a extremo?",
      answer:
        "La encriptación de extremo a extremo es un sistema de comunicación donde solo los usuarios que se comunican pueden leer los mensajes. Ni los proveedores de servicios, hackers o terceros pueden acceder al contenido criptográficamente protegido.",
    },
    {
      question: "¿Cómo puedo proteger mis criptomonedas?",
      answer:
        "Para proteger tus criptomonedas, utiliza carteras hardware, activa la autenticación de dos factores, mantén tus claves privadas offline, utiliza contraseñas fuertes y mantén actualizado tu software de seguridad.",
    },
    {
      question: "¿Qué ventajas tiene pagar con criptomonedas?",
      answer:
        "Pagar con criptomonedas ofrece ventajas como transacciones más rápidas, menores comisiones en pagos internacionales, mayor privacidad, control total sobre tus fondos y protección contra fraudes por reversión de cargos.",
    },
    {
      question: "¿Son seguros los productos de encriptación que ofrecen?",
      answer:
        "Sí, todos nuestros productos de encriptación utilizan algoritmos de nivel militar (AES-256) y son auditados regularmente por expertos independientes en seguridad para garantizar su robustez contra vulnerabilidades.",
    },
    {
      question: "¿Cómo puedo protegerme contra ataques de phishing?",
      answer:
        "Para protegerte contra el phishing, verifica siempre las URL, no hagas clic en enlaces sospechosos, mantén actualizado tu navegador, utiliza autenticación de dos factores y considera usar un gestor de contraseñas seguro.",
    },
    {
      question: "¿Ofrecen soporte técnico para sus productos?",
      answer:
        "Sí, ofrecemos soporte técnico 24/7 para todos nuestros productos. Nuestro equipo de expertos está disponible por chat, correo electrónico y teléfono para resolver cualquier problema o duda que puedas tener.",
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Preguntas Frecuentes</h2>
          <p className="text-xl text-muted-foreground">
            Respuestas a las preguntas más comunes sobre seguridad cibernética y criptomonedas.
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
