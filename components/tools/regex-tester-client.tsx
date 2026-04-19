'use client'

import { useState, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Copy, Check, Trash2, SearchCode, Flag } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

interface MatchResult {
  match: string
  index: number
  groups: string[]
}

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('gi')
  const [testString, setTestString] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const matches = useMemo<MatchResult[]>(() => {
    if (!pattern || !testString) return []
    try {
      setError('')
      const regex = new RegExp(pattern, flags)
      const results: MatchResult[] = []
      let match: RegExpExecArray | null

      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          })
          if (match[0].length === 0) regex.lastIndex++
        }
      } else {
        match = regex.exec(testString)
        if (match) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          })
        }
      }
      return results
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Regex inválida')
      return []
    }
  }, [pattern, flags, testString])

  const highlightedText = useMemo(() => {
    if (!pattern || !testString || matches.length === 0) return null
    try {
      const regex = new RegExp(pattern, flags)
      const parts: { text: string; isMatch: boolean }[] = []
      let lastIndex = 0

      const tempMatches: { start: number; end: number }[] = []
      let m: RegExpExecArray | null
      const tempRegex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      while ((m = tempRegex.exec(testString)) !== null) {
        tempMatches.push({ start: m.index, end: m.index + m[0].length })
        if (m[0].length === 0) tempRegex.lastIndex++
      }

      for (const { start, end } of tempMatches) {
        if (start > lastIndex) parts.push({ text: testString.slice(lastIndex, start), isMatch: false })
        parts.push({ text: testString.slice(start, end), isMatch: true })
        lastIndex = end
      }
      if (lastIndex < testString.length) parts.push({ text: testString.slice(lastIndex), isMatch: false })
      return parts
    } catch {
      return null
    }
  }, [pattern, flags, testString, matches])

  const toggleFlag = useCallback((flag: string) => {
    setFlags(prev => prev.includes(flag) ? prev.replace(flag, '') : prev + flag)
  }, [])

  const copyMatches = useCallback(async () => {
    const text = matches.map(m => m.match).join('\n')
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [matches])

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-tight mb-3">
            Regex <span className="text-primary">Tester</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Prueba expresiones regulares en tiempo real con resaltado de coincidencias, grupos de captura y flags configurables.
          </p>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <SearchCode className="h-5 w-5 text-primary" /> Expresión Regular
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <span className="flex items-center text-muted-foreground font-mono text-lg">/</span>
                <Input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  className="font-mono flex-1"
                />
                <span className="flex items-center text-muted-foreground font-mono text-lg">/</span>
                <Input
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="font-mono w-16 text-center"
                  maxLength={6}
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {[
                  { flag: 'g', label: 'Global', desc: 'Todas las coincidencias' },
                  { flag: 'i', label: 'Case Insensitive', desc: 'Ignora mayúsculas' },
                  { flag: 'm', label: 'Multiline', desc: '^ y $ por línea' },
                  { flag: 's', label: 'Dotall', desc: '. incluye \\n' },
                ].map(({ flag, label }) => (
                  <Button
                    key={flag}
                    variant={flags.includes(flag) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleFlag(flag)}
                  >
                    <Flag className="h-3 w-3 mr-1" />{flag} - {label}
                  </Button>
                ))}
              </div>

              {error && <p className="text-destructive text-sm">{error}</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Texto de Prueba</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => { setTestString(''); setPattern('') }}>
                  <Trash2 className="h-4 w-4 mr-1" /> Limpiar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Escribe o pega aquí el texto para probar tu regex..."
                className="min-h-[120px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {highlightedText && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Vista Resaltada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap break-all">
                  {highlightedText.map((part, i) =>
                    part.isMatch ? (
                      <mark key={i} className="bg-primary/30 text-primary rounded px-0.5">{part.text}</mark>
                    ) : (
                      <span key={i}>{part.text}</span>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {matches.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {matches.length} coincidencia{matches.length !== 1 ? 's' : ''}
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={copyMatches}>
                    {copied ? <Check className="h-4 w-4 mr-1 text-primary" /> : <Copy className="h-4 w-4 mr-1" />}
                    Copiar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {matches.map((m, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 rounded bg-muted/30 text-sm">
                      <span className="text-xs text-muted-foreground font-mono shrink-0 mt-0.5">#{i + 1} @{m.index}</span>
                      <code className="font-mono text-primary break-all">{m.match}</code>
                      {m.groups.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {m.groups.map((g, gi) => (
                            <span key={gi} className="text-xs bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded font-mono">
                              ${gi + 1}: {g}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <ToolSeoSection
          title="Regex Tester Online: Prueba Expresiones Regulares en Tiempo Real"
          paragraphs={[
            "Las expresiones regulares (regex o regexp) son patrones de búsqueda fundamentales en programación. Nuestro regex tester online te permite escribir, probar y depurar expresiones regulares con resaltado visual de coincidencias en tiempo real.",
            "Soporta todas las flags de JavaScript (global, case-insensitive, multiline, dotall) y muestra grupos de captura, índices de posición y múltiples coincidencias de forma clara y organizada.",
            "Perfecto para desarrolladores que trabajan con validación de formularios, procesamiento de texto, web scraping, búsqueda y reemplazo de patrones en cualquier lenguaje de programación."
          ]}
          howTo={[
            { step: "Escribe tu regex", description: "Introduce el patrón de expresión regular en el campo superior. Los errores de sintaxis se muestran en tiempo real." },
            { step: "Configura las flags", description: "Activa o desactiva flags como global (g), case-insensitive (i) o multiline (m) según necesites." },
            { step: "Introduce texto de prueba", description: "Pega o escribe el texto donde quieres buscar coincidencias." },
            { step: "Analiza resultados", description: "Las coincidencias se resaltan visualmente y se listan con su posición y grupos de captura." },
          ]}
          faqs={[
            { question: "¿Qué son los grupos de captura en regex?", answer: "Los grupos de captura se definen con paréntesis () y permiten extraer partes específicas de una coincidencia. Por ejemplo, en el patrón (\\d{2})/(\\d{2})/(\\d{4}), cada grupo captura día, mes y año por separado." },
            { question: "¿Cuál es la diferencia entre las flags g, i, m y s?", answer: "g (global) busca todas las coincidencias; i (case-insensitive) ignora mayúsculas/minúsculas; m (multiline) hace que ^ y $ coincidan con inicio/fin de cada línea; s (dotall) hace que el punto (.) coincida también con saltos de línea." },
            { question: "¿Estas regex funcionan en otros lenguajes?", answer: "La sintaxis es compatible con JavaScript, TypeScript, Java, Python, PHP, Ruby, Go y la mayoría de lenguajes modernos. Algunas funcionalidades avanzadas como lookbehind pueden variar entre implementaciones." },
          ]}
          relatedTools={[
            { name: "Contador de Caracteres", href: "/tools/contador-caracteres" },
            { name: "Comparador de Archivos", href: "/tools/comparador-archivos" },
            { name: "Validador JSON", href: "/tools/validador-json" },
            { name: "Codificador URL", href: "/tools/codificador-url" },
          ]}
        />
      </div>
    </div>
  )
}
