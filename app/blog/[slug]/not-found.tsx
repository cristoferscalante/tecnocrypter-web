import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileX } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-2xl">
        <div className="text-center">
          <Card className="border-dashed">
            <CardHeader className="pb-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                <FileX className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">Artículo no encontrado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Lo sentimos, el artículo que buscas no existe o ha sido movido.
              </p>
              <p className="text-sm text-muted-foreground">
                Puede que el enlace esté roto o que el contenido haya sido actualizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Link href="/blog">
                  <Button variant="default" className="w-full sm:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al blog
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Ir al inicio
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}