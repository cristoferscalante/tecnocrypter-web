import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText, Mail, Calendar, Scale, Users, Globe, AlertTriangle, Gavel, BookOpen, Settings, UserCheck, MessageSquare, Ban, Zap, Server, HelpCircle, MapPin } from "lucide-react"

export const metadata: Metadata = generatePageMetadata({
  title: "Términos de Servicio - TecnoCrypter",
  description: "Términos y condiciones de uso de TecnoCrypter. Conoce tus derechos y obligaciones al utilizar nuestros servicios de ciberseguridad.",
  slug: "terminos",
  image: "/Seo/terminos de servicio.webp",
  keywords: ["términos de servicio", "condiciones de uso", "TecnoCrypter", "ciberseguridad", "legal"]
})

export default function TerminosPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Términos de Servicio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conoce los términos y condiciones que rigen el uso de TecnoCrypter y nuestros servicios de ciberseguridad.
          </p>
          <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Última actualización: 10 de agosto de 2025</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Identidad del responsable y aceptación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-primary" />
                1. Identidad del responsable y aceptación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Este sitio web, accesible en <strong>www.tecnocrypter.com</strong> (el "Sitio"), es operado por 
                <strong> v1tr0</strong> identificada con NIT <strong>1083891483-9</strong>, con domicilio en 
                <strong>Manizales, Colombia</strong>, correo de contacto <strong>legal@tecnocrypter.com</strong>.
              </p>
              <p>
                Al acceder, navegar o usar el Sitio, usted ("Usuario") declara que ha leído, comprendido y aceptado 
                estos Términos de Servicio (los "Términos"), y se compromete a cumplirlos, así como las leyes y 
                regulaciones aplicables en Colombia. Si no está de acuerdo, debe abstenerse de usar el Sitio.
              </p>
            </CardContent>
          </Card>

          {/* Ámbito del Sitio y definiciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                2. Ámbito del Sitio y definiciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">El Sitio ofrece contenidos y herramientas enfocadas en ciberseguridad, anonimato y protección digital, incluyendo:</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Artículos y publicaciones de blog.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Herramientas de verificación y análisis de enlaces sospechosos.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Información y contratación de productos/servicios.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Boletín informativo.</span>
                </li>
              </ul>
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="mb-2"><strong>Contenido:</strong> textos, imágenes, gráficos, logos, videos, código y software del Sitio.</p>
                <p><strong>Servicios:</strong> funcionalidades ofrecidas por TecnoCrypter a través del Sitio, gratuitas o de pago.</p>
              </div>
            </CardContent>
          </Card>

          {/* Modificaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                3. Modificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Podemos actualizar estos Términos o el contenido del Sitio en cualquier momento. La versión vigente 
                se publicará con fecha de actualización. El uso continuo después de cambios implica aceptación de los mismos.
              </p>
            </CardContent>
          </Card>

          {/* Uso permitido y prohibido */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-primary" />
                4. Uso permitido y prohibido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">4.1 Uso permitido:</h4>
                  <p>
                    El Usuario puede utilizar el Sitio y sus herramientas de forma personal o profesional legítima, 
                    con fines lícitos, y sin vulnerar la seguridad o privacidad de terceros.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">4.2 Uso prohibido:</h4>
                  <p className="mb-3">Queda estrictamente prohibido:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">✗</span>
                      <span>Acceder o intentar acceder sin autorización a sistemas, cuentas, APIs o datos.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">✗</span>
                      <span>Distribuir malware, phishing, ingeniería social o cualquier actividad ilícita.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">✗</span>
                      <span>Usar el verificador o herramientas para planear, facilitar o ejecutar ataques.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">✗</span>
                      <span>Realizar DDoS, automatizaciones masivas, scraping no autorizado o explotación de vulnerabilidades.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">✗</span>
                      <span>Recoger datos personales sin consentimiento válido.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">✗</span>
                      <span>Realizar ingeniería inversa, eludir protecciones o descompilar software del Sitio.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">✗</span>
                      <span>Publicar contenido ilegal, difamatorio, discriminatorio, violento o que infrinja derechos de terceros.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">4.3 Divulgación responsable:</h4>
                  <p>
                    Si detecta una vulnerabilidad, repórtela a <strong>security@tecnocrypter.com</strong> antes de divulgarla públicamente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registro y cuentas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                5. Registro y cuentas (si aplica)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">En caso de requerir cuenta, el Usuario será responsable de:</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Proporcionar datos veraces.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Mantener la confidencialidad de sus credenciales.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Toda actividad realizada bajo su cuenta.</span>
                </li>
              </ul>
              <p>TecnoCrypter podrá suspender o cancelar cuentas por incumplimiento de estos Términos.</p>
            </CardContent>
          </Card>

          {/* Boletín y comunicaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                6. Boletín y comunicaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Al suscribirse, el Usuario acepta recibir comunicaciones electrónicas, pudiendo darse de baja en cualquier momento.
              </p>
            </CardContent>
          </Card>

          {/* Propiedad intelectual e industrial */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-primary" />
                7. Propiedad intelectual e industrial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Todos los contenidos del Sitio son propiedad de TecnoCrypter o de terceros autorizados, protegidos por 
                leyes de derechos de autor y marcas. Queda prohibida su reproducción o uso no autorizado.
              </p>
            </CardContent>
          </Card>

          {/* Licencia limitada */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                8. Licencia limitada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Otorgamos una licencia no exclusiva, revocable e intransferible para acceder y usar el Sitio con fines 
                legítimos, sin transferir derechos de propiedad.
              </p>
            </CardContent>
          </Card>

          {/* Enlaces y contenido de terceros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                9. Enlaces y contenido de terceros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                El Sitio puede contener enlaces externos. TecnoCrypter no es responsable de sus contenidos ni políticas.
              </p>
            </CardContent>
          </Card>

          {/* Herramientas de análisis y verificación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                10. Herramientas de análisis y verificación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Las herramientas se ofrecen "tal cual" con fines informativos. No garantizan exactitud total ni sustituyen 
                auditorías profesionales. El Usuario es responsable de sus decisiones.
              </p>
            </CardContent>
          </Card>

          {/* Disponibilidad y cambios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2 text-primary" />
                11. Disponibilidad y cambios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Podemos suspender o modificar el Sitio por mantenimiento, seguridad, mejoras o causas de fuerza mayor.
              </p>
            </CardContent>
          </Card>

          {/* Privacidad y cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                12. Privacidad y cookies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                El tratamiento de datos se rige por la <strong>Política de Privacidad</strong> y la <strong>Política de Cookies</strong>, 
                disponibles en el Sitio.
              </p>
            </CardContent>
          </Card>

          {/* Restricciones para menores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Ban className="h-5 w-5 mr-2 text-primary" />
                13. Restricciones para menores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                El Sitio está dirigido a mayores de 18 años, salvo autorización y supervisión de un representante legal.
              </p>
            </CardContent>
          </Card>

          {/* Exoneración de responsabilidad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
                14. Exoneración de responsabilidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                TecnoCrypter no garantiza disponibilidad continua, ausencia de errores o vulnerabilidades, ni la precisión 
                absoluta del contenido.
              </p>
            </CardContent>
          </Card>

          {/* Limitación de responsabilidad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gavel className="h-5 w-5 mr-2 text-primary" />
                15. Limitación de responsabilidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                En ningún caso seremos responsables por daños indirectos, pérdida de datos o ingresos, derivados del uso 
                del Sitio. Si existiera responsabilidad, se limitará al valor pagado por el servicio (o COP $0 si es gratuito).
              </p>
            </CardContent>
          </Card>

          {/* Indemnidad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                16. Indemnidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                El Usuario indemnizará a TecnoCrypter frente a reclamaciones derivadas de su uso indebido del Sitio.
              </p>
            </CardContent>
          </Card>

          {/* Fuerza mayor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                17. Fuerza mayor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                No seremos responsables por fallos debidos a eventos fuera de nuestro control.
              </p>
            </CardContent>
          </Card>

          {/* Terminación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Ban className="h-5 w-5 mr-2 text-primary" />
                18. Terminación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Podemos restringir el acceso al Sitio por incumplimiento o razones de seguridad.
              </p>
            </CardContent>
          </Card>

          {/* Legislación aplicable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                19. Legislación aplicable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Estos Términos se rigen por la legislación colombiana. Cualquier disputa será resuelta por los jueces de 
                <strong> Manizales, Caldas</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Contacto */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Mail className="h-5 w-5 mr-2" />
                20. Contacto
              </CardTitle>
              <CardDescription>
                Para consultas legales o de seguridad, contáctanos a través de los siguientes medios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">TecnoCrypter – v1tr0</p>
                  <p className="text-sm text-muted-foreground">Manizales, Colombia</p>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium">Consultas legales:</p>
                    <p className="text-primary">legal@tecnocrypter.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Reportes de seguridad:</p>
                    <p className="text-primary">security@tecnocrypter.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      </div>
      </>
  )
}