import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { MotionProvider } from "@/components/providers/motion-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MatrixBackground } from "@/components/ui/matrix-background"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TecnoCrypter - CriptoSecure | Seguridad Cibernética y Encriptación",
  description:
    "Tu fuente confiable de información sobre seguridad cibernética, encriptación y criptomonedas. Productos seguros y análisis experto.",
  keywords: ["seguridad cibernética", "encriptación", "criptomonedas", "blockchain", "cybersecurity"],
  authors: [{ name: "V1TR0 Team" }],
    icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "TecnoCrypter - CriptoSecure",
    description: "Seguridad cibernética y encriptación de vanguardia",
    type: "website",
    locale: "es_ES",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <div className="relative flex min-h-screen flex-col">
              <MatrixBackground />
              <Header />
              <main className="flex-1 relative z-10">{children}</main>
              <Footer />
              <Toaster />
            </div>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
