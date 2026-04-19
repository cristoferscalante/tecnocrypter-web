'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { UserRound, Copy, Check, RefreshCw } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

const FIRST_NAMES_M = ['Carlos', 'Alejandro', 'Miguel', 'Daniel', 'David', 'Javier', 'Andrés', 'Pablo', 'Fernando', 'Ricardo', 'Sergio', 'Luis', 'Manuel', 'Jorge', 'Marcos', 'Hugo', 'Adrián', 'Diego', 'Raúl', 'Iván']
const FIRST_NAMES_F = ['María', 'Laura', 'Ana', 'Lucía', 'Carmen', 'Paula', 'Elena', 'Sara', 'Isabel', 'Sofía', 'Claudia', 'Marta', 'Andrea', 'Raquel', 'Valentina', 'Daniela', 'Patricia', 'Natalia', 'Teresa', 'Julia']
const LAST_NAMES = ['García', 'Rodríguez', 'Martínez', 'López', 'González', 'Hernández', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz', 'Morales', 'Reyes', 'Ortiz', 'Gutiérrez', 'Ruiz']
const DOMAINS = ['gmail.com', 'outlook.com', 'yahoo.es', 'hotmail.com', 'protonmail.com', 'icloud.com']
const STREETS = ['Calle Mayor', 'Av. Libertad', 'Calle del Sol', 'Paseo de la Castellana', 'Gran Vía', 'Calle Real', 'Av. de la Constitución', 'Calle Luna', 'Rambla Catalunya', 'Calle Alcalá']
const CITIES = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga', 'Zaragoza', 'Murcia', 'Palma', 'Las Palmas']
const COMPANIES = ['TechSoft S.L.', 'Innovatech Corp.', 'DataSystems S.A.', 'CloudNet Solutions', 'Digital Ventures', 'CyberCore S.L.', 'NetGuard Inc.', 'InfoSec Pro']
const JOBS = ['Desarrollador Frontend', 'Analista de Datos', 'Diseñador UX', 'Ingeniero DevOps', 'Product Manager', 'Consultor IT', 'Administrador de Sistemas', 'QA Engineer']

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }
function randNum(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min }

