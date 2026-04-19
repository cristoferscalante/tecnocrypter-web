'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Ruler, ArrowLeftRight } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

type Category = 'length' | 'weight' | 'temperature' | 'data' | 'time' | 'speed'

const UNITS: Record<Category, { label: string; units: { id: string; name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[] }> = {
  length: {
    label: 'Longitud',
    units: [
      { id: 'mm', name: 'Milímetros', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { id: 'cm', name: 'Centímetros', toBase: v => v / 100, fromBase: v => v * 100 },
      { id: 'm', name: 'Metros', toBase: v => v, fromBase: v => v },
      { id: 'km', name: 'Kilómetros', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'in', name: 'Pulgadas', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      { id: 'ft', name: 'Pies', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      { id: 'yd', name: 'Yardas', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      { id: 'mi', name: 'Millas', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
    ]
  },
  weight: {
    label: 'Peso',
    units: [
      { id: 'mg', name: 'Miligramos', toBase: v => v / 1_000_000, fromBase: v => v * 1_000_000 },
      { id: 'g', name: 'Gramos', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { id: 'kg', name: 'Kilogramos', toBase: v => v, fromBase: v => v },
      { id: 't', name: 'Toneladas', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'oz', name: 'Onzas', toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
      { id: 'lb', name: 'Libras', toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
    ]
  },
  temperature: {
    label: 'Temperatura',
    units: [
      { id: 'c', name: 'Celsius', toBase: v => v, fromBase: v => v },
      { id: 'f', name: 'Fahrenheit', toBase: v => (v - 32) * 5 / 9, fromBase: v => v * 9 / 5 + 32 },
      { id: 'k', name: 'Kelvin', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
    ]
  },
  data: {
    label: 'Datos',
    units: [
      { id: 'b', name: 'Bytes', toBase: v => v, fromBase: v => v },
      { id: 'kb', name: 'Kilobytes', toBase: v => v * 1024, fromBase: v => v / 1024 },
      { id: 'mb', name: 'Megabytes', toBase: v => v * 1048576, fromBase: v => v / 1048576 },
      { id: 'gb', name: 'Gigabytes', toBase: v => v * 1073741824, fromBase: v => v / 1073741824 },
      { id: 'tb', name: 'Terabytes', toBase: v => v * 1099511627776, fromBase: v => v / 1099511627776 },
      { id: 'kib', name: 'Kibibytes', toBase: v => v * 1024, fromBase: v => v / 1024 },
      { id: 'mib', name: 'Mebibytes', toBase: v => v * 1048576, fromBase: v => v / 1048576 },
    ]
  },
  time: {
    label: 'Tiempo',
    units: [
      { id: 'ms', name: 'Milisegundos', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { id: 's', name: 'Segundos', toBase: v => v, fromBase: v => v },
      { id: 'min', name: 'Minutos', toBase: v => v * 60, fromBase: v => v / 60 },
      { id: 'h', name: 'Horas', toBase: v => v * 3600, fromBase: v => v / 3600 },
      { id: 'd', name: 'Días', toBase: v => v * 86400, fromBase: v => v / 86400 },
      { id: 'w', name: 'Semanas', toBase: v => v * 604800, fromBase: v => v / 604800 },
      { id: 'y', name: 'Años', toBase: v => v * 31536000, fromBase: v => v / 31536000 },
    ]
  },
  speed: {
    label: 'Velocidad',
    units: [
      { id: 'ms', name: 'm/s', toBase: v => v, fromBase: v => v },
      { id: 'kmh', name: 'km/h', toBase: v => v / 3.6, fromBase: v => v * 3.6 },
      { id: 'mph', name: 'mi/h', toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
      { id: 'kn', name: 'Nudos', toBase: v => v * 0.514444, fromBase: v => v / 0.514444 },
    ]
  },
}

export default function ConversorUnidadesClient() {
  const [category, setCategory] = useState<Category>('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('km')
  const [value, setValue] = useState('1')

  const cat = UNITS[category]
  const from = cat.units.find(u => u.id === fromUnit) || cat.units[0]
  const to = cat.units.find(u => u.id === toUnit) || cat.units[1]

  const numValue = parseFloat(value) || 0
  const baseValue = from.toBase(numValue)
  const result = to.fromBase(baseValue)

  const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit) }

  const changeCategory = (c: Category) => {
    setCategory(c)
    setFromUnit(UNITS[c].units[0].id)
    setToUnit(UNITS[c].units[1]?.id || UNITS[c].units[0].id)
    setValue('1')
  }

  // Show all conversions
  const allConversions = cat.units.filter(u => u.id !== fromUnit).map(u => ({
    name: u.name,
    value: u.fromBase(baseValue),
  }))

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Ruler className="h-5 w-5 text-primary" /> Conversor de Unidades</CardTitle>
            <CardDescription>Convierte entre unidades de longitud, peso, temperatura, datos, tiempo y velocidad.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(UNITS).map(([key, val]) => (
                <button key={key} onClick={() => changeCategory(key as Category)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${category === key ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}>
                  {val.label}
                </button>
              ))}
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1 space-y-1">
                <Label className="text-xs">Valor</Label>
                <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="font-mono" />
                <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full text-sm rounded border p-1.5 bg-background">
                  {cat.units.map(u => <option key={u.id} value={u.id}>{u.name} ({u.id})</option>)}
                </select>
              </div>

              <Button variant="ghost" size="icon" onClick={swap} className="mb-6"><ArrowLeftRight className="h-4 w-4" /></Button>

              <div className="flex-1 space-y-1">
                <Label className="text-xs">Resultado</Label>
                <div className="p-2 h-10 rounded-md border bg-muted/50 font-mono text-sm flex items-center">{result.toLocaleString('es-ES', { maximumFractionDigits: 8 })}</div>
                <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full text-sm rounded border p-1.5 bg-background">
                  {cat.units.map(u => <option key={u.id} value={u.id}>{u.name} ({u.id})</option>)}
                </select>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-muted/30">
              <div className="text-xs text-muted-foreground mb-2">Todas las conversiones de {numValue} {from.name}:</div>
              <div className="grid grid-cols-2 gap-1">
                {allConversions.map(c => (
                  <div key={c.name} className="flex justify-between text-xs p-1">
                    <span className="text-muted-foreground">{c.name}</span>
                    <span className="font-mono">{c.value.toLocaleString('es-ES', { maximumFractionDigits: 6 })}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Conversor de Unidades Online: Longitud, Peso, Temperatura y Más"
          paragraphs={[
            "Nuestro conversor soporta 6 categorías: longitud, peso, temperatura, almacenamiento de datos, tiempo y velocidad. Incluye unidades métricas e imperiales con conversión instantánea.",
            "Muestra automáticamente todas las conversiones posibles desde la unidad seleccionada. Perfecto para programadores (bytes a MB), cocineros (oz a gramos) o viajeros (millas a km).",
            "Las conversiones de temperatura manejan correctamente las escalas Celsius, Fahrenheit y Kelvin con sus fórmulas no lineales. Todo se calcula en tiempo real en tu navegador."
          ]}
          howTo={[
            { step: "Elige una categoría", description: "Selecciona longitud, peso, temperatura, datos, tiempo o velocidad." },
            { step: "Introduce el valor", description: "Escribe el número a convertir y selecciona las unidades de origen y destino." },
            { step: "Ve todas las conversiones", description: "Debajo se muestran automáticamente las conversiones a todas las unidades disponibles." },
          ]}
          faqs={[
            { question: "¿La conversión de datos usa base 2 o base 10?", answer: "Usamos base 2 (1 KB = 1024 bytes) que es el estándar en informática. También incluimos las unidades IEC (KiB, MiB) para mayor precisión." },
            { question: "¿Por qué la conversión de temperatura es diferente?", answer: "Porque Celsius, Fahrenheit y Kelvin no son proporcionales. Requieren fórmulas con offset: °F = °C × 9/5 + 32. Las demás unidades son multiplicativas." },
            { question: "¿Puedo convertir unidades de datos para velocidad de internet?", answer: "Sí. Usa la categoría 'Datos' para convertir entre bytes y sus múltiplos. Para bits por segundo, recuerda que 1 byte = 8 bits." },
          ]}
          relatedTools={[
            { name: "Conversor Timestamp", href: "/tools/conversor-timestamp" },
            { name: "Calculadora de Porcentajes", href: "/tools/calculadora-porcentajes" },
            { name: "Contador de Caracteres", href: "/tools/contador-caracteres" },
            { name: "Codificador Base64", href: "/tools/codificador-base64" },
          ]}
        />
      </div>
    </div>
  )
}
