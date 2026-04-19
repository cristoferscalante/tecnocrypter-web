import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/metadata"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Shield, Key, FileCheck, ArrowRight, QrCode, Lock, Binary, Type, KeyRound,
  GitCompare, Hash, FileCode2, Hexagon, ShieldCheck, Clock, Braces, Fingerprint,
  FileKey2, Link2, Palette, SearchCode, AlignLeft, Code2,
  Timer, Gauge, Mail, KeySquare, Unlink, UserRound, EyeOff, FileText,
  Globe, ScanLine, AtSign, BookOpen, Database, CalendarClock, Minimize2,
  Ruler, Percent, Table
} from "lucide-react"
import { ReusableFaqSection } from "@/components/sections/reusable-faq-section"
import { FAQStructuredData, BreadcrumbStructuredData } from "@/components/seo/structured-data"


const tools = [
  // === SEGURIDAD (10) ===
  { title: "Generador de Contraseñas", description: "Genera contraseñas seguras y personalizables con diferentes niveles de complejidad.", href: "/tools/generador-contrasenas", icon: Key, category: "Seguridad" },
  { title: "Verificador de URL", description: "Analiza y verifica la seguridad de URLs y detecta posibles amenazas antes de visitarlas.", href: "/tools/verificador", icon: Shield, category: "Seguridad" },
  { title: "Cifrado Online", description: "Cifra y descifra mensajes con AES-256, ChaCha20 y más. Todo en tu navegador.", href: "/tools/cifrado-online", icon: Lock, category: "Seguridad" },
  { title: "Generador de Hash", description: "Calcula hashes (MD5, SHA-1, SHA-256, etc.) de texto y archivos en tu navegador.", href: "/tools/generador-hash", icon: Hash, category: "Seguridad" },
  { title: "Verificador de Contraseñas Filtradas", description: "Comprueba si tu contraseña ha sido expuesta en filtraciones usando Have I Been Pwned.", href: "/tools/verificador-contrasenas", icon: ShieldCheck, category: "Seguridad" },
  { title: "Decodificador JWT", description: "Decodifica y analiza tokens JWT: visualiza header, payload y firma.", href: "/tools/decodificador-jwt", icon: FileKey2, category: "Seguridad" },
  { title: "Generador TOTP/2FA", description: "Genera códigos TOTP para autenticación de dos factores desde un secreto Base32.", href: "/tools/generador-totp", icon: Timer, category: "Seguridad" },
  { title: "Calculadora de Entropía", description: "Calcula la entropía y fortaleza de contraseñas con estimaciones de tiempo de crackeo.", href: "/tools/calculadora-entropia", icon: Gauge, category: "Seguridad" },
  { title: "Analizador de Cabeceras Email", description: "Analiza cabeceras de email para detectar spoofing, SPF, DKIM y DMARC.", href: "/tools/analizador-email", icon: Mail, category: "Seguridad" },
  { title: "Generador de Claves RSA/ECDSA", description: "Genera pares de claves RSA y ECDSA con Web Crypto API en formato PEM.", href: "/tools/generador-claves", icon: KeySquare, category: "Seguridad" },
  // === PRIVACIDAD (10) ===
  { title: "Generador de Credenciales Determinísticas", description: "Crea usuarios y contraseñas determinísticas desde una palabra clave maestra.", href: "/tools/generador-credenciales", icon: KeyRound, category: "Privacidad" },
  { title: "Limpiador de Metadatos", description: "Elimina metadatos sensibles (EXIF, GPS) de tus imágenes para proteger tu privacidad.", href: "/tools/limpia-metadatos", icon: FileCheck, category: "Privacidad" },
  { title: "Eliminador de Rastreo URL", description: "Elimina parámetros de tracking (UTM, fbclid, gclid) de URLs para proteger tu privacidad.", href: "/tools/eliminador-rastreo", icon: Unlink, category: "Privacidad" },
  { title: "Generador de Datos Ficticios", description: "Genera identidades ficticias realistas con nombre, email, teléfono y dirección.", href: "/tools/generador-datos", icon: UserRound, category: "Privacidad" },
  { title: "Ofuscador de Texto", description: "Ofusca texto con homoglifos, Zalgo, caracteres invisibles y más técnicas Unicode.", href: "/tools/ofuscador-texto", icon: EyeOff, category: "Privacidad" },
  { title: "Analizador de Cookies HTTP", description: "Analiza cookies HTTP y verifica atributos de seguridad: Secure, HttpOnly, SameSite.", href: "/tools/analizador-cookies", icon: FileText, category: "Privacidad" },
  { title: "Generador de User-Agent", description: "Genera User-Agents personalizados y analiza cadenas UA para testing y privacidad.", href: "/tools/generador-useragent", icon: Globe, category: "Privacidad" },
  { title: "Huella Digital del Navegador", description: "Descubre qué información revela tu navegador y cuán rastreable eres online.", href: "/tools/huella-digital", icon: ScanLine, category: "Privacidad" },
  { title: "Generador de Alias de Email", description: "Crea variaciones de tu email con +tags para detectar filtraciones y filtrar spam.", href: "/tools/generador-alias", icon: AtSign, category: "Privacidad" },
  { title: "Generador de Passphrase", description: "Contraseñas memorables al estilo Diceware combinando palabras aleatorias.", href: "/tools/generador-passphrase", icon: BookOpen, category: "Privacidad" },
  // === DESARROLLO (10) ===
  { title: "Codificador Base32", description: "Codifica y decodifica en Base32 con múltiples variantes y opciones avanzadas.", href: "/tools/codificador-base32", icon: Binary, category: "Desarrollo" },
  { title: "Conversor Base64", description: "Codifica y decodifica texto, archivos e imágenes en Base64 y Data URI.", href: "/tools/conversor-base64", icon: FileCode2, category: "Desarrollo" },
  { title: "Conversor Hexadecimal", description: "Convierte entre texto, hexadecimal, decimal, binario y colores RGB.", href: "/tools/conversor-hex", icon: Hexagon, category: "Desarrollo" },
  { title: "Validador y Formateador JSON", description: "Valida, formatea y minifica JSON con vista de árbol interactiva.", href: "/tools/validador-json", icon: Braces, category: "Desarrollo" },
  { title: "Generador UUID, ULID y Nano ID", description: "Genera identificadores únicos UUID v4, v7, ULID y Nano ID con generación en lote.", href: "/tools/generador-uuid", icon: Fingerprint, category: "Desarrollo" },
  { title: "Codificador URL", description: "Codifica y decodifica URLs con encodeURIComponent y encodeURI.", href: "/tools/codificador-url", icon: Link2, category: "Desarrollo" },
  { title: "Regex Tester", description: "Prueba expresiones regulares en tiempo real con resaltado y grupos de captura.", href: "/tools/regex-tester", icon: SearchCode, category: "Desarrollo" },
  { title: "Formateador de SQL", description: "Formatea, indenta y embellece consultas SQL automáticamente.", href: "/tools/formateador-sql", icon: Database, category: "Desarrollo" },
  { title: "Generador de Expresiones Cron", description: "Construye expresiones cron visualmente con presets y próximas ejecuciones.", href: "/tools/generador-cron", icon: CalendarClock, category: "Desarrollo" },
  { title: "Minificador CSS/JS", description: "Minifica CSS y JavaScript eliminando espacios, comentarios y caracteres innecesarios.", href: "/tools/minificador-css", icon: Minimize2, category: "Desarrollo" },
  // === UTILIDADES (10) ===
  { title: "Generador de Códigos QR", description: "Crea códigos QR personalizados para enlaces, textos y contactos.", href: "/tools/generador-qr", icon: QrCode, category: "Utilidades" },
  { title: "Contador de Caracteres", description: "Cuenta caracteres, palabras y analiza tu texto en tiempo real.", href: "/tools/contador-caracteres", icon: Type, category: "Utilidades" },
  { title: "Generador Lorem Ipsum", description: "Genera texto placeholder configurable: párrafos, oraciones o palabras.", href: "/tools/generador-lorem", icon: AlignLeft, category: "Utilidades" },
  { title: "Comparador de Archivos y Texto", description: "Compara líneas entre dos textos o archivos con diff viewer visual.", href: "/tools/comparador-archivos", icon: GitCompare, category: "Utilidades" },
  { title: "Conversor de Colores", description: "Convierte entre HEX, RGB, HSL y RGBA con color picker y valores Tailwind.", href: "/tools/conversor-colores", icon: Palette, category: "Utilidades" },
  { title: "Conversor Markdown", description: "Convierte entre Markdown y HTML en tiempo real con vista previa.", href: "/tools/conversor-markdown", icon: Code2, category: "Utilidades" },
  { title: "Conversor Unix Timestamp", description: "Convierte entre Unix timestamp y fecha legible con zonas horarias.", href: "/tools/conversor-timestamp", icon: Clock, category: "Utilidades" },
  { title: "Conversor de Unidades", description: "Convierte entre unidades de longitud, peso, temperatura, datos y más.", href: "/tools/conversor-unidades", icon: Ruler, category: "Utilidades" },
  { title: "Calculadora de Porcentajes", description: "Calcula porcentajes, cambios porcentuales, aumentos y descuentos al instante.", href: "/tools/calculadora-porcentajes", icon: Percent, category: "Utilidades" },
  { title: "Generador de Tablas CSV", description: "Crea tablas de datos visualmente y expórtalas como archivos CSV.", href: "/tools/generador-csv", icon: Table, category: "Utilidades" },
]


