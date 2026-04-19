'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { KeySquare, Copy, Check, Download, RefreshCw } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { ToolSeoSection } from './tool-seo-section'

type KeyType = 'RSA-2048' | 'RSA-4096' | 'EC-P256' | 'EC-P384'

function arrayBufferToPem(buffer: ArrayBuffer, type: string): string {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
  const lines = base64.match(/.{1,64}/g) || []
  return `-----BEGIN ${type}-----\n${lines.join('\n')}\n-----END ${type}-----`
}

async function generateKeyPair(type: KeyType): Promise<{ publicKey: string; privateKey: string }> {
  let algorithm: RsaHashedKeyGenParams | EcKeyGenParams
  let keyUsages: KeyUsage[]

  if (type.startsWith('RSA')) {
    const bits = type === 'RSA-4096' ? 4096 : 2048
    algorithm = { name: 'RSA-OAEP', modulusLength: bits, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }
    keyUsages = ['encrypt', 'decrypt']
  } else {
    const curve = type === 'EC-P384' ? 'P-384' : 'P-256'
    algorithm = { name: 'ECDSA', namedCurve: curve }
    keyUsages = ['sign', 'verify']
  }

  const keyPair = await crypto.subtle.generateKey(algorithm, true, keyUsages)
  const publicKeyBuffer = await crypto.subtle.exportKey('spki', keyPair.publicKey)
  const privateKeyBuffer = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey)

  return {
    publicKey: arrayBufferToPem(publicKeyBuffer, 'PUBLIC KEY'),
    privateKey: arrayBufferToPem(privateKeyBuffer, 'PRIVATE KEY'),
  }
}

export default function GeneradorClavesClient() {
  const [keyType, setKeyType] = useState<KeyType>('RSA-2048')
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [generating, setGenerating] = useState(false)
  const [copiedPub, setCopiedPub] = useState(false)
  const [copiedPriv, setCopiedPriv] = useState(false)

  const generate = useCallback(async () => {
    setGenerating(true)
    try {
      const keys = await generateKeyPair(keyType)
      setPublicKey(keys.publicKey)
      setPrivateKey(keys.privateKey)
    } catch (e) {
      console.error(e)
    } finally {
      setGenerating(false)
    }
  }, [keyType])

  const copyKey = (key: string, type: 'pub' | 'priv') => {
    navigator.clipboard.writeText(key)
    if (type === 'pub') { setCopiedPub(true); setTimeout(() => setCopiedPub(false), 2000) }
    else { setCopiedPriv(true); setTimeout(() => setCopiedPriv(false), 2000) }
  }

  const downloadKey = (key: string, filename: string) => {
    const blob = new Blob([key], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><KeySquare className="h-5 w-5 text-primary" /> Generador de Claves Criptográficas</CardTitle>
            <CardDescription>Genera pares de claves RSA y ECDSA directamente en tu navegador usando Web Crypto API.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Tipo de clave</Label>
                <Select value={keyType} onValueChange={(v) => setKeyType(v as KeyType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RSA-2048">RSA 2048-bit</SelectItem>
                    <SelectItem value="RSA-4096">RSA 4096-bit</SelectItem>
                    <SelectItem value="EC-P256">ECDSA P-256</SelectItem>
                    <SelectItem value="EC-P384">ECDSA P-384</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={generate} disabled={generating}>
                <RefreshCw className={`h-4 w-4 mr-2 ${generating ? 'animate-spin' : ''}`} />
                {generating ? 'Generando...' : 'Generar par de claves'}
              </Button>
            </div>

            {publicKey && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Clave Pública</Label>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => copyKey(publicKey, 'pub')}>{copiedPub ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}</Button>
                      <Button variant="ghost" size="sm" onClick={() => downloadKey(publicKey, 'public_key.pem')}><Download className="h-3 w-3" /></Button>
                    </div>
                  </div>
                  <Textarea value={publicKey} readOnly rows={6} className="font-mono text-xs bg-muted/30" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-destructive">🔒 Clave Privada</Label>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => copyKey(privateKey, 'priv')}>{copiedPriv ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}</Button>
                      <Button variant="ghost" size="sm" onClick={() => downloadKey(privateKey, 'private_key.pem')}><Download className="h-3 w-3" /></Button>
                    </div>
                  </div>
                  <Textarea value={privateKey} readOnly rows={8} className="font-mono text-xs bg-muted/30" />
                  <p className="text-xs text-destructive">⚠️ Nunca compartas tu clave privada. Guárdala en un lugar seguro.</p>
                </div>
              </div>
            )}

            <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
              <p><strong>RSA</strong>: Estándar para cifrado y firmas. 2048-bit mínimo, 4096-bit para máxima seguridad.</p>
              <p><strong>ECDSA</strong>: Curvas elípticas. Claves más cortas con seguridad equivalente. P-256 ≈ RSA 3072-bit.</p>
            </div>
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Generador de Claves RSA y ECDSA Online: Criptografía Asimétrica"
          paragraphs={[
            "La criptografía asimétrica usa un par de claves: una pública para cifrar/verificar y una privada para descifrar/firmar. Nuestro generador crea pares RSA y ECDSA directamente en tu navegador.",
            "RSA con 2048 o 4096 bits es el estándar más utilizado en certificados SSL, SSH, PGP y firmas digitales. ECDSA ofrece seguridad equivalente con claves mucho más cortas y operaciones más rápidas.",
            "Las claves se generan usando la Web Crypto API del navegador con entropía criptográficamente segura. Tu clave privada nunca sale de tu dispositivo."
          ]}
          howTo={[
            { step: "Selecciona el algoritmo", description: "Elige RSA (2048/4096 bits) o ECDSA (P-256/P-384) según tu necesidad." },
            { step: "Genera el par de claves", description: "Haz clic en generar. RSA 4096 puede tardar unos segundos." },
            { step: "Descarga las claves", description: "Descarga los archivos PEM o copia directamente. Protege la clave privada." },
          ]}
          faqs={[
            { question: "¿RSA o ECDSA?", answer: "ECDSA para nuevos proyectos: claves más cortas, más rápido, misma seguridad. RSA para compatibilidad con sistemas legacy. P-256 equivale a RSA-3072 en seguridad." },
            { question: "¿2048 o 4096 bits para RSA?", answer: "2048 bits es seguro hasta ~2030. Para protección a largo plazo, usa 4096 bits. La generación y operaciones son más lentas pero significativamente más seguras." },
            { question: "¿Puedo usar estas claves en producción?", answer: "Sí, las claves se generan con crypto.subtle.generateKey() que proporciona entropía criptográficamente segura. Son tan válidas como las generadas con OpenSSL." },
          ]}
          relatedTools={[
            { name: "Cifrado Online", href: "/tools/cifrado-online" },
            { name: "Generador de Hash", href: "/tools/generador-hash" },
            { name: "Generador TOTP", href: "/tools/generador-totp" },
            { name: "Decodificador JWT", href: "/tools/decodificador-jwt" },
          ]}
        />
      </div>
    </div>
  )
}
