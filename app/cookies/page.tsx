import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Shield, Lock, Eye, FileText, Mail, Calendar, Target, Scale, Users, Globe, Database, Clock, RefreshCw, CheckCircle, Settings, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Cookies | TecnoCrypter",
  description: "Conoce cómo TecnoCrypter utiliza cookies y tecnologías similares bajo un enfoque de privacidad y mínima recolección de datos.",
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Cookie className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Política de Cookies</h1>
          <p className="text-xl text-muted-foreground">
            En TecnoCrypter valoramos tu privacidad y anonimato, minimizando al máximo el uso de cookies y evitando cualquier rastreo innecesario.
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Última actualización: 10 de agosto de 2025</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* ¿Qué son las cookies? */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                1. ¿Qué son las cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                En TecnoCrypter valoramos tu privacidad y anonimato. Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar cierta información. Sin embargo, nuestro objetivo es <strong>minimizar al máximo su uso</strong> y evitar cualquier rastreo innecesario.
              </p>
              <p>
                También existen tecnologías similares como localStorage, píxeles, SDKs o beacons, que solo utilizaremos si son <strong>estrictamente necesarias</strong> para la seguridad y funcionamiento del sitio.
              </p>
            </CardContent>
          </Card>

          {/* Principios de uso */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                2. Principios de uso en TecnoCrypter
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <ul>
                <li><strong>Privacidad primero:</strong> no utilizamos cookies de seguimiento invasivo.</li>
                <li><strong>Mínima recolección de datos:</strong> solo usamos lo imprescindible para que el sitio funcione y protegerlo contra amenazas.</li>
                <li><strong>Anonimato garantizado:</strong> no vinculamos cookies con tu identidad real.</li>
                <li><strong>Control total del usuario:</strong> puedes aceptar o rechazar cualquier cookie opcional.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Tecnologías que podemos emplear */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-primary" />
                3. Tecnologías que podemos emplear
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <ul>
                <li><strong>Cookies necesarias (propias):</strong> para la seguridad, gestión de sesión y prevención de fraudes.</li>
                <li><strong>Local/Session Storage:</strong> para guardar configuraciones básicas sin rastreo.</li>
                <li><strong>Protección anti-bots:</strong> herramientas como Cloudflare o reCAPTCHA, solo para mantener la seguridad.</li>
              </ul>
              <p>
                <strong>No utilizamos cookies de marketing ni perfiles publicitarios por defecto.</strong> Si en algún momento se implementaran herramientas de analítica o personalización, se te pedirá consentimiento explícito.
              </p>
            </CardContent>
          </Card>

          {/* Base legal y alcance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-primary" />
                4. Base legal y alcance
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Tratamos los datos conforme a la <strong>Ley 1581 de 2012</strong>, <strong>Decreto 1377 de 2013</strong> y demás normativas aplicables.
              </p>
              <ul>
                <li><strong>Cookies estrictamente necesarias:</strong> se instalan sin tu consentimiento porque garantizan el funcionamiento básico y seguro del sitio.</li>
                <li><strong>Cookies opcionales:</strong> solo se instalarán si otorgas tu consentimiento, y podrás retirarlo en cualquier momento desde nuestro panel "Configurar Cookies".</li>
              </ul>
            </CardContent>
          </Card>

          {/* Finalidad de las cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                5. Finalidad de las cookies que usamos
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <ul>
                <li><strong>Seguridad y antifraude:</strong> prevenir accesos no autorizados, ataques o abusos.</li>
                <li><strong>Funcionalidad esencial:</strong> permitir el inicio de sesión seguro y mantener la navegación protegida.</li>
                <li><strong>Preferencias básicas:</strong> guardar ajustes mínimos como idioma o modo oscuro.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Ejemplo de cookies utilizadas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                6. Ejemplo de cookies utilizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-3 text-left font-semibold">Proveedor</th>
                      <th className="border border-border p-3 text-left font-semibold">Cookie</th>
                      <th className="border border-border p-3 text-left font-semibold">Categoría</th>
                      <th className="border border-border p-3 text-left font-semibold">Finalidad</th>
                      <th className="border border-border p-3 text-left font-semibold">Duración</th>
                      <th className="border border-border p-3 text-left font-semibold">Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3">TecnoCrypter</td>
                      <td className="border border-border p-3 font-mono text-sm">cookieConsent</td>
                      <td className="border border-border p-3"><span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">Necesaria</span></td>
                      <td className="border border-border p-3">Guardar tu preferencia de cookies</td>
                      <td className="border border-border p-3">6-12 meses</td>
                      <td className="border border-border p-3">Propia</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">TecnoCrypter</td>
                      <td className="border border-border p-3 font-mono text-sm">session_id</td>
                      <td className="border border-border p-3"><span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">Necesaria</span></td>
                      <td className="border border-border p-3">Mantener sesión segura</td>
                      <td className="border border-border p-3">Sesión</td>
                      <td className="border border-border p-3">Propia</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Cloudflare</td>
                      <td className="border border-border p-3 font-mono text-sm">__cf_bm</td>
                      <td className="border border-border p-3"><span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">Necesaria</span></td>
                      <td className="border border-border p-3">Protección anti-bots y rendimiento</td>
                      <td className="border border-border p-3">30 min</td>
                      <td className="border border-border p-3">Tercero</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">reCAPTCHA</td>
                      <td className="border border-border p-3 font-mono text-sm">__Secure-ENID</td>
                      <td className="border border-border p-3"><span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">Seguridad</span></td>
                      <td className="border border-border p-3">Evitar spam en formularios</td>
                      <td className="border border-border p-3">Variable</td>
                      <td className="border border-border p-3">Tercero</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Gestión de cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                7. Gestión de cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <ul>
                <li><strong>Panel de preferencias:</strong> disponible en el pie de página para configurar cookies opcionales.</li>
                <li><strong>Navegador:</strong> puedes borrarlas o bloquearlas en la configuración de Chrome, Firefox, Edge o Safari.</li>
                <li><strong>Navegación privada:</strong> impide que se guarden cookies entre sesiones.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Transferencias internacionales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                8. Transferencias internacionales
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Si usamos proveedores fuera de Colombia, lo haremos bajo las garantías legales y con medidas de protección de datos.
              </p>
            </CardContent>
          </Card>

          {/* Plazos de retención */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                9. Plazos de retención
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Solo mantenemos cookies el tiempo estrictamente necesario. Las de sesión se eliminan al cerrar el navegador.
              </p>
            </CardContent>
          </Card>

          {/* Datos de menores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                10. Datos de menores
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                No recopilamos datos con fines de seguimiento de menores y recomendamos que el uso del sitio por parte de menores cuente con autorización de sus representantes.
              </p>
            </CardContent>
          </Card>

          {/* Cambios en la política */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-primary" />
                11. Cambios en la política
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Podemos actualizar esta política en cualquier momento. Publicaremos siempre la versión vigente y su fecha de actualización.
              </p>
            </CardContent>
          </Card>

          {/* Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                12. Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong>Responsable:</strong> TecnoCrypter</p>
                <p className="mb-2"><strong>Correo:</strong> <a href="mailto:legal@tecnocrypter.com" className="text-primary hover:underline">legal@tecnocrypter.com</a></p>
                <p><strong>Sitio:</strong> <a href="https://www.tecnocrypter.com" className="text-primary hover:underline">www.tecnocrypter.com</a></p>
              </div>
            </CardContent>
          </Card>

          {/* Nota importante */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Compromiso con la privacidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                En TecnoCrypter, tu privacidad es nuestra prioridad. Esta política refleja nuestro compromiso con la transparencia y el uso responsable de tecnologías web, siempre bajo los principios de mínima recolección de datos y máxima protección del usuario.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}