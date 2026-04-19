'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, AlertTriangle, CheckCircle, Info, Copy, Check } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

interface HeaderAnalysis {
  from: string
  to: string
  subject: string
  date: string
  receivedChain: { from: string; by: string; date: string }[]
  spf: string
  dkim: string
  dmarc: string
  warnings: string[]
  safe: boolean
}

function parseEmailHeaders(raw: string): HeaderAnalysis {
  const getHeader = (name: string): string => {
    const regex = new RegExp(`^${name}:\\s*(.+(?:\\n\\s+.+)*)`, 'mi')
    const match = raw.match(regex)
    return match ? match[1].replace(/\n\s+/g, ' ').trim() : ''
  }

  const receivedHeaders = raw.match(/^Received:\s*.+(?:\n\s+.+)*/gmi) || []
  const receivedChain = receivedHeaders.map(h => {
    const clean = h.replace(/^Received:\s*/i, '').replace(/\n\s+/g, ' ')
    const fromMatch = clean.match(/from\s+(\S+)/i)
    const byMatch = clean.match(/by\s+(\S+)/i)
    const dateMatch = clean.match(/;\s*(.+)$/)
    return {
      from: fromMatch?.[1] || 'desconocido',
      by: byMatch?.[1] || 'desconocido',
      date: dateMatch?.[1]?.trim() || ''
    }
  })

  const spfRaw = getHeader('Received-SPF') || getHeader('Authentication-Results')
  const spf = spfRaw.includes('pass') ? '✅ Pass' : spfRaw.includes('fail') ? '❌ Fail' : spfRaw.includes('softfail') ? '⚠️ Softfail' : '❓ No encontrado'
  const dkim = spfRaw.includes('dkim=pass') ? '✅ Pass' : spfRaw.includes('dkim=fail') ? '❌ Fail' : '❓ No encontrado'
  const dmarc = spfRaw.includes('dmarc=pass') ? '✅ Pass' : spfRaw.includes('dmarc=fail') ? '❌ Fail' : '❓ No encontrado'

  const warnings: string[] = []
  if (spf.includes('Fail') || spf.includes('Softfail')) warnings.push('SPF no válido: el servidor de envío no está autorizado.')
  if (dkim.includes('Fail')) warnings.push('DKIM inválido: la firma del email puede estar manipulada.')
  if (receivedChain.length > 5) warnings.push(`La cadena de recepción es larga (${receivedChain.length} saltos), lo cual puede indicar reenvíos.`)

  const from = getHeader('From')
  const returnPath = getHeader('Return-Path')
  if (from && returnPath && !returnPath.includes(from.match(/<(.+)>/)?.[1] || from)) {
    warnings.push('El Return-Path no coincide con From: posible spoofing.')
  }

  return {
    from: from || 'No encontrado',
    to: getHeader('To') || 'No encontrado',
    subject: getHeader('Subject') || 'No encontrado',
    date: getHeader('Date') || 'No encontrado',
    receivedChain,
    spf, dkim, dmarc, warnings,
    safe: warnings.length === 0
  }
}

