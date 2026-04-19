'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check, Palette } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

interface ColorValues {
  hex: string
  r: number; g: number; b: number
  h: number; s: number; l: number
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!match) return null
  return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) }
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360; s /= 100; l /= 100
  if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v } }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return {
    r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1/3) * 255),
  }
}

export default function ConversorColoresClient() {
  const [color, setColor] = useState<ColorValues>({ hex: '#10B981', r: 16, g: 185, b: 129, h: 160, s: 84, l: 39 })
  const [copied, setCopied] = useState<string | null>(null)

  const updateFromHex = useCallback((hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    setColor({ hex, ...rgb, ...hsl })
  }, [])

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b)
    const hsl = rgbToHsl(r, g, b)
    setColor({ hex, r, g, b, ...hsl })
  }, [])

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l)
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    setColor({ hex, ...rgb, h, s, l })
  }, [])

  const copyValue = useCallback(async (key: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  const formats = [
    { key: 'hex', label: 'HEX', value: color.hex },
    { key: 'rgb', label: 'RGB', value: `rgb(${color.r}, ${color.g}, ${color.b})` },
    { key: 'hsl', label: 'HSL', value: `hsl(${color.h}, ${color.s}%, ${color.l}%)` },
    { key: 'rgba', label: 'RGBA', value: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-tight mb-3">
            Conversor de <span className="text-primary">Colores</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Convierte colores entre HEX, RGB, HSL y RGBA. Selector visual con vista previa en tiempo real.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="h-5 w-5 text-primary" /> Selector de Color
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-full h-32 rounded-xl border-2 border-border shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                <Input
                  type="color"
                  value={color.hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="w-full h-12 cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">HEX</Label>
                  <Input
                    value={color.hex}
                    onChange={(e) => {
                      const v = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value
                      if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
                        if (v.length === 7) updateFromHex(v)
                      }
                    }}
                    className="font-mono"
                    maxLength={7}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(['r', 'g', 'b'] as const).map((ch) => (
                    <div key={ch}>
                      <Label className="text-xs text-muted-foreground">{ch.toUpperCase()}</Label>
                      <Input
                        type="number"
                        min={0}
                        max={255}
                        value={color[ch]}
                        onChange={(e) => {
                          const val = Math.max(0, Math.min(255, parseInt(e.target.value) || 0))
                          updateFromRgb(
                            ch === 'r' ? val : color.r,
                            ch === 'g' ? val : color.g,
                            ch === 'b' ? val : color.b,
                          )
                        }}
                        className="font-mono"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {([
                    { key: 'h' as const, label: 'H°', max: 360 },
                    { key: 's' as const, label: 'S%', max: 100 },
                    { key: 'l' as const, label: 'L%', max: 100 },
                  ]).map(({ key, label, max }) => (
                    <div key={key}>
                      <Label className="text-xs text-muted-foreground">{label}</Label>
                      <Input
                        type="number"
                        min={0}
                        max={max}
                        value={color[key]}
                        onChange={(e) => {
                          const val = Math.max(0, Math.min(max, parseInt(e.target.value) || 0))
                          updateFromHsl(
                            key === 'h' ? val : color.h,
                            key === 's' ? val : color.s,
                            key === 'l' ? val : color.l,
                          )
                        }}
                        className="font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Valores para Copiar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formats.map(({ key, label, value }) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground w-12">{label}</span>
                  <code className="flex-1 bg-muted/50 rounded px-3 py-2 text-sm font-mono">{value}</code>
                  <Button size="icon" variant="ghost" onClick={() => copyValue(key, value)} className="h-8 w-8 shrink-0">
                    {copied === key ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              ))}

              <div className="mt-6 space-y-2">
                <Label className="text-xs text-muted-foreground">CSS Custom Property</Label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-muted/50 rounded px-3 py-2 text-xs font-mono">
                    --color: {color.h} {color.s}% {color.l}%;
                  </code>
                  <Button size="icon" variant="ghost" onClick={() => copyValue('css', `${color.h} ${color.s}% ${color.l}%`)} className="h-8 w-8 shrink-0">
                    {copied === 'css' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label className="text-xs text-muted-foreground">Tailwind CSS</Label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-muted/50 rounded px-3 py-2 text-xs font-mono break-all">
                    bg-[{color.hex}] text-[{color.hex}]
                  </code>
                  <Button size="icon" variant="ghost" onClick={() => copyValue('tw', `bg-[${color.hex}]`)} className="h-8 w-8 shrink-0">
                    {copied === 'tw' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ToolSeoSection
          title="Conversor de Colores Online: HEX, RGB, HSL y Más"
          paragraphs={[
            "Nuestro conversor de colores online te permite transformar colores entre los formatos más utilizados en desarrollo web: HEX, RGB, HSL y RGBA. Con un selector visual intuitivo y campos editables para cada componente del color.",
            "Ya sea que estés diseñando una interfaz en Figma, escribiendo CSS personalizado o configurando variables de Tailwind CSS, esta herramienta te proporciona los valores exactos en el formato que necesitas con un solo clic.",
            "Todos los cálculos se realizan en tu navegador sin enviar datos a servidores externos. Incluye generación automática de valores para CSS custom properties y clases de Tailwind CSS."
          ]}
          howTo={[
            { step: "Selecciona un color", description: "Usa el selector visual nativo o introduce valores directamente en HEX, RGB o HSL." },
            { step: "Visualiza la conversión", description: "Todos los formatos se actualizan automáticamente en tiempo real." },
            { step: "Copia el valor", description: "Haz clic en el botón de copiar junto al formato que necesitas: HEX, RGB, HSL, RGBA, CSS o Tailwind." },
          ]}
          faqs={[
            { question: "¿Cuál es la diferencia entre RGB y HSL?", answer: "RGB define colores por cantidad de Rojo, Verde y Azul (0-255). HSL usa Matiz (0-360°), Saturación (0-100%) y Luminosidad (0-100%), que es más intuitivo para diseñadores porque permite ajustar brillo y viveza independientemente." },
            { question: "¿Por qué usar HEX en lugar de RGB?", answer: "HEX es más compacto (#FF5733 vs rgb(255, 87, 51)) y es el formato más utilizado en CSS y diseño web. Sin embargo, RGB es más legible y RGBA permite añadir transparencia." },
            { question: "¿Cómo uso estos colores en Tailwind CSS?", answer: "Puedes usar valores arbitrarios con la sintaxis bg-[#hex], text-[#hex] o definir colores personalizados en tu tailwind.config. También puedes usar el formato HSL para las CSS custom properties de Tailwind." },
          ]}
          relatedTools={[
            { name: "Generador QR", href: "/tools/generador-qr" },
            { name: "Contador de Caracteres", href: "/tools/contador-caracteres" },
            { name: "Conversor Hexadecimal", href: "/tools/conversor-hex" },
            { name: "Codificador Base32", href: "/tools/codificador-base32" },
          ]}
        />
      </div>
    </div>
  )
}
