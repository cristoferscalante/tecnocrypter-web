import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Interfaz para la respuesta de validación SEO
interface SEOValidationResult {
  url: string;
  title: {
    content: string;
    length: number;
    isOptimal: boolean;
    issues: string[];
  };
  description: {
    content: string;
    length: number;
    isOptimal: boolean;
    issues: string[];
  };
  keywords: {
    count: number;
    isOptimal: boolean;
    issues: string[];
  };
  images: {
    hasAlt: boolean;
    count: number;
    issues: string[];
  };
  headings: {
    h1Count: number;
    structure: string[];
    issues: string[];
  };
  performance: {
    loadTime?: number;
    issues: string[];
  };
  score: number;
}

// Función para validar título SEO
function validateTitle(title: string): { isOptimal: boolean; issues: string[] } {
  const issues: string[] = [];
  let isOptimal = true;

  if (!title) {
    issues.push('Título faltante');
    isOptimal = false;
  } else {
    if (title.length < 30) {
      issues.push('Título demasiado corto (mínimo 30 caracteres)');
      isOptimal = false;
    }
    if (title.length > 60) {
      issues.push('Título demasiado largo (máximo 60 caracteres)');
      isOptimal = false;
    }
    if (!title.includes('TecnoCrypter')) {
      issues.push('Título no incluye la marca');
    }
  }

  return { isOptimal, issues };
}

// Función para validar descripción SEO
function validateDescription(description: string): { isOptimal: boolean; issues: string[] } {
  const issues: string[] = [];
  let isOptimal = true;

  if (!description) {
    issues.push('Descripción faltante');
    isOptimal = false;
  } else {
    if (description.length < 120) {
      issues.push('Descripción demasiado corta (mínimo 120 caracteres)');
      isOptimal = false;
    }
    if (description.length > 160) {
      issues.push('Descripción demasiado larga (máximo 160 caracteres)');
      isOptimal = false;
    }
  }

  return { isOptimal, issues };
}

// Función para validar keywords
function validateKeywords(keywords: string): { isOptimal: boolean; issues: string[] } {
  const issues: string[] = [];
  let isOptimal = true;
  const keywordArray = keywords ? keywords.split(',').map(k => k.trim()) : [];

  if (keywordArray.length === 0) {
    issues.push('No hay keywords definidas');
    isOptimal = false;
  } else {
    if (keywordArray.length > 10) {
      issues.push('Demasiadas keywords (máximo 10 recomendado)');
      isOptimal = false;
    }
    if (keywordArray.length < 3) {
      issues.push('Muy pocas keywords (mínimo 3 recomendado)');
    }
  }

  return { isOptimal, issues };
}

// API endpoint para validación SEO
export async function POST(request: NextRequest) {
  try {
    const { url, html } = await request.json();

    if (!url || !html) {
      return NextResponse.json(
        { error: 'URL y HTML son requeridos' },
        { status: 400 }
      );
    }

    // Parsear HTML básico (en producción usar una librería como cheerio)
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
    const imgMatches = html.match(/<img[^>]*>/gi) || [];

    const title = titleMatch ? titleMatch[1] : '';
    const description = descriptionMatch ? descriptionMatch[1] : '';
    const keywords = keywordsMatch ? keywordsMatch[1] : '';

    // Validaciones
    const titleValidation = validateTitle(title);
    const descriptionValidation = validateDescription(description);
    const keywordsValidation = validateKeywords(keywords);

    // Validar imágenes
    const imagesWithoutAlt = imgMatches.filter(img => !img.includes('alt=')).length;
    const imageValidation = {
      hasAlt: imagesWithoutAlt === 0,
      count: imgMatches.length,
      issues: imagesWithoutAlt > 0 ? [`${imagesWithoutAlt} imágenes sin atributo alt`] : []
    };

    // Validar estructura de encabezados
    const headingValidation = {
      h1Count: h1Matches.length,
      structure: h1Matches.map(h => h.replace(/<[^>]*>/g, '')),
      issues: h1Matches.length !== 1 ? ['Debe haber exactamente un H1 por página'] : []
    };

    // Calcular puntuación SEO
    let score = 100;
    if (!titleValidation.isOptimal) score -= 20;
    if (!descriptionValidation.isOptimal) score -= 20;
    if (!keywordsValidation.isOptimal) score -= 15;
    if (!imageValidation.hasAlt) score -= 10;
    if (headingValidation.h1Count !== 1) score -= 15;

    const result: SEOValidationResult = {
      url,
      title: {
        content: title,
        length: title.length,
        isOptimal: titleValidation.isOptimal,
        issues: titleValidation.issues
      },
      description: {
        content: description,
        length: description.length,
        isOptimal: descriptionValidation.isOptimal,
        issues: descriptionValidation.issues
      },
      keywords: {
        count: keywords ? keywords.split(',').length : 0,
        isOptimal: keywordsValidation.isOptimal,
        issues: keywordsValidation.issues
      },
      images: imageValidation,
      headings: headingValidation,
      performance: {
        issues: [] // Se puede expandir con métricas de rendimiento
      },
      score: Math.max(0, score)
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error en validación SEO:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// GET endpoint para obtener el estado general SEO del sitio
export async function GET() {
  try {
    const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tecnocrypter.com';
    const baseUrl = rawBaseUrl.replace(/\/$/, '');
    
    // URLs principales para validar
    const urlsToCheck = [
      '/',
      '/productos',
      '/blog',
      '/contacto',
      '/tools',
      '/tools/generador-qr'
    ];

    const results = {
      timestamp: new Date().toISOString(),
      baseUrl: `${baseUrl}/`,
      totalUrls: urlsToCheck.length,
      summary: {
        avgScore: 0,
        totalIssues: 0,
        criticalIssues: 0
      },
      urls: urlsToCheck.map(u => {
        const suffix = u.startsWith('/') ? u : `/${u}`;
        return {
          url: `${baseUrl}${suffix}`,
          status: 'pending', // En una implementación real, se haría fetch
          lastChecked: new Date().toISOString()
        }
      })
    };

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error en GET SEO:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}