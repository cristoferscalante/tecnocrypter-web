'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check, RefreshCw, Shield, Timer } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

function base32Decode(input: string): Uint8Array {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  const cleanInput = input.replace(/[\s=-]/g, '').toUpperCase()
  let bits = ''
  for (const char of cleanInput) {
    const val = alphabet.indexOf(char)
    if (val === -1) continue
    bits += val.toString(2).padStart(5, '0')
  }
  const bytes = new Uint8Array(Math.floor(bits.length / 8))
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2)
  }
  return bytes
}

async function hmacSha1(key: Uint8Array, message: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, message)
  return new Uint8Array(sig)
}

async function generateTOTP(secret: string, period: number = 30, digits: number = 6): Promise<string> {
  const key = base32Decode(secret)
  const time = Math.floor(Date.now() / 1000 / period)
  const timeBytes = new Uint8Array(8)
  let t = time
  for (let i = 7; i >= 0; i--) {
    timeBytes[i] = t & 0xff
    t = Math.floor(t / 256)
  }
  const hmac = await hmacSha1(key, timeBytes)
  const offset = hmac[hmac.length - 1] & 0x0f
  const code = ((hmac[offset] & 0x7f) << 24 | (hmac[offset + 1] & 0xff) << 16 | (hmac[offset + 2] & 0xff) << 8 | (hmac[offset + 3] & 0xff)) % Math.pow(10, digits)
  return code.toString().padStart(digits, '0')
}

export default function GeneradorTotpClient() {
  const [secret, setSecret] = useState('')
  const [code, setCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [period] = useState(30)
  const [digits] = useState(6)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const generate = useCallback(async () => {
    if (!secret.trim()) { setCode(''); setError(''); return }
    try {
      setError('')
      const totp = await generateTOTP(secret.trim(), period, digits)
      setCode(totp)
    } catch {
      setError('Clave secreta inválida. Debe ser Base32 válido.')
      setCode('')
    }
  }, [secret, period, digits])

  useEffect(() => {
    generate()
    intervalRef.current = setInterval(() => {
      const remaining = period - (Math.floor(Date.now() / 1000) % period)
      setTimeLeft(remaining)
      if (remaining === period) generate()
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [generate, period])

  const copyCode = () => {
    if (!code) return
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateRandomSecret = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    let result = ''
    const bytes = new Uint8Array(20)
    crypto.getRandomValues(bytes)
    for (const b of bytes) result += chars[b % 32]
    setSecret(result)
  }

  const progress = (timeLeft / period) * 100

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Generador TOTP / 2FA</CardTitle>
            <CardDescription>Genera códigos de autenticación de dos factores (TOTP) desde una clave secreta Base32.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Clave Secreta (Base32)</Label>
              <div className="flex gap-2">
                <Input value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="JBSWY3DPEHPK3PXP" className="font-mono" spellCheck={false} />
                <Button variant="outline" size="icon" onClick={generateRandomSecret} title="Generar clave aleatoria"><RefreshCw className="h-4 w-4" /></Button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            {code && (
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="text-5xl font-mono font-bold tracking-[0.3em] text-primary">{code}</div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 5 ? 'bg-destructive' : timeLeft <= 10 ? 'bg-yellow-500' : 'bg-primary'}`} style={{ width: `${progress}%` }} />
                    </div>
                    <span className={`text-sm font-mono font-bold ${timeLeft <= 5 ? 'text-destructive' : 'text-muted-foreground'}`}>{timeLeft}s</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyCode}>
                    {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </Button>
                </div>
              </div>
            )}

            <div className="p-4 rounded-lg bg-muted/50 space-y-2 text-sm text-muted-foreground">
              <p><strong>¿Cómo funciona?</strong></p>
              <p>TOTP (Time-based One-Time Password) genera códigos de 6 dígitos que cambian cada 30 segundos. Se usa en apps como Google Authenticator, Authy y Microsoft Authenticator para añadir una segunda capa de seguridad a tus cuentas.</p>
            </div>
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Generador TOTP Online: Códigos 2FA en Tu Navegador"
          paragraphs={[
            "TOTP (Time-based One-Time Password) es el estándar RFC 6238 para autenticación de dos factores. Nuestro generador TOTP crea códigos de verificación directamente en tu navegador, igual que Google Authenticator.",
            "Los códigos TOTP se generan combinando una clave secreta compartida con el tiempo actual. Cada código es válido durante 30 segundos, proporcionando una capa adicional de seguridad más allá de la contraseña.",
            "Toda la generación se realiza localmente usando la Web Crypto API. Tu clave secreta nunca se envía a ningún servidor. Ideal para verificar configuraciones 2FA y debugging de implementaciones TOTP."
          ]}
          howTo={[
            { step: "Introduce la clave secreta", description: "Pega la clave Base32 de tu servicio 2FA o genera una aleatoria." },
            { step: "Código generado automáticamente", description: "El código TOTP de 6 dígitos se genera y actualiza cada 30 segundos." },
            { step: "Copia y usa", description: "Copia el código antes de que expire para usarlo en la verificación." },
          ]}
          faqs={[
            { question: "¿Es seguro generar TOTP en el navegador?", answer: "Sí. La generación usa la Web Crypto API del navegador y la clave nunca sale de tu dispositivo. Es equivalente a lo que hacen apps como Google Authenticator." },
            { question: "¿Qué formato tiene la clave secreta?", answer: "Las claves TOTP se codifican en Base32 (letras A-Z y números 2-7). Típicamente tienen 16-32 caracteres. La encuentras al configurar 2FA en cualquier servicio." },
            { question: "¿Por qué el código cambia cada 30 segundos?", answer: "El estándar TOTP usa intervalos de 30 segundos (configurable) para que los códigos expiren rápidamente. Si alguien intercepta un código, solo tiene 30 segundos para usarlo." },
          ]}
          relatedTools={[
            { name: "Generador de Contraseñas", href: "/tools/generador-contrasenas" },
            { name: "Generador de Hash", href: "/tools/generador-hash" },
            { name: "Codificador Base32", href: "/tools/codificador-base32" },
            { name: "Cifrado Online", href: "/tools/cifrado-online" },
          ]}
        />
      </div>
    </div>
  )
}
