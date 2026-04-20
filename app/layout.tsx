import type React from "react"
import { Orbitron, Space_Grotesk } from "next/font/google"
import "./globals.css"

const orbitron = Orbitron({ 
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron"
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk"
})

// Root layout — locale-unaware shell.
// All locale-specific content lives in app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${orbitron.variable} ${spaceGrotesk.variable} font-space-grotesk`}>
        {children}
      </body>
    </html>
  )
}
