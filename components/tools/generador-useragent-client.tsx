'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Globe, Copy, Check, RefreshCw } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

const BROWSERS = [
  { label: 'Chrome (Windows)', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' },
  { label: 'Chrome (Mac)', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' },
  { label: 'Chrome (Android)', ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36' },
  { label: 'Firefox (Windows)', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0' },
  { label: 'Firefox (Mac)', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0' },
  { label: 'Safari (Mac)', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15' },
  { label: 'Safari (iPhone)', ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1' },
  { label: 'Edge (Windows)', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0' },
  { label: 'Googlebot', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
  { label: 'Bingbot', ua: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)' },
  { label: 'curl', ua: 'curl/8.7.1' },
  { label: 'Postman', ua: 'PostmanRuntime/7.39.0' },
]

function parseUA(ua: string): { browser: string; os: string; device: string; engine: string; isBot: boolean } {
  let browser = 'Desconocido', os = 'Desconocido', device = 'Desktop', engine = 'Desconocido', isBot = false

  // Bots
  if (/bot|crawl|spider|slurp/i.test(ua)) { isBot = true; device = 'Bot' }
  if (/curl|wget|postman|python|java|php/i.test(ua)) { isBot = true; device = 'CLI/API' }

  // Browser
  if (/Edg\/(\d+)/.test(ua)) browser = `Edge ${ua.match(/Edg\/(\d+)/)?.[1]}`
  else if (/Chrome\/(\d+)/.test(ua) && !/Chromium/.test(ua)) browser = `Chrome ${ua.match(/Chrome\/(\d+)/)?.[1]}`
  else if (/Firefox\/(\d+)/.test(ua)) browser = `Firefox ${ua.match(/Firefox\/(\d+)/)?.[1]}`
  else if (/Version\/(\d+\.\d+).*Safari/.test(ua)) browser = `Safari ${ua.match(/Version\/(\d+\.\d+)/)?.[1]}`
  else if (/Googlebot/.test(ua)) browser = 'Googlebot'
  else if (/bingbot/.test(ua)) browser = 'Bingbot'
  else if (/curl/.test(ua)) browser = 'curl'
  else if (/Postman/.test(ua)) browser = 'Postman'

  // OS
  if (/Windows NT 10/.test(ua)) os = 'Windows 10/11'
  else if (/Mac OS X/.test(ua)) os = 'macOS'
  else if (/iPhone/.test(ua)) { os = 'iOS'; device = 'Mobile' }
  else if (/Android/.test(ua)) { os = 'Android'; device = 'Mobile' }
  else if (/Linux/.test(ua)) os = 'Linux'

  // Engine
  if (/AppleWebKit/.test(ua)) engine = 'WebKit/Blink'
  else if (/Gecko/.test(ua)) engine = 'Gecko'

  return { browser, os, device, engine, isBot }
}

export default function GeneradorUserAgentClient() {
  const [customUA, setCustomUA] = useState('')
  const [selectedUA, setSelectedUA] = useState('')
  const [copied, setCopied] = useState('')
  const currentUA = typeof navigator !== 'undefined' ? navigator.userAgent : ''

  const analyzed = parseUA(selectedUA || customUA || currentUA)
  const displayUA = selectedUA || customUA || currentUA

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> Generador de User-Agent</CardTitle>
            <CardDescription>Genera, analiza y copia user-agent strings para diferentes navegadores y dispositivos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Tu User-Agent actual</Label>
              <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between gap-2">
                <code className="text-xs font-mono break-all">{currentUA}</code>
                <Button variant="ghost" size="icon" onClick={() => copy(currentUA, 'current')} className="shrink-0">
                  {copied === 'current' ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>User-Agents predefinidos</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {BROWSERS.map((b, i) => (
                  <button key={i} onClick={() => { setSelectedUA(b.ua); setCustomUA('') }}
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${selectedUA === b.ua ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>O pega un User-Agent personalizado</Label>
              <Input value={customUA} onChange={(e) => { setCustomUA(e.target.value); setSelectedUA('') }} placeholder="Mozilla/5.0..." className="font-mono text-sm" spellCheck={false} />
            </div>

            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-semibold mb-3">Análisis del User-Agent</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: 'Navegador', value: analyzed.browser },
                  { label: 'Sistema Operativo', value: analyzed.os },
                  { label: 'Dispositivo', value: analyzed.device },
                  { label: 'Motor', value: analyzed.engine },
                  { label: 'Es Bot', value: analyzed.isBot ? '🤖 Sí' : '👤 No' },
                ].map(item => (
                  <div key={item.label} className="p-2 rounded bg-muted/50">
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
              {displayUA && (
                <div className="mt-3 flex items-center gap-2">
                  <code className="text-xs font-mono break-all flex-1 p-2 bg-muted/30 rounded">{displayUA}</code>
                  <Button variant="ghost" size="icon" onClick={() => copy(displayUA, 'ua')} className="shrink-0">
                    {copied === 'ua' ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Generador de User-Agent: Crea y Analiza UA Strings"
          paragraphs={[
            "El User-Agent es una cadena que tu navegador envía a cada servidor web, revelando tu navegador, sistema operativo y dispositivo. Controlar tu User-Agent es clave para la privacidad online.",
            "Nuestro generador incluye User-Agents actualizados de Chrome, Firefox, Safari, Edge, bots de búsqueda y herramientas CLI. Además, analiza cualquier UA string mostrando sus componentes.",
            "Los User-Agents se usan en web scraping, testing de compatibilidad, auditorías SEO y protección de privacidad. Cambiar tu UA puede evitar que los sitios web perfilen tu dispositivo."
          ]}
          howTo={[
            { step: "Ve tu UA actual", description: "Tu User-Agent actual se muestra automáticamente al abrir la herramienta." },
            { step: "Selecciona o personaliza", description: "Elige un UA predefinido o pega uno personalizado para analizar." },
            { step: "Copia y usa", description: "Copia el UA para usarlo en herramientas de desarrollo, scrapers o extensiones." },
          ]}
          faqs={[
            { question: "¿Puedo cambiar mi User-Agent?", answer: "Sí. En Chrome DevTools: Network Conditions → User Agent. También existen extensiones como User-Agent Switcher. En código, se configura en las cabeceras de la solicitud HTTP." },
            { question: "¿Cambiar el UA protege mi privacidad?", answer: "Parcialmente. Reduce el fingerprinting por UA, pero los sitios usan muchas más señales (resolución, plugins, fuentes, WebGL). Para privacidad real, combina con Tor Browser o Firefox con resistFingerprinting." },
            { question: "¿Qué es browser fingerprinting?", answer: "Es una técnica que identifica usuarios únicos combinando señales del navegador: UA, resolución, zona horaria, idiomas, plugins, fuentes y más. Puede identificarte sin cookies." },
          ]}
          relatedTools={[
            { name: "Calculadora de Huella Digital", href: "/tools/huella-digital" },
            { name: "Eliminador de Rastreo URL", href: "/tools/eliminador-rastreo" },
            { name: "Analizador de Cookies", href: "/tools/analizador-cookies" },
            { name: "Verificador de URLs", href: "/tools/verificador" },
          ]}
        />
      </div>
    </div>
  )
}
