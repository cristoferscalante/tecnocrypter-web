"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, Search, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { SearchDropdown } from "@/components/ui/search-dropdown"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: "Blog", href: "/blog" },
    { name: "Productos", href: "/productos" },
  ]

  const toolsItems = [
    { name: "Generador de Contraseñas", href: "/tools/generador-contrasenas" },
    { name: "Limpiador de Metadatos", href: "/tools/limpia-metadatos" },
    { name: "Verificador de URL", href: "/tools/verificador" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/30 backdrop-blur supports-[backdrop-filter]:bg-background/20 relative">
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
            <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.name}
            </Link>
          ))}
          
          {/* Tools Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium transition-colors hover:text-primary bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent [&>svg]:hidden h-auto p-0">
                  Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[200px] gap-1 p-2">
                    {toolsItems.map((tool) => (
                      <NavigationMenuLink key={tool.name} asChild>
                        <Link
                          href={tool.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{tool.name}</div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search - Desktop */}
          <div className="hidden md:block">
            <SearchDropdown className="w-80" />
          </div>

          {/* Contacto icono*/}
          <Link href="/contacto">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Phone className="h-4 w-4" />
            </Button>
          </Link>

          {/* Search - Mobile Toggle */}
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="md:hidden">
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

      {/* Search Bar - Mobile */}
      {isSearchOpen && (
        <div className="border-t p-4 md:hidden">
          <div className="container">
            <SearchDropdown className="w-full" placeholder="Buscar artículos, productos..." />
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
            
            {/* Tools section for mobile */}
            <div className="py-2">
              <div className="text-sm font-medium text-muted-foreground mb-2">Tools</div>
              {toolsItems.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="block py-2 pl-4 text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
