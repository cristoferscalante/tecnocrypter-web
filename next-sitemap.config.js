const fs = require('fs');
const path = require('path');

// Función para obtener todos los slugs de blogs
function getBlogSlugs() {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  
  try {
    const files = fs.readdirSync(blogDir);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => `/blog/${file.replace('.md', '')}`);
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://tecnocrypter.com",
  generateRobotsText: true,
  sitemapSize: 5000, // Reducir tamaño para mejor rendimiento
  changefreq: "weekly", // Más conservador
  priority: 0.7,
  exclude: [
    "/admin/**", 
    "/api/**", 
    "/dashboard/**",
    "/auth/**",
    "/_next/**",
    "/static/**",
    "/404", // Excluir página de error
    "/500"  // Excluir página de error del servidor
  ],
  additionalPaths: async (config) => {
    const blogSlugs = getBlogSlugs();
    return blogSlugs.map(slug => ({
      loc: slug,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
  transform: async (config, path) => {
    // Validación de URLs antes de incluir en sitemap
    const fs = require('fs');
    const pathModule = require('path');
    
    // Verificar que la página existe
    const appDir = pathModule.join(process.cwd(), 'app');
    const pagePath = path === '/' ? '/page' : path + '/page';
    const possiblePaths = [
      pathModule.join(appDir, pagePath + '.tsx'),
      pathModule.join(appDir, pagePath + '.ts'),
      pathModule.join(appDir, pagePath + '.jsx'),
      pathModule.join(appDir, pagePath + '.js')
    ];
    
    let pageExists = possiblePaths.some(p => fs.existsSync(p));

    // NUEVO: Aceptar rutas dinámicas conocidas (evitar falsos negativos)
    if (!pageExists && path !== '/') {
      const dynamicRouteChecks = [
        {
          matches: (p) => p.startsWith('/blog/'),
          files: [
            pathModule.join(appDir, 'blog', '[slug]', 'page.tsx'),
            pathModule.join(appDir, 'blog', '[slug]', 'page.ts'),
            pathModule.join(appDir, 'blog', '[slug]', 'page.jsx'),
            pathModule.join(appDir, 'blog', '[slug]', 'page.js'),
          ],
        },
        {
          matches: (p) => p.startsWith('/productos/'),
          files: [
            pathModule.join(appDir, 'productos', '[id]', 'page.tsx'),
            pathModule.join(appDir, 'productos', '[id]', 'page.ts'),
            pathModule.join(appDir, 'productos', '[id]', 'page.jsx'),
            pathModule.join(appDir, 'productos', '[id]', 'page.js'),
          ],
        },
      ];

      const matchesDynamic = dynamicRouteChecks.some(({ matches, files }) =>
        matches(path) && files.some(fp => fs.existsSync(fp))
      );

      if (matchesDynamic) {
        pageExists = true; // Considerar existente si hay ruta dinámica compatible
      }
    }

    if (!pageExists && path !== '/') {
      console.warn(`Página no encontrada para: ${path}`);
      return null; // Excluir del sitemap
    }

    // Configuración dinámica de prioridad y frecuencia de cambio
    let priority = 0.7
    let changefreq = "weekly"

    if (path === "/") {
      priority = 1.0
      changefreq = "daily"
    } else if (path.startsWith("/blog")) {
      priority = 0.8
      changefreq = "daily"
    } else if (path.startsWith("/productos")) {
      priority = 0.9
      changefreq = "weekly"
    } else if (path.startsWith("/tools/")) {
      priority = 0.7
      changefreq = "weekly"
    } else if (path === "/contacto" || path === "/sobre-nosotros") {
      priority = 0.6
      changefreq = "monthly"
    } else if (path === "/privacidad" || path === "/terminos" || path === "/cookies") {
      priority = 0.5
      changefreq = "yearly"
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/dashboard/", "/auth/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/dashboard/", "/auth/"],
      },
    ],
    additionalSitemaps: [
      "https://tecnocrypter.com/server-sitemap.xml",
    ],
  },
  autoLastmod: true,
  generateIndexSitemap: true,
};