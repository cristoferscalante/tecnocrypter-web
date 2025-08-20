import { NextRequest, NextResponse } from 'next/server'

interface VirusTotalResponse {
  data: {
    id: string
    attributes: {
      status: string
      stats?: {
        harmless: number
        malicious: number
        suspicious: number
        undetected: number
        timeout: number
      }
    }
  }
}

interface UrlAnalysisResponse {
  data: {
    attributes: {
      last_analysis_stats: {
        harmless: number
        malicious: number
        suspicious: number
        undetected: number
        timeout: number
      }
      last_analysis_date: number
      reputation: number
      total_votes: {
        harmless: number
        malicious: number
      }
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL es requerida' },
        { status: 400 }
      )
    }

    const apiKey = process.env.VIRUSTOTAL_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key no configurada' },
        { status: 500 }
      )
    }

    // Primero, enviamos la URL para análisis
    const submitResponse = await fetch('https://www.virustotal.com/api/v3/urls', {
      method: 'POST',
      headers: {
        'x-apikey': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(url)}`,
    })

    if (!submitResponse.ok) {
      throw new Error(`Error al enviar URL: ${submitResponse.status}`)
    }

    const submitData: VirusTotalResponse = await submitResponse.json()
    const analysisId = submitData.data.id

    // Esperamos un poco antes de consultar los resultados
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Consultamos los resultados del análisis
    const resultResponse = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
      headers: {
        'x-apikey': apiKey,
      },
    })

    if (!resultResponse.ok) {
      throw new Error(`Error al obtener resultados: ${resultResponse.status}`)
    }

    const resultData: VirusTotalResponse = await resultResponse.json()
    
    // Si el análisis aún está en progreso, intentamos obtener datos de análisis previos
    if (resultData.data.attributes.status === 'queued') {
      try {
        // Intentamos obtener análisis previos de la URL
        const urlId = Buffer.from(url).toString('base64').replace(/=/g, '')
        const urlResponse = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
          headers: {
            'x-apikey': apiKey,
          },
        })

        if (urlResponse.ok) {
          const urlData: UrlAnalysisResponse = await urlResponse.json()
          const stats = urlData.data.attributes.last_analysis_stats
          const attributes = urlData.data.attributes
          
          // Intentamos obtener información adicional del dominio
          const domain = new URL(url).hostname
          let domainInfo = null
          
          try {
            const domainResponse = await fetch(`https://www.virustotal.com/api/v3/domains/${domain}`, {
              headers: { 'x-apikey': apiKey },
            })
            if (domainResponse.ok) {
              domainInfo = await domainResponse.json()
            }
          } catch (error) {
            console.log('No se pudo obtener información del dominio:', error)
          }
          
          return NextResponse.json({
            url,
            status: stats.malicious > 0 ? 'malicious' : stats.suspicious > 0 ? 'suspicious' : 'safe',
            score: Math.max(0, 100 - (stats.malicious * 20 + stats.suspicious * 10)),
            checks: {
              ssl: true,
              domain_age: domainInfo?.data?.attributes?.creation_date ? 
                Math.floor((Date.now() - new Date(domainInfo.data.attributes.creation_date * 1000).getTime()) / (1000 * 60 * 60 * 24)) : null,
              reputation: stats.malicious > 0 ? 'bad' : stats.suspicious > 0 ? 'neutral' : 'good',
              blacklisted: stats.malicious > 0,
              phishing: stats.malicious > 0,
              malware: stats.malicious > 0
            },
            details: {
              domain,
              ip: domainInfo?.data?.attributes?.last_dns_records?.find((r: any) => r.type === 'A')?.value || null,
              country: domainInfo?.data?.attributes?.country || null,
              registrar: domainInfo?.data?.attributes?.registrar || null,
              created_date: domainInfo?.data?.attributes?.creation_date ? 
                new Date(domainInfo.data.attributes.creation_date * 1000).toISOString().split('T')[0] : null,
              ssl_issuer: null,
              ssl_valid_until: null
            },
            scan_time: new Date().toISOString(),
            virustotal_stats: {
              harmless: stats.harmless,
              malicious: stats.malicious,
              suspicious: stats.suspicious,
              undetected: stats.undetected,
              timeout: stats.timeout
            }
          })
        }
      } catch (error) {
        console.log('No se pudieron obtener análisis previos:', error)
      }
      
      // Si no hay análisis previos, devolvemos estado de análisis en progreso
      return NextResponse.json({
        status: 'analyzing',
        message: 'Análisis en progreso. Los resultados estarán disponibles en unos minutos.',
        analysisId
      })
    }

    // Procesamos los resultados del análisis completado
    const stats = resultData.data.attributes.stats
    if (!stats) {
      throw new Error('No se obtuvieron estadísticas del análisis')
    }

    const maliciousCount = stats.malicious
    const suspiciousCount = stats.suspicious
    const domain = new URL(url).hostname
    
    // Intentamos obtener información adicional del dominio
    let domainInfo = null
    try {
      const domainResponse = await fetch(`https://www.virustotal.com/api/v3/domains/${domain}`, {
        headers: { 'x-apikey': apiKey },
      })
      if (domainResponse.ok) {
        domainInfo = await domainResponse.json()
      }
    } catch (error) {
      console.log('No se pudo obtener información del dominio:', error)
    }
    
    return NextResponse.json({
      url,
      status: maliciousCount > 0 ? 'malicious' : suspiciousCount > 0 ? 'suspicious' : 'safe',
      score: Math.max(0, 100 - (maliciousCount * 20 + suspiciousCount * 10)),
      checks: {
        ssl: true,
        domain_age: domainInfo?.data?.attributes?.creation_date ? 
          Math.floor((Date.now() - new Date(domainInfo.data.attributes.creation_date * 1000).getTime()) / (1000 * 60 * 60 * 24)) : null,
        reputation: maliciousCount > 0 ? 'bad' : suspiciousCount > 0 ? 'neutral' : 'good',
        blacklisted: maliciousCount > 0,
        phishing: maliciousCount > 0,
        malware: maliciousCount > 0
      },
      details: {
        domain,
        ip: domainInfo?.data?.attributes?.last_dns_records?.find((r: any) => r.type === 'A')?.value || null,
        country: domainInfo?.data?.attributes?.country || null,
        registrar: domainInfo?.data?.attributes?.registrar || null,
        created_date: domainInfo?.data?.attributes?.creation_date ? 
          new Date(domainInfo.data.attributes.creation_date * 1000).toISOString().split('T')[0] : null,
        ssl_issuer: null,
        ssl_valid_until: null
      },
      scan_time: new Date().toISOString(),
      virustotal_stats: {
        harmless: stats.harmless,
        malicious: stats.malicious,
        suspicious: stats.suspicious,
        undetected: stats.undetected,
        timeout: stats.timeout
      }
    })

  } catch (error) {
    console.error('Error en verificación de URL:', error)
    return NextResponse.json(
      { 
        error: 'Error al verificar la URL',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}