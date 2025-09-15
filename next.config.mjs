/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
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
      // Redirecciones para páginas de contenido
      {
        source: '/noticias',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/encriptacion',
        destination: '/blog/encriptacion-end-to-end',
        permanent: true,
      },
      {
        source: '/criptomonedas',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
