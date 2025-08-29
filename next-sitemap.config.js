/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://tecnocrypter.com",
  generateRobotsText: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.8,
  exclude: [
    "/admin/**", 
    "/api/**", 
    "/dashboard/**",
    "/auth/**",
    "/_next/**",
    "/static/**"
  ],
  transform: async (config, path) => {
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
    } else if (path === "/contacto" || path === "/sobre-nosotros") {
      priority = 0.6
      changefreq = "monthly"
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
      "https://tecnocrypter.com/sitemap.xml",
      "https://tecnocrypter.com/server-sitemap.xml",
    ],
  },
  autoLastmod: true,
  generateIndexSitemap: true,
};