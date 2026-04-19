"use client"

import { useEffect, useRef } from "react"

interface AdSenseAdProps {
  slot: string
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical"
  responsive?: boolean
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export function AdSenseAd({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      // AdSense not loaded or blocked
    }
  }, [])

  return (
    <div className={`ad-container my-4 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9286345048405462"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  )
}
