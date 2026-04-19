'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { EyeOff, Copy, Check, ArrowLeftRight } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

const LOOKALIKE_MAP: Record<string, string> = {
  'a': 'а', 'c': 'с', 'e': 'е', 'o': 'о', 'p': 'р', 'x': 'х', 'y': 'у',
  'A': 'А', 'B': 'В', 'C': 'С', 'E': 'Е', 'H': 'Н', 'K': 'К', 'M': 'М',
  'O': 'О', 'P': 'Р', 'T': 'Т', 'X': 'Х', 'i': 'і', 's': 'ѕ', 'j': 'ј',
}

const REVERSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(LOOKALIKE_MAP).map(([k, v]) => [v, k])
)

const ZALGO_MARKS = ['\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0306', '\u0307', '\u0308', '\u030A', '\u030B', '\u030C', '\u030F', '\u0311', '\u0312', '\u0313', '\u0314', '\u033D', '\u0350', '\u0351', '\u0352', '\u0357', '\u035B']

function obfuscateHomoglyph(text: string): string {
  return text.split('').map(c => LOOKALIKE_MAP[c] || c).join('')
}

function deobfuscateHomoglyph(text: string): string {
  return text.split('').map(c => REVERSE_MAP[c] || c).join('')
}

function obfuscateZalgo(text: string, intensity: number = 3): string {
  return text.split('').map(c => {
    if (c === ' ' || c === '\n') return c
    let result = c
    for (let i = 0; i < intensity; i++) {
      result += ZALGO_MARKS[Math.floor(Math.random() * ZALGO_MARKS.length)]
    }
    return result
  }).join('')
}

function obfuscateInvisible(text: string): string {
  return text.split('').map(c => c + '\u200B').join('')
}

function reverseText(text: string): string {
  return [...text].reverse().join('')
}

function obfuscateCircled(text: string): string {
  return text.split('').map(c => {
    const code = c.charCodeAt(0)
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + code - 65)
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + code - 97)
    if (code >= 48 && code <= 57) return code === 48 ? '⓪' : String.fromCodePoint(0x2460 + code - 49)
    return c
  }).join('')
}

type Mode = 'homoglyph' | 'zalgo' | 'invisible' | 'reverse' | 'circled'

const modes: { id: Mode; label: string; desc: string }[] = [
  { id: 'homoglyph', label: 'Homoglifos', desc: 'Reemplaza con caracteres Unicode visualmente idénticos' },
  { id: 'zalgo', label: 'Zalgo', desc: 'Añade marcas diacríticas combinadas al texto' },
  { id: 'invisible', label: 'Caracteres invisibles', desc: 'Inserta zero-width spaces entre cada carácter' },
  { id: 'reverse', label: 'Invertido', desc: 'Invierte el orden de todos los caracteres' },
  { id: 'circled', label: 'Círculos', desc: 'Convierte letras y números en variantes circulares' },
]

export default function OfuscadorTextoClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<Mode>('homoglyph')
  const [copied, setCopied] = useState(false)

  const obfuscate = () => {
    if (!input.trim()) return
    let result = ''
    switch (mode) {
      case 'homoglyph': result = obfuscateHomoglyph(input); break
      case 'zalgo': result = obfuscateZalgo(input); break
      case 'invisible': result = obfuscateInvisible(input); break
      case 'reverse': result = reverseText(input); break
      case 'circled': result = obfuscateCircled(input); break
    }
    setOutput(result)
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><EyeOff className="h-5 w-5 text-primary" /> Ofuscador de Texto</CardTitle>
            <CardDescription>Ofusca texto usando homoglifos Unicode, Zalgo, caracteres invisibles y más técnicas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Modo de ofuscación</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {modes.map(m => (
                  <button key={m.id} onClick={() => setMode(m.id)} className={`p-3 rounded-lg border text-left transition-all ${mode === m.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}>
                    <div className="text-sm font-medium">{m.label}</div>
                    <div className="text-xs text-muted-foreground">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Texto original</Label>
              <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe el texto a ofuscar..." rows={4} />
            </div>

            <Button onClick={obfuscate} disabled={!input.trim()} className="w-full">
              <ArrowLeftRight className="h-4 w-4 mr-2" /> Ofuscar texto
            </Button>

            {output && (
              <div className="space-y-2">
                <Label>Resultado</Label>
                <div className="relative">
                  <Textarea value={output} readOnly rows={4} className="pr-12" />
                  <Button variant="ghost" size="icon" onClick={copy} className="absolute top-2 right-2">
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Original: {input.length} chars</span>
                  <span>Ofuscado: {output.length} chars</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Ofuscador de Texto Unicode: Homoglifos, Zalgo y Más"
          paragraphs={[
            "La ofuscación de texto usando Unicode permite crear texto que parece normal pero contiene caracteres diferentes. Los homoglifos reemplazan letras latinas con caracteres cirílicos visualmente idénticos.",
            "Esta técnica es utilizada tanto por atacantes (para crear URLs de phishing con dominios que parecen legítimos) como por defensores (para watermarking de textos confidenciales).",
            "Nuestro ofuscador soporta 5 técnicas: homoglifos (sustitución visual), Zalgo (texto corrupto), caracteres invisibles (zero-width), inversión y variantes circulares Unicode."
          ]}
          howTo={[
            { step: "Selecciona el modo", description: "Elige entre homoglifos, Zalgo, caracteres invisibles, invertido o círculos." },
            { step: "Escribe tu texto", description: "Introduce el texto que quieres ofuscar." },
            { step: "Copia el resultado", description: "El texto ofuscado se puede copiar para usar donde necesites." },
          ]}
          faqs={[
            { question: "¿Qué son los homoglifos?", answer: "Son caracteres Unicode de diferentes alfabetos que se ven idénticos. Por ejemplo, la 'а' cirílica (U+0430) es visualmente igual a la 'a' latina (U+0061) pero son caracteres distintos." },
            { question: "¿Para qué sirve ofuscar texto?", answer: "Para watermarking de documentos (detectar filtraciones), bypassing de filtros de contenido, experimentación con Unicode y educación sobre seguridad (entender ataques homoglíficos)." },
            { question: "¿El texto ofuscado es detectable?", answer: "Con herramientas apropiadas, sí. Los caracteres Unicode tienen codepoints diferentes que se revelan al inspeccionar. Navegadores y editores modernos pueden detectar mezcla de scripts." },
          ]}
          relatedTools={[
            { name: "Generador de Datos Ficticios", href: "/tools/generador-datos" },
            { name: "Codificador URL", href: "/tools/codificador-url" },
            { name: "Conversor Hexadecimal", href: "/tools/conversor-hex" },
            { name: "Contador de Caracteres", href: "/tools/contador-caracteres" },
          ]}
        />
      </div>
    </div>
  )
}
