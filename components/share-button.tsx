'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

interface ShareButtonProps {
  title: string
  text: string
  url: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && !!navigator.share)
  }, [])

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
      } catch (error) {
        // Usuario canceló o error
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copiar al portapapeles
      handleCopyLink()
    }
  }

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        toast.success('Enlace copiado al portapapeles')
        setTimeout(() => setCopied(false), 2000)
      } else {
        toast.error('Función de copiar no disponible')
      }
    } catch (error) {
      toast.error('Error al copiar el enlace')
    }
  }

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  }

  const openShareWindow = (shareUrl: string) => {
    if (typeof window !== 'undefined') {
      window.open(
        shareUrl,
        'share-dialog',
        'width=600,height=400,resizable=yes,scrollbars=yes'
      )
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Compartir
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {canShare && (
          <DropdownMenuItem onClick={handleNativeShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Compartir...
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={() => openShareWindow(shareUrls.twitter)}>
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => openShareWindow(shareUrls.facebook)}>
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => openShareWindow(shareUrls.linkedin)}>
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleCopyLink}>
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-green-600" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? 'Copiado!' : 'Copiar enlace'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}