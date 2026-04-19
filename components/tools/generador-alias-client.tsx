'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AtSign, Copy, Check, RefreshCw } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

interface AliasResult {
  original: string
  plusAliases: string[]
  dotAliases: string[]
  subAddressing: string[]
  tips: string[]
}

function generateAliases(email: string): AliasResult | null {
  const match = email.match(/^([^@]+)@(.+)$/)
  if (!match) return null

  const [, localPart, domain] = match
  const isGmail = /gmail\.com$/i.test(domain)

  const services = ['newsletter', 'shopping', 'social', 'banking', 'work', 'gaming', 'travel', 'testing']
  const plusAliases = services.map(s => `${localPart}+${s}@${domain}`)

  const dotAliases: string[] = []
  if (isGmail && localPart.length > 1) {
    const clean = localPart.replace(/\./g, '')
    // Generate a few dot variations
    for (let i = 1; i < Math.min(clean.length, 4); i++) {
      dotAliases.push(`${clean.slice(0, i)}.${clean.slice(i)}@${domain}`)
    }
  }

  const subAddressing = [
    `${localPart}+${Date.now().toString(36)}@${domain}`,
    `${localPart}+${Math.random().toString(36).slice(2, 8)}@${domain}`,
  ]

  const tips: string[] = []
  if (isGmail) {
    tips.push('Gmail ignora los puntos: user.name@gmail.com = username@gmail.com')
    tips.push('Gmail soporta + subaddressing: user+tag@gmail.com → user@gmail.com')
  }
  tips.push('Usa aliases diferentes para cada servicio y detecta quién vende tu email.')
  tips.push('Si recibes spam en user+tienda@gmail.com, sabes que "tienda" filtró tu email.')

  return { original: email, plusAliases, dotAliases, subAddressing, tips }
}

export default function GeneradorAliasClient() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<AliasResult | null>(null)
  const [copied, setCopied] = useState('')

  const generate = () => {
    const r = generateAliases(email.trim())
    setResult(r)
  }

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AtSign className="h-5 w-5 text-primary" /> Generador de Alias de Email</CardTitle>
            <CardDescription>Crea variaciones de tu email para rastrear quién comparte tus datos y filtrar spam.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Tu email</Label>
              <div className="flex gap-2">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="usuario@gmail.com" type="email" spellCheck={false} />
                <Button onClick={generate} disabled={!email.includes('@')}>Generar aliases</Button>
              </div>
            </div>

            {result && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">📧 Aliases con + (subaddressing)</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {result.plusAliases.map((alias, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/50 group cursor-pointer hover:bg-muted/80" onClick={() => copy(alias, `plus-${i}`)}>
                        <code className="text-sm font-mono">{alias}</code>
                        {copied === `plus-${i}` ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100" />}
                      </div>
                    ))}
                  </div>
                </div>

                {result.dotAliases.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">📫 Variaciones con puntos (solo Gmail)</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {result.dotAliases.map((alias, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/50 group cursor-pointer hover:bg-muted/80" onClick={() => copy(alias, `dot-${i}`)}>
                          <code className="text-sm font-mono">{alias}</code>
                          {copied === `dot-${i}` ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">🎲 Aliases únicos (aleatorios)</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {result.subAddressing.map((alias, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/50 group cursor-pointer hover:bg-muted/80" onClick={() => copy(alias, `sub-${i}`)}>
                        <code className="text-sm font-mono">{alias}</code>
                        {copied === `sub-${i}` ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-1">
                  {result.tips.map((tip, i) => (
                    <p key={i} className="text-sm text-muted-foreground">💡 {tip}</p>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Generador de Alias de Email: Protege Tu Bandeja de Entrada"
          paragraphs={[
            "Los alias de email permiten crear variaciones de tu dirección que llegan a la misma bandeja. Usando la técnica '+' (subaddressing), puedes registrarte en cada servicio con un alias único.",
            "Si recibes spam en usuario+tienda@gmail.com, sabes exactamente que 'tienda' vendió o filtró tu email. Gmail también ignora los puntos: u.suario@gmail.com = usuario@gmail.com.",
            "Los alias son tu primera línea de defensa contra el spam y el tracking de emails. No necesitas servicios de terceros — funciona con Gmail, Outlook, Protonmail y la mayoría de proveedores."
          ]}
          howTo={[
            { step: "Introduce tu email", description: "Escribe tu dirección de email real." },
            { step: "Genera aliases", description: "Se crean variaciones con +tag y puntos para diferentes servicios." },
            { step: "Usa un alias por servicio", description: "Registra cada cuenta con un alias diferente para rastrear filtraciones." },
          ]}
          faqs={[
            { question: "¿Todos los proveedores soportan + aliases?", answer: "Gmail, Outlook, ProtonMail, Fastmail y la mayoría de proveedores modernos sí. Algunos servicios web rechazan el + en emails (incorrectamente). En ese caso, usa variaciones con puntos en Gmail." },
            { question: "¿Es seguro usar aliases?", answer: "Sí. Los aliases no crean cuentas nuevas. Todo llega a tu bandeja original. El alias solo añade un tag que puedes usar para filtrar y rastrear." },
            { question: "¿Qué hago si un servicio rechaza el +?", answer: "Algunos formularios web no aceptan + en emails. En Gmail, usa variaciones con puntos como alternativa. Para máxima protección, considera servicios como SimpleLogin o AnonAddy." },
          ]}
          relatedTools={[
            { name: "Generador de Datos Ficticios", href: "/tools/generador-datos" },
            { name: "Eliminador de Rastreo URL", href: "/tools/eliminador-rastreo" },
            { name: "Generador de Contraseñas", href: "/tools/generador-contrasenas" },
            { name: "Ofuscador de Texto", href: "/tools/ofuscador-texto" },
          ]}
        />
      </div>
    </div>
  )
}
