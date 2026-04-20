"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import {
  Moon, Sun, Menu, X, Search, Phone, ChevronDown,
  Key, KeyRound, FileCheck, Shield, QrCode, Lock, Binary, Type,
  GitCompare, Hash, FileCode2, Hexagon, ShieldCheck, Clock, Braces, Fingerprint,
  FileKey2, Link2, Palette, SearchCode, AlignLeft, Code2,
  Timer, Gauge, Mail, KeySquare, Unlink, UserRound, EyeOff, FileText,
  Globe, ScanLine, AtSign, BookOpen, Database, CalendarClock, Minimize2,
  Ruler, Percent, Table
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SearchDropdown } from "@/components/ui/search-dropdown"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import Image from "next/image"

interface ToolDef {
  slug: string
  icon: typeof Shield
}

interface ToolCategoryDef {
  key: string
  icon: typeof Shield
  items: ToolDef[]
}

const toolCategoryDefs: ToolCategoryDef[] = [
  {
    key: "security",
    icon: Shield,
    items: [
      { slug: "generador-contrasenas", icon: Key },
      { slug: "cifrado-online", icon: Lock },
      { slug: "generador-hash", icon: Hash },
      { slug: "verificador", icon: Shield },
      { slug: "verificador-contrasenas", icon: ShieldCheck },
      { slug: "decodificador-jwt", icon: FileKey2 },
      { slug: "generador-totp", icon: Timer },
      { slug: "calculadora-entropia", icon: Gauge },
      { slug: "analizador-email", icon: Mail },
      { slug: "generador-claves", icon: KeySquare },
    ],
  },
  {
    key: "privacy",
    icon: Lock,
    items: [
      { slug: "generador-credenciales", icon: KeyRound },
      { slug: "limpia-metadatos", icon: FileCheck },
      { slug: "eliminador-rastreo", icon: Unlink },
      { slug: "generador-datos", icon: UserRound },
      { slug: "ofuscador-texto", icon: EyeOff },
      { slug: "analizador-cookies", icon: FileText },
      { slug: "generador-useragent", icon: Globe },
      { slug: "huella-digital", icon: ScanLine },
      { slug: "generador-alias", icon: AtSign },
      { slug: "generador-passphrase", icon: BookOpen },
    ],
  },
  {
    key: "development",
    icon: Braces,
    items: [
      { slug: "codificador-base32", icon: Binary },
      { slug: "conversor-base64", icon: FileCode2 },
      { slug: "conversor-hex", icon: Hexagon },
      { slug: "validador-json", icon: Braces },
      { slug: "generador-uuid", icon: Fingerprint },
      { slug: "codificador-url", icon: Link2 },
      { slug: "regex-tester", icon: SearchCode },
      { slug: "formateador-sql", icon: Database },
      { slug: "generador-cron", icon: CalendarClock },
      { slug: "minificador-css", icon: Minimize2 },
    ],
  },
  {
    key: "utilities",
    icon: QrCode,
    items: [
      { slug: "generador-qr", icon: QrCode },
      { slug: "contador-caracteres", icon: Type },
      { slug: "generador-lorem", icon: AlignLeft },
      { slug: "comparador-archivos", icon: GitCompare },
      { slug: "conversor-colores", icon: Palette },
      { slug: "conversor-markdown", icon: Code2 },
      { slug: "conversor-timestamp", icon: Clock },
      { slug: "conversor-unidades", icon: Ruler },
      { slug: "calculadora-porcentajes", icon: Percent },
      { slug: "generador-csv", icon: Table },
    ],
  },
]

const navigationDefs = [
  { key: "blog", href: "/blog" },
  { key: "store", href: "/productos" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const tNav = useTranslations("nav")
  const tCat = useTranslations("toolCategories")
  const tTools = useTranslations("tools")

  const isToolsActive = pathname.startsWith("/tools")

  const totalTools = toolCategoryDefs.reduce((sum, c) => sum + c.items.length, 0)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/30 backdrop-blur supports-[backdrop-filter]:bg-background/20">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 sm:space-x-4 group shrink-0">
          <Image
            src="/Tecno.svg"
            alt="TecnoCrypter Logo"
            width={70}
            height={70}
            className="h-10 w-10 sm:h-[70px] sm:w-[70px] transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-base sm:text-xl font-bold hidden xs:inline">
            Tecno<span className="text-primary">Crypter</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationDefs.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname.startsWith(item.href) ? "text-primary" : ""
              }`}
            >
              {tNav(item.key)}
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
            {tNav("tools")}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${isMegaOpen ? "rotate-180" : ""}`}
            />
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
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
            <span className="sr-only">{tNav("toggleTheme")}</span>
          </Button>

          <LanguageSwitcher />

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
            <div className="w-full max-w-[900px] mx-4 rounded-xl border bg-background/95 backdrop-blur-lg shadow-2xl shadow-primary/5 p-5 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {toolCategoryDefs.map((cat) => {
                  const CatIcon = cat.icon
                  return (
                    <div key={cat.key}>
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
                        <CatIcon className="h-4 w-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          {tCat(cat.key)}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        {cat.items.map((tool) => {
                          const ToolIcon = tool.icon
                          const href = `/tools/${tool.slug}`
                          return (
                            <Link
                              key={href}
                              href={href}
                              onClick={() => setIsMegaOpen(false)}
                              className={`group/item flex items-start gap-2.5 rounded-lg p-2 transition-colors hover:bg-primary/5 ${
                                pathname === href ? "bg-primary/10" : ""
                              }`}
                            >
                              <ToolIcon className="h-4 w-4 text-muted-foreground group-hover/item:text-primary mt-0.5 shrink-0 transition-colors" />
                              <div className="min-w-0">
                                <div className="text-sm font-medium leading-tight group-hover/item:text-primary transition-colors truncate">
                                  {tTools(`${tool.slug}.name`)}
                                </div>
                                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5 line-clamp-1">
                                  {tTools(`${tool.slug}.description`)}
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
                  {tNav("freeToolsCount", { count: totalTools })}
                </span>
                <Link
                  href="/tools"
                  onClick={() => setIsMegaOpen(false)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  {tNav("viewAllTools")} →
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
            <SearchDropdown className="w-full" placeholder={tNav("searchPlaceholder")} />
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
            className="border-t md:hidden"
          >
            <nav className="container py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain">
              {navigationDefs.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 ${
                    pathname.startsWith(item.href) ? "text-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {tNav(item.key)}
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
                  {tNav("tools")}
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
                        {toolCategoryDefs.map((cat) => {
                          const CatIcon = cat.icon
                          return (
                            <div key={cat.key}>
                              <div className="flex items-center gap-2 px-3 py-1.5">
                                <CatIcon className="h-3.5 w-3.5 text-primary" />
                                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                                  {tCat(cat.key)}
                                </span>
                              </div>
                              <div className="space-y-0.5">
                                {cat.items.map((tool) => {
                                  const ToolIcon = tool.icon
                                  const href = `/tools/${tool.slug}`
                                  return (
                                    <Link
                                      key={href}
                                      href={href}
                                      className={`flex items-center gap-2.5 py-2 px-4 ml-2 rounded-lg text-sm transition-colors hover:text-primary hover:bg-primary/5 ${
                                        pathname === href ? "text-primary bg-primary/10" : ""
                                      }`}
                                      onClick={() => { setIsMenuOpen(false); setMobileToolsOpen(false) }}
                                    >
                                      <ToolIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                                      <span className="truncate">{tTools(`${tool.slug}.name`)}</span>
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
                          {tNav("viewAllTools")}
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
                {tNav("contact")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
