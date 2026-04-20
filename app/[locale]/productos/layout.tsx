import type { Metadata } from "next"
import { generateProductMetadata } from "@/lib/metadata"

import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "products.meta" })

  return generateProductMetadata({
    title: t("title"),
    description: t("description"),
    slug: "productos",
    image: "/Seo/productos.webp",
    keywords: ["desarrollo web seguro", "capacitación ciberseguridad", "prevención ataques", "servicios seguridad"]  
  })
}

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}