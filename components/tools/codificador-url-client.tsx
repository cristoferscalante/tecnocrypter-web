'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check, ArrowRightLeft, Trash2, Link2 } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

export default function CodificadorUrlClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [encodeType, setEncodeType] = useState<'component' | 'full'>('component')
  const [copied, setCopied] = useState(false)

  const handleConvert = useCallback(() => {
    try {
      if (mode === 'encode') {
        setOutput(encodeType === 'component' ? encodeURIComponent(input) : encodeURI(input))
      } else {
        setOutput(encodeType === 'component' ? decodeURIComponent(input) : decodeURI(input))
      }
    } catch {
      setOutput(`Error: No se pudo ${mode === 'encode' ? 'codificar' : 'decodificar'} el texto.`)
    }
  }, [mode, input, encodeType])

  const handleSwap = useCallback(() => {
    setInput(output)
    setOutput('')
    setMode(m => m === 'encode' ? 'decode' : 'encode')
  }, [output])

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
  }, [])

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-tight mb-3">
            Codificador <span className="text-primary">URL</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Codifica y decodifica URLs y parámetros. Soporta encodeURIComponent y encodeURI. 100% en tu navegador.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Link2 className="h-5 w-5 text-primary" />
              {mode === 'encode' ? 'Codificar' : 'Decodificar'} URL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={mode} onValueChange={(v) => { setMode(v as 'encode' | 'decode'); setOutput('') }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="encode">Codificar</TabsTrigger>
                <TabsTrigger value="decode">Decodificar</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <Button
                variant={encodeType === 'component' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEncodeType('component')}
              >
                Componente (parámetros)
              </Button>
              <Button
                variant={encodeType === 'full' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEncodeType('full')}
              >
                URL completa
              </Button>
            </div>

            <div>
              <Textarea
                placeholder={mode === 'encode'
                  ? 'Texto a codificar: hola mundo / parámetro=valor&otro=más'
                  : 'URL codificada: hola%20mundo%20%2F%20par%C3%A1metro'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[100px] font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleConvert} className="font-medium">
                {mode === 'encode' ? 'Codificar' : 'Decodificar'}
              </Button>
              <Button variant="outline" size="icon" onClick={handleSwap} title="Intercambiar">
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleClear} title="Limpiar">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {output && (
              <div className="relative">
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[100px] font-mono text-sm pr-12"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 h-8 w-8"
                >
                  {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            )}

            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Componente:</strong> Codifica todos los caracteres especiales incluyendo / : @ etc. Ideal para parámetros de query string.</p>
              <p><strong>URL completa:</strong> Preserva los caracteres válidos de una URL (/ : @ ? # etc). Ideal para URLs enteras.</p>
            </div>
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Codificador URL Online: Codifica y Decodifica URLs al Instante"
          paragraphs={[
            "La codificación URL (también conocida como percent-encoding) es fundamental para transmitir datos de forma segura en URLs. Los caracteres especiales como espacios, acentos y símbolos se convierten a su representación hexadecimal precedida por el signo %.",
            "Nuestra herramienta de codificación URL online soporta tanto encodeURIComponent (para parámetros individuales) como encodeURI (para URLs completas), permitiéndote elegir el nivel de codificación adecuado para tu caso de uso.",
            "Esencial para desarrolladores web que trabajan con APIs REST, query strings, formularios HTML y cualquier sistema que transmita datos a través de URLs."
          ]}
          howTo={[
            { step: "Selecciona el modo", description: "Elige entre codificar o decodificar según lo que necesites." },
            { step: "Elige el tipo de codificación", description: "Componente para parámetros individuales, URL completa para direcciones enteras." },
            { step: "Introduce el texto", description: "Pega o escribe el texto a codificar o la URL codificada a decodificar." },
            { step: "Obtén el resultado", description: "Copia el resultado con un clic para usarlo en tu código o aplicación." },
          ]}
          faqs={[
            { question: "¿Cuál es la diferencia entre encodeURI y encodeURIComponent?", answer: "encodeURI preserva los caracteres válidos de una URL (como /, :, ?, #, @) y solo codifica caracteres no válidos. encodeURIComponent codifica TODOS los caracteres especiales, ideal para valores de parámetros en query strings." },
            { question: "¿Por qué necesito codificar URLs?", answer: "Las URLs solo pueden contener ciertos caracteres ASCII. Los espacios, acentos, ñ y otros caracteres especiales deben codificarse para que sean transmitidos correctamente por el protocolo HTTP." },
            { question: "¿Qué significa %20 en una URL?", answer: "%20 es la codificación URL del carácter espacio. Cada carácter especial se representa con un % seguido de su código hexadecimal en ASCII/UTF-8." },
          ]}
          relatedTools={[
            { name: "Conversor Base64", href: "/tools/conversor-base64" },
            { name: "Codificador Base32", href: "/tools/codificador-base32" },
            { name: "Conversor Hexadecimal", href: "/tools/conversor-hex" },
            { name: "Validador JSON", href: "/tools/validador-json" },
          ]}
        />
      </div>
    </div>
  )
}
