import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact.meta" })

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    slug: "contacto",
    image: "/Seo/contacto.webp",
    keywords: ["contacto tecnocrypter", "soporte técnico", "consultas ciberseguridad", "expertos encriptación"]
  })
}

export default async function ContactoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact" })

  return (
    <>
      <main className="min-h-screen py-8">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t("heading.title")}</h1>
          <p className="text-xl text-muted-foreground">
            {t("heading.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t("form.title")}</CardTitle>
              <CardDescription>{t("form.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      {t("form.firstName")}
                    </label>
                    <Input id="first-name" placeholder={t("form.firstNamePlaceholder")} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      {t("form.lastName")}
                    </label>
                    <Input id="last-name" placeholder={t("form.lastNamePlaceholder")} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t("form.email")}
                  </label>
                  <Input id="email" type="email" placeholder={t("form.emailPlaceholder")} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    {t("form.subject")}
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("form.subjectPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">{t("form.subjectGeneral")}</SelectItem>
                      <SelectItem value="support">{t("form.subjectSupport")}</SelectItem>
                      <SelectItem value="sales">{t("form.subjectSales")}</SelectItem>
                      <SelectItem value="partnership">{t("form.subjectPartnership")}</SelectItem>
                      <SelectItem value="other">{t("form.subjectOther")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t("form.message")}
                  </label>
                  <Textarea id="message" placeholder={t("form.messagePlaceholder")} rows={5} />
                </div>
                <div className="space-y-3">
                  <Button type="submit" className="w-full">
                    {t("form.submit")}
                  </Button>
                  <div className="mt-3 rounded-lg overflow-hidden border">
                    <img
                      src="/Seo/Imagen_tecnocrypter.png"
                      alt={t("imageAlt")}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("info.title")}</CardTitle>
                <CardDescription>{t("info.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t("info.emailTitle")}</h3>
                    <p className="text-sm text-muted-foreground">info@tecnocrypter.com</p>
                    <p className="text-sm text-muted-foreground">soporte@tecnocrypter.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t("info.phoneTitle")}</h3>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">{t("info.phoneHours")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t("info.locationTitle")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("info.locationAddress1")}
                      <br />
                      {t("info.locationAddress2")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t("info.hoursTitle")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("info.hoursWeekday")}
                      <br />
                      {t("info.hoursSaturday")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("faq.title")}</CardTitle>
                <CardDescription>{t("faq.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-medium">{t("faq.q1")}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("faq.a1")}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">{t("faq.q2")}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("faq.a2")}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">{t("faq.q3")}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("faq.a3")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


      </div>
    </main>
    </>
  )
}
