import type { Metadata } from "next"
import PasswordGenerator from "@/components/tools/password-generator"
import { MatrixBackground } from "@/components/ui/matrix-background"
import { Shield, Lock, Key } from "lucide-react"

export const metadata: Metadata = {
  title: "Generador de Contraseñas Seguras | TecnoCrypter",
  description: "Genera contraseñas seguras y aleatorias con nuestro generador avanzado. Incluye validadores, recomendaciones automáticas y consejos de seguridad.",
  keywords: ["generador contraseñas", "contraseñas seguras", "seguridad", "ciberseguridad", "protección"],
}

export default function GeneradorContrasenasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      <MatrixBackground />
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              <div className="relative bg-primary/10 p-4 rounded-full">
                <Key className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Generador de Contraseñas
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crea contraseñas seguras y aleatorias para proteger tus cuentas de internet. 
            Incluye validadores automáticos y recomendaciones de seguridad.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Validación en tiempo real</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-blue-500" />
              <span>Recomendaciones automáticas</span>
            </div>
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-purple-500" />
              <span>Configuración personalizable</span>
            </div>
          </div>
        </div>
      </section>

      {/* Generador Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <PasswordGenerator />
        </div>
      </section>

      {/* Additional Security Tips */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Protege tu Identidad Digital</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Las contraseñas son la primera línea de defensa contra los ciberataques. 
              Aprende cómo mantener tus cuentas seguras.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold mb-2">Ataques Dirigidos</h3>
              <p className="text-sm text-muted-foreground">
                Los hackers usan información personal para adivinar contraseñas. 
                Evita usar nombres, fechas o datos personales.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold mb-2">Reutilización</h3>
              <p className="text-sm text-muted-foreground">
                Usar la misma contraseña en múltiples sitios amplifica el riesgo. 
                Una brecha compromete todas tus cuentas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold mb-2">Gestores de Contraseñas</h3>
              <p className="text-sm text-muted-foreground">
                Usa un gestor de contraseñas confiable para almacenar y generar 
                contraseñas únicas de forma segura.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}