'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShieldCheck, ShieldAlert, Eye, EyeOff, Loader2, AlertTriangle } from 'lucide-react'

async function sha1Hash(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}

interface CheckResult {
  breached: boolean
  count: number
}

export default function VerificadorContrasenasClient() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CheckResult | null>(null)
  const [error, setError] = useState('')

  const checkPassword = useCallback(async () => {
    if (!password) return

    setLoading(true)
    setResult(null)
    setError('')

    try {
      const hash = await sha1Hash(password)
      const prefix = hash.slice(0, 5)
      const suffix = hash.slice(5)

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
        headers: { 'Add-Padding': 'true' }
      })

      if (!response.ok) throw new Error('Error en la API')

      const text = await response.text()
      const lines = text.split('\n')

      let count = 0
      for (const line of lines) {
        const [hashSuffix, countStr] = line.split(':')
        if (hashSuffix.trim() === suffix) {
          count = parseInt(countStr.trim(), 10)
          break
        }
      }

      setResult({ breached: count > 0, count })
    } catch {
      setError('No se pudo verificar. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [password])

  const getStrength = useCallback((pw: string) => {
    let score = 0
    if (pw.length >= 8) score++
    if (pw.length >= 12) score++
    if (pw.length >= 16) score++
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^a-zA-Z0-9]/.test(pw)) score++
    return Math.min(score, 5)
  }, [])

  const strengthLabels = ['Muy débil', 'Débil', 'Regular', 'Buena', 'Fuerte', 'Muy fuerte']
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-primary', 'bg-primary']
  const strength = password ? getStrength(password) : 0

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-tight mb-3">
            Verificador de <span className="text-primary">Contraseñas</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprueba si tu contraseña ha sido expuesta en filtraciones de datos usando la API de Have I Been Pwned.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Verificar Contraseña</CardTitle>
            <CardDescription>
              Tu contraseña nunca se envía al servidor. Se usa k-anonymity: solo se envían los primeros 5 caracteres del hash SHA-1.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Contraseña</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setResult(null) }}
                  placeholder="Escribe la contraseña a verificar..."
                  className="pr-10 font-mono"
                  onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Strength meter */}
            {password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Fortaleza</span>
                  <span className="font-medium">{strengthLabels[strength]}</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i <= strength ? strengthColors[strength] : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <ul className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                  <li className={password.length >= 8 ? 'text-primary' : ''}>✓ Mínimo 8 caracteres</li>
                  <li className={/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'text-primary' : ''}>✓ Mayúsculas y minúsculas</li>
                  <li className={/[0-9]/.test(password) ? 'text-primary' : ''}>✓ Números</li>
                  <li className={/[^a-zA-Z0-9]/.test(password) ? 'text-primary' : ''}>✓ Caracteres especiales</li>
                </ul>
              </div>
            )}

            <Button onClick={checkPassword} disabled={!password || loading} className="w-full">
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Verificando...</>
              ) : (
                <><ShieldCheck className="h-4 w-4 mr-2" /> Verificar Contraseña</>
              )}
            </Button>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {result && (
              <div className={`p-6 rounded-lg border-2 text-center space-y-2 ${
                result.breached
                  ? 'border-destructive/50 bg-destructive/5'
                  : 'border-primary/50 bg-primary/5'
              }`}>
                {result.breached ? (
                  <>
                    <ShieldAlert className="h-12 w-12 text-destructive mx-auto" />
                    <h3 className="text-xl font-bold text-destructive">¡Contraseña Filtrada!</h3>
                    <p className="text-muted-foreground">
                      Esta contraseña ha aparecido <strong className="text-foreground">{result.count.toLocaleString()}</strong> veces en filtraciones de datos.
                    </p>
                    <p className="text-sm text-destructive/80">
                      Deberías cambiarla inmediatamente y no reutilizarla.
                    </p>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="text-xl font-bold text-primary">¡Contraseña Segura!</h3>
                    <p className="text-muted-foreground">
                      No se encontraron coincidencias en las bases de datos de filtraciones conocidas.
                    </p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">¿Cómo funciona?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Usamos el protocolo <strong>k-anonymity</strong> de Have I Been Pwned:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Se genera el hash SHA-1 de tu contraseña localmente en tu navegador.</li>
              <li>Se envían solo los primeros 5 caracteres del hash a la API.</li>
              <li>La API devuelve todos los hashes que coinciden con ese prefijo.</li>
              <li>Se compara el resto del hash localmente, sin revelar tu contraseña.</li>
            </ol>
            <p className="text-primary/80 font-medium">
              Tu contraseña nunca sale de tu navegador en texto plano.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
