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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("title"),
      template: "%s | TecnoCrypter"
    },
    description: t("description"),
    keywords: t("keywords").split(", "),
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
      locale: locale,
      url: "https://tecnocrypter.com",
      siteName: "TecnoCrypter",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "https://tecnocrypter.com/images/hero.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@tecnocrypter",
      images: ["https://tecnocrypter.com/images/hero.png"],
    },
    alternates: {
      canonical: "https://tecnocrypter.com",
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
