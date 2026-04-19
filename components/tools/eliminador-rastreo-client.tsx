'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Unlink, Copy, Check, Trash2 } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

const TRACKING_PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
  'fbclid', 'gclid', 'gclsrc', 'dclid', 'msclkid', 'twclid', 'li_fat_id',
  'mc_cid', 'mc_eid', 'yclid', '_ga', '_gl', '_hsenc', '_hsmi', 'hsCtaTracking',
  'ref', 'ref_', 'referrer', 'source', 'campaign', 'medium',
  'igshid', 'si', 's', 'feature', 'app', 'spm', 'share_source',
  'share_medium', 'vero_id', 'nr_email_referer', 'mkt_tok',
  'trk', 'trkCampaign', 'sc_campaign', 'sc_channel', 'sc_content',
  'sc_medium', 'sc_outcome', 'sc_geo', 'sc_country',
]

function cleanUrl(url: string): { cleaned: string; removed: string[]; original: string } {
  try {
    const parsed = new URL(url)
    const removed: string[] = []
    const paramsToDelete: string[] = []

    parsed.searchParams.forEach((_value, key) => {
      if (TRACKING_PARAMS.includes(key.toLowerCase())) {
        removed.push(`${key}=${_value}`)
        paramsToDelete.push(key)
      }
    })

    paramsToDelete.forEach(p => parsed.searchParams.delete(p))

    // Remove hash fragments that look like tracking
    if (parsed.hash && /^#[\w]+=/.test(parsed.hash)) {
      removed.push(`hash: ${parsed.hash}`)
      parsed.hash = ''
    }

    return { cleaned: parsed.toString(), removed, original: url }
  } catch {
    return { cleaned: url, removed: [], original: url }
  }
}

export default function EliminadorRastreoClient() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ReturnType<typeof cleanUrl> | null>(null)
  const [copied, setCopied] = useState(false)
  const [bulkInput, setBulkInput] = useState('')
  const [bulkResults, setBulkResults] = useState<ReturnType<typeof cleanUrl>[]>([])

  const clean = useCallback(() => {
    if (!input.trim()) return
    setResult(cleanUrl(input.trim()))
  }, [input])

  const cleanBulk = useCallback(() => {
    const urls = bulkInput.split('\n').filter(u => u.trim())
    setBulkResults(urls.map(u => cleanUrl(u.trim())))
  }, [bulkInput])

  const copyClean = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Unlink className="h-5 w-5 text-primary" /> Eliminador de Rastreo URL</CardTitle>
            <CardDescription>Elimina parámetros de seguimiento (UTM, fbclid, gclid...) de URLs para proteger tu privacidad.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>URL a limpiar</Label>
              <div className="flex gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="https://example.com/page?utm_source=facebook&fbclid=abc123" className="font-mono text-sm" spellCheck={false} />
                <Button onClick={clean} disabled={!input.trim()}><Trash2 className="h-4 w-4 mr-2" /> Limpiar</Button>
              </div>
            </div>

            {result && (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-xs text-muted-foreground mb-1">URL limpia</div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono break-all flex-1">{result.cleaned}</code>
                    <Button variant="ghost" size="icon" onClick={() => copyClean(result.cleaned)} className="shrink-0">
                      {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                {result.removed.length > 0 ? (
                  <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <div className="text-xs text-muted-foreground mb-1">Parámetros eliminados ({result.removed.length})</div>
                    <div className="flex flex-wrap gap-1">
                      {result.removed.map((p, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-mono">{p}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">✅ No se encontraron parámetros de rastreo.</p>
                )}
              </div>
            )}

            <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
              <p><strong>Detecta {TRACKING_PARAMS.length}+ parámetros</strong> de rastreo: UTM (Google Analytics), fbclid (Facebook), gclid (Google Ads), msclkid (Bing), y muchos más.</p>
            </div>
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Eliminador de Rastreo URL: Protege Tu Privacidad al Compartir Enlaces"
          paragraphs={[
            "Cada vez que haces clic en un enlace de redes sociales o campañas de marketing, se añaden parámetros de seguimiento como utm_source, fbclid o gclid que permiten rastrear tu actividad online.",
            "Nuestro eliminador detecta y elimina más de 50 parámetros de rastreo conocidos de plataformas como Google Analytics, Facebook, Twitter, LinkedIn, Microsoft y sistemas de email marketing.",
            "Comparte URLs limpias para proteger tu privacidad y la de quienes reciben tus enlaces. Todo el procesamiento se realiza localmente en tu navegador."
          ]}
          howTo={[
            { step: "Pega la URL", description: "Introduce la URL que contiene parámetros de seguimiento." },
            { step: "Limpia automáticamente", description: "Se eliminan todos los parámetros de rastreo detectados." },
            { step: "Copia la URL limpia", description: "Comparte el enlace limpio sin revelar de dónde viene." },
          ]}
          faqs={[
            { question: "¿Qué son los parámetros UTM?", answer: "Son etiquetas añadidas a URLs por Google Analytics para rastrear el origen del tráfico: utm_source (plataforma), utm_medium (tipo), utm_campaign (campaña), utm_term (palabras clave) y utm_content (variante)." },
            { question: "¿Eliminar estos parámetros rompe el enlace?", answer: "No. Los parámetros de rastreo son solo para analítica. La página funciona perfectamente sin ellos. Solo se eliminan parámetros conocidos de seguimiento, no los funcionales." },
            { question: "¿Qué es fbclid?", answer: "Es un parámetro que Facebook añade a todos los enlaces clicados en su plataforma. Permite a Facebook rastrear tu actividad incluso fuera de Facebook. Elimínalo para evitar ese seguimiento." },
          ]}
          relatedTools={[
            { name: "Verificador de URLs", href: "/tools/verificador" },
            { name: "Codificador URL", href: "/tools/codificador-url" },
            { name: "Limpiador de Metadatos", href: "/tools/limpia-metadatos" },
            { name: "Analizador de Cookies", href: "/tools/analizador-cookies" },
          ]}
        />
      </div>
    </div>
  )
}
