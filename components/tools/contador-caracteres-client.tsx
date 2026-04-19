"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Copy, Trash2, Clipboard, Type, Hash, Clock, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Límites predefinidos
const PRESET_LIMITS = {
  twitter: { name: "Twitter", limit: 280, description: "Límite de caracteres para tweets" },
  meta_description: { name: "Meta Description", limit: 155, description: "Límite recomendado para meta descriptions" },
  meta_title: { name: "Meta Title", limit: 60, description: "Límite recomendado para títulos SEO" },
  instagram: { name: "Instagram", limit: 2200, description: "Límite de caracteres para posts de Instagram" },
  linkedin: { name: "LinkedIn", limit: 3000, description: "Límite de caracteres para posts de LinkedIn" },
  facebook: { name: "Facebook", limit: 63206, description: "Límite de caracteres para posts de Facebook" },
  custom: { name: "Personalizado", limit: 500, description: "Límite personalizable" }
}

export default function ContadorCaracteresPage() {
  const [text, setText] = useState("")
  const [selectedLimit, setSelectedLimit] = useState("twitter")
  const [customLimit, setCustomLimit] = useState(500)
  const { toast } = useToast()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Contadores
  const charactersWithSpaces = text.length
  const charactersWithoutSpaces = text.replace(/\s/g, "").length
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
  const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length

  // Límite actual
  const currentLimit = selectedLimit === "custom" ? customLimit : PRESET_LIMITS[selectedLimit as keyof typeof PRESET_LIMITS].limit
  const progress = (charactersWithSpaces / currentLimit) * 100
  const remaining = currentLimit - charactersWithSpaces

  // Estados del límite
  const getStatus = () => {
    if (remaining < 0) return { status: "exceeded", color: "destructive", icon: AlertCircle }
    if (remaining <= currentLimit * 0.1) return { status: "warning", color: "warning", icon: AlertTriangle }
    return { status: "ok", color: "success", icon: CheckCircle }
  }

  const { status, color, icon: StatusIcon } = getStatus()

  // Tiempo estimado de lectura (250 palabras por minuto)
  const readingTime = Math.ceil(words / 250)

  // Funciones
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Texto copiado",
        description: "El texto ha sido copiado al portapapeles",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar el texto",
        variant: "destructive",
      })
    }
  }

  const handleClear = () => {
    setText("")
    textareaRef.current?.focus()
    toast({
      title: "Texto limpiado",
      description: "El área de texto ha sido limpiada",
    })
  }

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
      toast({
        title: "Texto pegado",
        description: "El texto del portapapeles ha sido pegado",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo acceder al portapapeles",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Contador de Caracteres
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Cuenta caracteres, palabras y analiza tu texto en tiempo real. Perfecto para redes sociales, SEO y microcopys.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Área de texto principal */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Texto a analizar
                  </CardTitle>
                  <CardDescription>
                    Escribe o pega tu texto para analizarlo en tiempo real
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedLimit} onValueChange={setSelectedLimit}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PRESET_LIMITS).map(([key, preset]) => (
                        <SelectItem key={key} value={key}>
                          {preset.name} ({preset.limit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                ref={textareaRef}
                placeholder="Comience a escribir aquí..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[300px] resize-none"
                aria-label="Área de texto para análisis"
                aria-describedby="character-count"
              />
              
              {/* Barra de progreso */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`h-4 w-4 ${
                      color === "destructive" ? "text-destructive" :
                      color === "warning" ? "text-yellow-500" :
                      "text-green-500"
                    }`} />
                    <span className={
                      color === "destructive" ? "text-destructive" :
                      color === "warning" ? "text-yellow-600" :
                      "text-green-600"
                    }>
                      {remaining >= 0 ? `${remaining} caracteres restantes` : `${Math.abs(remaining)} caracteres excedidos`}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    {charactersWithSpaces}/{currentLimit}
                  </span>
                </div>
                <Progress 
                  value={Math.min(progress, 100)} 
                  className={`h-2 ${
                    color === "destructive" ? "[&>div]:bg-destructive" :
                    color === "warning" ? "[&>div]:bg-yellow-500" :
                    "[&>div]:bg-green-500"
                  }`}
                />
              </div>

              {/* Límite personalizado */}
              {selectedLimit === "custom" && (
                <div className="flex items-center gap-2">
                  <label htmlFor="custom-limit" className="text-sm font-medium">
                    Límite personalizado:
                  </label>
                  <input
                    id="custom-limit"
                    type="number"
                    min="1"
                    max="10000"
                    value={customLimit}
                    onChange={(e) => setCustomLimit(parseInt(e.target.value) || 500)}
                    className="w-20 px-2 py-1 text-sm border rounded"
                  />
                </div>
              )}

              {/* Acciones */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleCopy} variant="outline" size="sm" disabled={!text}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </Button>
                <Button onClick={handleClear} variant="outline" size="sm" disabled={!text}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpiar
                </Button>
                <Button onClick={handlePaste} variant="outline" size="sm">
                  <Clipboard className="h-4 w-4 mr-2" />
                  Pegar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel de estadísticas */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{words}</div>
                  <div className="text-sm text-muted-foreground">Palabras</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{sentences}</div>
                  <div className="text-sm text-muted-foreground">Oraciones</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Caracteres con espacios</span>
                  <Badge variant="secondary">{charactersWithSpaces}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Caracteres sin espacios</span>
                  <Badge variant="secondary">{charactersWithoutSpaces}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Párrafos</span>
                  <Badge variant="secondary">{paragraphs}</Badge>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Tiempo de lectura: ~{readingTime} min</span>
              </div>
            </CardContent>
          </Card>

          {/* Información del límite seleccionado */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Límite seleccionado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">
                  {selectedLimit === "custom" ? "Personalizado" : PRESET_LIMITS[selectedLimit as keyof typeof PRESET_LIMITS].name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedLimit === "custom" 
                    ? `Límite personalizado de ${customLimit} caracteres`
                    : PRESET_LIMITS[selectedLimit as keyof typeof PRESET_LIMITS].description
                  }
                </div>
                <div className="text-lg font-bold text-primary">
                  {currentLimit} caracteres
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Información adicional */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>¿Para qué usar el contador de caracteres?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Redes Sociales</h4>
              <ul className="space-y-1">
                <li>• Twitter: 280 caracteres por tweet</li>
                <li>• Instagram: 2,200 caracteres por post</li>
                <li>• LinkedIn: 3,000 caracteres por post</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">SEO y Web</h4>
              <ul className="space-y-1">
                <li>• Meta Title: 50-60 caracteres</li>
                <li>• Meta Description: 150-155 caracteres</li>
                <li>• Microcopys y CTAs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}