export const metadata: Metadata = generateToolMetadata({
  title: "40 Herramientas de Seguridad y Desarrollo Gratuitas",
  description: "Accede a nuestras 40 herramientas gratuitas: seguridad, privacidad, desarrollo y utilidades. Generador de contraseñas, verificador de filtraciones, conversor Base64, validador JSON, formateador SQL, generador TOTP y mucho más.",
  slug: "tools",
  image: "https://tecnocrypter.com/seo/tools.webp",
  keywords: ["herramientas seguridad", "generador contraseñas", "limpiador metadatos", "verificador seguridad", "ciberseguridad gratuita", "base64", "json validator", "uuid generator", "jwt decoder", "regex tester", "conversor colores", "formateador sql", "generador totp", "passphrase", "minificador css"]
})

// FAQ específicas para tools
const toolsFaqs = [
  {
    question: "¿Las herramientas son completamente gratuitas?",
    answer: "Sí, todas nuestras herramientas básicas son completamente gratuitas y no requieren registro. Algunas funciones avanzadas pueden requerir una cuenta premium, pero las funcionalidades principales están disponibles sin costo."
  },
  {
    question: "¿Mis datos se almacenan en sus servidores?",
    answer: "No, la mayoría de nuestras herramientas procesan los datos localmente en tu navegador por seguridad. Los datos no se envían a nuestros servidores, garantizando tu privacidad y confidencialidad."
  },
  {
    question: "¿Puedo usar las herramientas sin conexión a internet?",
    answer: "Algunas herramientas como el generador de contraseñas funcionan completamente offline una vez cargadas. Otras que requieren verificaciones en tiempo real necesitan conexión a internet."
  },
  {
    question: "¿Con qué frecuencia actualizan las herramientas?",
    answer: "Actualizamos nuestras herramientas regularmente para mejorar la seguridad, agregar nuevas funciones y corregir errores. Las actualizaciones se implementan automáticamente sin interrumpir tu experiencia."
  },
  {
    question: "¿Puedo integrar estas herramientas en mi sitio web?",
    answer: "Ofrecemos APIs y widgets embebibles para algunas de nuestras herramientas. Contacta con nuestro equipo técnico para conocer las opciones de integración disponibles."
  },
  {
    question: "¿Las herramientas son seguras para uso empresarial?",
    answer: "Sí, nuestras herramientas están diseñadas con estándares de seguridad empresarial. Ofrecemos versiones premium con funciones adicionales de auditoría y cumplimiento para entornos corporativos."
  }
]


