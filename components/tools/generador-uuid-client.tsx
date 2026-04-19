'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check, RefreshCw, Trash2, Download, Fingerprint } from 'lucide-react'

function uuidV4(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  return [
    hex(bytes[0]) + hex(bytes[1]) + hex(bytes[2]) + hex(bytes[3]),
    hex(bytes[4]) + hex(bytes[5]),
    hex(bytes[6]) + hex(bytes[7]),
    hex(bytes[8]) + hex(bytes[9]),
    hex(bytes[10]) + hex(bytes[11]) + hex(bytes[12]) + hex(bytes[13]) + hex(bytes[14]) + hex(bytes[15]),
  ].join('-')
}

function uuidV7(): string {
  const now = Date.now()
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  // timestamp ms in first 48 bits
  bytes[0] = (now / 2 ** 40) & 0xff
  bytes[1] = (now / 2 ** 32) & 0xff
  bytes[2] = (now / 2 ** 24) & 0xff
  bytes[3] = (now / 2 ** 16) & 0xff
  bytes[4] = (now / 2 ** 8) & 0xff
  bytes[5] = now & 0xff
  // version 7
  bytes[6] = (bytes[6] & 0x0f) | 0x70
  // variant 10xx
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  return [
    hex(bytes[0]) + hex(bytes[1]) + hex(bytes[2]) + hex(bytes[3]),
    hex(bytes[4]) + hex(bytes[5]),
    hex(bytes[6]) + hex(bytes[7]),
    hex(bytes[8]) + hex(bytes[9]),
    hex(bytes[10]) + hex(bytes[11]) + hex(bytes[12]) + hex(bytes[13]) + hex(bytes[14]) + hex(bytes[15]),
  ].join('-')
}

function nanoid(size: number = 21): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'
  const bytes = crypto.getRandomValues(new Uint8Array(size))
  return Array.from(bytes).map(b => alphabet[b & 63]).join('')
}

function ulid(): string {
  const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
  const now = Date.now()
  let timeStr = ''
  let t = now
  for (let i = 0; i < 10; i++) {
    timeStr = ENCODING[t % 32] + timeStr
    t = Math.floor(t / 32)
  }
  const randomBytes = crypto.getRandomValues(new Uint8Array(10))
  let randomStr = ''
  for (let i = 0; i < 16; i++) {
    const byteIdx = Math.floor(i * 10 / 16)
    randomStr += ENCODING[randomBytes[byteIdx] & 31]
  }
  return timeStr + randomStr
}

function hex(n: number): string {
  return n.toString(16).padStart(2, '0')
}

type IdType = 'uuid-v4' | 'uuid-v7' | 'nanoid' | 'ulid'

const generators: Record<IdType, { label: string; description: string; generate: () => string }> = {
  'uuid-v4': {
    label: 'UUID v4',
    description: 'Aleatorio, 128 bits, formato estándar RFC 4122',
    generate: uuidV4,
  },
  'uuid-v7': {
    label: 'UUID v7',
    description: 'Basado en timestamp + aleatorio, ordenable cronológicamente',
    generate: uuidV7,
  },
  'ulid': {
    label: 'ULID',
    description: 'Universally Unique Lexicographically Sortable Identifier',
    generate: ulid,
  },
  'nanoid': {
    label: 'Nano ID',
    description: 'ID compacto, URL-safe, 21 caracteres por defecto',
    generate: nanoid,
  },
}

export default function GeneradorUuidClient() {
  const [idType, setIdType] = useState<IdType>('uuid-v4')
  const [generated, setGenerated] = useState<string[]>([])
  const [batchSize, setBatchSize] = useState(1)
  const [copied, setCopied] = useState<string | null>(null)

  const generate = useCallback(() => {
    const gen = generators[idType].generate
    const ids = Array.from({ length: Math.min(batchSize, 100) }, () => gen())
    setGenerated(ids)
  }, [idType, batchSize])

  const copyText = useCallback(async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  const copyAll = useCallback(async () => {
    await navigator.clipboard.writeText(generated.join('\n'))
    setCopied('all')
    setTimeout(() => setCopied(null), 2000)
  }, [generated])

  const downloadAll = useCallback(() => {
    const blob = new Blob([generated.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${idType}-${generated.length}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }, [generated, idType])

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-tight mb-3">
            Generador <span className="text-primary">UUID</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Genera identificadores únicos UUID v4, v7, ULID y Nano ID. 100% local con crypto seguro.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-primary" />
              Tipo de Identificador
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Type selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(Object.entries(generators) as [IdType, typeof generators[IdType]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => { setIdType(key); setGenerated([]) }}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    idType === key
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border hover:border-primary/30 hover:bg-muted/50'
                  }`}
                >
                  <span className="block text-sm font-bold">{val.label}</span>
                  <span className="block text-[10px] text-muted-foreground mt-0.5 leading-tight">{val.description}</span>
                </button>
              ))}
            </div>

            {/* Batch size */}
            <div className="flex items-center gap-3">
              <Label className="whitespace-nowrap">Cantidad:</Label>
              <Input
                type="number"
                min={1}
                max={100}
                value={batchSize}
                onChange={(e) => setBatchSize(Math.max(1, Math.min(100, +e.target.value)))}
                className="w-24 font-mono"
              />
              <span className="text-xs text-muted-foreground">(máx. 100)</span>
            </div>

            <Button onClick={generate} className="w-full" size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generar {batchSize > 1 ? `${batchSize} IDs` : generators[idType].label}
            </Button>

            {/* Results */}
            {generated.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{generated.length} ID{generated.length > 1 ? 's' : ''} generado{generated.length > 1 ? 's' : ''}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={copyAll} className="h-7 text-xs">
                      {copied === 'all' ? <Check className="h-3 w-3 mr-1 text-primary" /> : <Copy className="h-3 w-3 mr-1" />}
                      Copiar todos
                    </Button>
                    <Button size="sm" variant="outline" onClick={downloadAll} className="h-7 text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Descargar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setGenerated([])} className="h-7 text-xs">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="max-h-[400px] overflow-auto rounded-md border bg-muted/30 divide-y divide-border">
                  {generated.map((id, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 group hover:bg-muted/50 transition-colors">
                      <code className="text-sm font-mono break-all">{id}</code>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyText(id, `id-${i}`)}
                        className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copied === `id-${i}` ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Comparación de formatos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 pr-4 font-medium">Formato</th>
                    <th className="py-2 pr-4 font-medium">Longitud</th>
                    <th className="py-2 pr-4 font-medium">Ordenable</th>
                    <th className="py-2 font-medium">Uso ideal</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b"><td className="py-2 pr-4">UUID v4</td><td className="py-2 pr-4">36 chars</td><td className="py-2 pr-4">No</td><td className="py-2">Identificadores generales</td></tr>
                  <tr className="border-b"><td className="py-2 pr-4">UUID v7</td><td className="py-2 pr-4">36 chars</td><td className="py-2 pr-4">Sí</td><td className="py-2">DB con índices B-tree</td></tr>
                  <tr className="border-b"><td className="py-2 pr-4">ULID</td><td className="py-2 pr-4">26 chars</td><td className="py-2 pr-4">Sí</td><td className="py-2">Alt. compacta a UUID v7</td></tr>
                  <tr><td className="py-2 pr-4">Nano ID</td><td className="py-2 pr-4">21 chars</td><td className="py-2 pr-4">No</td><td className="py-2">URLs, slugs, tokens</td></tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
