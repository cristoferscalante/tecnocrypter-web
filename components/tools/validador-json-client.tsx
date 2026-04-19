'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Copy, Check, Braces, Trash2, Download, Minimize2, Maximize2, CheckCircle, XCircle, ChevronRight, ChevronDown } from 'lucide-react'

function validateJSON(text: string): { valid: boolean; error?: string; parsed?: unknown } {
  try {
    const parsed = JSON.parse(text)
    return { valid: true, parsed }
  } catch (e) {
    return { valid: false, error: (e as Error).message }
  }
}

function formatJSON(text: string, spaces: number): string {
  const { parsed, valid, error } = validateJSON(text)
  if (!valid) return `Error: ${error}`
  return JSON.stringify(parsed, null, spaces)
}

function minifyJSON(text: string): string {
  const { parsed, valid, error } = validateJSON(text)
  if (!valid) return `Error: ${error}`
  return JSON.stringify(parsed)
}

interface TreeNodeProps {
  keyName: string | null
  value: unknown
  depth: number
}

function TreeNode({ keyName, value, depth }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(depth < 2)

  if (value === null) {
    return (
      <div className="flex items-center gap-1" style={{ paddingLeft: depth * 16 }}>
        {keyName && <span className="text-blue-400">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-muted-foreground">: </span>}
        <span className="text-orange-400">null</span>
      </div>
    )
  }

  if (typeof value === 'boolean') {
    return (
      <div className="flex items-center gap-1" style={{ paddingLeft: depth * 16 }}>
        {keyName && <span className="text-blue-400">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-muted-foreground">: </span>}
        <span className="text-orange-400">{value.toString()}</span>
      </div>
    )
  }

  if (typeof value === 'number') {
    return (
      <div className="flex items-center gap-1" style={{ paddingLeft: depth * 16 }}>
        {keyName && <span className="text-blue-400">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-muted-foreground">: </span>}
        <span className="text-primary">{value}</span>
      </div>
    )
  }

  if (typeof value === 'string') {
    return (
      <div className="flex items-center gap-1" style={{ paddingLeft: depth * 16 }}>
        {keyName && <span className="text-blue-400">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-muted-foreground">: </span>}
        <span className="text-yellow-400">&quot;{value.length > 80 ? value.slice(0, 80) + '...' : value}&quot;</span>
      </div>
    )
  }

  if (Array.isArray(value)) {
    return (
      <div style={{ paddingLeft: depth * 16 }}>
        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 hover:text-primary transition-colors">
          {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          {keyName && <span className="text-blue-400">&quot;{keyName}&quot;</span>}
          {keyName && <span className="text-muted-foreground">: </span>}
          <span className="text-muted-foreground">[{value.length}]</span>
        </button>
        {expanded && value.map((item, i) => (
          <TreeNode key={i} keyName={null} value={item} depth={depth + 1} />
        ))}
      </div>
    )
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    return (
      <div style={{ paddingLeft: depth * 16 }}>
        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 hover:text-primary transition-colors">
          {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          {keyName && <span className="text-blue-400">&quot;{keyName}&quot;</span>}
          {keyName && <span className="text-muted-foreground">: </span>}
          <span className="text-muted-foreground">{`{${entries.length}}`}</span>
        </button>
        {expanded && entries.map(([k, v]) => (
          <TreeNode key={k} keyName={k} value={v} depth={depth + 1} />
        ))}
      </div>
    )
  }

  return null
}

export default function ValidadorJsonClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [parsedTree, setParsedTree] = useState<unknown>(null)
  const [showTree, setShowTree] = useState(false)
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)

  const handleValidate = useCallback(() => {
    if (!input.trim()) return
    const result = validateJSON(input)
    setIsValid(result.valid)
    if (result.valid) {
      const formatted = formatJSON(input, indentSize)
      setOutput(formatted)
      setParsedTree(result.parsed)
      setErrorMsg('')
    } else {
      setOutput('')
      setParsedTree(null)
      setErrorMsg(result.error || 'JSON inválido')
    }
  }, [input, indentSize])

  const handleFormat = useCallback(() => {
    const formatted = formatJSON(input, indentSize)
    setOutput(formatted)
    setInput(formatted.startsWith('Error:') ? input : formatted)
  }, [input, indentSize])

  const handleMinify = useCallback(() => {
    const minified = minifyJSON(input)
    setOutput(minified)
    if (!minified.startsWith('Error:')) setInput(minified)
  }, [input])

  const copyOutput = useCallback(async () => {
    await navigator.clipboard.writeText(output || input)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output, input])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
    setIsValid(null)
    setErrorMsg('')
    setParsedTree(null)
    setShowTree(false)
  }, [])

  const downloadOutput = useCallback(() => {
    const content = output || input
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [output, input])

  const stats = input.trim() ? (() => {
    const result = validateJSON(input)
    if (!result.valid) return null
    const str = JSON.stringify(result.parsed)
    return {
      size: new TextEncoder().encode(input).length,
      minified: str.length,
      keys: typeof result.parsed === 'object' && result.parsed ? Object.keys(result.parsed).length : 0,
    }
  })() : null

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-tight mb-3">
            Validador <span className="text-primary">JSON</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Valida, formatea y minifica JSON con vista de árbol interactiva. Todo local.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Entrada</CardTitle>
                <div className="flex items-center gap-1">
                  {isValid !== null && (
                    isValid
                      ? <CheckCircle className="h-5 w-5 text-primary" />
                      : <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3">
              <textarea
                value={input}
                onChange={(e) => { setInput(e.target.value); setIsValid(null) }}
                placeholder='{"clave": "valor", "numero": 42}'
                className="flex-1 min-h-[300px] w-full rounded-md border bg-background p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                spellCheck={false}
              />
              {errorMsg && (
                <div className="p-2 rounded bg-destructive/10 text-destructive text-xs font-mono">
                  {errorMsg}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleValidate} size="sm" className="flex-1">
                  <CheckCircle className="h-4 w-4 mr-1" /> Validar
                </Button>
                <Button onClick={handleFormat} size="sm" variant="outline" className="flex-1">
                  <Maximize2 className="h-4 w-4 mr-1" /> Formatear
                </Button>
                <Button onClick={handleMinify} size="sm" variant="outline" className="flex-1">
                  <Minimize2 className="h-4 w-4 mr-1" /> Minificar
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs whitespace-nowrap">Indentación:</Label>
                {[2, 4].map(n => (
                  <Button
                    key={n}
                    size="sm"
                    variant={indentSize === n ? 'default' : 'outline'}
                    className="h-7 px-2 text-xs"
                    onClick={() => setIndentSize(n)}
                  >
                    {n} espacios
                  </Button>
                ))}
                <div className="ml-auto flex gap-1">
                  <Button size="sm" variant="ghost" onClick={handleClear} className="h-7">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Resultado</CardTitle>
                <div className="flex gap-1">
                  {parsedTree && (
                    <Button
                      size="sm"
                      variant={showTree ? 'default' : 'outline'}
                      className="h-7 text-xs"
                      onClick={() => setShowTree(!showTree)}
                    >
                      <Braces className="h-3 w-3 mr-1" /> Árbol
                    </Button>
                  )}
                  <Button size="icon" variant="ghost" onClick={copyOutput} className="h-7 w-7">
                    {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                  </Button>
                  <Button size="icon" variant="ghost" onClick={downloadOutput} className="h-7 w-7">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3">
              {showTree && parsedTree ? (
                <div className="flex-1 min-h-[300px] overflow-auto rounded-md border bg-background p-3 font-mono text-xs">
                  <TreeNode keyName={null} value={parsedTree} depth={0} />
                </div>
              ) : (
                <textarea
                  value={output}
                  readOnly
                  className="flex-1 min-h-[300px] w-full rounded-md border bg-muted/30 p-3 font-mono text-sm resize-none"
                  spellCheck={false}
                />
              )}
              {stats && (
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>Tamaño: {stats.size.toLocaleString()} bytes</span>
                  <span>Minificado: {stats.minified.toLocaleString()} bytes</span>
                  <span>Claves raíz: {stats.keys}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
