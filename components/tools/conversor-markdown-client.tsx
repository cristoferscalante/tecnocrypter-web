'use client'

import { useState, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check, ArrowRightLeft, Trash2, Code2 } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

function markdownToHtml(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr />')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/^\* (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>\n${match}</ul>`)

  // Wrap plain text lines in <p>
  const lines = html.split('\n')
  const result: string[] = []
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      result.push('')
    } else if (/^<(h[1-6]|ul|ol|li|blockquote|hr|pre|code|img|div|table)/.test(trimmed)) {
      result.push(line)
    } else if (!trimmed.startsWith('<')) {
      result.push(`<p>${trimmed}</p>`)
    } else {
      result.push(line)
    }
  }

  return result.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

function htmlToMarkdown(html: string): string {
  return html
    .replace(/<h1>(.*?)<\/h1>/gi, '# $1')
    .replace(/<h2>(.*?)<\/h2>/gi, '## $1')
    .replace(/<h3>(.*?)<\/h3>/gi, '### $1')
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i>(.*?)<\/i>/gi, '*$1*')
    .replace(/<del>(.*?)<\/del>/gi, '~~$1~~')
    .replace(/<code>(.*?)<\/code>/gi, '`$1`')
    .replace(/<a href="([^"]*)">(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<img[^>]+src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    .replace(/<blockquote>(.*?)<\/blockquote>/gi, '> $1')
    .replace(/<li>(.*?)<\/li>/gi, '- $1')
    .replace(/<hr\s*\/?>/gi, '---')
    .replace(/<p>(.*?)<\/p>/gi, '$1')
    .replace(/<\/?ul>/gi, '')
    .replace(/<\/?ol>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export default function ConversorMarkdownClient() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'md-to-html' | 'html-to-md'>('md-to-html')
  const [copied, setCopied] = useState<string | null>(null)

  const output = useMemo(() => {
    if (!input.trim()) return ''
    return mode === 'md-to-html' ? markdownToHtml(input) : htmlToMarkdown(input)
  }, [input, mode])

  const handleSwap = useCallback(() => {
    setInput(output)
    setMode(m => m === 'md-to-html' ? 'html-to-md' : 'md-to-html')
  }, [output])

  const copyText = useCallback(async (key: string, text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  const loadExample = useCallback(() => {
    setMode('md-to-html')
    setInput(`# Título Principal

## Subtítulo

Un párrafo con **texto en negrita** y *texto en cursiva*.

- Primer elemento
- Segundo elemento
- Tercer elemento

> Una cita importante

[Enlace a TecnoCrypter](https://tecnocrypter.com)

---

### Código inline

Usa \`console.log()\` para depurar.`)
  }, [])

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-tight mb-3">
            Conversor <span className="text-primary">Markdown</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Convierte Markdown a HTML y viceversa. Vista previa en tiempo real y resultado listo para copiar.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Code2 className="h-5 w-5 text-primary" />
              {mode === 'md-to-html' ? 'Markdown → HTML' : 'HTML → Markdown'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={mode} onValueChange={(v) => { setMode(v as typeof mode); setInput('') }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="md-to-html">Markdown → HTML</TabsTrigger>
                <TabsTrigger value="html-to-md">HTML → Markdown</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'md-to-html'
                  ? '# Escribe Markdown aquí\n\n**Texto en negrita** y *cursiva*...'
                  : '<h1>Pega HTML aquí</h1>\n<p><strong>Texto en negrita</strong></p>'}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleSwap} title="Intercambiar">
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={loadExample}>Cargar ejemplo</Button>
              <Button variant="ghost" onClick={() => setInput('')}>
                <Trash2 className="h-4 w-4 mr-1" /> Limpiar
              </Button>
            </div>
          </CardContent>
        </Card>

        {output && (
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Código</CardTitle>
                  <Button size="sm" variant="ghost" onClick={() => copyText('code', output)}>
                    {copied === 'code' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted/50 rounded-lg p-4 text-xs font-mono overflow-auto max-h-[400px] whitespace-pre-wrap">
                  {output}
                </pre>
              </CardContent>
            </Card>

            {mode === 'md-to-html' && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Vista Previa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none overflow-auto max-h-[400px]"
                    dangerouslySetInnerHTML={{ __html: output }}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <ToolSeoSection
          title="Conversor Markdown a HTML Online: Convierte al Instante"
          paragraphs={[
            "Markdown es el lenguaje de marcado ligero más popular para escribir contenido web. Nuestro conversor online transforma Markdown a HTML semántico y también permite la conversión inversa de HTML a Markdown.",
            "Ideal para bloggers, redactores técnicos y desarrolladores que necesitan convertir contenido entre formatos rápidamente. Soporta encabezados, negrita, cursiva, listas, enlaces, imágenes, citas y código inline.",
            "La conversión se realiza en tiempo real en tu navegador con vista previa del resultado HTML renderizado, permitiéndote verificar el resultado antes de copiarlo."
          ]}
          howTo={[
            { step: "Elige la dirección", description: "Selecciona Markdown → HTML o HTML → Markdown según lo que necesites." },
            { step: "Escribe o pega el contenido", description: "Introduce tu texto en Markdown o tu código HTML en el editor." },
            { step: "Revisa y copia", description: "El resultado se genera en tiempo real. Copia el código o revisa la vista previa renderizada." },
          ]}
          faqs={[
            { question: "¿Qué es Markdown y para qué se usa?", answer: "Markdown es un lenguaje de marcado ligero creado por John Gruber. Se usa ampliamente en GitHub, documentación técnica, blogs (como Ghost o Hugo), README files, Slack, Discord y muchas plataformas de contenido. Es más fácil de escribir y leer que HTML." },
            { question: "¿El conversor soporta todas las extensiones de Markdown?", answer: "Soporta la sintaxis estándar de Markdown: encabezados, negrita, cursiva, tachado, código inline, enlaces, imágenes, listas, citas y líneas horizontales. Para extensiones como tablas GFM o diagramas Mermaid, se recomienda un procesador especializado." },
            { question: "¿Puedo usar el HTML generado en mi sitio web?", answer: "Sí, el HTML generado es semántico y limpio, listo para usar en cualquier sitio web o CMS. Asegúrate de sanitizar el HTML si proviene de fuentes no confiables para prevenir ataques XSS." },
          ]}
          relatedTools={[
            { name: "Contador de Caracteres", href: "/tools/contador-caracteres" },
            { name: "Validador JSON", href: "/tools/validador-json" },
            { name: "Generador Lorem Ipsum", href: "/tools/generador-lorem" },
            { name: "Comparador de Archivos", href: "/tools/comparador-archivos" },
          ]}
        />
      </div>
    </div>
  )
}
