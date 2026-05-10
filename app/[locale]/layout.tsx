import type React from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { MotionProvider } from "@/components/providers/motion-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MatrixBackground } from "@/components/ui/matrix-background"
import { Toaster } from "@/components/ui/sonner"
import { StructuredData } from "@/components/seo/structured-data"
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"

const INDEXABLE_LOCALES = new Set(["es"])
const DEFAULT_META = {
  title: "TecnoCrypter - Ciberseguridad y Criptomonedas",
  description: "Plataforma de ciberseguridad, encriptación y tecnología blockchain con guías, herramientas gratuitas y recursos de privacidad digital.",
  keywords: "ciberseguridad, encriptación, criptomonedas, blockchain, privacidad, seguridad digital",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const shouldIndex = INDEXABLE_LOCALES.has(locale);
  const t = shouldIndex ? await getTranslations({ locale, namespace: "meta" }) : null;
  const meta = {
    title: t ? t("title") : DEFAULT_META.title,
    description: t ? t("description") : DEFAULT_META.description,
    keywords: t ? t("keywords") : DEFAULT_META.keywords,
  };

  return {
    title: {
      default: meta.title,
      template: "%s | TecnoCrypter"
    },
    description: meta.description,
    keywords: meta.keywords.split(", "),
    authors: [{ name: "TecnoCrypter Team" }],
    creator: "TecnoCrypter",
    publisher: "TecnoCrypter",
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
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
      locale: locale,
      url: "https://tecnocrypter.com",
      siteName: "TecnoCrypter",
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: "https://tecnocrypter.com/images/hero.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      creator: "@tecnocrypter",
      images: ["https://tecnocrypter.com/images/hero.png"],
    },
    metadataBase: new URL("https://tecnocrypter.com"),
    alternates: {
      canonical: locale === "es" ? "/" : "/",
      languages: {
        "es": "/",
      },
    },
    category: "technology",
    other: {
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  // Load all messages for the current locale
  const messages = await getMessages()

  return (
    <>
      <head>
        <meta name="google-adsense-account" content="ca-pub-9286345048405462" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9286345048405462"
          crossOrigin="anonymous"
        />
        <StructuredData type="website" />
        <StructuredData type="organization" />
        <GoogleAnalytics />
      </head>
      <NextIntlClientProvider locale={locale} messages={messages}>
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
      </NextIntlClientProvider>
    </>
  )
}
