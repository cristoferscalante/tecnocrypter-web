'use client';

import { organizationSchema, websiteSchema } from '@/lib/metadata';

interface StructuredDataProps {
  type: 'website' | 'organization' | 'article' | 'product';
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let schema;

  switch (type) {
    case 'website':
      schema = websiteSchema;
      break;
    case 'organization':
      schema = organizationSchema;
      break;
    case 'article':
      if (!data) return null;
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image || 'https://tecnocrypter.com/hero.png',
        datePublished: data.publishedAt,
        dateModified: data.updatedAt || data.publishedAt,
        author: {
          '@type': 'Organization',
          name: 'TecnoCrypter',
          url: 'https://tecnocrypter.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'TecnoCrypter',
          logo: {
            '@type': 'ImageObject',
            url: 'https://tecnocrypter.com/Tecno.svg',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://tecnocrypter.com/blog/${data.slug}`,
        },
        keywords: data.tags?.join(', ') || '',
        articleSection: 'Ciberseguridad',
        inLanguage: 'es-ES',
      };
      break;
    case 'product':
      if (!data) return null;
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.name,
        description: data.description,
        image: data.images?.[0] || 'https://tecnocrypter.com/hero.png',
        brand: {
          '@type': 'Brand',
          name: 'TecnoCrypter',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'TecnoCrypter',
          url: 'https://tecnocrypter.com',
        },
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: data.currency || 'USD',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'TecnoCrypter',
          },
          acceptedPaymentMethod: [
            {
              '@type': 'PaymentMethod',
              name: 'Bitcoin',
            },
            {
              '@type': 'PaymentMethod',
              name: 'Ethereum',
            },
            {
              '@type': 'PaymentMethod',
              name: 'Tether',
            },
          ],
        },
        category: data.category || 'Ciberseguridad',
        aggregateRating: data.rating && {
          '@type': 'AggregateRating',
          ratingValue: data.rating.average,
          reviewCount: data.rating.count,
        },
      };
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}

// Componente específico para breadcrumbs
interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}

// Componente para FAQ
interface FAQStructuredDataProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}