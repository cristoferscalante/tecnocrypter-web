import { Metadata } from 'next';

// Configuración base para metadatos
export const baseMetadata = {
  siteName: 'TecnoCrypter',
  siteUrl: 'https://tecnocrypter.com',
  defaultTitle: 'TecnoCrypter - Ciberseguridad y Criptomonedas',
  defaultDescription: 'Plataforma líder en ciberseguridad, encriptación y tecnología blockchain. Productos seguros, herramientas de privacidad y las últimas noticias en criptomonedas.',
  defaultImage: 'https://tecnocrypter.com/images/hero.png',
  twitterHandle: '@tecnocrypter',
};

// Interfaz para parámetros de metadatos personalizados
export interface MetadataParams {
  title?: string;
  description?: string;
  slug?: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
}

// Funciones de validación SEO
function validateTitle(title: string): string {
  // Título óptimo: 50-60 caracteres
  if (title.length > 60) {
    console.warn(`Título demasiado largo (${title.length} caracteres): ${title.substring(0, 50)}...`);
  }
  if (title.length < 30) {
    console.warn(`Título demasiado corto (${title.length} caracteres): ${title}`);
  }
  return title;
}

function validateDescription(description: string): string {
  // Descripción óptima: 150-160 caracteres
  if (description.length > 160) {
    console.warn(`Descripción demasiado larga (${description.length} caracteres): ${description.substring(0, 50)}...`);
  }
  if (description.length < 120) {
    console.warn(`Descripción demasiado corta (${description.length} caracteres): ${description.substring(0, 50)}...`);
  }
  return description;
}

function validateKeywords(keywords: string[]): string[] {
  // Máximo 10 keywords recomendado
  if (keywords.length > 10) {
    console.warn(`Demasiadas keywords (${keywords.length}). Recomendado: máximo 10`);
    return keywords.slice(0, 10);
  }
  return keywords;
}

// Función principal para generar metadatos
export function generatePageMetadata(params: MetadataParams = {}): Metadata {
  const {
    title,
    description = baseMetadata.defaultDescription,
    slug = '',
    image = baseMetadata.defaultImage,
    keywords = [],
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    noIndex = false,
  } = params;

  const pageTitle = title 
    ? validateTitle(`${title} | ${baseMetadata.siteName}`)
    : validateTitle(baseMetadata.defaultTitle);
  
  const validatedDescription = validateDescription(description);
  const validatedKeywords = validateKeywords(keywords);
  
  const pageUrl = `${baseMetadata.siteUrl}${slug ? `/${slug}` : ''}`;
  const imageUrl = image.startsWith('http') ? image : `${baseMetadata.siteUrl}${image}`;

  const metadata: Metadata = {
    metadataBase: new URL(baseMetadata.siteUrl),
    title: pageTitle,
    description: validatedDescription,
    keywords: validatedKeywords.length > 0 ? validatedKeywords.join(', ') : undefined,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1',
    
    // Open Graph
    openGraph: {
      type: type === 'product' ? 'website' : type,
      locale: 'es_ES',
      url: pageUrl,
      siteName: baseMetadata.siteName,
      title: pageTitle,
      description: validatedDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || baseMetadata.defaultTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: baseMetadata.twitterHandle,
      creator: baseMetadata.twitterHandle,
      title: pageTitle,
      description: validatedDescription,
      images: [imageUrl],
    },

    // Canonical URL
    alternates: {
      canonical: pageUrl,
    },

    // Additional meta tags
    other: {
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
    },
  };

  return metadata;
}

// Metadatos específicos para diferentes secciones
export function generateBlogMetadata(params: MetadataParams): Metadata {
  return generatePageMetadata({
    ...params,
    type: 'article',
    title: params.title ? `${params.title} | Blog TecnoCrypter` : 'Blog TecnoCrypter',
    description: params.description || 'Últimas noticias, análisis y tendencias en ciberseguridad, blockchain y criptomonedas. Mantente informado con nuestros expertos.',
  });
}

export function generateProductMetadata(params: MetadataParams): Metadata {
  return generatePageMetadata({
    ...params,
    type: 'product',
    title: params.title ? `${params.title} | Productos TecnoCrypter` : 'Productos TecnoCrypter',
    description: params.description || 'Productos de ciberseguridad y encriptación de última generación. Protege tu información con nuestras soluciones avanzadas.',
  });
}

export function generateToolMetadata(params: MetadataParams): Metadata {
  return generatePageMetadata({
    ...params,
    title: params.title ? `${params.title} | Herramientas TecnoCrypter` : 'Herramientas TecnoCrypter',
    description: params.description || 'Herramientas gratuitas de ciberseguridad y privacidad. Protege tu información con nuestras utilidades online.',
    keywords: [...(params.keywords || []), 'herramientas', 'ciberseguridad', 'privacidad', 'online', 'gratuito'],
  });
}

// Datos estructurados (JSON-LD) - mantener compatibilidad
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TecnoCrypter',
  url: 'https://tecnocrypter.com',
  logo: 'https://tecnocrypter.com/Tecno.svg',
  description: 'Plataforma líder en ciberseguridad, encriptación y tecnología blockchain.',
  foundingDate: '2024',
  sameAs: [
    'https://twitter.com/tecnocrypter',
    'https://linkedin.com/company/tecnocrypter',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Spanish',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TecnoCrypter',
  url: 'https://tecnocrypter.com',
  description: 'Plataforma líder en ciberseguridad, encriptación y tecnología blockchain.',
  publisher: {
    '@type': 'Organization',
    name: 'TecnoCrypter',
    logo: {
      '@type': 'ImageObject',
      url: 'https://tecnocrypter.com/Tecno.svg',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://tecnocrypter.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};