"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/ui/animated-section"
import {
  Key, KeyRound, ArrowRight, Shield, QrCode, Lock, Binary, Type,
  GitCompare, Hash, FileCheck, FileCode2, Hexagon, ShieldCheck,
  Clock, Braces, Fingerprint
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Category = "Todas" | "Seguridad" | "Privacidad" | "Desarrollo" | "Utilidades"

interface Tool {
  icon: typeof Shield
  title: string
  description: string
  href: string
  category: Category
  isNew?: boolean
}

const categories: { label: Category; icon: typeof Shield }[] = [
  { label: "Todas", icon: Shield },
  { label: "Seguridad", icon: Lock },
  { label: "Privacidad", icon: ShieldCheck },
  { label: "Desarrollo", icon: Braces },
  { label: "Utilidades", icon: FileCode2 },
]

const tools: Tool[] = [
  {
    icon: Key,
    title: "Generador de Contraseñas",
    description: "Crea contraseñas seguras y personalizables con validadores de fortaleza.",
    href: "/tools/generador-contrasenas",
    category: "Seguridad",
  },
  {
    icon: KeyRound,
    title: "Credenciales Determinísticas",
    description: "Usuarios y contraseñas reproducibles desde una palabra clave maestra.",
    href: "/tools/generador-credenciales",
    category: "Privacidad",
  },
  {
    icon: FileCheck,
    title: "Limpiador de Metadatos",
    description: "Elimina EXIF, GPS y datos ocultos de tus imágenes.",
    href: "/tools/limpia-metadatos",
    category: "Privacidad",
  },
  {
    icon: Shield,
    title: "Verificador de URL",
    description: "Analiza la seguridad de URLs y detecta amenazas.",
    href: "/tools/verificador",
    category: "Seguridad",
  },
  {
    icon: Lock,
    title: "Cifrado Online",
    description: "Cifra y descifra con AES-256, ChaCha20 y más algoritmos.",
    href: "/tools/cifrado-online",
    category: "Seguridad",
  },
  {
    icon: Hash,
    title: "Generador de Hash",
    description: "MD5, SHA-1, SHA-256, SHA-512 de texto y archivos.",
    href: "/tools/generador-hash",
    category: "Seguridad",
  },
  {
    icon: QrCode,
    title: "Generador de QR",
    description: "Códigos QR personalizados con colores, tamaño y logo.",
    href: "/tools/generador-qr",
    category: "Utilidades",
  },
  {
    icon: Binary,
    title: "Codificador Base32",
    description: "Base32, Base32Hex, z-base-32 y Crockford.",
    href: "/tools/codificador-base32",
    category: "Desarrollo",
  },
  {
    icon: GitCompare,
    title: "Comparador de Archivos",
    description: "Diff viewer línea por línea con resaltado visual.",
    href: "/tools/comparador-archivos",
    category: "Desarrollo",
  },
  {
    icon: Type,
    title: "Contador de Caracteres",
    description: "Cuenta caracteres, palabras y límites de redes sociales.",
    href: "/tools/contador-caracteres",
    category: "Utilidades",
  },
  {
    icon: FileCode2,
    title: "Conversor Base64",
    description: "Codifica y decodifica texto, archivos e imágenes en Base64.",
    href: "/tools/conversor-base64",
    category: "Desarrollo",
    isNew: true,
  },
  {
    icon: Hexagon,
    title: "Conversor Hexadecimal",
    description: "Convierte entre texto, hex, decimal, binario y RGB.",
    href: "/tools/conversor-hex",
    category: "Desarrollo",
    isNew: true,
  },
  {
    icon: ShieldCheck,
    title: "Verificador de Contraseñas",
    description: "Comprueba si tu contraseña ha sido filtrada en brechas de datos.",
    href: "/tools/verificador-contrasenas",
    category: "Seguridad",
    isNew: true,
  },
  {
    icon: Clock,
    title: "Conversor Timestamp",
    description: "Unix timestamp ↔ fecha legible con zonas horarias.",
    href: "/tools/conversor-timestamp",
    category: "Desarrollo",
    isNew: true,
  },
  {
    icon: Braces,
    title: "Validador JSON",
    description: "Valida, formatea y minifica JSON con árbol visual.",
    href: "/tools/validador-json",
    category: "Desarrollo",
    isNew: true,
  },
  {
    icon: Fingerprint,
    title: "Generador UUID",
    description: "UUID v4, v7, ULID y nanoid con generación en lote.",
    href: "/tools/generador-uuid",
    category: "Desarrollo",
    isNew: true,
  },
]

export function ToolsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todas")

  const filtered = activeCategory === "Todas"
    ? tools
    : tools.filter((t) => t.category === activeCategory)

  return (
    <section className="py-24 bg-gradient-to-b from-background/5 to-background/10">
      <div className="container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              whileHover={{
                scale: 1.2,
                rotate: [0, -15, 15, 0],
                filter: "drop-shadow(0 0 10px hsl(var(--primary)))"
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold font-orbitron">
              Herramientas de Seguridad
            </h2>
          </div>
          <p className="text-xl text-muted-foreground">
            {tools.length} herramientas gratuitas que funcionan 100% en tu navegador. Sin enviar datos al servidor.
          </p>
        </AnimatedSection>

        {/* Category filters */}
        <AnimatedSection delay={0.1} className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const CatIcon = cat.icon
            const count = cat.label === "Todas" ? tools.length : tools.filter(t => t.category === cat.label).length
            return (
              <motion.button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat.label
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                    : "bg-background/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CatIcon className="h-4 w-4" />
                {cat.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.label
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {count}
                </span>
              </motion.button>
            )
          })}
        </AnimatedSection>

        {/* Tools grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tool) => {
              const IconComponent = tool.icon
              return (
                <motion.div
                  key={tool.href}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={tool.href} className="group block h-full">
                    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.02] border hover:border-primary/30 flex flex-col relative overflow-hidden">
                      {tool.isNew && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow-sm">
                            Nuevo
                          </span>
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3 mb-2">
                          <motion.div
                            className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <IconComponent className="h-5 w-5 text-primary" />
                          </motion.div>
                          <div className="min-w-0">
                            <CardTitle className="text-base leading-tight group-hover:text-primary transition-colors">
                              {tool.title}
                            </CardTitle>
                          </div>
                        </div>
                        <CardDescription className="text-sm line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 mt-auto">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {tool.category}
                          </span>
                          <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            Usar
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Button asChild size="lg" className="group/btn">
            <Link href="/tools">
              Ver Todas las Herramientas
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}