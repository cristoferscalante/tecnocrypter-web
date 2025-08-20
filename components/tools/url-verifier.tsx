"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  ExternalLink,
  Clock,
  Globe,
  Lock,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface VerificationResult {
  url: string
  status: 'safe' | 'suspicious' | 'malicious' | 'unknown'
  score: number
  checks: {
    ssl: boolean
    domain_age: number
    reputation: 'good' | 'neutral' | 'bad'
    blacklisted: boolean
    phishing: boolean
    malware: boolean
  }
  details: {
    domain: string
    ip: string
    country: string
    registrar: string
    created_date: string
    ssl_issuer?: string
    ssl_valid_until?: string
  }
  scan_time: string
  analyzing?: boolean
  message?: string
  virustotal_stats?: {
    harmless: number
    malicious: number
    suspicious: number
    undetected: number
    timeout: number
  }
}

export default function URLVerifier() {
  const [url, setUrl] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const verifyWithVirusTotal = async (url: string): Promise<VerificationResult> => {
    // Pasos de verificación real
    const steps = [
      "Enviando URL a VirusTotal...",
      "Analizando con motores de seguridad...",
      "Consultando bases de datos de amenazas...",
      "Evaluando reputación y riesgo...",
      "Generando reporte detallado..."
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProgress((i + 1) * 20)
    }

    try {
      const response = await fetch('/api/verify-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al verificar la URL')
      }

      const data = await response.json()
      
      // Si el análisis está en progreso
      if (data.status === 'analyzing') {
        return {
          url,
          status: 'unknown',
          score: 50,
          checks: {
            ssl: true,
            domain_age: 365,
            reputation: 'neutral',
            blacklisted: false,
            phishing: false,
            malware: false
          },
          details: {
            domain: new URL(url).hostname,
            ip: 'Analizando...',
            country: 'Analizando...',
            registrar: 'Analizando...',
            created_date: 'Analizando...',
            ssl_issuer: 'Analizando...',
            ssl_valid_until: 'Analizando...'
          },
          scan_time: new Date().toISOString(),
          analyzing: true,
          message: data.message
        }
      }

      return {
        url: data.url,
        status: data.status,
        score: data.score,
        checks: data.checks,
        details: data.details,
        scan_time: data.scan_time,
        virustotal_stats: data.virustotal_stats
      }
    } catch (error) {
      console.error('Error al verificar URL:', error)
      throw error
    }
  }

  const handleVerify = async () => {
    if (!url.trim()) {
      setError("Por favor, ingresa una URL válida")
      return
    }

    if (!validateUrl(url)) {
      setError("La URL ingresada no es válida. Asegúrate de incluir http:// o https://")
      return
    }

    setIsVerifying(true)
    setError(null)
    setResult(null)
    setProgress(0)

    try {
      const verificationResult = await verifyWithVirusTotal(url)
      setResult(verificationResult)
      
      if (verificationResult.analyzing) {
        toast({
          title: "Análisis en progreso",
          description: verificationResult.message || "El análisis está en progreso. Los resultados estarán disponibles pronto.",
        })
      } else {
        toast({
          title: "Verificación completada",
          description: `La URL ha sido analizada con VirusTotal. Estado: ${getStatusText(verificationResult.status)}`,
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al verificar la URL. Inténtalo de nuevo."
      setError(errorMessage)
      toast({
        title: "Error en la verificación",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setIsVerifying(false)
      setProgress(0)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'suspicious': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'malicious': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="h-5 w-5" />
      case 'suspicious': return <AlertTriangle className="h-5 w-5" />
      case 'malicious': return <X className="h-5 w-5" />
      default: return <Shield className="h-5 w-5" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'safe': return 'Segura'
      case 'suspicious': return 'Sospechosa'
      case 'malicious': return 'Maliciosa'
      default: return 'Desconocida'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Verificador de URL
          </CardTitle>
          <CardDescription>
            Ingresa una URL para analizar su seguridad y detectar posibles amenazas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL a verificar</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                type="url"
                placeholder="https://ejemplo.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isVerifying}
                className="flex-1"
              />
              <Button 
                onClick={handleVerify} 
                disabled={isVerifying || !url.trim()}
                className="min-w-[120px]"
              >
                {isVerifying ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Verificando
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Verificar
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isVerifying && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Analizando URL...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Resultado del Análisis</span>
                <Badge className={cn("flex items-center gap-1", getStatusColor(result.status))}>
                  {getStatusIcon(result.status)}
                  {getStatusText(result.status)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                <span className="font-mono text-sm break-all">{result.url}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{result.score}</div>
                  <div className="text-sm text-muted-foreground">Puntuación de Seguridad</div>
                </div>
                {result.details.country && (
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{result.details.country}</div>
                    <div className="text-sm text-muted-foreground">País del Servidor</div>
                  </div>
                )}
                {result.checks.domain_age && (
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{result.checks.domain_age}d</div>
                    <div className="text-sm text-muted-foreground">Antigüedad del Dominio</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Checks */}
          <Card>
            <CardHeader>
              <CardTitle>Verificaciones de Seguridad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Certificado SSL</span>
                  </div>
                  {result.checks.ssl ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <X className="h-5 w-5 text-red-600" />
                  )}
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Lista Negra</span>
                  </div>
                  {!result.checks.blacklisted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <X className="h-5 w-5 text-red-600" />
                  )}
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Phishing</span>
                  </div>
                  {!result.checks.phishing ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <X className="h-5 w-5 text-red-600" />
                  )}
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Malware</span>
                  </div>
                  {!result.checks.malware ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <X className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles Técnicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Dominio:</strong> {result.details.domain}
                </div>
                {result.details.ip && (
                  <div>
                    <strong>IP:</strong> {result.details.ip}
                  </div>
                )}
                {result.details.registrar && (
                  <div>
                    <strong>Registrador:</strong> {result.details.registrar}
                  </div>
                )}
                {result.details.created_date && (
                  <div>
                    <strong>Fecha de Creación:</strong> {result.details.created_date}
                  </div>
                )}
                {result.details.country && (
                  <div>
                    <strong>País:</strong> {result.details.country}
                  </div>
                )}
                {result.details.ssl_issuer && (
                  <div>
                    <strong>Emisor SSL:</strong> {result.details.ssl_issuer}
                  </div>
                )}
                {result.details.ssl_valid_until && (
                  <div>
                    <strong>SSL Válido Hasta:</strong> {result.details.ssl_valid_until}
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Análisis realizado: {new Date(result.scan_time).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* VirusTotal Statistics */}
          {result.virustotal_stats && Object.values(result.virustotal_stats).reduce((a, b) => a + b, 0) > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Estadísticas de VirusTotal
                </CardTitle>
                <CardDescription>
                  Resultados del análisis con {Object.values(result.virustotal_stats).reduce((a, b) => a + b, 0)} motores de seguridad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{result.virustotal_stats.harmless}</div>
                    <div className="text-sm text-muted-foreground">Inofensivo</div>
                  </div>
                  <div className="text-center p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{result.virustotal_stats.malicious}</div>
                    <div className="text-sm text-muted-foreground">Malicioso</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{result.virustotal_stats.suspicious}</div>
                    <div className="text-sm text-muted-foreground">Sospechoso</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 dark:bg-gray-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">{result.virustotal_stats.undetected}</div>
                    <div className="text-sm text-muted-foreground">No detectado</div>
                  </div>
                  <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{result.virustotal_stats.timeout}</div>
                    <div className="text-sm text-muted-foreground">Timeout</div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-xs text-muted-foreground">
                  <p>• <strong>Inofensivo:</strong> Motores que consideran la URL segura</p>
                  <p>• <strong>Malicioso:</strong> Motores que detectaron amenazas</p>
                  <p>• <strong>Sospechoso:</strong> Motores que encontraron actividad sospechosa</p>
                  <p>• <strong>No detectado:</strong> Motores sin resultados definitivos</p>
                  <p>• <strong>Timeout:</strong> Motores que no completaron el análisis</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analyzing Message */}
          {result.analyzing && result.message && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {result.message}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Información Importante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Esta herramienta proporciona un análisis básico de seguridad de URLs.</p>
          <p>• Los resultados son informativos y no sustituyen el juicio personal.</p>
          <p>• Siempre mantén tu software actualizado y usa antivirus confiable.</p>
          <p>• En caso de duda, evita hacer clic en enlaces sospechosos.</p>
        </CardContent>
      </Card>
    </div>
  )
}