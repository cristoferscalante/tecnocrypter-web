import { getTranslations } from "next-intl/server"
import { generatePageMetadata } from "@/lib/metadata"
import TermsEs from "./content-es"
import TermsEn from "./content-en"
import TermsFr from "./content-fr"
import TermsPt from "./content-pt"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "footer" })
  
  // Localized description and keywords depending on locale
  let description = "Términos y condiciones de uso de TecnoCrypter. Conoce tus derechos y obligaciones al utilizar nuestros servicios de ciberseguridad."
  let keywords = ["términos de servicio", "condiciones de uso", "TecnoCrypter", "ciberseguridad", "legal"]
  
  if (locale === "en") {
    description = "Terms and conditions of use of TecnoCrypter. Learn your rights and obligations when using our cybersecurity services."
    keywords = ["terms of service", "terms of use", "TecnoCrypter", "cybersecurity", "legal"]
  } else if (locale === "fr") {
    description = "Conditions d'utilisation de TecnoCrypter. Prenez connaissance de vos droits et obligations lors de l'utilisation de nos services."
    keywords = ["conditions d'utilisation", "conditions de service", "TecnoCrypter", "cybersécurité", "légal"]
  } else if (locale === "pt") {
    description = "Termos e condições de uso do TecnoCrypter. Conheça seus direitos e deveres ao utilizar nossos serviços de cibersegurança."
    keywords = ["termos de serviço", "condições de uso", "TecnoCrypter", "cibersegurança", "legal"]
  }

  return generatePageMetadata({
    title: t("terms"),
    description,
    slug: "terminos",
    locale,
    image: "/Seo/terminos de servicio.webp",
    keywords
  })
}

export default async function TerminosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (locale === "en") return <TermsEn />
  if (locale === "fr") return <TermsFr />
  if (locale === "pt") return <TermsPt />
  return <TermsEs />
}