import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Redirecciones para productos (de inglés a español)
      {
        source: '/products',
        destination: '/productos',
        permanent: true,
      },
      {
        source: '/products/:id*',
        destination: '/productos/:id*',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|pt)/products',
        destination: '/:locale/productos',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|pt)/products/:id*',
        destination: '/:locale/productos/:id*',
        permanent: true,
      },
      // Redirecciones para herramientas con nombres traducidos
      {
        source: '/tools/clean-metadata',
        destination: '/tools/limpia-metadatos',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|pt)/tools/clean-metadata',
        destination: '/:locale/tools/limpia-metadatos',
        permanent: true,
      },
      {
        source: '/tools/tracking-eliminator',
        destination: '/tools/eliminador-rastreo',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|pt)/tools/tracking-eliminator',
        destination: '/:locale/tools/eliminador-rastreo',
        permanent: true,
      },
      {
        source: '/tools/eliminador-trastreo',
        destination: '/tools/eliminador-rastreo',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|pt)/tools/eliminador-trastreo',
        destination: '/:locale/tools/eliminador-rastreo',
        permanent: true,
      },
      // Redirecciones para URLs rotas comunes
      {
        source: '/sobre-nosotros',
        destination: '/contacto',
        permanent: true, // 301 redirect
      },
      {
        source: '/acerca-de',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/herramientas',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/utilidades',
        destination: '/tools',
        permanent: true,
      },
      // Redirecciones para URLs de blog antiguas
      {
        source: '/articulos/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
      {
        source: '/noticias/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
      // Redirecciones para productos
      {
        source: '/servicios',
        destination: '/productos',
        permanent: true,
      },
      {
        source: '/catalogo',
        destination: '/productos',
        permanent: true,
      },
      // Redirecciones para herramientas
      {
        source: '/generador-contrasenas',
        destination: '/tools/generador-contrasenas',
        permanent: true,
      },
      // NOTA: /noticias, /encriptacion, /criptomonedas tienen páginas propias
      // No se redirigen para evitar conflictos con Google Search Console
    ]
  },
}

export default withNextIntl(nextConfig)
