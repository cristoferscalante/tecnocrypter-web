'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    <main className="relative min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4 pt-10">
      <motion.div
        className="relative z-10 max-w-xl w-full bg-[#1a1a1a]/80 rounded-xl shadow-lg p-8 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-4">
          <ShieldCheck className="text-[#00e77f] w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Verificador de Enlaces Sospechosos</h1>
        <p className="text-gray-400 mb-6">
          Ingresa una URL para analizar si es segura o maliciosa.
        </p>

        <input
          type="text"
          placeholder="https://ejemplo.com"
          className="w-full px-4 py-2 mb-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00e77f]"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <Button asChild size="lg" className="group" onClick={analizarURL} disabled={loading || !url}>
                {loading ? 'Analizando...' : 'Verificar Enlace'}
        </Button>

        <button
          onClick={analizarURL}
          disabled={loading || !url}
          className={`w-full py-2 rounded-md font-semibold transition-all duration-300 ${
            loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-[#00e77f] hover:bg-[#00d86f] hover:shadow-lg hover:scale-105'
          }`}
        >
          {loading ? 'Analizando...' : 'Verificar Enlace'}
        </button>

        {resultado && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 flex flex-col items-center justify-center gap-2 text-lg"
          >
            {resultado === 'segura' && (
              <>
                <CheckCircle className="text-green-400 w-7 h-7" />
                <span className="text-green-400 font-medium">El enlace es seguro.</span>
              </>
            )}
            {resultado === 'maliciosa' && (
              <>
                <AlertTriangle className="text-yellow-400 w-7 h-7" />
                <span className="text-yellow-400 font-medium">¡Cuidado! El enlace es malicioso.</span>
              </>
            )}
            {resultado === 'error' && (
              <>
                <XCircle className="text-red-500 w-7 h-7" />
                <span className="text-red-500 font-medium">Error al analizar el enlace.</span>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </main>
  )
}
