import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { MotionProvider } from "@/components/providers/motion-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MatrixBackground } from "@/components/ui/matrix-background"
import { Toaster } from "@/components/ui/sonner"
import { StructuredData } from "@/components/seo/structured-data"
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

export const metadata: Metadata = {
  title: {
    default: "TecnoCrypter - Ciberseguridad y Criptomonedas",
    template: "%s | TecnoCrypter"
  },
  description:
    "Plataforma líder en ciberseguridad, encriptación y tecnología blockchain. Productos seguros, herramientas de privacidad y las últimas noticias en criptomonedas.",
  keywords: ["ciberseguridad", "encriptación", "criptomonedas", "blockchain", "cybersecurity", "bitcoin", "ethereum", "privacidad", "seguridad digital"],
  authors: [{ name: "TecnoCrypter Team" }],
  creator: "TecnoCrypter",
  publisher: "TecnoCrypter",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://tecnocrypter.com",
    siteName: "TecnoCrypter",
    title: "TecnoCrypter - Ciberseguridad y Criptomonedas",
    description: "Plataforma líder en ciberseguridad, encriptación y tecnología blockchain. Productos seguros, herramientas de privacidad y las últimas noticias en criptomonedas.",
    images: [
      {
        url: "https://tecnocrypter.com/hero.png",
        width: 1200,
        height: 630,
        alt: "TecnoCrypter - Ciberseguridad y Criptomonedas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TecnoCrypter - Ciberseguridad y Criptomonedas",
    description: "Plataforma líder en ciberseguridad, encriptación y tecnología blockchain.",
    creator: "@tecnocrypter",
    images: ["https://tecnocrypter.com/hero.png"],
  },
  alternates: {
    canonical: "https://tecnocrypter.com",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <StructuredData type="website" />
        <StructuredData type="organization" />
      </head>
      <body className={`${orbitron.variable} ${spaceGrotesk.variable} font-space-grotesk`}>
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
