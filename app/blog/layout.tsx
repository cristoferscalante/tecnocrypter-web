import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | TecnoCrypter Blog",
    default: "Blog | TecnoCrypter"
  },
  description: "Artículos sobre seguridad cibernética, encriptación y criptomonedas. Mantente actualizado con las últimas tendencias y mejores prácticas en el mundo de la tecnología y la seguridad digital.",
  keywords: ["seguridad cibernética", "encriptación", "criptomonedas", "blockchain", "privacidad digital", "tecnología"],
  authors: [{ name: "TecnoCrypter Team" }],
  openGraph: {
    title: "Blog de Seguridad y Criptomonedas | TecnoCrypter",
    description: "Artículos, guías y noticias sobre seguridad cibernética, encriptación y el mundo crypto.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Seguridad y Criptomonedas | TecnoCrypter",
    description: "Artículos, guías y noticias sobre seguridad cibernética, encriptación y el mundo crypto.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}