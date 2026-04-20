"use client"

import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="border-t bg-background/30 backdrop-blur-sm">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-4 group">
              <Image 
                src="/Tecno.svg" 
                alt="TecnoCrypter Logo" 
                width={70} 
                height={70} 
                className="h-[70px] w-[70px] transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-lg font-bold">
                Tecno<span className="text-primary">Crypter</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t("legal")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} TecnoCrypter. {t("rights")} 
            <span className="mx-2">{t("madeWith")}</span>
            <Link 
              href="https://v1tr0.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-500 hover:text-red-600 transition-colors duration-200 hover:scale-110 transform"
            >
              <Heart className="h-4 w-4 fill-current" />
            </Link>
            <span className="ml-2">{t("by")} V1tr0</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
