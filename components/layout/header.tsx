"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import {
  Moon, Sun, Menu, X, Search, Phone, ChevronDown,
  Key, KeyRound, FileCheck, Shield, QrCode, Lock, Binary, Type,
  GitCompare, Hash, FileCode2, Hexagon, ShieldCheck, Clock, Braces, Fingerprint
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SearchDropdown } from "@/components/ui/search-dropdown"
import Image from "next/image"

interface ToolItem {
  name: string
  href: string
  icon: typeof Shield
  description: string
}

interface ToolCategory {
  label: string
  icon: typeof Shield
  items: ToolItem[]
}

const toolCategories: ToolCategory[] = [
  {
    label: "Seguridad",
    icon: Shield,
    items: [
      { name: "Generador de Contraseñas", href: "/tools/generador-contrasenas", icon: Key, description: "Contraseñas seguras y personalizables" },
      { name: "Cifrado Online", href: "/tools/cifrado-online", icon: Lock, description: "AES-256, ChaCha20 y más" },
      { name: "Generador de Hash", href: "/tools/generador-hash", icon: Hash, description: "MD5, SHA-1, SHA-256, SHA-512" },
      { name: "Verificador de URL", href: "/tools/verificador", icon: Shield, description: "Detecta amenazas y phishing" },
      { name: "Verificador Contraseñas", href: "/tools/verificador-contrasenas", icon: ShieldCheck, description: "¿Ha sido filtrada tu contraseña?" },
    ],
  },
  {
    label: "Privacidad",
    icon: Lock,
    items: [
      { name: "Credenciales Determinísticas", href: "/tools/generador-credenciales", icon: KeyRound, description: "Desde una palabra clave maestra" },
      { name: "Limpiador de Metadatos", href: "/tools/limpia-metadatos", icon: FileCheck, description: "Elimina EXIF, GPS de imágenes" },
    ],
  },
  {
    label: "Desarrollo",
    icon: Braces,
    items: [
      { name: "Codificador Base32", href: "/tools/codificador-base32", icon: Binary, description: "Base32, Crockford y más" },
      { name: "Conversor Base64", href: "/tools/conversor-base64", icon: FileCode2, description: "Texto, archivos e imágenes" },
      { name: "Conversor Hexadecimal", href: "/tools/conversor-hex", icon: Hexagon, description: "Hex, decimal, binario, RGB" },
      { name: "Conversor Timestamp", href: "/tools/conversor-timestamp", icon: Clock, description: "Unix ↔ fecha con zonas horarias" },
      { name: "Validador JSON", href: "/tools/validador-json", icon: Braces, description: "Valida, formatea y minifica" },
      { name: "Generador UUID", href: "/tools/generador-uuid", icon: Fingerprint, description: "UUID v4, v7, ULID, Nano ID" },
    ],
  },
  {
    label: "Utilidades",
    icon: QrCode,
    items: [
      { name: "Generador QR", href: "/tools/generador-qr", icon: QrCode, description: "QR personalizados con logo" },
      { name: "Contador de Caracteres", href: "/tools/contador-caracteres", icon: Type, description: "Palabras, chars y límites" },
      { name: "Comparador de Archivos", href: "/tools/comparador-archivos", icon: GitCompare, description: "Diff viewer línea por línea" },
    ],
  },
]

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "Tienda", href: "/productos" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const isToolsActive = pathname.startsWith("/tools")

  return (
    <header className="sticky top-0 z-50 w-full bg-background/30 backdrop-blur supports-[backdrop-filter]:bg-background/20 relative">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-4 group">
          <Image
            src="/Tecno.svg"
            alt="TecnoCrypter Logo"
            width={70}
            height={70}
            className="h-[70px] w-[70px] transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-xl font-bold">
            Tecno<span className="text-primary">Crypter</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname.startsWith(item.href) ? "text-primary" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Mega menu trigger */}
          <button
            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
              isToolsActive ? "text-primary" : ""
            }`}
            onMouseEnter={() => setIsMegaOpen(true)}
            onClick={() => setIsMegaOpen((o) => !o)}
          >
            Herramientas
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${isMegaOpen ? "rotate-180" : ""}`}
            />
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <div className="hidden md:block">
            <SearchDropdown className="w-80" />
          </div>

          <Link href="/contacto">
            <Button variant="ghost" size="icon" className="hidden sm:flex group">
              <motion.div
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  filter: "drop-shadow(0 0 6px hsl(var(--primary)))"
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Phone className="h-4 w-4" />
              </motion.div>
            </Button>
          </Link>

          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="md:hidden group">
            <motion.div
              whileHover={{ scale: 1.2, rotate: [0, 360], filter: "drop-shadow(0 0 6px hsl(var(--primary)))" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Search className="h-4 w-4" />
            </motion.div>
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="group">
            <motion.div
              className="flex items-center justify-center"
              whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 6px hsl(var(--primary)))" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </motion.div>
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden group" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <motion.div
              whileHover={{ scale: 1.2, rotate: isMenuOpen ? [0, -90] : [0, 90], filter: "drop-shadow(0 0 6px hsl(var(--primary)))" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Mega menu panel - centered on screen */}
      <AnimatePresence>
        {isMegaOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-50 hidden md:flex justify-center pt-2"
            onMouseEnter={() => setIsMegaOpen(true)}
            onMouseLeave={() => setIsMegaOpen(false)}
          >
            <div className="w-full max-w-[780px] mx-4 rounded-xl border bg-background/95 backdrop-blur-lg shadow-2xl shadow-primary/5 p-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {toolCategories.map((cat) => {
                  const CatIcon = cat.icon
                  return (
                    <div key={cat.label}>
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
                        <CatIcon className="h-4 w-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          {cat.label}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        {cat.items.map((tool) => {
                          const ToolIcon = tool.icon
                          return (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              onClick={() => setIsMegaOpen(false)}
                              className={`group/item flex items-start gap-2.5 rounded-lg p-2 transition-colors hover:bg-primary/5 ${
                                pathname === tool.href ? "bg-primary/10" : ""
                              }`}
                            >
                              <ToolIcon className="h-4 w-4 text-muted-foreground group-hover/item:text-primary mt-0.5 shrink-0 transition-colors" />
                              <div className="min-w-0">
                                <div className="text-sm font-medium leading-tight group-hover/item:text-primary transition-colors truncate">
                                  {tool.name}
                                </div>
                                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5 line-clamp-1">
                                  {tool.description}
                                </div>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {toolCategories.reduce((sum, c) => sum + c.items.length, 0)} herramientas gratuitas
                </span>
                <Link
                  href="/tools"
                  onClick={() => setIsMegaOpen(false)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  Ver todas las herramientas →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar - Mobile */}
      {isSearchOpen && (
        <div className="border-t p-4 md:hidden">
          <div className="container">
            <SearchDropdown className="w-full" placeholder="Buscar artículos, productos..." />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t md:hidden overflow-hidden"
          >
            <nav className="container py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 ${
                    pathname.startsWith(item.href) ? "text-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Tools accordion */}
              <div>
                <button
                  onClick={() => setMobileToolsOpen((o) => !o)}
                  className={`flex items-center justify-between w-full py-2.5 px-3 rounded-lg text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 ${
                    isToolsActive ? "text-primary bg-primary/5" : ""
                  }`}
                >
                  Herramientas
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${mobileToolsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileToolsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1 pb-2 space-y-3">
                        {toolCategories.map((cat) => {
                          const CatIcon = cat.icon
                          return (
                            <div key={cat.label}>
                              <div className="flex items-center gap-2 px-3 py-1.5">
                                <CatIcon className="h-3.5 w-3.5 text-primary" />
                                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                                  {cat.label}
                                </span>
                              </div>
                              <div className="space-y-0.5">
                                {cat.items.map((tool) => {
                                  const ToolIcon = tool.icon
                                  return (
                                    <Link
                                      key={tool.href}
                                      href={tool.href}
                                      className={`flex items-center gap-2.5 py-2 px-4 ml-2 rounded-lg text-sm transition-colors hover:text-primary hover:bg-primary/5 ${
                                        pathname === tool.href ? "text-primary bg-primary/10" : ""
                                      }`}
                                      onClick={() => { setIsMenuOpen(false); setMobileToolsOpen(false) }}
                                    >
                                      <ToolIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                                      <span className="truncate">{tool.name}</span>
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                        <Link
                          href="/tools"
                          className="block text-center py-2.5 mx-3 rounded-lg text-sm font-medium text-primary border border-primary/30 hover:bg-primary/5 transition-colors"
                          onClick={() => { setIsMenuOpen(false); setMobileToolsOpen(false) }}
                        >
                          Ver todas las herramientas
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/contacto"
                className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 ${
                  pathname === "/contacto" ? "text-primary bg-primary/5" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
