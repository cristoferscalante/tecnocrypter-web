'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Check, AlertTriangle, Clock, Shield, FileKey2 } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

interface JwtParts {
  header: Record<string, unknown> | null
  payload: Record<string, unknown> | null
  signature: string
  isExpired: boolean
  expiresAt: string | null
  issuedAt: string | null
}

function decodeJwt(token: string): JwtParts | null {
  try {
    const parts = token.trim().split('.')
    if (parts.length !== 3) return null

    const decodeBase64Url = (str: string) => {
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
      while (base64.length % 4) base64 += '='
      return JSON.parse(atob(base64))
    }

    const header = decodeBase64Url(parts[0])
    const payload = decodeBase64Url(parts[1])

    const exp = payload.exp ? new Date(payload.exp * 1000) : null
    const iat = payload.iat ? new Date(payload.iat * 1000) : null

    return {
      header,
      payload,
      signature: parts[2],
      isExpired: exp ? exp < new Date() : false,
      expiresAt: exp ? exp.toLocaleString() : null,
      issuedAt: iat ? iat.toLocaleString() : null,
    }
  } catch {
    return null
  }
}

export default function DecodificadorJwtClient() {
  const [token, setToken] = useState('')
  const [result, setResult] = useState<JwtParts | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const handleDecode = useCallback(() => {
    setError('')
    if (!token.trim()) {
      setError('Introduce un token JWT.')
      setResult(null)
      return
    }
    const decoded = decodeJwt(token)
    if (!decoded) {
      setError('El token no es un JWT válido. Debe tener 3 partes separadas por puntos.')
      setResult(null)
      return
    }
    setResult(decoded)
  }, [token])

  const copyJson = useCallback(async (key: string, data: unknown) => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  const loadExample = useCallback(() => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g, '')
    const payload = btoa(JSON.stringify({
      sub: '1234567890', name: 'TecnoCrypter User', iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, role: 'admin'
    })).replace(/=/g, '')
    const sig = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    const example = `${header}.${payload}.${sig}`
    setToken(example)
    setResult(decodeJwt(example))
    setError('')
  }, [])

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-tight mb-3">
            Decodificador <span className="text-primary">JWT</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Decodifica y analiza JSON Web Tokens. Inspecciona header, payload y verifica la expiración. 100% en tu navegador.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileKey2 className="h-5 w-5 text-primary" /> Token JWT
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Pega aquí tu token JWT (eyJhbGciOiJIUzI1NiIs...)"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="min-h-[100px] font-mono text-xs"
            />
            <div className="flex gap-2">
              <Button onClick={handleDecode} className="font-medium">Decodificar</Button>
              <Button variant="outline" onClick={loadExample}>Cargar ejemplo</Button>
              <Button variant="ghost" onClick={() => { setToken(''); setResult(null); setError('') }}>Limpiar</Button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertTriangle className="h-4 w-4" /> {error}
              </div>
            )}
          </CardContent>
        </Card>

        {result && (
          <div className="mt-6 space-y-4">
            {result.expiresAt && (
              <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium ${
                result.isExpired ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
              }`}>
                {result.isExpired ? <AlertTriangle className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                {result.isExpired ? 'Token expirado' : 'Token válido (no expirado)'}
                <span className="text-xs opacity-80 ml-auto">
                  <Clock className="h-3 w-3 inline mr-1" />
                  Expira: {result.expiresAt}
                </span>
              </div>
            )}

            {[
              { title: 'Header (JOSE)', data: result.header, key: 'header', color: 'text-red-400' },
              { title: 'Payload (Claims)', data: result.payload, key: 'payload', color: 'text-purple-400' },
            ].map(({ title, data, key, color }) => (
              <Card key={key}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-base ${color}`}>{title}</CardTitle>
                    <Button size="sm" variant="ghost" onClick={() => copyJson(key, data)}>
                      {copied === key ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted/50 rounded-lg p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-400">Signature</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-xs font-mono text-muted-foreground break-all">{result.signature}</code>
              </CardContent>
            </Card>
          </div>
        )}

        <ToolSeoSection
          title="Decodificador JWT Online: Analiza Tokens de Forma Segura"
          paragraphs={[
            "Los JSON Web Tokens (JWT) son el estándar de facto para autenticación en aplicaciones web modernas. Nuestro decodificador JWT online te permite inspeccionar el contenido de cualquier token sin necesidad de librerías ni herramientas de línea de comandos.",
            "A diferencia de otros decodificadores, esta herramienta funciona 100% en tu navegador. Tu token nunca se envía a ningún servidor, garantizando la privacidad y seguridad de tus credenciales de autenticación.",
            "Ideal para desarrolladores que trabajan con OAuth 2.0, OpenID Connect, APIs REST o cualquier sistema que use JWT para gestión de sesiones y autorización."
          ]}
          howTo={[
            { step: "Pega tu token JWT", description: "Copia el token completo (comienza con 'eyJ...') desde tu aplicación, navegador o herramienta de desarrollo." },
            { step: "Haz clic en Decodificar", description: "El token se analiza localmente mostrando header, payload y firma por separado." },
            { step: "Inspecciona los claims", description: "Verifica la expiración (exp), emisor (iss), audiencia (aud) y cualquier claim personalizado." },
          ]}
          faqs={[
            { question: "¿Es seguro decodificar JWT en esta herramienta?", answer: "Sí. Todo el procesamiento ocurre en tu navegador usando JavaScript. El token nunca se transmite a ningún servidor externo." },
            { question: "¿Puedo verificar la firma del JWT?", answer: "Esta herramienta decodifica el header y payload (que solo están codificados en Base64URL, no encriptados). Para verificar la firma necesitas la clave secreta o pública del emisor." },
            { question: "¿Qué significan los campos exp, iat y sub?", answer: "'exp' es la fecha de expiración, 'iat' (issued at) es cuándo se emitió el token, y 'sub' (subject) identifica al usuario. Son claims estándar definidos en RFC 7519." },
          ]}
          relatedTools={[
            { name: "Generador de Contraseñas", href: "/tools/generador-contrasenas" },
            { name: "Cifrado Online", href: "/tools/cifrado-online" },
            { name: "Conversor Base64", href: "/tools/conversor-base64" },
            { name: "Generador de Hash", href: "/tools/generador-hash" },
          ]}
        />
      </div>
    </div>
  )
}
