import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText, Mail, Calendar, Target, Scale, Cookie, Users, Globe, Database, Clock, RefreshCw, CheckCircle, UserCheck, ClipboardCheck, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidad | TecnoCrypter",
  description: "Conoce cómo TecnoCrypter protege tu privacidad y maneja tus datos personales bajo un modelo privacy-first.",
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Política de Privacidad</h1>
          <p className="text-xl text-muted-foreground">
            En TecnoCrypter priorizamos tu privacidad bajo un modelo privacy-first con cifrado extremo a extremo.
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Última actualización: 10 de agosto de 2025</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introducción */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Introducción
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                TecnoCrypter ("TecnoCrypter"), en cumplimiento de la <strong>Ley 1581 de 2012</strong>, el <strong>Decreto 1377 de 2013</strong>, 
                el <strong>Decreto 1074 de 2015</strong> y demás normas aplicables sobre tratamiento de datos personales, 
                adopta la presente Política de Tratamiento de Datos Personales.
              </p>
              <p>
                Nuestra misión es ofrecer herramientas y contenidos de <strong>ciberseguridad</strong> bajo un modelo <strong>privacy-first</strong>, 
                priorizando el <strong>anonimato del usuario</strong>, el <strong>mínimo uso de datos</strong>, las <strong>comunicaciones cifradas</strong> y, 
                en el caso de transacciones, la preferencia por <strong>pagos con criptomonedas</strong>.
              </p>
              <p>
                Esta política aplica a todos los procesos, colaboradores y proveedores que actúen como encargados de datos para TecnoCrypter, y cubre las interacciones con:
              </p>
              <ul>
                <li>Usuarios y visitantes de www.tecnocrypter.com</li>
                <li>Suscriptores del boletín</li>
                <li>Clientes y prospectos</li>
                <li>Proveedores y contratistas</li>
              </ul>
            </CardContent>
          </Card>

          {/* Responsable del tratamiento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                1. Responsable del tratamiento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Responsable:</strong> TecnoCrypter / v1tro – NIT 1083891483-9</p>
                <p><strong>Correo seguro:</strong> legal@tecnocrypter.com</p>
                <p><strong>Sitio web:</strong> www.tecnocrypter.com</p>
              </div>
            </CardContent>
          </Card>

          {/* Principios rectores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                2. Principios rectores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">En TecnoCrypter tratamos la información conforme a:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Minimización de datos:</strong> solo recolectamos lo estrictamente necesario.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Anonimato:</strong> siempre que sea posible, procesamos datos de forma no identificable.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Cifrado extremo a extremo:</strong> para proteger las comunicaciones y transferencias.
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>No rastreo intrusivo:</strong> no usamos tecnologías de seguimiento invasivas sin tu consentimiento.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Pagos privados:</strong> priorizamos criptomonedas y métodos que no expongan datos financieros innecesarios.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datos que recolectamos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                3. Datos que recolectamos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Identificación mínima:</strong> nombre o alias, correo electrónico (puedes usar uno cifrado), y, si lo decides, ciudad o país.
                </div>
                <div>
                  <strong>Datos técnicos básicos:</strong> IP, dispositivo, navegador y configuración de idioma.
                </div>
                <div>
                  <strong>Comunicaciones:</strong> mensajes enviados por chat seguro, formularios o correos cifrados.
                </div>
                <div>
                  <strong>Suscripciones:</strong> correo y preferencias (almacenados de forma cifrada).
                </div>
                <div>
                  <strong>Transacciones:</strong> pagos procesados preferentemente en criptomonedas. No almacenamos información completa de tarjetas.
                </div>
                <div>
                  <strong>Seguridad:</strong> URLs analizadas, indicadores de amenazas y registros técnicos para prevenir abusos.
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Importante:</strong> No solicitamos datos sensibles salvo necesidad legal, y en tal caso se pedirá autorización expresa. 
                    Menores de edad solo pueden interactuar con autorización de su representante legal.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Finalidades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                4. Finalidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Operar el Sitio y sus herramientas (verificador, contenidos, suscripciones).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Gestionar solicitudes de soporte usando canales cifrados.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Enviar boletines y alertas de ciberseguridad si lo autorizas.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Mejorar la seguridad y prevenir fraudes o ataques.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Cumplir obligaciones legales o contractuales.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Procesar pagos en criptomonedas o medios de alta privacidad.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Analizar métricas internas de forma agregada y anónima.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Base legal y autorización */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-primary" />
                5. Base legal y autorización
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                El tratamiento se realiza con tu consentimiento informado o en los casos previstos por la ley. 
                La autorización se obtiene por medios electrónicos, y se conserva prueba de la misma.
              </p>
            </CardContent>
          </Card>

          {/* Cookies y tecnologías */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cookie className="h-5 w-5 mr-2 text-primary" />
                6. Cookies y tecnologías
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Usamos cookies técnicas necesarias y, solo si lo aceptas, cookies opcionales para analítica anónima. 
                No realizamos perfilado invasivo. Ver <strong>Política de Cookies</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Derechos de los titulares */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-primary" />
                7. Derechos de los titulares
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Tienes derecho a:</p>
              <div className="grid md:grid-cols-2 gap-2">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Acceder a tus datos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Rectificarlos o actualizarlos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Solicitar su supresión</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Revocar la autorización</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Presentar quejas ante la SIC</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  <strong>Ejércelos escribiendo a:</strong> legal@tecnocrypter.com
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Encargados y transferencias */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                8. Encargados y transferencias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Solo compartimos datos con proveedores que cumplen altos estándares de seguridad y cifrado. 
                Las transferencias internacionales se realizan bajo protocolos seguros y cifrado extremo a extremo.
              </p>
            </CardContent>
          </Card>

          {/* Seguridad de la información */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                9. Seguridad de la información
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Implementamos:</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Cifrado TLS/SSL y PGP para comunicaciones.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Control de accesos y registros de auditoría.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Infraestructura con redundancia y backups cifrados.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Retención mínima de datos.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Conservación y supresión */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                10. Conservación y supresión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Los datos se conservan únicamente el tiempo necesario para las finalidades autorizadas. 
                Posteriormente se eliminan o anonimizan de forma segura.
              </p>
            </CardContent>
          </Card>

          {/* Uso del verificador de enlaces */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                11. Uso del verificador de enlaces
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Los datos procesados por esta herramienta se almacenan temporalmente para análisis y seguridad, 
                no se comparten públicamente y se eliminan tras cumplir su finalidad.
              </p>
            </CardContent>
          </Card>

          {/* Cambios en la política */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-primary" />
                12. Cambios en la política
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Cualquier cambio se publicará en nuestro Sitio y, si es relevante, se notificará por los medios disponibles.
              </p>
            </CardContent>
          </Card>

          {/* Vigencia */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                13. Vigencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Esta Política rige a partir del <strong>10 de agosto de 2025</strong> y se mantendrá vigente mientras 
                TecnoCrypter realice tratamiento de datos personales.
              </p>
            </CardContent>
          </Card>

          {/* Autorización de datos personales */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600 dark:text-blue-400">
                <UserCheck className="h-5 w-5 mr-2" />
                Autorización para el tratamiento de datos personales
              </CardTitle>
              <CardDescription>
                Formulario de autorización expresa para el tratamiento de información personal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                <h4 className="font-semibold mb-4 flex items-center">
                  <ClipboardCheck className="h-4 w-4 mr-2 text-primary" />
                  Autorización expresa
                </h4>
                <p className="mb-4 text-sm">
                  Autorizo de manera libre, previa, expresa, voluntaria e informada a <strong>TecnoCrypter</strong> 
                  para realizar el tratamiento de mis datos personales con las siguientes finalidades, 
                  siempre priorizando la privacidad, seguridad, anonimato y confidencialidad:
                </p>
                
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">a)</span>
                      <span>Operar y mantener el Sitio web y sus funcionalidades, garantizando un entorno seguro.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">b)</span>
                      <span>Gestionar solicitudes de contacto y soporte técnico a través de canales cifrados.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">c)</span>
                      <span>Enviar boletines sobre ciberseguridad y anonimato digital, solo si lo autorizas.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">d)</span>
                      <span>Comunicaciones comerciales por canales seguros y cifrados.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">e)</span>
                      <span>Analítica interna con datos agregados y anonimización.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">f)</span>
                      <span>Prevenir fraude y reforzar la seguridad de la infraestructura.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">g)</span>
                      <span>Gestionar eventos y capacitaciones por canales privados y seguros.</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">h)</span>
                      <span>Cumplir obligaciones legales bajo principios de mínima divulgación.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">i)</span>
                      <span>Gestionar relaciones contractuales, incluyendo pagos con criptomonedas.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">j)</span>
                      <span>Compartir datos solo con proveedores que cumplan altos estándares de privacidad.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">k)</span>
                      <span>Transferencias internacionales con cifrado extremo a extremo.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">l)</span>
                      <span>Actualizar bases de datos minimizando retención de datos.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">m)</span>
                      <span>Estudios internos para mejorar servicios, sin segmentación invasiva.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary text-xs mt-1">n)</span>
                      <span>Registrar comunicaciones para soporte, siempre cifradas.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold mb-3 flex items-center text-yellow-700 dark:text-yellow-400">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Declaraciones importantes
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>Entiendo que el uso de datos sensibles es opcional y no puede implicar discriminación.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>Para menores de edad, se requerirá autorización del representante legal.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>Conozco mis derechos de acceso, actualización, rectificación, supresión, revocatoria y queja ante la SIC.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>He leído y acepto la Política de Privacidad publicada en www.tecnocrypter.com.</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium">
                    <strong>Canal para ejercer derechos:</strong> legal@tecnocrypter.com
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
                <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Aviso de privacidad resumido
                </h4>
                <div className="text-sm space-y-2">
                  <p><strong>Responsable:</strong> TecnoCrypter / v1tr0, NIT 1083891483-9</p>
                  <p><strong>Correo seguro:</strong> legal@tecnocrypter.com</p>
                  <p><strong>Sitio:</strong> www.tecnocrypter.com</p>
                </div>
                <p className="text-sm mt-3">
                  En TecnoCrypter tratamos tus datos con máxima seguridad y respeto por tu anonimato. 
                  Los datos se usarán para operar el sitio, gestionar comunicaciones cifradas, 
                  analítica agregada, prevención de fraude, cumplimiento legal y marketing no intrusivo 
                  (solo si lo autorizas).
                </p>
                <p className="text-sm mt-2">
                  Tus derechos incluyen acceder, actualizar, rectificar, revocar y suprimir tus datos, 
                  así como presentar quejas ante la Superintendencia de Industria y Comercio.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contacto */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Mail className="h-5 w-5 mr-2" />
                ¿Tienes preguntas sobre tu privacidad?
              </CardTitle>
              <CardDescription>
                Nuestro equipo está disponible para resolver cualquier duda sobre el tratamiento de tus datos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <p className="font-medium">Correo de contacto legal:</p>
                  <p className="text-primary">legal@tecnocrypter.com</p>
                </div>
                <div>
                  <p className="font-medium">Soporte general:</p>
                  <p className="text-primary">info@tecnocrypter.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}