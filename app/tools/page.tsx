import type { Metadata } from "next"
import { generateToolMetadata } from "@/lib/metadata"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Shield, Key, FileCheck, ArrowRight, QrCode, Lock, Binary, Type, KeyRound,
  GitCompare, Hash, FileCode2, Hexagon, ShieldCheck, Clock, Braces, Fingerprint,
  FileKey2, Link2, Palette, SearchCode, AlignLeft, Code2
} from "lucide-react"
import { ReusableFaqSection } from "@/components/sections/reusable-faq-section"
import { FAQStructuredData, BreadcrumbStructuredData } from "@/components/seo/structured-data"


const tools = [
  {
    title: "Generador de Contraseñas",
    description: "Genera contraseñas seguras y personalizables con diferentes niveles de complejidad.",
    href: "/tools/generador-contrasenas",
    icon: Key,
    category: "Seguridad"
  },
  {
    title: "Generador de Credenciales Determinísticas",
    description: "Crea usuarios y contraseñas determinísticas desde una palabra clave maestra, todo en tu navegador.",
    href: "/tools/generador-credenciales",
    icon: KeyRound,
    category: "Privacidad"
  },
  {
    title: "Limpiador de Metadatos",
    description: "Elimina metadatos sensibles de tus archivos para proteger tu privacidad.",
    href: "/tools/limpia-metadatos",
    icon: FileCheck,
    category: "Privacidad"
  },
  {
    title: "Verificador de URL",
    description: "Analiza y verifica la seguridad de URLs y detecta posibles amenazas antes de visitarlas.",
    href: "/tools/verificador",
    icon: Shield,
    category: "Análisis"
  },
  {
    title: "Generador de Hash",
    description: "Calcula hashes (MD5, SHA-1, SHA-256, etc.) de texto y archivos totalmente en tu navegador.",
    href: "/tools/generador-hash",
    icon: Hash,
    category: "Seguridad"
  },
  {
    title: "Generador de Códigos QR",
    description: "Crea códigos QR personalizados para enlaces, textos y contactos con opciones de personalización.",
    href: "/tools/generador-qr",
    icon: QrCode,
    category: "Utilidades"
  },
  {
    title: "Cifrado Online",
    description: "Cifra y descifra mensajes con una clave compartida. Todo el proceso se realiza en tu navegador.",
    href: "/tools/cifrado-online",
    icon: Lock,
    category: "Seguridad"
  },
  {
    title: "Codificador Base32",
    description: "Codifica y decodifica texto y archivos en Base32 con múltiples variantes y opciones avanzadas.",
    href: "/tools/codificador-base32",
    icon: Binary,
    category: "Codificación"
  },
  {
    title: "Comparador de Archivos y Texto (Diff Viewer)",
    description: "Compara líneas entre dos textos o archivos. Vista dividida, ignorar espacios y exportar patch.",
    href: "/tools/comparador-archivos",
    icon: GitCompare,
    category: "Utilidades"
  },
  {
    title: "Contador de Caracteres",
    description: "Cuenta caracteres, palabras y analiza tu texto en tiempo real. Perfecto para redes sociales y SEO.",
    href: "/tools/contador-caracteres",
    icon: Type,
    category: "Análisis"
  },
  {
    title: "Conversor Base64",
    description: "Codifica y decodifica texto, archivos e imágenes en Base64. Convierte imágenes a Data URI.",
    href: "/tools/conversor-base64",
    icon: FileCode2,
    category: "Codificación"
  },
  {
    title: "Conversor Hexadecimal",
    description: "Convierte entre texto, hexadecimal, decimal, binario y colores RGB.",
    href: "/tools/conversor-hex",
    icon: Hexagon,
    category: "Codificación"
  },
  {
    title: "Verificador de Contraseñas Filtradas",
    description: "Comprueba si tu contraseña ha sido expuesta en filtraciones de datos usando Have I Been Pwned.",
    href: "/tools/verificador-contrasenas",
    icon: ShieldCheck,
    category: "Seguridad"
  },
  {
    title: "Conversor Unix Timestamp",
    description: "Convierte entre Unix timestamp y fecha legible con soporte de zonas horarias.",
    href: "/tools/conversor-timestamp",
    icon: Clock,
    category: "Utilidades"
  },
  {
    title: "Validador y Formateador JSON",
    description: "Valida, formatea y minifica JSON con vista de árbol interactiva.",
    href: "/tools/validador-json",
    icon: Braces,
    category: "Desarrollo"
  },
  {
    title: "Generador UUID, ULID y Nano ID",
    description: "Genera identificadores únicos UUID v4, UUID v7, ULID y Nano ID con generación en lote.",
    href: "/tools/generador-uuid",
    icon: Fingerprint,
    category: "Desarrollo"
  },
  {
    title: "Decodificador JWT",
    description: "Decodifica y analiza tokens JWT: visualiza header, payload y firma sin necesidad de la clave secreta.",
    href: "/tools/decodificador-jwt",
    icon: FileKey2,
    category: "Seguridad"
  },
  {
    title: "Codificador URL",
    description: "Codifica y decodifica URLs con encodeURIComponent y encodeURI. Ideal para APIs y query strings.",
    href: "/tools/codificador-url",
    icon: Link2,
    category: "Desarrollo"
  },
  {
    title: "Conversor de Colores",
    description: "Convierte entre HEX, RGB, HSL y RGBA con color picker visual y valores CSS/Tailwind.",
    href: "/tools/conversor-colores",
    icon: Palette,
    category: "Desarrollo"
  },
  {
    title: "Regex Tester",
    description: "Prueba expresiones regulares en tiempo real con resaltado de coincidencias y grupos de captura.",
    href: "/tools/regex-tester",
    icon: SearchCode,
    category: "Desarrollo"
  },
  {
    title: "Generador Lorem Ipsum",
    description: "Genera texto placeholder configurable: párrafos, oraciones o palabras para diseño y maquetación.",
    href: "/tools/generador-lorem",
    icon: AlignLeft,
    category: "Utilidades"
  },
  {
    title: "Conversor Markdown",
    description: "Convierte entre Markdown y HTML en tiempo real con vista previa y soporte completo de sintaxis.",
    href: "/tools/conversor-markdown",
    icon: Code2,
    category: "Desarrollo"
  }
]


export const metadata: Metadata = generateToolMetadata({
  title: "Herramientas de Seguridad Digital",
  description: "Accede a nuestras 22 herramientas gratuitas de seguridad digital: generador de contraseñas, verificador de filtraciones, conversor Base64, validador JSON, decodificador JWT, regex tester y más.",
  slug: "tools",
  image: "https://tecnocrypter.com/seo/tools.webp",
  keywords: ["herramientas seguridad", "generador contraseñas", "limpiador metadatos", "verificador seguridad", "ciberseguridad gratuita", "base64", "json validator", "uuid generator", "jwt decoder", "regex tester", "conversor colores", "lorem ipsum"]
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