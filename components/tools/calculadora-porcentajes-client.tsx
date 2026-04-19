'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Percent, Calculator } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

type Mode = 'basic' | 'of' | 'change' | 'increase' | 'decrease'

export default function CalculadoraPorcentajesClient() {
  const [mode, setMode] = useState<Mode>('basic')
  const [a, setA] = useState('')
  const [b, setB] = useState('')

  const numA = parseFloat(a) || 0
  const numB = parseFloat(b) || 0

  const modes = [
    { id: 'basic' as const, label: '¿Cuánto es X% de Y?' },
    { id: 'of' as const, label: '¿X es qué % de Y?' },
    { id: 'change' as const, label: '% de cambio de X a Y' },
    { id: 'increase' as const, label: 'Aumentar X en Y%' },
    { id: 'decrease' as const, label: 'Reducir X en Y%' },
  ]

  const getResult = () => {
    switch (mode) {
      case 'basic': return { result: (numA / 100) * numB, label: `${numA}% de ${numB}` }
      case 'of': return { result: numB !== 0 ? (numA / numB) * 100 : 0, label: `${numA} es el ${numB !== 0 ? ((numA / numB) * 100).toFixed(2) : 0}% de ${numB}` }
      case 'change': {
        const change = numA !== 0 ? ((numB - numA) / Math.abs(numA)) * 100 : 0
        return { result: change, label: `Cambio de ${numA} a ${numB}: ${change >= 0 ? '+' : ''}${change.toFixed(2)}%` }
      }
      case 'increase': return { result: numA * (1 + numB / 100), label: `${numA} + ${numB}%` }
      case 'decrease': return { result: numA * (1 - numB / 100), label: `${numA} - ${numB}%` }
    }
  }

  const { result, label } = getResult()

  const placeholders: Record<Mode, [string, string]> = {
    basic: ['Porcentaje (%)', 'Número'],
    of: ['Valor parcial', 'Valor total'],
    change: ['Valor inicial', 'Valor final'],
    increase: ['Número', 'Porcentaje (%)'],
    decrease: ['Número', 'Porcentaje (%)'],
  }

  // Quick reference table
  const quickPercentages = [5, 10, 15, 20, 25, 50, 75, 100]

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Percent className="h-5 w-5 text-primary" /> Calculadora de Porcentajes</CardTitle>
            <CardDescription>Calcula porcentajes, cambios porcentuales, aumentos y descuentos al instante.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {modes.map(m => (
                <button key={m.id} onClick={() => { setMode(m.id); setA(''); setB('') }}
                  className={`text-xs px-2 py-1.5 rounded-full border transition-colors ${mode === m.id ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}>
                  {m.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">{placeholders[mode][0]}</Label>
                <Input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder={placeholders[mode][0]} className="font-mono" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{placeholders[mode][1]}</Label>
                <Input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder={placeholders[mode][1]} className="font-mono" />
              </div>
            </div>

            {(a || b) && (
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground mb-1">{label}</div>
                <div className="text-3xl font-mono font-bold text-primary">
                  {mode === 'of' || mode === 'change' ? `${result.toFixed(2)}%` : result.toLocaleString('es-ES', { maximumFractionDigits: 4 })}
                </div>
              </div>
            )}

            {numB > 0 && mode === 'basic' && (
              <div className="space-y-2">
                <Label className="text-xs">Referencia rápida para {numB}</Label>
                <div className="grid grid-cols-4 gap-1">
                  {quickPercentages.map(p => (
                    <div key={p} className="flex justify-between text-xs p-1.5 rounded bg-muted/30">
                      <span className="text-muted-foreground">{p}%</span>
                      <span className="font-mono">{((p / 100) * numB).toLocaleString('es-ES', { maximumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Calculadora de Porcentajes Online: Fácil y Rápida"
          paragraphs={[
            "Calcula porcentajes con 5 modos diferentes: porcentaje básico, qué porcentaje es un número de otro, cambio porcentual, aumentos y descuentos. Resultados instantáneos mientras escribes.",
            "Perfecta para finanzas (descuentos, IVA, propinas), estadísticas (variaciones), marketing (tasas de conversión) y cualquier cálculo porcentual del día a día.",
            "Incluye tabla de referencia rápida que muestra los porcentajes más comunes del número introducido. Todo se calcula en tiempo real directamente en tu navegador."
          ]}
          howTo={[
            { step: "Elige el modo", description: "Selecciona el tipo de cálculo porcentual que necesitas." },
            { step: "Introduce los valores", description: "Escribe los números y el resultado se actualiza al instante." },
            { step: "Consulta la referencia", description: "En modo básico, ve automáticamente los porcentajes más comunes." },
          ]}
          faqs={[
            { question: "¿Cómo calculo el IVA?", answer: "Para calcular el precio con IVA del 21%, usa 'Aumentar X en Y%' con tu precio base y 21. Para extraer el IVA de un precio final, divide entre 1.21." },
            { question: "¿Qué es el cambio porcentual?", answer: "Es la variación relativa entre dos valores: ((nuevo - antiguo) / |antiguo|) × 100. Un resultado positivo indica aumento, negativo indica disminución." },
            { question: "¿Puedo calcular descuentos sobre descuentos?", answer: "Sí. Usa 'Reducir X en Y%' con el primer descuento, luego repite con el resultado y el segundo descuento. Nota: dos descuentos del 20% NO son un 40% total." },
          ]}
          relatedTools={[
            { name: "Conversor de Unidades", href: "/tools/conversor-unidades" },
            { name: "Contador de Caracteres", href: "/tools/contador-caracteres" },
            { name: "Calculadora de Entropía", href: "/tools/calculadora-entropia" },
            { name: "Generador de Tablas CSV", href: "/tools/generador-csv" },
          ]}
        />
      </div>
    </div>
  )
}
