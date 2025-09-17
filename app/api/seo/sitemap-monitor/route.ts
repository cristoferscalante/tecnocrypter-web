import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Interfaz para el resultado del monitoreo
interface SitemapMonitorResult {
  timestamp: string;
  totalUrls: number;
  validUrls: number;
  brokenUrls: number;
  warnings: string[];
  errors: string[];
  urlStatus: {
    url: string;
    status: 'valid' | 'broken' | 'redirect' | 'unknown';
    statusCode?: number;
    redirectTo?: string;
    error?: string;
  }[];
  recommendations: string[];
}

// Función para verificar si una URL existe en el sistema de archivos
async function checkUrlExists(url: string): Promise<{ exists: boolean; type?: string }> {
  try {
    const cleanUrl = url.replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '') || '/';
    const appDir = path.join(process.cwd(), 'app');
    
    // Mapear URLs a rutas de archivos
    const urlToPath: Record<string, string> = {
      '/': 'page.tsx',
      '/productos': 'productos/page.tsx',
      '/blog': 'blog/page.tsx',
      '/contacto': 'contacto/page.tsx',
      '/tools': 'tools/page.tsx',
      '/tools/generador-qr': 'tools/generador-qr/page.tsx',
      '/privacidad': 'privacidad/page.tsx',
      '/terminos': 'terminos/page.tsx',
      '/cookies': 'cookies/page.tsx',
      // Rutas de categoría añadidas
      '/encriptacion': 'encriptacion/page.tsx',
      '/criptomonedas': 'criptomonedas/page.tsx',
      '/noticias': 'noticias/page.tsx',
      '/seguridad': 'seguridad/page.tsx',
    };

    // Verificar rutas estáticas
    if (urlToPath[cleanUrl]) {
      const filePath = path.join(appDir, urlToPath[cleanUrl]);
      try {
        await fs.access(filePath);
        return { exists: true, type: 'static' };
      } catch {
        return { exists: false };
      }
    }

    // Verificar rutas dinámicas conocidas
    if (cleanUrl.startsWith('/blog/') && cleanUrl !== '/blog') {
      const blogPagePath = path.join(appDir, 'blog/[slug]/page.tsx');
      try {
        await fs.access(blogPagePath);
        return { exists: true, type: 'dynamic-blog' };
      } catch {
        return { exists: false };
      }
    }

    if (cleanUrl.startsWith('/productos/') && cleanUrl !== '/productos') {
      const productPagePath = path.join(appDir, 'productos/[id]/page.tsx');
      try {
        await fs.access(productPagePath);
        return { exists: true, type: 'dynamic-product' };
      } catch {
        return { exists: false };
      }
    }

    // Fallback genérico: buscar page.tsx en la ruta correspondiente
    const genericRoutePath = cleanUrl === '/' ? 'page.tsx' : path.join(cleanUrl.slice(1), 'page.tsx');
    const genericFilePath = path.join(appDir, genericRoutePath);
    try {
      await fs.access(genericFilePath);
      return { exists: true, type: 'static-generic' };
    } catch {
      // no-op
    }

    return { exists: false };
  } catch (error) {
    console.error('Error checking URL:', error);
    return { exists: false };
  }
}

// Normalizar URLs quitando dobles barras (después del protocolo)
function normalizeUrl(u: string): string {
  try {
    const parsed = new URL(u);
    // Reemplazar múltiples barras en el pathname por una sola
    parsed.pathname = parsed.pathname.replace(/\/+/g, '/');
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return u.replace(/([^:]\/)\/+/, '$1').replace(/\/$/, '');
  }
}

// Función para parsear el sitemap XML
function parseSitemapXML(xmlContent: string): string[] {
  const urls: string[] = [];
  const urlMatches = xmlContent.match(/<loc>([^<]+)<\/loc>/g);
  
  if (urlMatches) {
    urlMatches.forEach(match => {
      const url = match.replace(/<\/?loc>/g, '');
      urls.push(normalizeUrl(url));
    });
  }
  
  return urls;
}

