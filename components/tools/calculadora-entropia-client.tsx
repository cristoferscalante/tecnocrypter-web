'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Gauge, Copy, Check, Info } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

interface EntropyResult {
  entropy: number
  strength: string
  color: string
  crackTime: string
  poolSize: number
  length: number
}

function calculateEntropy(password: string): EntropyResult {
  let poolSize = 0
  if (/[a-z]/.test(password)) poolSize += 26
  if (/[A-Z]/.test(password)) poolSize += 26
  if (/[0-9]/.test(password)) poolSize += 10
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33

  const length = password.length
  const entropy = length * Math.log2(poolSize || 1)

  let strength = 'Muy débil'
  let color = 'text-red-500'
  if (entropy >= 128) { strength = 'Excelente'; color = 'text-primary' }
  else if (entropy >= 80) { strength = 'Muy fuerte'; color = 'text-green-500' }
  else if (entropy >= 60) { strength = 'Fuerte'; color = 'text-emerald-500' }
  else if (entropy >= 40) { strength = 'Moderada'; color = 'text-yellow-500' }
  else if (entropy >= 28) { strength = 'Débil'; color = 'text-orange-500' }

  const guessesPerSecond = 1e12
  const totalGuesses = Math.pow(2, entropy)
  const seconds = totalGuesses / guessesPerSecond
  let crackTime = ''
  if (seconds < 1) crackTime = 'Instantáneo'
  else if (seconds < 60) crackTime = `${Math.round(seconds)} segundos`
  else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutos`
  else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} horas`
  else if (seconds < 31536000) crackTime = `${Math.round(seconds / 86400)} días`
  else if (seconds < 31536000 * 1e6) crackTime = `${Math.round(seconds / 31536000).toLocaleString()} años`
  else if (seconds < 31536000 * 1e9) crackTime = `${(seconds / 31536000 / 1e6).toFixed(1)} millones de años`
  else crackTime = `${(seconds / 31536000 / 1e9).toExponential(1)} billones de años`

  return { entropy, strength, color, crackTime, poolSize, length }
}

export default function CalculadoraEntropiaClient() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<EntropyResult | null>(null)
  const [copied, setCopied] = useState(false)

  const analyze = useCallback((value: string) => {
    setInput(value)
    if (value.length > 0) setResult(calculateEntropy(value))
    else setResult(null)
  }, [])

  const copyResult = () => {
    if (!result) return
    navigator.clipboard.writeText(`Entropía: ${result.entropy.toFixed(2)} bits | Fuerza: ${result.strength} | Tiempo de crackeo: ${result.crackTime}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const entropyPercent = result ? Math.min(100, (result.entropy / 128) * 100) : 0

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Gauge className="h-5 w-5 text-primary" /> Calculadora de Entropía</CardTitle>
            <CardDescription>Calcula la entropía y fortaleza de contraseñas, claves y textos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Contraseña o clave</Label>
              <Input type="text" value={input} onChange={(e) => analyze(e.target.value)} placeholder="Introduce una contraseña..." className="font-mono" spellCheck={false} autoComplete="off" />
            </div>

            {result && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold font-mono text-primary">{result.entropy.toFixed(2)} bits</div>
                  <div className={`text-lg font-semibold mt-1 ${result.color}`}>{result.strength}</div>
                </div>

                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${result.entropy >= 128 ? 'bg-primary' : result.entropy >= 80 ? 'bg-green-500' : result.entropy >= 60 ? 'bg-emerald-500' : result.entropy >= 40 ? 'bg-yellow-500' : result.entropy >= 28 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${entropyPercent}%` }} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <div className="text-xs text-muted-foreground">Longitud</div>
                    <div className="font-bold">{result.length} chars</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <div className="text-xs text-muted-foreground">Pool de caracteres</div>
                    <div className="font-bold">{result.poolSize} chars</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center col-span-2">
                    <div className="text-xs text-muted-foreground">Tiempo estimado de crackeo (1 billón/seg)</div>
                    <div className="font-bold text-primary">{result.crackTime}</div>
                  </div>
                </div>

                <Button variant="outline" onClick={copyResult} className="w-full">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copiado' : 'Copiar resultado'}
                </Button>
              </div>
            )}

            <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground space-y-1">
              <p className="flex items-center gap-1"><Info className="h-4 w-4" /> <strong>Fórmula:</strong> Entropía = L × log₂(N)</p>
              <p>Donde L es la longitud y N es el tamaño del pool de caracteres posibles.</p>
            </div>
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Calculadora de Entropía de Contraseñas: Mide la Seguridad Real"
          paragraphs={[
            "La entropía mide la aleatoriedad e impredecibilidad de una contraseña en bits. Una contraseña con 80+ bits de entropía se considera muy fuerte contra ataques de fuerza bruta modernos.",
            "Nuestra calculadora usa la fórmula estándar de Shannon: E = L × log₂(N), donde L es la longitud y N el pool de caracteres. Estima el tiempo de crackeo asumiendo 1 billón de intentos por segundo.",
            "Una contraseña de 128 bits de entropía es equivalente a una clave AES-128. Recuerda que la entropía real depende de la aleatoriedad: 'aaaaaaaaa' tiene baja entropía efectiva aunque use 9 caracteres."
          ]}
          howTo={[
            { step: "Introduce la contraseña", description: "Escribe o pega la contraseña que quieres analizar." },
            { step: "Análisis instantáneo", description: "Se calcula la entropía, fortaleza y tiempo estimado de crackeo." },
            { step: "Interpreta el resultado", description: "Apunta a 80+ bits para cuentas importantes y 128+ para claves criptográficas." },
          ]}
          faqs={[
            { question: "¿Cuánta entropía necesito?", answer: "Para cuentas online: 60+ bits. Para cuentas críticas (banco, email): 80+ bits. Para claves criptográficas: 128+ bits. Para máxima seguridad: 256 bits." },
            { question: "¿Qué es más importante, longitud o complejidad?", answer: "La longitud. Una contraseña de 20 caracteres solo con minúsculas (94 bits) es más fuerte que una de 8 caracteres con todos los tipos (52 bits). Cada carácter adicional multiplica las combinaciones." },
            { question: "¿1 billón de intentos/segundo es realista?", answer: "Sí, para ataques offline con GPUs modernas. Los ataques online están limitados por rate limiting (típicamente 10-100 intentos/segundo), haciendo que incluso 40 bits sean suficientes." },
          ]}
          relatedTools={[
            { name: "Generador de Contraseñas", href: "/tools/generador-contrasenas" },
            { name: "Verificador de Contraseñas", href: "/tools/verificador-contrasenas" },
            { name: "Generador de Passphrase", href: "/tools/generador-passphrase" },
            { name: "Generador de Hash", href: "/tools/generador-hash" },
          ]}
        />
      </div>
    </div>
  )
}
