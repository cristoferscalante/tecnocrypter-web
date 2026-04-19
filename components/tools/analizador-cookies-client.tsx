'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Cookie, Copy, Check, Search } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

interface CookieParsed {
  name: string
  value: string
  domain?: string
  path?: string
  expires?: string
  maxAge?: string
  secure: boolean
  httpOnly: boolean
  sameSite?: string
  warnings: string[]
}

function parseCookie(raw: string): CookieParsed {
  const parts = raw.split(';').map(p => p.trim())
  const [nameValue, ...attributes] = parts
  const eqIndex = nameValue.indexOf('=')
  const name = eqIndex > 0 ? nameValue.slice(0, eqIndex).trim() : nameValue
  const value = eqIndex > 0 ? nameValue.slice(eqIndex + 1).trim() : ''

  const result: CookieParsed = { name, value, secure: false, httpOnly: false, warnings: [] }

  for (const attr of attributes) {
    const [key, ...valParts] = attr.split('=')
    const k = key.trim().toLowerCase()
    const v = valParts.join('=').trim()

    switch (k) {
      case 'domain': result.domain = v; break
      case 'path': result.path = v; break
      case 'expires': result.expires = v; break
      case 'max-age': result.maxAge = v; break
      case 'secure': result.secure = true; break
      case 'httponly': result.httpOnly = true; break
      case 'samesite': result.sameSite = v; break
    }
  }

  // Warnings
  if (!result.secure) result.warnings.push('No tiene flag Secure: puede enviarse por HTTP sin cifrar.')
  if (!result.httpOnly) result.warnings.push('No tiene flag HttpOnly: accesible por JavaScript (vulnerable a XSS).')
  if (!result.sameSite || result.sameSite.toLowerCase() === 'none') result.warnings.push('SameSite=None o no definido: vulnerable a CSRF.')
  if (result.expires) {
    const expDate = new Date(result.expires)
    if (expDate < new Date()) result.warnings.push('Cookie expirada.')
    const oneYear = new Date(); oneYear.setFullYear(oneYear.getFullYear() + 1)
    if (expDate > oneYear) result.warnings.push('Expira en más de 1 año: posible cookie de rastreo persistente.')
  }

  return result
}

