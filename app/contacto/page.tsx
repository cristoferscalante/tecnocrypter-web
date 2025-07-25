import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contacto | TecnoCrypter",
  description: "Ponte en contacto con nuestro equipo de expertos en seguridad cibernética y encriptación.",
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Contacta con Nuestros Expertos</h1>
          <p className="text-xl text-muted-foreground">
            Estamos aquí para ayudarte con cualquier consulta sobre seguridad cibernética, encriptación o criptomonedas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un Mensaje</CardTitle>
              <CardDescription>Completa el formulario y te responderemos a la brevedad.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      Nombre
                    </label>
                    <Input id="first-name" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      Apellido
                    </label>
                    <Input id="last-name" placeholder="Tu apellido" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Correo Electrónico
                  </label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Asunto
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un asunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Consulta General</SelectItem>
                      <SelectItem value="support">Soporte Técnico</SelectItem>
                      <SelectItem value="sales">Ventas</SelectItem>
                      <SelectItem value="partnership">Asociaciones</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} />
                </div>
                <Button type="submit" className="w-full">
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
                <CardDescription>Diferentes formas de ponerte en contacto con nosotros.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Correo Electrónico</h3>
                    <p className="text-sm text-muted-foreground">info@tecnocrypter.com</p>
                    <p className="text-sm text-muted-foreground">soporte@tecnocrypter.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Teléfono</h3>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Lun-Vie: 9:00 - 18:00</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Ubicación</h3>
                    <p className="text-sm text-muted-foreground">
                      Calle Tecnología 123, Piso 4
                      <br />
                      Ciudad Digital, CD 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Horario de Atención</h3>
                    <p className="text-sm text-muted-foreground">
                      Lunes a Viernes: 9:00 - 18:00
                      <br />
                      Sábados: 10:00 - 14:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preguntas Frecuentes</CardTitle>
                <CardDescription>Respuestas rápidas a preguntas comunes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">¿Cuáles son los métodos de pago aceptados?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Aceptamos Bitcoin (BTC), Ethereum (ETH), Tether (USDT) y otras criptomonedas principales.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">¿Ofrecen soporte técnico 24/7?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sí, nuestro equipo de soporte técnico está disponible las 24 horas para clientes con plan Premium.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">¿Tienen una política de reembolso?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ofrecemos una garantía de devolución de 30 días para todos nuestros productos digitales.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 max-w-5xl mx-auto rounded-lg overflow-hidden border h-[400px] bg-muted">
          <img
            src="/placeholder.svg?height=400&width=1000&query=map location office building"
            alt="Mapa de ubicación"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  )
}
