"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, Shield, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Seguridad", href: "/seguridad" },
    { name: "Blog", href: "/blog" },
    { name: "Productos", href: "/productos" },
    { name: "Contacto", href: "/contacto" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">
            Tecno<span className="text-primary">Crypter</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="hidden sm:flex">
            <Search className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t p-4">
          <div className="container">
            <Input placeholder="Buscar artículos, productos..." className="max-w-md" autoFocus />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="container py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
