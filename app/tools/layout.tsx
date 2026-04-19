import type React from "react"
import Script from "next/script"

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9286345048405462"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      {children}
    </>
  )
}
