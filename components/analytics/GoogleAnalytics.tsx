'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Interfaz para configuración de Google Analytics
interface GoogleAnalyticsProps {
  measurementId?: string;
}

// Declarar gtag en el objeto window
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

// Función para trackear eventos personalizados
export const trackEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Función para trackear conversiones
export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: 'EUR',
    });
  }
};

// Función para trackear páginas vistas
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_location: url,
      page_title: title,
    });
  }
};

// Componente principal de Google Analytics
export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const GA_MEASUREMENT_ID = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Solo ejecutar si hay GA_MEASUREMENT_ID
    if (!GA_MEASUREMENT_ID) {
      console.log('Google Analytics: No measurement ID provided');
      return;
    }

    // En desarrollo, solo mostrar log
    if (process.env.NODE_ENV !== 'production') {
      console.log('Google Analytics deshabilitado en desarrollo');
      return;
    }

    // Configurar Google Analytics cuando se carga el script
    const handleLoad = () => {
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_location: window.location.href,
        page_title: document.title,
        // Configuraciones de privacidad
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
    };

    // Si el script ya está cargado
    if (typeof window.gtag === 'function') {
      handleLoad();
    }
  }, [GA_MEASUREMENT_ID]);

  // No renderizar si no hay ID o en desarrollo
  if (!GA_MEASUREMENT_ID || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_location: window.location.href,
              page_title: document.title,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />
    </>
  );
}

// Hook personalizado para usar Google Analytics
export const useGoogleAnalytics = () => {
  const trackEvent = ({
    action,
    category,
    label,
    value,
  }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
  }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackPageView = (url: string, title?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        page_location: url,
        page_title: title,
      });
    }
  };

  const trackConversion = (conversionId: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: conversionId,
        value: value,
        currency: 'EUR',
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackConversion,
  };
};

// Eventos predefinidos para TecnoCrypter
export const TecnoCrypterEvents = {
  // Eventos de navegación
  NAVIGATE_TO_PRODUCTS: 'navigate_to_products',
  NAVIGATE_TO_BLOG: 'navigate_to_blog',
  NAVIGATE_TO_TOOLS: 'navigate_to_tools',
  
  // Eventos de herramientas
  USE_QR_GENERATOR: 'use_qr_generator',
  DOWNLOAD_QR: 'download_qr',
  
  // Eventos de contacto
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_SUCCESS: 'contact_form_success',
  
  // Eventos de productos
  VIEW_PRODUCT: 'view_product',
  PRODUCT_INQUIRY: 'product_inquiry',
  
  // Eventos de blog
  READ_ARTICLE: 'read_article',
  SHARE_ARTICLE: 'share_article',
  
  // Eventos de búsqueda
  SEARCH: 'search',
  SEARCH_RESULTS: 'search_results',
};

// Categorías de eventos
export const EventCategories = {
  NAVIGATION: 'Navigation',
  TOOLS: 'Tools',
  CONTACT: 'Contact',
  PRODUCTS: 'Products',
  BLOG: 'Blog',
  SEARCH: 'Search',
  ENGAGEMENT: 'Engagement',
};