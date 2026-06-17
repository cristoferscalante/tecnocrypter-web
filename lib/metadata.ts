import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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
  locale?: string;
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

// For alternate languages helper
export function getAlternateLanguages(cleanSlug: string) {
  const base = baseMetadata.siteUrl;
  const slug = cleanSlug.startsWith('/') ? cleanSlug : (cleanSlug ? `/${cleanSlug}` : '');
  return {
    'es': `${base}${slug}`,
    'en': `${base}/en${slug}`,
    'fr': `${base}/fr${slug}`,
    'pt': `${base}/pt${slug}`,
    'x-default': `${base}${slug}`,
  };
}

// Función principal para generar metadatos
export function generatePageMetadata(params: MetadataParams = {}): Metadata {
  const {
    title,
    description = baseMetadata.defaultDescription,
    slug = '',
    locale = 'es',
    image = baseMetadata.defaultImage,
    keywords = [],
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    noIndex = false,
  } = params;

  const pageTitle = title 
    ? (title.includes(baseMetadata.siteName) ? validateTitle(title) : validateTitle(`${title} | ${baseMetadata.siteName}`))
    : validateTitle(baseMetadata.defaultTitle);
  
  const validatedDescription = validateDescription(description);
  const validatedKeywords = validateKeywords(keywords);
  
  // Clean slug
  const cleanSlug = slug.startsWith('/') ? slug : (slug ? `/${slug}` : '');
  
  // URL path based on locale and slug
  const localePrefix = locale === 'es' ? '' : `/${locale}`;
  const pagePath = `${localePrefix}${cleanSlug}`;
  const pageUrl = `${baseMetadata.siteUrl}${pagePath}`;
  
  const imageUrl = image.startsWith('http') ? image : `${baseMetadata.siteUrl}${image}`;

  // For alternate languages
  const languages = getAlternateLanguages(cleanSlug);

  const metadata: Metadata = {
    metadataBase: new URL(baseMetadata.siteUrl),
    title: pageTitle,
    description: validatedDescription,
    keywords: validatedKeywords.length > 0 ? validatedKeywords.join(', ') : undefined,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1',
    
    // Open Graph
    openGraph: {
      type: type === 'product' ? 'website' : type,
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : locale === 'pt' ? 'pt_BR' : 'fr_FR',
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

    // Canonical URL and i18n
    alternates: {
      canonical: pageUrl,
      languages: languages,
    },

    // Additional meta tags
    other: {
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
    },
  };

  return metadata;
}

// Metadatos específicos para diferentes secciones
// Metadatos específicos para diferentes secciones
export function generateBlogMetadata(params: MetadataParams): Metadata {
  const locale = params.locale || 'es';
  let titleSuffix = ' | Blog TecnoCrypter';
  let defaultTitle = 'Blog TecnoCrypter';
  let defaultDesc = 'Últimas noticias, análisis y tendencias en ciberseguridad, blockchain y criptomonedas. Mantente informado con nuestros expertos.';
  
  if (locale === 'en') {
    titleSuffix = ' | Blog TecnoCrypter';
    defaultTitle = 'Blog TecnoCrypter';
    defaultDesc = 'Latest news, analysis and trends in cybersecurity, blockchain and cryptocurrencies. Stay informed with our experts.';
  } else if (locale === 'fr') {
    titleSuffix = ' | Blog TecnoCrypter';
    defaultTitle = 'Blog TecnoCrypter';
    defaultDesc = 'Dernières nouvelles, analyses et tendances en cybersécurité, blockchain et crypto-monnaies. Restez informé avec nos experts.';
  } else if (locale === 'pt') {
    titleSuffix = ' | Blog TecnoCrypter';
    defaultTitle = 'Blog TecnoCrypter';
    defaultDesc = 'Últimas notícias, análises e tendências em cibersegurança, blockchain e criptomoedas. Mantenha-se informado com nossos especialistas.';
  }

  return generatePageMetadata({
    ...params,
    type: 'article',
    title: params.title ? `${params.title}${titleSuffix}` : defaultTitle,
    description: params.description || defaultDesc,
  });
}

export function generateProductMetadata(params: MetadataParams): Metadata {
  const locale = params.locale || 'es';
  let titleSuffix = ' | Productos TecnoCrypter';
  let defaultTitle = 'Productos TecnoCrypter';
  let defaultDesc = 'Productos de ciberseguridad y encriptación de última generación. Protege tu información con nuestras soluciones avanzadas.';

  if (locale === 'en') {
    titleSuffix = ' | Products TecnoCrypter';
    defaultTitle = 'Products TecnoCrypter';
    defaultDesc = 'Next-generation cybersecurity and encryption products. Protect your information with our advanced solutions.';
  } else if (locale === 'fr') {
    titleSuffix = ' | Produits TecnoCrypter';
    defaultTitle = 'Produits TecnoCrypter';
    defaultDesc = 'Produits de cybersécurité et de chiffrement de nouvelle génération. Protégez vos informations grâce à nos solutions avancées.';
  } else if (locale === 'pt') {
    titleSuffix = ' | Produtos TecnoCrypter';
    defaultTitle = 'Produtos TecnoCrypter';
    defaultDesc = 'Produtos de cibersegurança e criptografia de última geração. Proteja suas informações com nossas soluções avançadas.';
  }

  return generatePageMetadata({
    ...params,
    type: 'product',
    title: params.title ? `${params.title}${titleSuffix}` : defaultTitle,
    description: params.description || defaultDesc,
  });
}

export function generateToolMetadata(params: MetadataParams): Metadata {
  const locale = params.locale || 'es';
  let titleSuffix = ' | Herramientas TecnoCrypter';
  let defaultTitle = 'Herramientas TecnoCrypter';
  let defaultDesc = 'Herramientas gratuitas de ciberseguridad y privacidad. Protege tu información con nuestras utilidades online.';
  let defaultKeywords = ['herramientas', 'ciberseguridad', 'privacidad', 'online', 'gratuito'];

  if (locale === 'en') {
    titleSuffix = ' | Tools TecnoCrypter';
    defaultTitle = 'Tools TecnoCrypter';
    defaultDesc = 'Free cybersecurity and privacy tools. Protect your information with our online utilities.';
    defaultKeywords = ['tools', 'cybersecurity', 'privacy', 'online', 'free'];
  } else if (locale === 'fr') {
    titleSuffix = ' | Outils TecnoCrypter';
    defaultTitle = 'Outils TecnoCrypter';
    defaultDesc = 'Outils gratuits de cybersécurité et de confidentialité. Protégez vos informations grâce à nos utilitaires en ligne.';
    defaultKeywords = ['outils', 'cybersécurité', 'confidentialité', 'en ligne', 'gratuit'];
  } else if (locale === 'pt') {
    titleSuffix = ' | Ferramentas TecnoCrypter';
    defaultTitle = 'Ferramentas TecnoCrypter';
    defaultDesc = 'Ferramentas gratuitas de cibersegurança e privacidade. Proteja suas informações com nossos utilitários online.';
    defaultKeywords = ['ferramentas', 'cibersegurança', 'privacidade', 'online', 'gratuito'];
  }

  return generatePageMetadata({
    ...params,
    title: params.title ? `${params.title}${titleSuffix}` : defaultTitle,
    description: params.description || defaultDesc,
    keywords: [...(params.keywords || []), ...defaultKeywords],
  });
}

export async function generateToolPageMetadata(slug: string, locale: string, fallbackParams: MetadataParams = {}): Promise<Metadata> {
  try {
    const t = await getTranslations({ locale, namespace: 'tools' });
    const name = t(`${slug}.name`);
    const desc = t(`${slug}.description`);
    
    let keywords: string[] | undefined = undefined;
    try {
      const rawKeywords = t.raw(`${slug}.keywords`);
      if (Array.isArray(rawKeywords)) {
        keywords = rawKeywords;
      }
    } catch (err) {
      // Ignorar si no existe la clave
    }
    
    return generateToolMetadata({
      ...fallbackParams,
      title: name || fallbackParams.title,
      description: desc || fallbackParams.description,
      keywords: keywords || fallbackParams.keywords,
      image: fallbackParams.image || `/Seo/${slug}.png`,
      slug: `tools/${slug}`,
      locale,
    });
  } catch (e) {
    return generateToolMetadata({
      ...fallbackParams,
      image: fallbackParams.image || `/Seo/${slug}.png`,
      slug: `tools/${slug}`,
      locale,
    });
  }
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