export default function ToolsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Herramientas de Seguridad Digital",
    description: "Colección de herramientas gratuitas de ciberseguridad y privacidad online.",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      description: tool.description,
      url: `https://tecnocrypter.com${tool.href}`,
    })),
  }

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://tecnocrypter.com" },
          { name: "Herramientas", url: "https://tecnocrypter.com/tools" },
        ]}
      />
      <FAQStructuredData faqs={toolsFaqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Herramientas de Seguridad</h1>
            <p className="text-xl text-muted-foreground">
              Utiliza nuestras herramientas gratuitas para mejorar tu seguridad digital y proteger tu información.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tools.map((tool) => {
              const IconComponent = tool.icon
              return (
                <Card key={tool.href} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={tool.href}>
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        Usar Herramienta
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-muted/50 rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">¿Necesitas más herramientas?</h2>
              <p className="text-muted-foreground mb-6">
                Estamos constantemente desarrollando nuevas herramientas de seguridad. 
                Síguenos para estar al día con las últimas incorporaciones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contacto">
                  <Button variant="outline">
                    Sugerir Herramienta
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button>
                    Ver Blog de Seguridad
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <ReusableFaqSection 
          title="Preguntas Frecuentes sobre Herramientas"
          description="Respuestas a las preguntas más comunes sobre nuestras herramientas de seguridad."
          faqs={toolsFaqs}
        />
      </main>
    </>
  )
}