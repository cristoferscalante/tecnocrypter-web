"use client"

import React, { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, RefreshCw, Shield, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  useSeed: boolean
  seed: string
}

interface PasswordStrength {
  score: number
  label: string
  color: string
  recommendations: string[]
}

// Función para generar una contraseña basada en una semilla
const generateSeedBasedPassword = (seed: string, options: PasswordOptions): string => {
  // Conjuntos de caracteres
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercase = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
  
  // Crear un hash simple de la semilla
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0; // Convertir a entero de 32 bits
  }
  
  // Asegurar que el hash sea positivo
  hash = Math.abs(hash);
  
  // Crear la contraseña basada en el hash
  let password = "";
  const seedStr = hash.toString();
  
  // Determinar qué conjuntos de caracteres usar
  let charsets = [];
  if (options.includeUppercase) charsets.push(uppercase);
  if (options.includeLowercase) charsets.push(lowercase);
  if (options.includeNumbers) charsets.push(numbers);
  if (options.includeSymbols) charsets.push(symbols);
  
  // Si no hay conjuntos seleccionados, usar todos
  if (charsets.length === 0) {
    charsets = [uppercase, lowercase, numbers, symbols];
  }
  
  // Generar la contraseña
  for (let i = 0; i < options.length; i++) {
    // Usar diferentes partes del hash para seleccionar caracteres
    const charsetIndex = (hash + i) % charsets.length;
    const charset = charsets[charsetIndex];
    const charIndex = (hash + i * seedStr.length) % charset.length;
    password += charset[charIndex];
  }
  
  // Asegurar que la contraseña incluya al menos un carácter de cada tipo seleccionado
  let finalPassword = password;
  let index = 0;
  
  if (options.includeUppercase && !/[A-Z]/.test(finalPassword)) {
    finalPassword = finalPassword.substring(0, index) + uppercase[hash % uppercase.length] + finalPassword.substring(index + 1);
    index++;
  }
  
  if (options.includeLowercase && !/[a-z]/.test(finalPassword)) {
    finalPassword = finalPassword.substring(0, index) + lowercase[hash % lowercase.length] + finalPassword.substring(index + 1);
    index++;
  }
  
  if (options.includeNumbers && !/[0-9]/.test(finalPassword)) {
    finalPassword = finalPassword.substring(0, index) + numbers[hash % numbers.length] + finalPassword.substring(index + 1);
    index++;
  }
  
  if (options.includeSymbols && !/[^A-Za-z0-9]/.test(finalPassword)) {
    finalPassword = finalPassword.substring(0, index) + symbols[hash % symbols.length] + finalPassword.substring(index + 1);
  }
  
  return finalPassword;
};

