'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const apiKey = process.env.NEXT_PUBLIC_VIRUSTOTAL_API_KEY!

export default function VerificadorPage() {
  const [url, setUrl] = useState('')
  const [resultado, setResultado] = useState<null | 'segura' | 'maliciosa' | 'error'>(null)
  const [loading, setLoading] = useState(false)

  const analizarURL = async () => {
    setLoading(true)
    setResultado(null)

    try {
      const response = await fetch('https://www.virustotal.com/api/v3/urls', {
        method: 'POST',
        headers: {
          'x-apikey': apiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `url=${encodeURIComponent(url)}`,
      })

      const data = await response.json()
      const analysisId = data?.data?.id

      if (!analysisId) {
        console.warn('No se obtuvo ID del análisis.')
        setResultado('error')
        setLoading(false)
        return
      }

      let status = 'queued'
      let resultData = null

      while (status === 'queued') {
        await new Promise((r) => setTimeout(r, 1500)) // Esperar 1.5s
        const resultRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
          headers: { 'x-apikey': apiKey },
        })
        resultData = await resultRes.json()
        status = resultData?.data?.attributes?.status
      }

      const maliciousCount = resultData?.data?.attributes?.stats?.malicious || 0
      setResultado(maliciousCount > 0 ? 'maliciosa' : 'segura')
    } catch (error) {
      console.error('❌ Error en el análisis:', error)
      setResultado('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <motion.div
        className="relative z-10 max-w-xl w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <ShieldCheck className="text-primary w-10 h-10" />
            </div>
            <CardTitle className="text-3xl">Verificador de Enlaces Sospechosos</CardTitle>
            <CardDescription className="text-base">
              Ingresa una URL para analizar si es segura o maliciosa.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="url"
              placeholder="https://ejemplo.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <Button
              onClick={analizarURL}
              disabled={loading || !url}
              className="w-full"
              size="lg"
            >
              {loading ? 'Analizando...' : 'Verificar Enlace'}
            </Button>

            {resultado && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center gap-2 text-sm"
              >
                {resultado === 'segura' && (
                  <>
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-green-500 font-medium">El enlace es seguro.</span>
                  </>
                )}
                {resultado === 'maliciosa' && (
                  <>
                    <AlertTriangle className="text-yellow-500 w-5 h-5" />
                    <span className="text-yellow-500 font-medium">¡Cuidado! El enlace es malicioso.</span>
                  </>
                )}
                {resultado === 'error' && (
                  <>
                    <XCircle className="text-destructive w-5 h-5" />
                    <span className="text-destructive font-medium">Error al analizar el enlace.</span>
                  </>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
