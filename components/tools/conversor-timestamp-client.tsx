'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ToolSeoSection } from './tool-seo-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check, Clock, ArrowRightLeft, Globe } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const commonTimezones = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Bogota',
  'America/Mexico_City',
  'America/Argentina/Buenos_Aires',
  'America/Sao_Paulo',
  'Europe/London',
  'Europe/Madrid',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Asia/Dubai',
  'Australia/Sydney',
  'Pacific/Auckland',
]

function formatDate(date: Date, tz: string): string {
  try {
    return new Intl.DateTimeFormat('es-ES', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date)
  } catch {
    return 'Zona horaria inválida'
  }
}

export default function ConversorTimestampClient() {
  const [timestamp, setTimestamp] = useState('')
  const [dateStr, setDateStr] = useState('')
  const [timezone, setTimezone] = useState('UTC')
  const [mode, setMode] = useState<'ts2date' | 'date2ts'>('ts2date')
  const [result, setResult] = useState('')
  const [now, setNow] = useState(Math.floor(Date.now() / 1000))
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const copyText = useCallback(async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  const handleConvert = useCallback(() => {
    try {
      if (mode === 'ts2date') {
        const ts = parseInt(timestamp.trim(), 10)
        if (isNaN(ts)) { setResult('Timestamp inválido'); return }
        const ms = ts.toString().length > 10 ? ts : ts * 1000
        const date = new Date(ms)
        if (isNaN(date.getTime())) { setResult('Timestamp inválido'); return }
        const formatted = formatDate(date, timezone)
        const iso = date.toISOString()
        const relative = getRelativeTime(date)
        setResult(`${formatted}\nISO 8601: ${iso}\nRelativo: ${relative}`)
      } else {
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) { setResult('Fecha inválida'); return }
        const seconds = Math.floor(date.getTime() / 1000)
        const ms = date.getTime()
        setResult(`Segundos: ${seconds}\nMilisegundos: ${ms}`)
      }
    } catch {
      setResult('Error en la conversión')
    }
  }, [mode, timestamp, dateStr, timezone])

  function getRelativeTime(date: Date): string {
    const diffMs = Date.now() - date.getTime()
    const absDiff = Math.abs(diffMs)
    const past = diffMs > 0

    if (absDiff < 60000) return past ? 'Hace unos segundos' : 'En unos segundos'
    if (absDiff < 3600000) {
      const mins = Math.floor(absDiff / 60000)
      return past ? `Hace ${mins} minuto${mins > 1 ? 's' : ''}` : `En ${mins} minuto${mins > 1 ? 's' : ''}`
    }
    if (absDiff < 86400000) {
      const hours = Math.floor(absDiff / 3600000)
      return past ? `Hace ${hours} hora${hours > 1 ? 's' : ''}` : `En ${hours} hora${hours > 1 ? 's' : ''}`
    }
    const days = Math.floor(absDiff / 86400000)
    if (days < 365) return past ? `Hace ${days} día${days > 1 ? 's' : ''}` : `En ${days} día${days > 1 ? 's' : ''}`
    const years = Math.floor(days / 365)
    return past ? `Hace ${years} año${years > 1 ? 's' : ''}` : `En ${years} año${years > 1 ? 's' : ''}`
  }

  const useNow = useCallback(() => {
    if (mode === 'ts2date') {
      setTimestamp(now.toString())
    } else {
      setDateStr(new Date().toISOString().slice(0, 19))
    }
  }, [mode, now])

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-tight mb-3">
            Conversor <span className="text-primary">Timestamp</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convierte entre Unix timestamp y fecha legible con soporte de zonas horarias.
          </p>
        </div>

        {/* Live clock */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">Timestamp actual:</span>
                <code className="font-mono text-lg font-bold">{now}</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{formatDate(new Date(), timezone)}</span>
                <Button size="icon" variant="ghost" onClick={() => copyText(now.toString(), 'now')} className="h-8 w-8">
                  {copied === 'now' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  {mode === 'ts2date' ? 'Timestamp → Fecha' : 'Fecha → Timestamp'}
                </CardTitle>
                <CardDescription>
                  {mode === 'ts2date' ? 'Convierte un Unix timestamp a fecha legible.' : 'Convierte una fecha a Unix timestamp.'}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => { setMode(m => m === 'ts2date' ? 'date2ts' : 'ts2date'); setResult('') }}>
                <ArrowRightLeft className="h-4 w-4 mr-1" />
                Invertir
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {mode === 'ts2date' ? (
              <div className="space-y-2">
                <Label>Unix Timestamp</Label>
                <div className="flex gap-2">
                  <Input
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                    placeholder="Ej: 1700000000"
                    className="font-mono"
                    onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
                  />
                  <Button variant="outline" onClick={useNow} title="Usar timestamp actual">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Acepta segundos (10 dígitos) o milisegundos (13 dígitos)</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Fecha y Hora</Label>
                <div className="flex gap-2">
                  <Input
                    type="datetime-local"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    className="font-mono"
                  />
                  <Button variant="outline" onClick={useNow} title="Usar fecha actual">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Globe className="h-3 w-3" /> Zona Horaria
              </Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {commonTimezones.map(tz => (
                    <SelectItem key={tz} value={tz}>{tz.replace(/_/g, ' ')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleConvert} className="w-full">Convertir</Button>

            {result && (
              <div className="relative p-4 rounded-md bg-muted/50 font-mono text-sm whitespace-pre-line">
                {result}
                <Button size="icon" variant="ghost" onClick={() => copyText(result, 'result')} className="absolute top-2 right-2 h-8 w-8">
                  {copied === 'result' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">¿Qué es un Unix Timestamp?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Un Unix timestamp es el número de segundos transcurridos desde el 1 de enero de 1970 a las 00:00:00 UTC (epoch). Se utiliza ampliamente en programación para:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Almacenar fechas de forma compacta en bases de datos</li>
              <li>Ordenar y comparar fechas de manera eficiente</li>
              <li>APIs REST y formatos de intercambio de datos</li>
              <li>Logs de sistema y registros de auditoría</li>
            </ul>
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Conversor Unix Timestamp Online: Epoch a Fecha y Fecha a Timestamp"
          paragraphs={[
            "El Unix timestamp (epoch time) es el estándar universal para representar el tiempo en sistemas informáticos. Nuestro conversor permite convertir entre timestamps Unix y fechas legibles de forma bidireccional.",
            "Los timestamps Unix se usan en bases de datos (PostgreSQL, MySQL), APIs REST, logs de servidor, sistemas de caché, cron jobs y prácticamente cualquier sistema que necesite almacenar o comparar fechas de forma eficiente.",
            "Soporta timestamps en segundos y milisegundos, muestra la fecha en tu zona horaria local y en UTC, y proporciona un reloj en tiempo real con el timestamp actual."
          ]}
          howTo={[
            { step: "Introduce un timestamp o fecha", description: "Escribe un Unix timestamp en segundos/milisegundos o selecciona una fecha del calendario." },
            { step: "Conversión automática", description: "La herramienta convierte instantáneamente en ambas direcciones." },
            { step: "Copia el formato que necesitas", description: "Obtén el resultado en timestamp, ISO 8601 o fecha legible." },
          ]}
          faqs={[
            { question: "¿Qué es el problema del año 2038?", answer: "Los sistemas de 32 bits almacenan timestamps como enteros con signo de 32 bits, que se desbordan el 19 de enero de 2038. Los sistemas modernos de 64 bits no tienen este problema y soportan fechas hasta billones de años." },
            { question: "¿Segundos o milisegundos?", answer: "El timestamp Unix tradicional está en segundos. JavaScript (Date.now()) y algunas APIs usan milisegundos. Si tu número tiene 13 dígitos, son milisegundos; si tiene 10, son segundos." },
            { question: "¿Por qué usar timestamps en vez de fechas?", answer: "Los timestamps son independientes de zona horaria, ocupan solo 4-8 bytes, son fácilmente comparables y ordenables, y eliminan ambigüedades de formato de fecha (MM/DD vs DD/MM)." },
          ]}
          relatedTools={[
            { name: "Generador UUID", href: "/tools/generador-uuid" },
            { name: "Validador JSON", href: "/tools/validador-json" },
            { name: "Contador de Caracteres", href: "/tools/contador-caracteres" },
            { name: "Conversor Hexadecimal", href: "/tools/conversor-hex" },
          ]}
        />
      </div>
    </div>
  )
}