const PasswordGenerator = () => {
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
    useSeed: false,
    seed: "",
  })
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    label: "Muy débil",
    color: "bg-red-500",
    recommendations: [],
  })

  const generatePassword = useCallback(() => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    // Si está usando semilla y la semilla está vacía, mostrar error
    if (options.useSeed && !options.seed.trim()) {
      toast({
        title: "Error",
        description: "Debes ingresar una palabra o frase secreta",
        variant: "destructive",
      })
      return
    }

    // Si está usando semilla, generar contraseña basada en la semilla
    if (options.useSeed && options.seed) {
      const seedPassword = generateSeedBasedPassword(options.seed, options);
      setPassword(seedPassword);
      return;
    }

    // Generación aleatoria tradicional
    let charset = ""
    if (options.includeUppercase) charset += uppercase
    if (options.includeLowercase) charset += lowercase
    if (options.includeNumbers) charset += numbers
    if (options.includeSymbols) charset += symbols

    if (charset === "") {
      toast({
        title: "Error",
        description: "Debes seleccionar al menos un tipo de carácter",
        variant: "destructive",
      })
      return
    }

    let result = ""
    for (let i = 0; i < options.length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(result)
  }, [options, toast])

  const calculateStrength = useCallback((pwd: string) => {
    let score = 0
    const recommendations: string[] = []

    // Longitud
    if (pwd.length >= 12) score += 2
    else if (pwd.length >= 8) score += 1
    else recommendations.push("Usa al menos 8 caracteres")

    // Mayúsculas
    if (/[A-Z]/.test(pwd)) score += 1
    else recommendations.push("Incluye letras mayúsculas")

    // Minúsculas
    if (/[a-z]/.test(pwd)) score += 1
    else recommendations.push("Incluye letras minúsculas")

    // Números
    if (/[0-9]/.test(pwd)) score += 1
    else recommendations.push("Incluye números")

    // Símbolos
    if (/[^A-Za-z0-9]/.test(pwd)) score += 2
    else recommendations.push("Incluye símbolos especiales")

    // Variedad de caracteres
    const uniqueChars = new Set(pwd).size
    if (uniqueChars >= pwd.length * 0.7) score += 1

    let label: string
    let color: string

    if (score <= 2) {
      label = "Muy débil"
      color = "bg-red-500"
    } else if (score <= 4) {
      label = "Débil"
      color = "bg-orange-500"
    } else if (score <= 6) {
      label = "Moderada"
      color = "bg-yellow-500"
    } else if (score <= 7) {
      label = "Fuerte"
      color = "bg-green-500"
    } else {
      label = "Muy fuerte"
      color = "bg-emerald-600"
    }

    return { score, label, color, recommendations }
  }, [])

  useEffect(() => {
    if (password) {
      setStrength(calculateStrength(password))
    }
  }, [password, calculateStrength])

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      toast({
        title: "¡Copiado!",
        description: "Contraseña copiada al portapapeles",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar la contraseña",
        variant: "destructive",
      })
    }
  }

  const getStrengthIcon = () => {
    if (strength.score <= 2) return <AlertTriangle className="h-4 w-4 text-red-500" />
    if (strength.score <= 4) return <AlertTriangle className="h-4 w-4 text-orange-500" />
    if (strength.score <= 6) return <Shield className="h-4 w-4 text-yellow-500" />
    return <CheckCircle className="h-4 w-4 text-green-500" />
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Generador Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Generador de Contraseñas Seguras
          </CardTitle>
          <CardDescription>
            Crea contraseñas seguras para proteger tus cuentas de internet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contraseña Generada */}
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña generada</Label>
            <div className="flex gap-2">
              <Input
                id="password"
                value={password}
                readOnly
                className="font-mono text-lg"
                placeholder="Haz clic en 'Generar' para crear una contraseña"
              />
              <Button onClick={copyToClipboard} variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
              <Button onClick={generatePassword} variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Indicador de Fortaleza */}
          {password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Fortaleza de la contraseña</Label>
                <div className="flex items-center gap-2">
                  {getStrengthIcon()}
                  <Badge variant={strength.score > 6 ? "default" : "secondary"}>
                    {strength.label}
                  </Badge>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={cn("h-2 rounded-full transition-all duration-300", strength.color)}
                  style={{ width: `${(strength.score / 8) * 100}%` }}
                />
              </div>
            </div>
          )}

          <Separator />

          {/* Opciones de Generación */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Opciones de generación</Label>
            
            {/* Opción de Semilla */}
            <div className="space-y-2 border p-4 rounded-lg bg-muted/30">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useSeed"
                  checked={options.useSeed}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, useSeed: checked as boolean })
                  }
                />
                <Label htmlFor="useSeed" className="font-medium">Configurar semilla</Label>
              </div>
              
              {options.useSeed && (
                <div className="mt-2 space-y-2">
                  <Label htmlFor="seed">Palabra o frase secreta</Label>
                  <Input
                    id="seed"
                    value={options.seed}
                    onChange={(e) => setOptions({ ...options, seed: e.target.value })}
                    placeholder="Ingresa una palabra o frase que puedas recordar"
                  />
                  <p className="text-xs text-muted-foreground">
                    Esta palabra generará siempre la misma contraseña. Úsala para recuperar tu contraseña cuando la necesites.
                  </p>
                </div>
              )}
            </div>
            
            {/* Longitud */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Longitud de la contraseña</Label>
                <Badge variant="outline">{options.length} caracteres</Badge>
              </div>
              <Slider
                value={[options.length]}
                onValueChange={(value) => setOptions({ ...options, length: value[0] })}
                max={32}
                min={4}
                step={1}
                className="w-full"
              />
            </div>

            {/* Tipos de Caracteres */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={options.includeUppercase}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, includeUppercase: checked as boolean })
                  }
                />
                <Label htmlFor="uppercase">Mayúsculas (A-Z)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={options.includeLowercase}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, includeLowercase: checked as boolean })
                  }
                />
                <Label htmlFor="lowercase">Minúsculas (a-z)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={options.includeNumbers}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, includeNumbers: checked as boolean })
                  }
                />
                <Label htmlFor="numbers">Números (0-9)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={options.includeSymbols}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, includeSymbols: checked as boolean })
                  }
                />
                <Label htmlFor="symbols">Símbolos (!@#$%)</Label>
              </div>
            </div>
          </div>

          {/* Recomendaciones */}
          {strength.recommendations.length > 0 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Recomendaciones:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {strength.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm">
                      {rec}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Panel Informativo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            Importancia de las Contraseñas Seguras
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">✅ Buenas Prácticas</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Usa al menos 12 caracteres
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Combina mayúsculas, minúsculas, números y símbolos
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Usa contraseñas únicas para cada cuenta
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Actualiza contraseñas regularmente
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Usa autenticación de dos factores (2FA)
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">❌ Evita Estos Errores</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Usar información personal (nombres, fechas)
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Reutilizar la misma contraseña
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Usar secuencias simples (123456, abcdef)
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Compartir contraseñas por medios inseguros
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Guardar contraseñas en archivos de texto
                </li>
              </ul>
            </div>
          </div>
          
          <Separator />
          
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              💡 ¿Sabías que?
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Una contraseña de 8 caracteres puede ser crackeada en menos de 8 horas, 
              mientras que una de 12 caracteres con caracteres mixtos puede tomar más de 
              200 años con la tecnología actual.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PasswordGenerator