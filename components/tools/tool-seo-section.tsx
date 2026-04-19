import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SeoFaq {
  question: string
  answer: string
}

interface RelatedTool {
  name: string
  href: string
}

interface HowToStep {
  step: string
  description: string
}

interface ToolSeoSectionProps {
  title: string
  paragraphs: string[]
  howTo?: HowToStep[]
  faqs?: SeoFaq[]
  relatedTools?: RelatedTool[]
}

export function ToolSeoSection({ title, paragraphs, howTo, faqs, relatedTools }: ToolSeoSectionProps) {
  return (
    <section className="mt-12 space-y-8 border-t border-border/50 pt-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-orbitron tracking-tight">
          {title}
        </h2>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      {howTo && howTo.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">¿Cómo funciona?</h3>
          <ol className="space-y-3">
            {howTo.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <span className="font-medium">{item.step}</span>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {faqs && faqs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Preguntas Frecuentes</h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card key={i} className="bg-card/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {relatedTools && relatedTools.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Herramientas Relacionadas</h3>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border border-border/50 bg-card/50 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