function normalize(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

interface FakeIdentity {
  name: string; lastName1: string; lastName2: string; fullName: string; gender: string
  email: string; phone: string; address: string; city: string; postalCode: string
  birthDate: string; age: number; company: string; job: string; username: string; iban: string
}

function generateIdentity(): FakeIdentity {
  const isMale = Math.random() > 0.5
  const name = isMale ? rand(FIRST_NAMES_M) : rand(FIRST_NAMES_F)
  const lastName1 = rand(LAST_NAMES)
  const lastName2 = rand(LAST_NAMES)
  const fullName = `${name} ${lastName1} ${lastName2}`
  const city = rand(CITIES)
  const birthYear = randNum(1960, 2004)
  const birthMonth = randNum(1, 12)
  const birthDay = randNum(1, 28)
  const age = new Date().getFullYear() - birthYear

  const emailUser = `${normalize(name)}.${normalize(lastName1)}${randNum(1, 99)}`
  const email = `${emailUser}@${rand(DOMAINS)}`
  const phone = `+34 ${randNum(600, 699)} ${randNum(100, 999)} ${randNum(100, 999)}`
  const address = `${rand(STREETS)}, ${randNum(1, 200)}, ${randNum(1, 8)}º`
  const postalCode = `${randNum(10, 52)}${randNum(100, 999)}`
  const iban = `ES${randNum(10, 99)} ${randNum(1000, 9999)} ${randNum(1000, 9999)} ${randNum(10, 99)} ${randNum(1000000000, 9999999999)}`
  const username = `${normalize(name)}${normalize(lastName1).slice(0, 3)}${randNum(1, 999)}`

  return {
    name, lastName1, lastName2, fullName, gender: isMale ? 'Masculino' : 'Femenino',
    email, phone, address, city, postalCode,
    birthDate: `${birthDay.toString().padStart(2, '0')}/${birthMonth.toString().padStart(2, '0')}/${birthYear}`,
    age, company: rand(COMPANIES), job: rand(JOBS), username, iban,
  }
}

export default function GeneradorDatosClient() {
  const [identity, setIdentity] = useState<FakeIdentity | null>(null)
  const [copied, setCopied] = useState('')

  const generate = () => setIdentity(generateIdentity())

  const copyField = (key: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  const copyAll = () => {
    if (!identity) return
    const text = Object.entries(identity).map(([k, v]) => `${k}: ${v}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopied('all')
    setTimeout(() => setCopied(''), 2000)
  }

  const fields = identity ? [
    { label: 'Nombre completo', value: identity.fullName, key: 'fullName' },
    { label: 'Género', value: identity.gender, key: 'gender' },
    { label: 'Email', value: identity.email, key: 'email' },
    { label: 'Teléfono', value: identity.phone, key: 'phone' },
    { label: 'Usuario', value: identity.username, key: 'username' },
    { label: 'Fecha nacimiento', value: `${identity.birthDate} (${identity.age} años)`, key: 'birthDate' },
    { label: 'Dirección', value: identity.address, key: 'address' },
    { label: 'Ciudad', value: identity.city, key: 'city' },
    { label: 'Código postal', value: identity.postalCode, key: 'postalCode' },
    { label: 'Empresa', value: identity.company, key: 'company' },
    { label: 'Cargo', value: identity.job, key: 'job' },
    { label: 'IBAN', value: identity.iban, key: 'iban' },
  ] : []

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserRound className="h-5 w-5 text-primary" /> Generador de Datos Ficticios</CardTitle>
            <CardDescription>Genera identidades ficticias con nombre, email, teléfono, dirección y más para testing y desarrollo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={generate}><RefreshCw className="h-4 w-4 mr-2" /> Generar identidad</Button>
              {identity && <Button variant="outline" onClick={copyAll}>{copied === 'all' ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />} Copiar todo</Button>}
            </div>

            {identity && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {fields.map(f => (
                  <div key={f.key} className="p-3 rounded-lg bg-muted/50 flex items-center justify-between group cursor-pointer hover:bg-muted/80 transition-colors" onClick={() => copyField(f.key, f.value)}>
                    <div>
                      <div className="text-xs text-muted-foreground">{f.label}</div>
                      <div className="text-sm font-medium">{f.value}</div>
                    </div>
                    {copied === f.key ? <Check className="h-3 w-3 text-primary shrink-0" /> : <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 shrink-0" />}
                  </div>
                ))}
              </div>
            )}

            <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 text-sm">
              <p className="text-yellow-800 dark:text-yellow-200"><strong>⚠️ Solo para testing.</strong> Estos datos son ficticios y generados aleatoriamente. No corresponden a personas reales. Úsalos para pruebas de desarrollo, demos y formularios de test.</p>
            </div>
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Generador de Datos Ficticios: Identidades para Testing y Desarrollo"
          paragraphs={[
            "Necesitas datos realistas para probar formularios, bases de datos y aplicaciones sin usar información personal real. Nuestro generador crea identidades ficticias completas con nombres, emails, teléfonos y direcciones españolas.",
            "Ideal para desarrolladores, QA testers, diseñadores UX y cualquier profesional que necesite datos de prueba. Cada identidad incluye nombre, email, teléfono, dirección, fecha de nacimiento, empresa y más.",
            "Todos los datos se generan localmente con algoritmos aleatorios. No corresponden a personas reales y son seguros para usar en entornos de desarrollo y testing."
          ]}
          howTo={[
            { step: "Genera una identidad", description: "Haz clic en generar para obtener una identidad ficticia completa." },
            { step: "Copia campos individuales", description: "Haz clic en cualquier campo para copiarlo al portapapeles." },
            { step: "Genera más identidades", description: "Repite el proceso para obtener diferentes datos de prueba." },
          ]}
          faqs={[
            { question: "¿Son datos de personas reales?", answer: "No. Todos los datos se generan aleatoriamente combinando listas de nombres, apellidos, calles y ciudades comunes. No corresponden a ninguna persona real." },
            { question: "¿Puedo usar estos datos en producción?", answer: "No. Están diseñados exclusivamente para testing, desarrollo, demos y prototipado. Los IBANs y teléfonos no son válidos para transacciones reales." },
            { question: "¿Por qué generar datos ficticios?", answer: "Para cumplir con GDPR/LOPD: nunca uses datos reales en entornos de desarrollo o testing. Los datos ficticios protegen la privacidad mientras permiten pruebas realistas." },
          ]}
          relatedTools={[
            { name: "Generador de Contraseñas", href: "/tools/generador-contrasenas" },
            { name: "Generador UUID", href: "/tools/generador-uuid" },
            { name: "Generador Lorem Ipsum", href: "/tools/generador-lorem" },
            { name: "Eliminador de Rastreo URL", href: "/tools/eliminador-rastreo" },
          ]}
        />
      </div>
    </div>
  )
}