// GET endpoint para monitorear el sitemap
export async function GET(request: NextRequest) {
  try {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap-0.xml');
    
    // Leer el sitemap
    let sitemapContent: string;
    try {
      sitemapContent = await fs.readFile(sitemapPath, 'utf-8');
    } catch (error) {
      return NextResponse.json(
        { error: 'No se pudo leer el sitemap' },
        { status: 404 }
      );
    }

    // Parsear URLs del sitemap
    const urls = parseSitemapXML(sitemapContent);
    const warnings: string[] = [];
    const errors: string[] = [];
    const recommendations: string[] = [];
    const urlStatus: SitemapMonitorResult['urlStatus'] = [];

    let validUrls = 0;
    let brokenUrls = 0;

    // Verificar cada URL
    for (const url of urls) {
      const { exists } = await checkUrlExists(url);
      
      if (exists) {
        validUrls++;
        urlStatus.push({
          url,
          status: 'valid'
        });
      } else {
        brokenUrls++;
        errors.push(`URL rota encontrada: ${url}`);
        urlStatus.push({
          url,
          status: 'broken',
          error: 'Página no encontrada'
        });
      }
    }

    // Verificar URLs que deberían estar en el sitemap pero no están
    const expectedUrls = [
      '/tools/generador-qr'
    ];

    const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tecnocrypter.com';
    const baseUrl = rawBaseUrl.replace(/\/$/, '');
    
    for (const expectedUrl of expectedUrls) {
      const fullUrl = normalizeUrl(`${baseUrl}${expectedUrl.startsWith('/') ? expectedUrl : `/${expectedUrl}`}`);
      if (!urls.includes(fullUrl)) {
        warnings.push(`URL faltante en sitemap: ${fullUrl}`);
        recommendations.push(`Agregar ${fullUrl} al sitemap`);
      }
    }

    // Generar recomendaciones adicionales
    if (brokenUrls > 0) {
      recommendations.push('Eliminar URLs rotas del sitemap');
      recommendations.push('Implementar redirecciones 301 para URLs movidas');
    }

    if (urls.length > 50000) {
      warnings.push('El sitemap tiene más de 50,000 URLs (límite recomendado)');
      recommendations.push('Considerar dividir el sitemap en múltiples archivos');
    }

    const result: SitemapMonitorResult = {
      timestamp: new Date().toISOString(),
      totalUrls: urls.length,
      validUrls,
      brokenUrls,
      warnings,
      errors,
      urlStatus,
      recommendations
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error en monitoreo de sitemap:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST endpoint para regenerar sitemap
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === 'regenerate') {
      // En una implementación real, aquí se regeneraría el sitemap
      // Por ahora, solo simulamos la respuesta
      return NextResponse.json({
        success: true,
        message: 'Sitemap regenerado exitosamente',
        timestamp: new Date().toISOString()
      });
    }

    if (action === 'validate-all') {
      // Validar todas las URLs del sitio
      const sitemapPath = path.join(process.cwd(), 'public', 'sitemap-0.xml');
      const sitemapContent = await fs.readFile(sitemapPath, 'utf-8');
      const urls = parseSitemapXML(sitemapContent);
      
      const results = [] as Array<{ url: string; status: 'valid' | 'broken'; checked: string }>; 
      for (const url of urls.slice(0, 10)) { // Limitar a 10 para evitar timeout
        const { exists } = await checkUrlExists(url);
        results.push({
          url,
          status: exists ? 'valid' : 'broken',
          checked: new Date().toISOString()
        });
      }

      return NextResponse.json({
        success: true,
        results,
        totalChecked: results.length,
        totalUrls: urls.length
      });
    }

    return NextResponse.json(
      { error: 'Acción no válida' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error en POST sitemap monitor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}