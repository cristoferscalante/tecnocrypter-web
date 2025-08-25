/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://tusitio.com",
  generateRobotsText: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin/**", "/api/**"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://tusitio.com/sitemap.xml"],
  },
};