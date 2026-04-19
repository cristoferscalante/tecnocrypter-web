'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScanLine, Copy, Check, RefreshCw } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

interface FingerprintData {
  userAgent: string
  language: string
  languages: string
  platform: string
  screenResolution: string
  colorDepth: string
  timezone: string
  timezoneOffset: string
  cookiesEnabled: string
  doNotTrack: string
  hardwareConcurrency: string
  deviceMemory: string
  maxTouchPoints: string
  webGL: string
  canvas: string
  audioContext: string
  fonts: string
  plugins: string
}

function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas')
    canvas.width = 200; canvas.height = 50
    const ctx = canvas.getContext('2d')
    if (!ctx) return 'No disponible'
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = '#069'
    ctx.fillText('TecnoCrypter FP', 2, 15)
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
    ctx.fillText('TecnoCrypter FP', 4, 17)
    const data = canvas.toDataURL()
    let hash = 0
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash |= 0
    }
    return hash.toString(16)
  } catch { return 'No disponible' }
}

function getWebGLInfo(): string {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    if (!gl) return 'No disponible'
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      return renderer || 'Desconocido'
    }
    return 'Disponible (sin debug info)'
  } catch { return 'No disponible' }
}

export default function HuellaDigitalClient() {
  const [fingerprint, setFingerprint] = useState<FingerprintData | null>(null)
  const [hash, setHash] = useState('')
  const [copied, setCopied] = useState(false)
  const [uniqueScore, setUniqueScore] = useState(0)

  const collect = () => {
    const fp: FingerprintData = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(', ') || navigator.language,
      platform: navigator.platform || 'No disponible',
      screenResolution: `${screen.width}x${screen.height} (${devicePixelRatio}x DPR)`,
      colorDepth: `${screen.colorDepth} bits`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: `UTC${new Date().getTimezoneOffset() > 0 ? '-' : '+'}${Math.abs(new Date().getTimezoneOffset() / 60)}`,
      cookiesEnabled: navigator.cookieEnabled ? 'Sí' : 'No',
      doNotTrack: navigator.doNotTrack === '1' ? 'Activado' : navigator.doNotTrack === '0' ? 'Desactivado' : 'No configurado',
      hardwareConcurrency: `${navigator.hardwareConcurrency || 'Desconocido'} núcleos`,
      deviceMemory: `${(navigator as Record<string, unknown>).deviceMemory || 'No disponible'} GB`,
      maxTouchPoints: `${navigator.maxTouchPoints}`,
      webGL: getWebGLInfo(),
      canvas: getCanvasFingerprint(),
      audioContext: typeof AudioContext !== 'undefined' ? 'Disponible' : 'No disponible',
      fonts: 'Detectados vía canvas',
      plugins: navigator.plugins?.length ? `${navigator.plugins.length} plugins` : 'Ninguno',
    }
    setFingerprint(fp)

    // Generate hash from all data
    const combined = Object.values(fp).join('|')
    let h = 0
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i)
      h = ((h << 5) - h) + char; h |= 0
    }
    setHash(Math.abs(h).toString(16).padStart(8, '0'))

    // Estimate uniqueness score
    let score = 0
    if (fp.webGL !== 'No disponible') score += 15
    if (fp.canvas !== 'No disponible') score += 15
    if (parseInt(fp.hardwareConcurrency) > 0) score += 10
    if (fp.deviceMemory !== 'No disponible GB') score += 10
    if (fp.languages.includes(',')) score += 10
    if (fp.colorDepth === '24 bits') score += 5
    if (parseInt(fp.maxTouchPoints) > 0) score += 10
    if (fp.plugins !== 'Ninguno') score += 5
    score += Math.min(20, fp.userAgent.length / 10)
    setUniqueScore(Math.min(100, Math.round(score)))
  }

  useEffect(() => { collect() }, [])

  const copyHash = () => {
    navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fields = fingerprint ? [
    { label: 'User-Agent', value: fingerprint.userAgent, risk: 'alto' },
    { label: 'Plataforma', value: fingerprint.platform, risk: 'medio' },
    { label: 'Idiomas', value: fingerprint.languages, risk: 'medio' },
    { label: 'Resolución', value: fingerprint.screenResolution, risk: 'alto' },
    { label: 'Color Depth', value: fingerprint.colorDepth, risk: 'bajo' },
    { label: 'Zona horaria', value: fingerprint.timezone, risk: 'medio' },
    { label: 'CPU Cores', value: fingerprint.hardwareConcurrency, risk: 'alto' },
    { label: 'RAM', value: fingerprint.deviceMemory, risk: 'alto' },
    { label: 'Touch Points', value: fingerprint.maxTouchPoints, risk: 'medio' },
    { label: 'WebGL Renderer', value: fingerprint.webGL, risk: 'alto' },
    { label: 'Canvas Hash', value: fingerprint.canvas, risk: 'alto' },
    { label: 'AudioContext', value: fingerprint.audioContext, risk: 'medio' },
    { label: 'Cookies', value: fingerprint.cookiesEnabled, risk: 'bajo' },
    { label: 'Do Not Track', value: fingerprint.doNotTrack, risk: 'bajo' },
    { label: 'Plugins', value: fingerprint.plugins, risk: 'bajo' },
  ] : []

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ScanLine className="h-5 w-5 text-primary" /> Calculadora de Huella Digital</CardTitle>
            <CardDescription>Descubre qué información revela tu navegador y cuán identificable eres online.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {hash && (
              <div className="text-center p-6 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground mb-1">Tu huella digital</div>
                <div className="text-3xl font-mono font-bold text-primary tracking-wider mb-2">{hash}</div>
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Unicidad estimada</div>
                    <div className={`font-bold ${uniqueScore > 70 ? 'text-destructive' : uniqueScore > 40 ? 'text-yellow-500' : 'text-green-500'}`}>{uniqueScore}%</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyHash}>
                    {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />} Copiar
                  </Button>
                  <Button variant="outline" size="sm" onClick={collect}><RefreshCw className="h-3 w-3 mr-1" /> Recalcular</Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {fields.map(f => (
                <div key={f.label} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{f.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${f.risk === 'alto' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : f.risk === 'medio' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'}`}>
                      {f.risk}
                    </span>
                  </div>
                  <div className="text-xs font-mono break-all mt-1">{f.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Calculadora de Huella Digital del Navegador: ¿Cuán Rastreable Eres?"
          paragraphs={[
            "El browser fingerprinting es una técnica que identifica usuarios únicos sin cookies, combinando docenas de señales como User-Agent, resolución de pantalla, GPU, zona horaria y más.",
            "Nuestra calculadora recopila las mismas señales que usan los rastreadores reales para mostrarte exactamente qué información revela tu navegador. Cuanta más información única, más fácil es identificarte.",
            "Conocer tu huella digital es el primer paso para proteger tu privacidad. Considera usar Firefox con resistFingerprinting, Tor Browser, o extensiones anti-fingerprinting."
          ]}
          howTo={[
            { step: "Análisis automático", description: "Al abrir la herramienta, se recopilan todas las señales de fingerprinting." },
            { step: "Revisa los datos", description: "Cada señal muestra su nivel de riesgo para tu privacidad." },
            { step: "Reduce tu huella", description: "Sigue las recomendaciones para minimizar la información expuesta." },
          ]}
          faqs={[
            { question: "¿El fingerprinting funciona sin cookies?", answer: "Sí. Esa es exactamente la ventaja para los rastreadores: no necesitan cookies ni consentimiento (aunque legalmente deberían). Combinando múltiples señales del navegador crean un identificador único." },
            { question: "¿Cómo puedo reducir mi huella digital?", answer: "Usa Firefox con privacy.resistFingerprinting=true, instala extensiones como CanvasBlocker, reduce plugins/extensiones visibles, usa resoluciones de pantalla comunes y considera Tor Browser para máxima privacidad." },
            { question: "¿Cuántos datos recopila un sitio web?", answer: "Un script de fingerprinting puede recopilar 50+ señales: UA, GPU, fuentes instaladas, resolución, idiomas, zona horaria, API de audio, canvas, WebGL, sensores del dispositivo y más." },
          ]}
          relatedTools={[
            { name: "Generador de User-Agent", href: "/tools/generador-useragent" },
            { name: "Analizador de Cookies", href: "/tools/analizador-cookies" },
            { name: "Eliminador de Rastreo URL", href: "/tools/eliminador-rastreo" },
            { name: "Limpiador de Metadatos", href: "/tools/limpia-metadatos" },
          ]}
        />
      </div>
    </div>
  )
}
