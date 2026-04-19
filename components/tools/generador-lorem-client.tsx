'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Check, RefreshCw, AlignLeft } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
  'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
  'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
  'explicabo', 'nemo', 'ipsam', 'voluptas', 'aspernatur', 'aut', 'odit', 'fugit',
  'consequuntur', 'magni', 'dolores', 'eos', 'ratione', 'sequi', 'nesciunt',
  'neque', 'porro', 'quisquam', 'nihil', 'molestiae', 'illum', 'corporis',
  'suscipit', 'laboriosam', 'numquam', 'sapiente', 'delectus',
]

function generateSentence(minWords: number, maxWords: number): string {
  const length = minWords + Math.floor(Math.random() * (maxWords - minWords + 1))
  const words = Array.from({ length }, () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)])
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return words.join(' ') + '.'
}

function generateParagraph(sentences: number): string {
  return Array.from({ length: sentences }, () => generateSentence(8, 18)).join(' ')
}

function generateText(type: 'paragraphs' | 'sentences' | 'words', count: number, startWithLorem: boolean): string {
  if (type === 'words') {
    const words = Array.from({ length: count }, () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)])
    if (startWithLorem && count >= 2) { words[0] = 'Lorem'; words[1] = 'ipsum' }
    return words.join(' ')
  }
  if (type === 'sentences') {
    const sentences = Array.from({ length: count }, () => generateSentence(8, 18))
    if (startWithLorem) sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    return sentences.join(' ')
  }
  const paragraphs = Array.from({ length: count }, () => generateParagraph(4 + Math.floor(Math.random() * 3)))
  if (startWithLorem) {
    paragraphs[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + paragraphs[0]
  }
  return paragraphs.join('\n\n')
}

export default function GeneradorLoremClient() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [count, setCount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    setOutput(generateText(type, count, startWithLorem))
  }, [type, count, startWithLorem])

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const wordCount = output ? output.split(/\s+/).filter(Boolean).length : 0
  const charCount = output.length

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-tight mb-3">
            Generador <span className="text-primary">Lorem Ipsum</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Genera texto placeholder para diseño y desarrollo. Párrafos, oraciones o palabras al instante.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlignLeft className="h-5 w-5 text-primary" /> Configuración
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: 'paragraphs', label: 'Párrafos' },
                { value: 'sentences', label: 'Oraciones' },
                { value: 'words', label: 'Palabras' },
              ] as const).map(({ value, label }) => (
                <Button
                  key={value}
                  variant={type === value ? 'default' : 'outline'}
                  onClick={() => setType(value)}
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Label className="text-sm">Cantidad</Label>
                <Input
                  type="number"
                  min={1}
                  max={type === 'words' ? 5000 : type === 'sentences' ? 100 : 50}
                  value={count}
                  onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <label className="flex items-center gap-2 pb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={startWithLorem}
                  onChange={(e) => setStartWithLorem(e.target.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm">Iniciar con &quot;Lorem ipsum&quot;</span>
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={generate} className="font-medium">Generar</Button>
              <Button variant="outline" onClick={generate}>
                <RefreshCw className="h-4 w-4 mr-1" /> Regenerar
              </Button>
            </div>
          </CardContent>
        </Card>

        {output && (
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Resultado</CardTitle>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{wordCount} palabras · {charCount} caracteres</span>
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4 mr-1 text-primary" /> : <Copy className="h-4 w-4 mr-1" />}
                    Copiar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={output}
                readOnly
                className="min-h-[200px] text-sm leading-relaxed"
              />
            </CardContent>
          </Card>
        )}

        <ToolSeoSection
          title="Generador Lorem Ipsum Online: Texto Placeholder para Diseño"
          paragraphs={[
            "Lorem Ipsum es el texto de relleno estándar utilizado en diseño gráfico y desarrollo web desde el siglo XVI. Nuestro generador te permite crear texto placeholder de forma rápida y personalizable para tus maquetas, prototipos y diseños.",
            "A diferencia de usar texto real, Lorem Ipsum permite a diseñadores y desarrolladores enfocarse en el layout visual sin que el contenido distraiga. Es el estándar utilizado por herramientas como Figma, Sketch, Adobe XD y WordPress.",
            "Genera párrafos, oraciones o un número específico de palabras con un solo clic. Cada generación produce texto aleatorio diferente manteniendo la estructura natural del idioma latino."
          ]}
          howTo={[
            { step: "Elige el tipo", description: "Selecciona si necesitas párrafos completos, oraciones individuales o un número específico de palabras." },
            { step: "Define la cantidad", description: "Indica cuántos párrafos, oraciones o palabras necesitas para tu diseño." },
            { step: "Genera y copia", description: "Haz clic en Generar para crear el texto y cópialo al portapapeles con un clic." },
          ]}
          faqs={[
            { question: "¿Qué es Lorem Ipsum y de dónde viene?", answer: "Lorem Ipsum proviene de 'De Finibus Bonorum et Malorum' de Cicerón (45 a.C.). Desde los años 1500, la industria de la impresión lo usa como texto de relleno estándar. La versión moderna mantiene una distribución de letras similar al texto real." },
            { question: "¿Por qué usar Lorem Ipsum en lugar de texto real?", answer: "El texto real distrae del diseño visual. Lorem Ipsum tiene una distribución de letras y longitud de palabras similar al español/inglés, permitiendo evaluar cómo se verá el layout sin que el contenido influya en la percepción del diseño." },
            { question: "¿Puedo usar este texto en producción?", answer: "No se recomienda. Lorem Ipsum es solo para maquetas y prototipos. Antes de publicar cualquier sitio, reemplaza todo el texto placeholder por contenido real y relevante para SEO y la experiencia del usuario." },
          ]}
          relatedTools={[
            { name: "Contador de Caracteres", href: "/tools/contador-caracteres" },
            { name: "Conversor Markdown", href: "/tools/conversor-markdown" },
            { name: "Comparador de Archivos", href: "/tools/comparador-archivos" },
            { name: "Generador QR", href: "/tools/generador-qr" },
          ]}
        />
      </div>
    </div>
  )
}
