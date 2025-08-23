"use client"

import { useState, useRef, useEffect } from 'react'
import { Search, X, FileText, Package, Globe, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useGlobalSearch } from '@/hooks/use-global-search'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface SearchDropdownProps {
  className?: string
  placeholder?: string
}

const typeIcons = {
  blog: FileText,
  product: Package,
  page: Globe
}

const typeLabels = {
  blog: 'Blog',
  product: 'Producto',
  page: 'Página'
}

const categoryColors = {
  seguridad: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  herramientas: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  encriptacion: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  criptomonedas: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  noticias: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
  general: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
  legal: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
}

export function SearchDropdown({ className, placeholder = "Buscar artículos, productos..." }: SearchDropdownProps) {
  const {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
    clearSearch
  } = useGlobalSearch()
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Manejar navegación con teclado
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen || results.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : results.length - 1
          )
          break
        case 'Enter':
          event.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            const result = results[selectedIndex]
            window.location.href = result.url
          }
          break
        case 'Escape':
          setIsOpen(false)
          setSelectedIndex(-1)
          inputRef.current?.blur()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSelectedIndex(-1)
  }

  const handleClear = () => {
    clearSearch()
    inputRef.current?.focus()
  }

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="pl-10 pr-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Dropdown de resultados */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-sm text-muted-foreground">Buscando...</span>
            </div>
          )}

          {!isLoading && results.length === 0 && query.length >= 2 && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No se encontraron resultados para "{query}"
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => {
                const Icon = typeIcons[result.type]
                const isSelected = index === selectedIndex
                
                return (
                  <Link
                    key={`${result.type}-${result.id}`}
                    href={result.url}
                    onClick={() => {
                      setIsOpen(false)
                      clearSearch()
                    }}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-l-2 border-transparent",
                      isSelected && "bg-muted/50 border-l-primary"
                    )}
                  >
                    {result.image ? (
                      <div className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={result.image}
                          alt={result.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">
                          {result.title}
                        </h4>
                        <Badge 
                          variant="secondary" 
                          className="text-xs flex-shrink-0"
                        >
                          {typeLabels[result.type]}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-1" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                        {result.excerpt}
                      </p>
                      
                      {result.category && (
                        <Badge 
                          className={cn(
                            "text-xs",
                            categoryColors[result.category as keyof typeof categoryColors] || categoryColors.general
                          )}
                        >
                          {result.category}
                        </Badge>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}