export default function AnalizadorEmailClient() {
  const [headers, setHeaders] = useState('')
  const [result, setResult] = useState<HeaderAnalysis | null>(null)
  const [copied, setCopied] = useState(false)

  const analyze = useCallback(() => {
    if (!headers.trim()) return
    setResult(parseEmailHeaders(headers))
  }, [headers])

  const loadExample = () => {
    setHeaders(`From: sender@example.com
To: recipient@example.com
Subject: Test Email
Date: Fri, 18 Apr 2026 10:30:00 +0000
Received: from mail.example.com (mail.example.com [93.184.216.34]) by mx.recipient.com; Fri, 18 Apr 2026 10:30:01 +0000
Received: from localhost (localhost [127.0.0.1]) by mail.example.com; Fri, 18 Apr 2026 10:29:59 +0000
Return-Path: <sender@example.com>
Authentication-Results: mx.recipient.com; spf=pass; dkim=pass; dmarc=pass`)
  }

  const copyReport = () => {
    if (!result) return
    navigator.clipboard.writeText(`De: ${result.from}\nPara: ${result.to}\nAsunto: ${result.subject}\nSPF: ${result.spf}\nDKIM: ${result.dkim}\nDMARC: ${result.dmarc}\nAdvertencias: ${result.warnings.length === 0 ? 'Ninguna' : result.warnings.join('; ')}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> Analizador de Cabeceras Email</CardTitle>
            <CardDescription>Pega las cabeceras de un email para detectar spoofing, verificar SPF/DKIM/DMARC y rastrear el origen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Cabeceras del email (headers raw)</Label>
              <Textarea value={headers} onChange={(e) => setHeaders(e.target.value)} placeholder="Pega aquí las cabeceras completas del email..." rows={10} className="font-mono text-xs" spellCheck={false} />
            </div>
            <div className="flex gap-2">
              <Button onClick={analyze} disabled={!headers.trim()}>Analizar</Button>
              <Button variant="outline" onClick={loadExample}>Cargar ejemplo</Button>
            </div>

            {result && (
              <div className="space-y-4 mt-4">
                <div className={`p-4 rounded-lg border ${result.safe ? 'border-green-500/30 bg-green-50 dark:bg-green-950/20' : 'border-yellow-500/30 bg-yellow-50 dark:bg-yellow-950/20'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {result.safe ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                    <span className="font-semibold">{result.safe ? 'No se detectaron problemas' : `${result.warnings.length} advertencia(s) encontrada(s)`}</span>
                  </div>
                  {result.warnings.map((w, i) => (
                    <p key={i} className="text-sm text-yellow-700 dark:text-yellow-300 ml-7">• {w}</p>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { label: 'De', value: result.from },
                    { label: 'Para', value: result.to },
                    { label: 'Asunto', value: result.subject },
                    { label: 'Fecha', value: result.date },
                    { label: 'SPF', value: result.spf },
                    { label: 'DKIM', value: result.dkim },
                    { label: 'DMARC', value: result.dmarc },
                  ].map(item => (
                    <div key={item.label} className="p-3 rounded-lg bg-muted/50">
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-mono break-all">{item.value}</div>
                    </div>
                  ))}
                </div>

                {result.receivedChain.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Cadena de recepción ({result.receivedChain.length} saltos)</h4>
                    {result.receivedChain.map((hop, i) => (
                      <div key={i} className="p-2 rounded bg-muted/30 text-xs font-mono">
                        <span className="text-muted-foreground">#{i + 1}</span> de <span className="text-primary">{hop.from}</span> → <span className="text-primary">{hop.by}</span>
                        {hop.date && <span className="text-muted-foreground ml-2">({hop.date})</span>}
                      </div>
                    ))}
                  </div>
                )}

                <Button variant="outline" onClick={copyReport} className="w-full">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copiado' : 'Copiar informe'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Analizador de Cabeceras Email: Detecta Spoofing y Phishing"
          paragraphs={[
            "Las cabeceras de email contienen información crucial sobre el origen y autenticidad de un mensaje. Nuestro analizador verifica SPF, DKIM y DMARC para detectar posibles intentos de spoofing.",
            "El email spoofing es la técnica de falsificar el remitente de un correo para que parezca provenir de otra persona. Es la base de la mayoría de ataques de phishing empresarial (BEC).",
            "Analizamos la cadena de servidores (Received headers), la coherencia entre From y Return-Path, y los resultados de autenticación para darte un veredicto claro sobre la legitimidad del email."
          ]}
          howTo={[
            { step: "Obtén las cabeceras", description: "En Gmail: menú ⋮ → Mostrar original. En Outlook: Propiedades del mensaje → Encabezados." },
            { step: "Pega y analiza", description: "Copia las cabeceras completas y pégalas en el analizador." },
            { step: "Revisa el veredicto", description: "Comprueba SPF, DKIM, DMARC y las advertencias de seguridad." },
          ]}
          faqs={[
            { question: "¿Qué son SPF, DKIM y DMARC?", answer: "SPF verifica que el servidor de envío está autorizado. DKIM verifica la integridad del mensaje con firma criptográfica. DMARC combina ambos y define qué hacer con emails que fallan las verificaciones." },
            { question: "¿Cómo obtengo las cabeceras de un email?", answer: "En Gmail: abre el email → menú ⋮ → 'Mostrar original'. En Outlook: clic derecho → 'Ver origen del mensaje'. En Apple Mail: Ver → Mensaje → Cabeceras completas." },
            { question: "¿Puede un email pasar SPF/DKIM y ser phishing?", answer: "Sí. Un atacante puede configurar correctamente SPF/DKIM en su propio dominio falso. Siempre verifica que el dominio del remitente es legítimo, no solo que las verificaciones pasen." },
          ]}
          relatedTools={[
            { name: "Verificador de URLs", href: "/tools/verificador" },
            { name: "Generador de Hash", href: "/tools/generador-hash" },
            { name: "Cifrado Online", href: "/tools/cifrado-online" },
            { name: "Verificador de Contraseñas", href: "/tools/verificador-contrasenas" },
          ]}
        />
      </div>
    </div>
  )
}
