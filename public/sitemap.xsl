<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/html401"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Sitemap XML - TecnoCrypter</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 14px;
            color: #e5e7eb;
            background-color: #030712;
            background-image: radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 400px), radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.05), transparent 400px);
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          header {
            margin-bottom: 30px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 20px;
          }
          h1 {
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 8px 0;
            letter-spacing: -0.025em;
          }
          h1 span {
            color: #8b5cf6;
          }
          p.subtitle {
            font-size: 15px;
            color: #9ca3af;
            margin: 0;
          }
          .stats {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
          }
          .stat-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 16px 24px;
            flex: 1;
            backdrop-filter: blur(10px);
          }
          .stat-val {
            font-size: 24px;
            font-weight: 700;
            color: #8b5cf6;
          }
          .stat-lbl {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-top: 4px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: rgba(255, 255, 255, 0.01);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            overflow: hidden;
            backdrop-filter: blur(10px);
          }
          th {
            background: rgba(255, 255, 255, 0.03);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            color: #ffffff;
            text-align: left;
            padding: 14px 20px;
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          tr {
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
            transition: background 0.2s ease;
          }
          tr:hover {
            background: rgba(139, 92, 246, 0.03);
          }
          td {
            padding: 14px 20px;
            vertical-align: middle;
          }
          a {
            color: #a78bfa;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          a:hover {
            color: #c084fc;
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 3px 8px;
            font-size: 11px;
            font-weight: 600;
            border-radius: 9999px;
            text-transform: uppercase;
          }
          .badge-get {
            background: rgba(16, 185, 129, 0.1);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.2);
          }
          .badge-priority {
            background: rgba(139, 92, 246, 0.1);
            color: #a78bfa;
            border: 1px solid rgba(139, 92, 246, 0.2);
          }
          .badge-lang {
            background: rgba(255, 255, 255, 0.05);
            color: #d1d5db;
            border: 1px solid rgba(255, 255, 255, 0.1);
            margin-right: 4px;
            margin-bottom: 4px;
            font-size: 10px;
            padding: 2px 6px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>Sitemap <span>XML</span></h1>
            <p class="subtitle">Indexación de contenido y traducción de TecnoCrypter. Generado automáticamente para motores de búsqueda.</p>
          </header>
          
          <div class="stats">
            <div class="stat-card">
              <div class="stat-val"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
              <div class="stat-lbl">Total URLs</div>
            </div>
            <div class="stat-card">
              <div class="stat-val"><xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/blog/')])"/></div>
              <div class="stat-lbl">Blogs</div>
            </div>
            <div class="stat-card">
              <div class="stat-val"><xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/tools/')])"/></div>
              <div class="stat-lbl">Herramientas</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th width="50%">URL</th>
                <th width="10%">Frecuencia</th>
                <th width="10%">Prioridad</th>
                <th width="15%">Idiomas</th>
                <th width="15%">Última Mod.</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}" target="_blank">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <span class="badge badge-get">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </span>
                  </td>
                  <td>
                    <span class="badge badge-priority">
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td>
                    <!-- List languages -->
                    <xsl:for-each select="*[@hreflang]">
                      <span class="badge badge-lang">
                        <xsl:value-of select="@hreflang"/>
                      </span>
                    </xsl:for-each>
                  </td>
                  <td>
                    <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
