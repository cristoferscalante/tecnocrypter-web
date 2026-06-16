import { getTranslations } from "next-intl/server"
import { generatePageMetadata } from "@/lib/metadata"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Shield, Lock, Eye, FileText, Mail, Calendar, Target, Scale, Users, Globe, Database, Clock, RefreshCw, Settings, AlertTriangle } from "lucide-react"
import { cookiesTranslations } from "./translations"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "footer" })
  return generatePageMetadata({
    title: t("cookies"),
    description: locale === "es"
      ? "Conoce cómo TecnoCrypter utiliza cookies y tecnologías similares bajo un enfoque de privacidad y mínima recolección de datos."
      : "Learn how TecnoCrypter uses cookies and similar technologies under a privacy-first and minimal data collection approach.",
    slug: "cookies",
    locale,
    image: "/Seo/politicas de cookies.webp",
    keywords: locale === "es"
      ? ["política de cookies", "privacidad", "protección de datos", "TecnoCrypter", "cookies necesarias"]
      : ["cookie policy", "privacy", "data protection", "TecnoCrypter", "necessary cookies"]
  })
}

function formatText(text: string) {
  return text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part);
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = cookiesTranslations[locale] || cookiesTranslations.es

  return (
    <>
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Cookie className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title}</h1>
            <p className="text-xl text-muted-foreground">
              {t.subtitle}
            </p>
            <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{t.lastUpdated}</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* ¿Qué son las cookies? */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  {t.s1_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  {formatText(t.s1_p1)}
                </p>
                <p>
                  {formatText(t.s1_p2)}
                </p>
              </CardContent>
            </Card>

            {/* Principios de uso */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  {t.s2_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <ul>
                  <li><strong>{t.s2_item1_title}</strong> {t.s2_item1_desc}</li>
                  <li><strong>{t.s2_item2_title}</strong> {t.s2_item2_desc}</li>
                  <li><strong>{t.s2_item3_title}</strong> {t.s2_item3_desc}</li>
                  <li><strong>{t.s2_item4_title}</strong> {t.s2_item4_desc}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Tecnologías que podemos emplear */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  {t.s3_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <ul>
                  <li><strong>{t.s3_item1_title}</strong> {t.s3_item1_desc}</li>
                  <li><strong>{t.s3_item2_title}</strong> {t.s3_item2_desc}</li>
                  <li><strong>{t.s3_item3_title}</strong> {t.s3_item3_desc}</li>
                </ul>
                <p>
                  {formatText(t.s3_p1)}
                </p>
              </CardContent>
            </Card>

            {/* Base legal y alcance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scale className="h-5 w-5 mr-2 text-primary" />
                  {t.s4_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  {formatText(t.s4_p1)}
                </p>
                <ul>
                  <li><strong>{t.s4_item1_title}</strong> {t.s4_item1_desc}</li>
                  <li><strong>{t.s4_item2_title}</strong> {t.s4_item2_desc}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Finalidad de las cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  {t.s5_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <ul>
                  <li><strong>{t.s5_item1_title}</strong> {t.s5_item1_desc}</li>
                  <li><strong>{t.s5_item2_title}</strong> {t.s5_item2_desc}</li>
                  <li><strong>{t.s5_item3_title}</strong> {t.s5_item3_desc}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Ejemplo de cookies utilizadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-primary" />
                  {t.s6_title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border border-border p-3 text-left font-semibold">{t.s6_th_provider}</th>
                        <th className="border border-border p-3 text-left font-semibold">{t.s6_th_cookie}</th>
                        <th className="border border-border p-3 text-left font-semibold">{t.s6_th_category}</th>
                        <th className="border border-border p-3 text-left font-semibold">{t.s6_th_purpose}</th>
                        <th className="border border-border p-3 text-left font-semibold">{t.s6_th_duration}</th>
                        <th className="border border-border p-3 text-left font-semibold">{t.s6_th_type}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-3">TecnoCrypter</td>
                        <td className="border border-border p-3 font-mono text-sm">cookieConsent</td>
                        <td className="border border-border p-3">
                          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                            {t.s6_cat_necessary}
                          </span>
                        </td>
                        <td className="border border-border p-3">{t.s6_cookie1_purpose}</td>
                        <td className="border border-border p-3">6-12 meses</td>
                        <td className="border border-border p-3">{t.s6_type_first}</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">TecnoCrypter</td>
                        <td className="border border-border p-3 font-mono text-sm">session_id</td>
                        <td className="border border-border p-3">
                          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                            {t.s6_cat_necessary}
                          </span>
                        </td>
                        <td className="border border-border p-3">{t.s6_cookie2_purpose}</td>
                        <td className="border border-border p-3">{t.s6_duration_session}</td>
                        <td className="border border-border p-3">{t.s6_type_first}</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">Cloudflare</td>
                        <td className="border border-border p-3 font-mono text-sm">__cf_bm</td>
                        <td className="border border-border p-3">
                          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                            {t.s6_cat_necessary}
                          </span>
                        </td>
                        <td className="border border-border p-3">{t.s6_cookie3_purpose}</td>
                        <td className="border border-border p-3">30 min</td>
                        <td className="border border-border p-3">{t.s6_type_third}</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">reCAPTCHA</td>
                        <td className="border border-border p-3 font-mono text-sm">__Secure-ENID</td>
                        <td className="border border-border p-3">
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                            {t.s6_cat_security}
                          </span>
                        </td>
                        <td className="border border-border p-3">{t.s6_cookie4_purpose}</td>
                        <td className="border border-border p-3">{t.s6_duration_variable}</td>
                        <td className="border border-border p-3">{t.s6_type_third}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Gestión de cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary" />
                  {t.s7_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <ul>
                  <li><strong>{t.s7_item1_title}</strong> {t.s7_item1_desc}</li>
                  <li><strong>{t.s7_item2_title}</strong> {t.s7_item2_desc}</li>
                  <li><strong>{t.s7_item3_title}</strong> {t.s7_item3_desc}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Transferencias internacionales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  {t.s8_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  {t.s8_p1}
                </p>
              </CardContent>
            </Card>

            {/* Plazos de retención */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  {t.s9_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  {t.s9_p1}
                </p>
              </CardContent>
            </Card>

            {/* Datos de menores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  {t.s10_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  {t.s10_p1}
                </p>
              </CardContent>
            </Card>

            {/* Cambios en la política */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2 text-primary" />
                  {t.s11_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  {t.s11_p1}
                </p>
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  {t.s12_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="mb-2"><strong>{t.s12_provider}</strong> TecnoCrypter</p>
                  <p className="mb-2"><strong>{t.s12_email}</strong> <a href="mailto:legal@tecnocrypter.com" className="text-primary hover:underline">legal@tecnocrypter.com</a></p>
                  <p><strong>{t.s12_site}</strong> <a href="https://www.tecnocrypter.com" className="text-primary hover:underline">www.tecnocrypter.com</a></p>
                </div>
              </CardContent>
            </Card>

            {/* Nota importante */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  {t.footer_title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t.footer_desc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}