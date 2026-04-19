'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarClock, Copy, Check } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

const MINUTES = ['*', ...Array.from({ length: 60 }, (_, i) => i.toString())]
const HOURS = ['*', ...Array.from({ length: 24 }, (_, i) => i.toString())]
const DAYS_OF_MONTH = ['*', ...Array.from({ length: 31 }, (_, i) => (i + 1).toString())]
const MONTHS = ['*', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const DAYS_OF_WEEK = ['*', '0', '1', '2', '3', '4', '5', '6']

const MONTH_NAMES: Record<string, string> = { '1': 'Enero', '2': 'Febrero', '3': 'Marzo', '4': 'Abril', '5': 'Mayo', '6': 'Junio', '7': 'Julio', '8': 'Agosto', '9': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre' }
const DAY_NAMES: Record<string, string> = { '0': 'Domingo', '1': 'Lunes', '2': 'Martes', '3': 'Miércoles', '4': 'Jueves', '5': 'Viernes', '6': 'Sábado' }

const PRESETS = [
  { label: 'Cada minuto', value: '* * * * *' },
  { label: 'Cada hora', value: '0 * * * *' },
  { label: 'Cada día a medianoche', value: '0 0 * * *' },
  { label: 'Cada lunes 9:00', value: '0 9 * * 1' },
  { label: 'Cada 1° del mes', value: '0 0 1 * *' },
  { label: 'Cada 15 minutos', value: '*/15 * * * *' },
  { label: 'L-V a las 8:00', value: '0 8 * * 1-5' },
  { label: 'Cada 6 horas', value: '0 */6 * * *' },
]

function describeCron(min: string, hour: string, dom: string, month: string, dow: string): string {
  const parts: string[] = []

  if (min === '*' && hour === '*') parts.push('Cada minuto')
  else if (min.startsWith('*/')) parts.push(`Cada ${min.slice(2)} minutos`)
  else if (hour === '*') parts.push(`En el minuto ${min} de cada hora`)
  else if (hour.startsWith('*/')) parts.push(`A las ${min} cada ${hour.slice(2)} horas`)
  else parts.push(`A las ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`)

  if (dom !== '*') parts.push(`el día ${dom} del mes`)
  if (month !== '*') parts.push(`en ${MONTH_NAMES[month] || `mes ${month}`}`)
  if (dow !== '*') {
    if (dow === '1-5') parts.push('de lunes a viernes')
    else if (dow === '0,6') parts.push('fines de semana')
    else parts.push(`los ${DAY_NAMES[dow] || `día ${dow}`}`)
  }

  return parts.join(' ') || 'Expresión personalizada'
}

function getNextRuns(min: string, hour: string, dom: string, month: string, dow: string, count: number = 5): Date[] {
  const runs: Date[] = []
  const now = new Date()
  const candidate = new Date(now)

  const matches = (d: Date) => {
    const m = d.getMinutes(), h = d.getHours(), dm = d.getDate(), mo = d.getMonth() + 1, dw = d.getDay()

    const matchField = (field: string, value: number) => {
      if (field === '*') return true
      if (field.includes('/')) { const step = parseInt(field.split('/')[1]); return value % step === 0 }
      if (field.includes('-')) { const [a, b] = field.split('-').map(Number); return value >= a && value <= b }
      if (field.includes(',')) return field.split(',').map(Number).includes(value)
      return parseInt(field) === value
    }

    return matchField(min, m) && matchField(hour, h) && matchField(dom, dm) && matchField(month, mo) && matchField(dow, dw)
  }

  for (let i = 0; i < 525600 && runs.length < count; i++) {
    candidate.setMinutes(candidate.getMinutes() + 1)
    if (matches(candidate)) runs.push(new Date(candidate))
  }
  return runs
}

export default function GeneradorCronClient() {
  const [min, setMin] = useState('0')
  const [hour, setHour] = useState('*')
  const [dom, setDom] = useState('*')
  const [month, setMonth] = useState('*')
  const [dow, setDow] = useState('*')
  const [copied, setCopied] = useState(false)
  const [nextRuns, setNextRuns] = useState<Date[]>([])

  const expression = `${min} ${hour} ${dom} ${month} ${dow}`

  useEffect(() => {
    setNextRuns(getNextRuns(min, hour, dom, month, dow))
  }, [min, hour, dom, month, dow])

  const applyPreset = (value: string) => {
    const [m, h, d, mo, dw] = value.split(' ')
    setMin(m); setHour(h); setDom(d); setMonth(mo); setDow(dw)
  }

  const copy = () => {
    navigator.clipboard.writeText(expression)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarClock className="h-5 w-5 text-primary" /> Generador de Expresiones Cron</CardTitle>
            <CardDescription>Construye visualmente expresiones cron con descripción en español y próximas ejecuciones.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-xs text-muted-foreground mb-1">Expresión cron</div>
              <div className="flex items-center justify-center gap-2">
                <code className="text-2xl font-mono font-bold text-primary">{expression}</code>
                <Button variant="ghost" size="sm" onClick={copy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="text-sm text-muted-foreground mt-2">{describeCron(min, hour, dom, month, dow)}</div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[
                { label: 'Minuto', value: min, set: setMin, options: MINUTES },
                { label: 'Hora', value: hour, set: setHour, options: HOURS },
                { label: 'Día mes', value: dom, set: setDom, options: DAYS_OF_MONTH },
                { label: 'Mes', value: month, set: setMonth, options: MONTHS },
                { label: 'Día semana', value: dow, set: setDow, options: DAYS_OF_WEEK },
              ].map(field => (
                <div key={field.label} className="space-y-1">
                  <Label className="text-xs text-center block">{field.label}</Label>
                  <Input
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    className="text-center font-mono text-sm"
                    spellCheck={false}
                  />
                  <select
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    className="w-full text-xs rounded border p-1 bg-background"
                  >
                    {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Presets comunes</Label>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map(p => (
                  <button key={p.value} onClick={() => applyPreset(p.value)}
                    className={`text-xs px-2 py-1 rounded-full border transition-colors ${expression === p.value ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {nextRuns.length > 0 && (
              <div className="space-y-2">
                <Label className="text-xs">Próximas 5 ejecuciones</Label>
                <div className="space-y-1">
                  {nextRuns.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded bg-muted/50 text-sm">
                      <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                      <span className="font-mono">{d.toLocaleString('es-ES', { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Generador de Expresiones Cron: Programa Tareas Fácilmente"
          paragraphs={[
            "Las expresiones cron definen cuándo se ejecutan tareas programadas en servidores Linux, CI/CD, Kubernetes y servicios cloud. Su sintaxis de 5 campos (minuto, hora, día, mes, día de semana) puede ser confusa.",
            "Nuestro generador visual te permite construir expresiones cron sin memorizar la sintaxis. Cada cambio actualiza en tiempo real la descripción en español y muestra las próximas ejecuciones.",
            "Incluye presets para las programaciones más comunes: cada hora, diario, semanal, L-V y más. Ideal para configurar cron jobs, GitHub Actions, Cloud Scheduler o cualquier programador de tareas."
          ]}
          howTo={[
            { step: "Selecciona los campos", description: "Elige minuto, hora, día del mes, mes y día de la semana." },
            { step: "O usa un preset", description: "Haz clic en un preset común para empezar rápidamente." },
            { step: "Verifica las ejecuciones", description: "Revisa las próximas 5 ejecuciones y la descripción en español." },
          ]}
          faqs={[
            { question: "¿Qué significa */15 en cron?", answer: "El operador / es 'cada'. */15 en el campo de minutos significa 'cada 15 minutos'. */6 en horas = 'cada 6 horas'. Se combina con rangos: 1-5 en día de semana = 'lunes a viernes'." },
            { question: "¿Es lo mismo cron de Linux que cron de GitHub Actions?", answer: "Casi. GitHub Actions usa la misma sintaxis de 5 campos pero ejecuta en UTC. Algunos servicios añaden un 6° campo para segundos. Esta herramienta genera el formato estándar de 5 campos." },
            { question: "¿Puedo usar listas y rangos?", answer: "Sí. Puedes escribir directamente: '1,15,30' para minutos específicos, '1-5' para rangos, '*/10' para pasos. Introduce el valor directamente en el campo de texto." },
          ]}
          relatedTools={[
            { name: "Conversor Timestamp", href: "/tools/conversor-timestamp" },
            { name: "Regex Tester", href: "/tools/regex-tester" },
            { name: "Validador JSON", href: "/tools/validador-json" },
            { name: "Formateador SQL", href: "/tools/formateador-sql" },
          ]}
        />
      </div>
    </div>
  )
}
