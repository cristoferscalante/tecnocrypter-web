import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Lock, Eye, Server, Zap, Fingerprint } from "lucide-react"
import Link from "next/link"
import { generatePageMetadata } from "@/lib/metadata"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "security.meta" })
  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    slug: "seguridad",
    locale,
    image: "/Seo/seguridad.jpg",
    keywords: t.raw("keywords"),
  })
}

export default async function SeguridadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "security.solutionsPage" })

  const securityCategories = [
    {
      id: "personal",
      name: t("categories.personal.name"),
      description: t("categories.personal.description"),
      solutions: [
        {
          icon: Shield,
          title: t("categories.personal.antivirus.title"),
          description: t("categories.personal.antivirus.description"),
        },
        {
          icon: Lock,
          title: t("categories.personal.vpn.title"),
          description: t("categories.personal.vpn.description"),
        },
        {
          icon: Fingerprint,
          title: t("categories.personal.passwords.title"),
          description: t("categories.personal.passwords.description"),
        },
      ],
    },
    {
      id: "empresarial",
      name: t("categories.empresarial.name"),
      description: t("categories.empresarial.description"),
      solutions: [
        {
          icon: Server,
          title: t("categories.empresarial.network.title"),
          description: t("categories.empresarial.network.description"),
        },
        {
          icon: Eye,
          title: t("categories.empresarial.monitoring.title"),
          description: t("categories.empresarial.monitoring.description"),
        },
        {
          icon: Zap,
          title: t("categories.empresarial.incident.title"),
          description: t("categories.empresarial.incident.description"),
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen py-12">
      <section className="container mb-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t("heading.title")}</h1>
          <p className="text-xl text-muted-foreground">
            {t("heading.description")}
          </p>
        </div>

        <Tabs defaultValue="personal" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            {securityCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {securityCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {category.solutions.map((solution, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <solution.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{solution.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription>{solution.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/productos?categoria=${category.id}`}>{t("viewDetails")}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="container py-12 bg-muted/30 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t("cta.description")}
          </p>
          <Button asChild size="lg">
            <Link href="/contacto">{t("cta.button")}</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
