'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ToolSeoSection } from './tool-seo-section'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check, Upload, Download, ArrowRightLeft, Trash2, Image } from 'lucide-react'

export default function ConversorBase64Client() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)
  const [fileName, setFileName] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const encode = useCallback((text: string) => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(text)))
      setOutput(encoded)
    } catch {
      setOutput('Error: No se pudo codificar el texto.')
    }
  }, [])

  const decode = useCallback((text: string) => {
    try {
      const decoded = decodeURIComponent(escape(atob(text.trim())))
      setOutput(decoded)
      setImagePreview(null)
    } catch {
      setOutput('Error: El texto no es Base64 válido.')
    }
  }, [])

  const handleConvert = useCallback(() => {
    if (mode === 'encode') {
      encode(input)
    } else {
      decode(input)
    }
  }, [mode, input, encode, decode])

  const handleSwap = useCallback(() => {
    setInput(output)
    setOutput('')
    setMode(m => m === 'encode' ? 'decode' : 'encode')
  }, [output])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      if (mode === 'encode') {
        const base64 = result.split(',')[1] || result
        setOutput(base64)
        if (file.type.startsWith('image/')) {
          setImagePreview(result)
        }
      } else {
        setInput(result)
      }
    }
    if (mode === 'encode') {
      reader.readAsDataURL(file)
    } else {
      reader.readAsText(file)
    }
  }, [mode])

  const handleImageToDataUri = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      const dataUri = reader.result as string
      setOutput(dataUri)
      setImagePreview(dataUri)
    }
    reader.readAsDataURL(file)
  }, [])

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
    setFileName('')
    setImagePreview(null)
  }, [])

  const downloadOutput = useCallback(() => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = mode === 'encode' ? 'encoded.b64' : 'decoded.txt'
    a.click()
    URL.revokeObjectURL(url)
  }, [output, mode])

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-tight mb-3">
            Conversor <span className="text-primary">Base64</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Codifica y decodifica texto, archivos e imágenes en Base64. Todo se procesa en tu navegador.
          </p>
        </div>

        <Tabs defaultValue="text" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Texto</TabsTrigger>
            <TabsTrigger value="image">Imagen → Data URI</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {mode === 'encode' ? 'Codificar a Base64' : 'Decodificar desde Base64'}
                    </CardTitle>
                    <CardDescription>
                      {mode === 'encode'
                        ? 'Introduce texto o sube un archivo para codificar.'
                        : 'Pega un string Base64 para decodificar.'
                      }
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMode(m => m === 'encode' ? 'decode' : 'encode')}
                  >
                    <ArrowRightLeft className="h-4 w-4 mr-1" />
                    {mode === 'encode' ? 'Decodificar' : 'Codificar'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{mode === 'encode' ? 'Texto original' : 'Base64'}</Label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'encode' ? 'Escribe el texto a codificar...' : 'Pega el string Base64 aquí...'}
                    className="min-h-[120px] font-mono text-sm"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-muted transition-colors">
                      <Upload className="h-4 w-4" />
                      Subir archivo
                    </div>
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  {fileName && <span className="text-sm text-muted-foreground">{fileName}</span>}
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleConvert} className="flex-1">
                    {mode === 'encode' ? 'Codificar' : 'Decodificar'}
                  </Button>
                  <Button variant="outline" onClick={handleSwap} title="Intercambiar">
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={handleClear} title="Limpiar">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {output && (
                  <div className="space-y-2">
                    <Label>{mode === 'encode' ? 'Resultado Base64' : 'Texto decodificado'}</Label>
                    <div className="relative">
                      <Textarea
                        value={output}
                        readOnly
                        className="min-h-[120px] font-mono text-sm pr-20"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button size="icon" variant="ghost" onClick={copyToClipboard} className="h-8 w-8">
                          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        <Button size="icon" variant="ghost" onClick={downloadOutput} className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {output.length.toLocaleString()} caracteres
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="image" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Image className="h-5 w-5 text-primary" />
                  Imagen a Data URI
                </CardTitle>
                <CardDescription>
                  Convierte una imagen a formato Data URI (base64) para incrustar directamente en HTML o CSS.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="inline-flex items-center gap-2 px-4 py-3 rounded-md border-2 border-dashed text-sm hover:bg-muted hover:border-primary/40 transition-all w-full justify-center">
                      <Upload className="h-5 w-5" />
                      Seleccionar imagen (PNG, JPG, WebP, SVG)
                    </div>
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageToDataUri}
                  />
                </div>

                {imagePreview && (
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden border bg-muted/50 p-4 flex justify-center">
                      <img src={imagePreview} alt="Preview" className="max-h-48 object-contain" />
                    </div>
                    <div className="relative">
                      <Textarea
                        value={output}
                        readOnly
                        className="min-h-[100px] font-mono text-xs pr-20"
                      />
                      <div className="absolute top-2 right-2">
                        <Button size="icon" variant="ghost" onClick={copyToClipboard} className="h-8 w-8">
                          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {output.length.toLocaleString()} caracteres · {(output.length * 0.75 / 1024).toFixed(1)} KB aprox
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">¿Qué es Base64?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Base64 es un esquema de codificación que convierte datos binarios en texto ASCII usando 64 caracteres imprimibles (A-Z, a-z, 0-9, +, /). Se usa comúnmente para:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Incrustar imágenes en HTML/CSS (Data URIs)</li>
              <li>Enviar archivos binarios en JSON o emails</li>
              <li>Codificar tokens de autenticación (como JWT)</li>
              <li>Transmitir datos en URLs de forma segura</li>
            </ul>
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Conversor Base64 Online: Codifica y Decodifica Datos"
          paragraphs={[
            "Base64 es un esquema de codificación que convierte datos binarios en texto ASCII de 64 caracteres. Se usa en Data URIs, tokens JWT, archivos adjuntos de email (MIME) y transmisión de datos binarios en protocolos de texto.",
            "Nuestro conversor Base64 soporta texto, archivos y URL-safe Base64 (RFC 4648). Ideal para desarrolladores que trabajan con APIs REST, autenticación, codificación de imágenes en CSS y manipulación de datos binarios.",
            "La codificación Base64 incrementa el tamaño de los datos en aproximadamente un 33%. No es cifrado ni compresión — es una representación que garantiza la integridad de datos binarios en canales de texto."
          ]}
          howTo={[
            { step: "Selecciona el modo", description: "Elige entre codificar (texto a Base64) o decodificar (Base64 a texto)." },
            { step: "Introduce los datos", description: "Pega el texto original o la cadena Base64 que quieres convertir." },
            { step: "Copia el resultado", description: "El resultado se genera instantáneamente. Copia con un clic." },
          ]}
          faqs={[
            { question: "¿Base64 es cifrado?", answer: "No. Base64 es codificación, no cifrado. Cualquier persona puede decodificar Base64 sin necesitar una clave. Si necesitas proteger datos, usa cifrado AES-256 con nuestra herramienta de cifrado online." },
            { question: "¿Cuándo usar Base64 URL-safe?", answer: "Base64 URL-safe reemplaza + por - y / por _, y omite el padding =. Se usa en URLs, nombres de archivos y tokens donde los caracteres estándar de Base64 causarían problemas." },
            { question: "¿Por qué Base64 aumenta el tamaño?", answer: "Cada 3 bytes de datos se convierten en 4 caracteres Base64. Esto produce un incremento del ~33% en tamaño. Es el costo de representar datos binarios como texto ASCII imprimible." },
          ]}
          relatedTools={[
            { name: "Codificador Base32", href: "/tools/codificador-base32" },
            { name: "Decodificador JWT", href: "/tools/decodificador-jwt" },
            { name: "Conversor Hexadecimal", href: "/tools/conversor-hex" },
            { name: "Codificador URL", href: "/tools/codificador-url" },
          ]}
        />
      </div>
    </div>
  )
}
