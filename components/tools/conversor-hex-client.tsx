'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check, Trash2, ArrowRightLeft, Palette } from 'lucide-react'

function textToHex(text: string): string {
  return Array.from(new TextEncoder().encode(text))
    .map(b => b.toString(16).padStart(2, '0'))
    .join(' ')
}

function hexToText(hex: string): string {
  const clean = hex.replace(/[^0-9a-fA-F]/g, '')
  if (clean.length % 2 !== 0) throw new Error('Longitud inválida')
  const bytes = new Uint8Array(clean.match(/.{2}/g)!.map(b => parseInt(b, 16)))
  return new TextDecoder().decode(bytes)
}

function decToHex(dec: string): string {
  const n = BigInt(dec.trim())
  return n.toString(16).toUpperCase()
}

function hexToDec(hex: string): string {
  const clean = hex.replace(/^0x/i, '').trim()
  return BigInt('0x' + clean).toString(10)
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace(/^#/, '').trim()
  if (clean.length !== 6 && clean.length !== 3) return null
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(c => Math.max(0, Math.min(255, c)).toString(16).padStart(2, '0')).join('').toUpperCase()
}

function decToBin(dec: string): string {
  return BigInt(dec.trim()).toString(2)
}

function binToDec(bin: string): string {
  return BigInt('0b' + bin.replace(/[^01]/g, '')).toString(10)
}

export default function ConversorHexClient() {
  const [textInput, setTextInput] = useState('')
  const [hexOutput, setHexOutput] = useState('')
  const [numInput, setNumInput] = useState('')
  const [numOutput, setNumOutput] = useState('')
  const [numMode, setNumMode] = useState<'dec2hex' | 'hex2dec' | 'dec2bin' | 'bin2dec'>('dec2hex')
  const [hexColor, setHexColor] = useState('#10B981')
  const [rgbR, setRgbR] = useState(16)
  const [rgbG, setRgbG] = useState(185)
  const [rgbB, setRgbB] = useState(129)
  const [copied, setCopied] = useState<string | null>(null)
  const [textMode, setTextMode] = useState<'encode' | 'decode'>('encode')

  const copyText = useCallback(async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  const handleTextConvert = useCallback(() => {
    try {
      if (textMode === 'encode') {
        setHexOutput(textToHex(textInput))
      } else {
        setHexOutput(hexToText(textInput))
      }
    } catch {
      setHexOutput('Error: Formato inválido')
    }
  }, [textInput, textMode])

  const handleNumConvert = useCallback(() => {
    try {
      switch (numMode) {
        case 'dec2hex': setNumOutput(decToHex(numInput)); break
        case 'hex2dec': setNumOutput(hexToDec(numInput)); break
        case 'dec2bin': setNumOutput(decToBin(numInput)); break
        case 'bin2dec': setNumOutput(binToDec(numInput)); break
      }
    } catch {
      setNumOutput('Error: Valor inválido')
    }
  }, [numInput, numMode])

  const handleHexColorChange = useCallback((hex: string) => {
    setHexColor(hex)
    const rgb = hexToRgb(hex)
    if (rgb) { setRgbR(rgb.r); setRgbG(rgb.g); setRgbB(rgb.b) }
  }, [])

  const handleRgbChange = useCallback((r: number, g: number, b: number) => {
    setRgbR(r); setRgbG(g); setRgbB(b)
    setHexColor(rgbToHex(r, g, b))
  }, [])

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-tight mb-3">
            Conversor <span className="text-primary">Hexadecimal</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convierte entre texto, hexadecimal, decimal, binario y colores RGB. 100% local.
          </p>
        </div>

        <Tabs defaultValue="text" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text">Texto ↔ Hex</TabsTrigger>
            <TabsTrigger value="numbers">Números</TabsTrigger>
            <TabsTrigger value="colors">Colores</TabsTrigger>
          </TabsList>

          {/* Text ↔ Hex */}
          <TabsContent value="text" className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {textMode === 'encode' ? 'Texto → Hexadecimal' : 'Hexadecimal → Texto'}
                    </CardTitle>
                    <CardDescription>
                      {textMode === 'encode' ? 'Convierte texto a su representación hexadecimal.' : 'Decodifica bytes hex a texto UTF-8.'}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setTextMode(m => m === 'encode' ? 'decode' : 'encode')}>
                    <ArrowRightLeft className="h-4 w-4 mr-1" />
                    Invertir
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{textMode === 'encode' ? 'Texto' : 'Hexadecimal'}</Label>
                  <Textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={textMode === 'encode' ? 'Escribe texto aquí...' : 'Pega hex aquí (ej: 48 65 6c 6c 6f)...'}
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleTextConvert} className="flex-1">Convertir</Button>
                  <Button variant="outline" onClick={() => { setTextInput(''); setHexOutput('') }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {hexOutput && (
                  <div className="space-y-2">
                    <Label>Resultado</Label>
                    <div className="relative">
                      <Textarea value={hexOutput} readOnly className="min-h-[100px] font-mono text-sm pr-12" />
                      <Button size="icon" variant="ghost" onClick={() => copyText(hexOutput, 'text')} className="absolute top-2 right-2 h-8 w-8">
                        {copied === 'text' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Numbers */}
          <TabsContent value="numbers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conversor Numérico</CardTitle>
                <CardDescription>Decimal, Hexadecimal y Binario</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {([
                    { value: 'dec2hex', label: 'Dec → Hex' },
                    { value: 'hex2dec', label: 'Hex → Dec' },
                    { value: 'dec2bin', label: 'Dec → Bin' },
                    { value: 'bin2dec', label: 'Bin → Dec' },
                  ] as const).map((m) => (
                    <Button
                      key={m.value}
                      variant={numMode === m.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNumMode(m.value)}
                    >
                      {m.label}
                    </Button>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label>Valor de entrada</Label>
                  <Input
                    value={numInput}
                    onChange={(e) => setNumInput(e.target.value)}
                    placeholder={
                      numMode === 'dec2hex' || numMode === 'dec2bin' ? 'Ej: 255'
                        : numMode === 'hex2dec' ? 'Ej: FF o 0xFF'
                        : 'Ej: 11111111'
                    }
                    className="font-mono"
                  />
                </div>
                <Button onClick={handleNumConvert} className="w-full">Convertir</Button>
                {numOutput && (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50 font-mono text-sm">
                    <span className="flex-1 break-all">{numOutput}</span>
                    <Button size="icon" variant="ghost" onClick={() => copyText(numOutput, 'num')} className="h-8 w-8 shrink-0">
                      {copied === 'num' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Colors */}
          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Conversor de Colores
                </CardTitle>
                <CardDescription>HEX ↔ RGB en tiempo real</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-lg border-2 shrink-0 shadow-inner"
                    style={{ backgroundColor: hexColor }}
                  />
                  <div className="flex-1 space-y-3">
                    <div className="space-y-1">
                      <Label>HEX</Label>
                      <Input
                        value={hexColor}
                        onChange={(e) => handleHexColorChange(e.target.value)}
                        className="font-mono"
                        maxLength={7}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label>R (0-255)</Label>
                    <Input type="number" min={0} max={255} value={rgbR} onChange={(e) => handleRgbChange(+e.target.value, rgbG, rgbB)} className="font-mono" />
                  </div>
                  <div className="space-y-1">
                    <Label>G (0-255)</Label>
                    <Input type="number" min={0} max={255} value={rgbG} onChange={(e) => handleRgbChange(rgbR, +e.target.value, rgbB)} className="font-mono" />
                  </div>
                  <div className="space-y-1">
                    <Label>B (0-255)</Label>
                    <Input type="number" min={0} max={255} value={rgbB} onChange={(e) => handleRgbChange(rgbR, rgbG, +e.target.value)} className="font-mono" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-md bg-muted/50 space-y-1">
                    <span className="text-xs text-muted-foreground">CSS HEX</span>
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono">{hexColor}</code>
                      <Button size="icon" variant="ghost" onClick={() => copyText(hexColor, 'hex')} className="h-7 w-7">
                        {copied === 'hex' ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50 space-y-1">
                    <span className="text-xs text-muted-foreground">CSS RGB</span>
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono">rgb({rgbR}, {rgbG}, {rgbB})</code>
                      <Button size="icon" variant="ghost" onClick={() => copyText(`rgb(${rgbR}, ${rgbG}, ${rgbB})`, 'rgb')} className="h-7 w-7">
                        {copied === 'rgb' ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