export default function AnalizadorCookiesClient() {
  const [input, setInput] = useState('')
  const [cookies, setCookies] = useState<CookieParsed[]>([])
  const [copied, setCopied] = useState('')

  const analyze = useCallback(() => {
    if (!input.trim()) return
    const lines = input.split('\n').filter(l => l.trim())
    setCookies(lines.map(l => parseCookie(l)))
  }, [input])

  const loadExample = () => {
    setInput(`session_id=abc123; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600
tracking_cookie=xyz789; Domain=.example.com; Path=/; Expires=Thu, 31 Dec 2028 23:59:59 GMT; SameSite=None; Secure
preferences=dark_mode; Path=/settings`)
  }

  const copyField = (key: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Cookie className="h-5 w-5 text-primary" /> Analizador de Cookies</CardTitle>
            <CardDescription>Analiza cookies HTTP: detecta problemas de seguridad, flags faltantes y cookies de rastreo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Cookies (una por línea, formato Set-Cookie)</Label>
              <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="session_id=abc123; Path=/; HttpOnly; Secure; SameSite=Strict" rows={5} className="font-mono text-sm" spellCheck={false} />
            </div>
            <div className="flex gap-2">
              <Button onClick={analyze} disabled={!input.trim()}><Search className="h-4 w-4 mr-2" /> Analizar</Button>
              <Button variant="outline" onClick={loadExample}>Cargar ejemplo</Button>
            </div>

            {cookies.length > 0 && (
              <div className="space-y-4">
                {cookies.map((cookie, i) => (
                  <div key={i} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold font-mono text-primary">{cookie.name}</h4>
                      <div className="flex gap-1">
                        {cookie.secure && <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">Secure</span>}
                        {cookie.httpOnly && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">HttpOnly</span>}
                        {cookie.sameSite && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">SameSite={cookie.sameSite}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div className="p-2 rounded bg-muted/50">
                        <span className="text-xs text-muted-foreground">Valor</span>
                        <div className="font-mono text-xs break-all cursor-pointer" onClick={() => copyField(`val-${i}`, cookie.value)}>
                          {cookie.value.length > 50 ? cookie.value.slice(0, 50) + '...' : cookie.value}
                          {copied === `val-${i}` && <Check className="inline h-3 w-3 ml-1 text-primary" />}
                        </div>
                      </div>
                      {cookie.domain && <div className="p-2 rounded bg-muted/50"><span className="text-xs text-muted-foreground">Domain</span><div className="font-mono text-xs">{cookie.domain}</div></div>}
                      {cookie.path && <div className="p-2 rounded bg-muted/50"><span className="text-xs text-muted-foreground">Path</span><div className="font-mono text-xs">{cookie.path}</div></div>}
                      {cookie.expires && <div className="p-2 rounded bg-muted/50"><span className="text-xs text-muted-foreground">Expires</span><div className="font-mono text-xs">{cookie.expires}</div></div>}
                      {cookie.maxAge && <div className="p-2 rounded bg-muted/50"><span className="text-xs text-muted-foreground">Max-Age</span><div className="font-mono text-xs">{cookie.maxAge}s</div></div>}
                    </div>

                    {cookie.warnings.length > 0 && (
                      <div className="p-3 rounded bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                        {cookie.warnings.map((w, wi) => (
                          <p key={wi} className="text-xs text-yellow-800 dark:text-yellow-200">⚠️ {w}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Analizador de Cookies HTTP: Audita Seguridad y Privacidad"
          paragraphs={[
            "Las cookies HTTP almacenan datos en el navegador del usuario. Flags como Secure, HttpOnly y SameSite son esenciales para proteger contra ataques XSS, CSRF y man-in-the-middle.",
            "Nuestro analizador evalúa cookies HTTP para detectar configuraciones inseguras: cookies sin Secure flag, sin HttpOnly, con SameSite=None, expiración excesiva y otros problemas de seguridad.",
            "Ideal para auditorías de seguridad web, cumplimiento de GDPR/LOPD y verificación de que las cookies de tu aplicación siguen las mejores prácticas de seguridad."
          ]}
          howTo={[
            { step: "Introduce las cookies", description: "Pega las cookies en formato Set-Cookie, una por línea." },
            { step: "Análisis automático", description: "Se evalúan flags de seguridad y se detectan problemas." },
            { step: "Corrige los problemas", description: "Revisa las advertencias y ajusta las cookies de tu aplicación." },
          ]}
          faqs={[
            { question: "¿Qué flags debe tener una cookie segura?", answer: "Secure (solo HTTPS), HttpOnly (no accesible por JavaScript), SameSite=Strict o Lax (previene CSRF). Para cookies de sesión, las tres son obligatorias." },
            { question: "¿Qué es SameSite?", answer: "Controla cuándo se envía la cookie en solicitudes cross-site. Strict: solo same-site. Lax: same-site + navegación top-level. None: siempre (requiere Secure). Previene ataques CSRF." },
            { question: "¿Cuánto debe durar una cookie de sesión?", answer: "Idealmente, Max-Age de 1-8 horas para sesiones activas. Cookies persistentes de preferencias pueden durar más (1 año max). Cookies de rastreo que duran años son invasivas." },
          ]}
          relatedTools={[
            { name: "Verificador de URLs", href: "/tools/verificador" },
            { name: "Eliminador de Rastreo URL", href: "/tools/eliminador-rastreo" },
            { name: "Analizador de Cabeceras Email", href: "/tools/analizador-email" },
            { name: "Cifrado Online", href: "/tools/cifrado-online" },
          ]}
        />
      </div>
    </div>
  )
}
