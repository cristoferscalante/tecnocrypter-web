import Link from "next/link"
import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">
                Tecno<span className="text-primary">Crypter</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Tu fuente confiable de información sobre seguridad cibernética, encriptación y criptomonedas.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/seguridad" className="text-muted-foreground hover:text-foreground transition-colors">
                  Seguridad Cibernética
                </Link>
              </li>
              <li>
                <Link href="/encriptacion" className="text-muted-foreground hover:text-foreground transition-colors">
                  Encriptación
                </Link>
              </li>
              <li>
                <Link href="/criptomonedas" className="text-muted-foreground hover:text-foreground transition-colors">
                  Criptomonedas
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-muted-foreground hover:text-foreground transition-colors">
                  Noticias
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-foreground transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TecnoCrypter. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
