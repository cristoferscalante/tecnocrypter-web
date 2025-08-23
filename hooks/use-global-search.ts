import { useState, useEffect, useCallback } from 'react'
import { useDebounce } from './use-debounce'

interface SearchResult {
  id: string
  title: string
  excerpt: string
  type: 'blog' | 'product' | 'page'
  url: string
  image?: string
  category?: string
}

interface SearchResponse {
  results: SearchResult[]
  query: string
}

interface UseGlobalSearchReturn {
  query: string
  setQuery: (query: string) => void
  results: SearchResult[]
  isLoading: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  clearSearch: () => void
}

export function useGlobalSearch(): UseGlobalSearchReturn {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  // Debounce la consulta para evitar demasiadas peticiones
  const debouncedQuery = useDebounce(query, 300)

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      
      if (!response.ok) {
        throw new Error('Error en la búsqueda')
      }
      
      const data: SearchResponse = await response.json()
      setResults(data.results)
    } catch (error) {
      console.error('Error al buscar:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Ejecutar búsqueda cuando cambie la query debounced
  useEffect(() => {
    performSearch(debouncedQuery)
  }, [debouncedQuery, performSearch])

  // Abrir dropdown cuando hay query y cerrar cuando está vacía
  useEffect(() => {
    if (query.trim().length >= 2) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
      setResults([])
    }
  }, [query])

  const clearSearch = useCallback(() => {
    setQuery('')
    setResults([])
    setIsOpen(false)
  }, [])

  const handleSetQuery = useCallback((newQuery: string) => {
    setQuery(newQuery)
  }, [])

  const handleSetIsOpen = useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // No limpiar la query al cerrar para mantener el texto
    }
  }, [])

  return {
    query,
    setQuery: handleSetQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen: handleSetIsOpen,
    clearSearch
  }
}