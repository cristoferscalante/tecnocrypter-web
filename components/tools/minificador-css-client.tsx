'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Minimize2, Copy, Check, Eraser } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')         // Remove comments
    .replace(/\s+/g, ' ')                      // Collapse whitespace
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')     // Remove spaces around symbols
    .replace(/;}/g, '}')                        // Remove last semicolon in block
    .replace(/^\s+|\s+$/g, '')                  // Trim
}

function minifyJS(js: string): string {
  let result = js
  // Remove single-line comments (but not URLs like http://)
  result = result.replace(/(?<![:"'])\/\/[^\n]*/g, '')
  // Remove multi-line comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, '')
  // Collapse whitespace (preserve string contents approximately)
  result = result.replace(/\s+/g, ' ')
  // Remove spaces around operators
  result = result.replace(/\s*([{}();,=<>!&|+\-*/%?:])\s*/g, '$1')
  // Fix specific patterns that need spaces
  result = result.replace(/\b(return|var|let|const|function|if|else|for|while|new|typeof|instanceof|in|of|throw|catch|class|export|import|from|default|async|await|yield)\b/g, ' $1 ')
  // Clean up extra spaces
  result = result.replace(/\s+/g, ' ').trim()
  return result
}

export default function MinificadorCssClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'css' | 'js'>('css')
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState<{ original: number; minified: number } | null>(null)

  const minify = () => {
    const result = mode === 'css' ? minifyCSS(input) : minifyJS(input)
    setOutput(result)
    setStats({ original: new Blob([input]).size, minified: new Blob([result]).size })
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const savings = stats ? ((1 - stats.minified / stats.original) * 100) : 0

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Minimize2 className="h-5 w-5 text-primary" /> Minificador CSS/JS</CardTitle>
            <CardDescription>Reduce el tamaño de tu CSS y JavaScript eliminando espacios, comentarios y caracteres innecesarios.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button variant={mode === 'css' ? 'default' : 'outline'} size="sm" onClick={() => setMode('css')}>CSS</Button>
              <Button variant={mode === 'js' ? 'default' : 'outline'} size="sm" onClick={() => setMode('js')}>JavaScript</Button>
            </div>

            <div className="space-y-2">
              <Label>Código {mode.toUpperCase()} de entrada</Label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'css'
                  ? '/* Estilos principales */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 20px;\n}'
                  : '// Función de ejemplo\nfunction greet(name) {\n  /* Saludo */\n  const message = `Hello, ${name}!`;\n  console.log(message);\n  return message;\n}'
                }
                className="w-full h-40 p-3 text-sm font-mono rounded-md border bg-background resize-y"
                spellCheck={false}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={minify} disabled={!input.trim()}>Minificar</Button>
              <Button variant="ghost" onClick={() => { setInput(''); setOutput(''); setStats(null) }}>
                <Eraser className="h-4 w-4 mr-1" /> Limpiar
              </Button>
            </div>

            {output && stats && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Original: <strong>{stats.original}</strong> bytes</span>
                    <span className="text-muted-foreground">Minificado: <strong>{stats.minified}</strong> bytes</span>
                    <span className={`font-bold ${savings > 0 ? 'text-green-500' : 'text-muted-foreground'}`}>-{savings.toFixed(1)}%</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={copy}>
                    {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />} Copiar
                  </Button>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap break-all">{output}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Minificador CSS y JavaScript Online: Reduce el Peso de Tu Web"
          paragraphs={[
            "La minificación elimina caracteres innecesarios (espacios, saltos de línea, comentarios) del código CSS y JavaScript sin cambiar su funcionalidad. Cada byte cuenta para la velocidad de carga.",
            "Google PageSpeed y Core Web Vitals penalizan archivos CSS/JS sin minificar. Reducir el tamaño de tus assets mejora FCP, LCP y el rendimiento percibido de tu sitio web.",
            "Ideal para proyectos sin bundler o para minificar rápidamente snippets antes de incrustarlos en HTML inline. Para producción, combina con gzip/brotli para máxima compresión."
          ]}
          howTo={[
            { step: "Selecciona el tipo", description: "Elige entre CSS o JavaScript según el código a minificar." },
            { step: "Pega el código", description: "Introduce el código fuente con comentarios y formato." },
            { step: "Minifica y copia", description: "Ve la reducción de tamaño y copia el resultado optimizado." },
          ]}
          faqs={[
            { question: "¿La minificación puede romper mi código?", answer: "La minificación CSS es segura al 100%. En JS, la eliminación de comentarios y espacios es segura, pero la minificación avanzada (renombrar variables) requiere herramientas como Terser o esbuild." },
            { question: "¿Cuánto se reduce el tamaño?", answer: "Típicamente 20-40% para CSS y 15-30% para JS solo con minificación. Combinado con gzip se consigue 70-90% de reducción total." },
            { question: "¿Debería minificar en desarrollo?", answer: "No. Usa código legible en desarrollo y minifica solo en producción. Bundlers como Webpack, Vite y esbuild hacen esto automáticamente." },
          ]}
          relatedTools={[
            { name: "Formateador SQL", href: "/tools/formateador-sql" },
            { name: "Conversor Markdown", href: "/tools/conversor-markdown" },
            { name: "Codificador Base64", href: "/tools/codificador-base64" },
            { name: "Contador de Caracteres", href: "/tools/contador-caracteres" },
          ]}
        />
      </div>
    </div>
  )
}
