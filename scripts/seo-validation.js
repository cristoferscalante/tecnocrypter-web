#!/usr/bin/env node

/**
 * Script de validación SEO automática para TecnoCrypter
 * Ejecuta validaciones completas de SEO y genera reportes
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Configuración
const CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tecnocrypter.com',
  outputDir: path.join(process.cwd(), 'seo-reports'),
};

// Helper para encontrar archivo existente entre varias opciones
async function findExistingFile(paths) {
  for (const p of paths) {
    try {
      await fs.access(p);
      return p;
    } catch (e) {
      // continuar
    }
  }
  return null;
}

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Función para logging con colores
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Función para crear directorio de reportes
async function ensureReportDir() {
  try {
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
  } catch (error) {
    // Directorio ya existe
  }
}

// Validar estructura de archivos SEO
async function validateSEOFiles() {
  log('\n🔍 Validando archivos SEO...', 'blue');
  const results = {
    sitemap: { exists: false, valid: false, urls: 0, errors: [] },
    robots: { exists: false, valid: false, errors: [] },
    metadata: { exists: false, valid: false, errors: [] }
  };

  // Validar sitemap
  const possibleSitemapPaths = [
    path.join(process.cwd(), 'public', 'sitemap.xml'),
    path.join(process.cwd(), 'public', 'sitemap-0.xml'),
    path.join(process.cwd(), '.next', 'server', 'app', 'sitemap.xml.body')
  ];
  const sitemapPath = await findExistingFile(possibleSitemapPaths);

  if (sitemapPath) {
    try {
      const sitemapContent = await fs.readFile(sitemapPath, 'utf-8');
      results.sitemap.exists = true;
      
      // Contar URLs
      const urlMatches = sitemapContent.match(/<loc>([^<]+)<\/loc>/g);
      results.sitemap.urls = urlMatches ? urlMatches.length : 0;
      
      // Validar formato XML
      if (sitemapContent.includes('<?xml') && sitemapContent.includes('<urlset')) {
        results.sitemap.valid = true;
        log(`✅ Sitemap válido con ${results.sitemap.urls} URLs (${path.basename(sitemapPath)})`, 'green');
      } else {
        results.sitemap.errors.push('Formato XML inválido');
        log('❌ Sitemap con formato inválido', 'red');
      }
    } catch (error) {
      results.sitemap.errors.push('Error al leer sitemap');
      log('❌ Error al leer sitemap', 'red');
    }
  } else {
    results.sitemap.errors.push('Archivo no encontrado');
    log('❌ Sitemap no encontrado', 'red');
  }

  // Validar robots.txt
  const possibleRobotsPaths = [
    path.join(process.cwd(), 'public', 'robots.txt'),
    path.join(process.cwd(), '.next', 'server', 'app', 'robots.txt.body')
  ];
  const robotsPath = await findExistingFile(possibleRobotsPaths);

  if (robotsPath) {
    try {
      const robotsContent = await fs.readFile(robotsPath, 'utf-8');
      results.robots.exists = true;
      const lowerContent = robotsContent.toLowerCase();
      if (lowerContent.includes('user-agent:') && lowerContent.includes('sitemap:')) {
        results.robots.valid = true;
        log(`✅ Robots.txt válido (${path.basename(robotsPath)})`, 'green');
      } else {
        results.robots.errors.push('Formato inválido o falta información');
        log('❌ Robots.txt con formato inválido', 'red');
      }
    } catch (error) {
      results.robots.errors.push('Error al leer robots.txt');
      log('❌ Error al leer robots.txt', 'red');
    }
  } else {
    results.robots.errors.push('Archivo no encontrado');
    log('❌ Robots.txt no encontrado', 'red');
  }

  // Validar metadata.ts
  try {
    const metadataPath = path.join(process.cwd(), 'lib', 'metadata.ts');
    const metadataContent = await fs.readFile(metadataPath, 'utf-8');
    results.metadata.exists = true;
    
    if (metadataContent.includes('generatePageMetadata') && metadataContent.includes('validateTitle')) {
      results.metadata.valid = true;
      log('✅ Metadata.ts válido con validaciones', 'green');
    } else {
      results.metadata.errors.push('Faltan funciones de validación');
      log('❌ Metadata.ts sin validaciones completas', 'red');
    }
  } catch (error) {
    results.metadata.errors.push('Archivo no encontrado');
    log('❌ Metadata.ts no encontrado', 'red');
  }

  return results;
}

// Validar páginas del sitio
async function validatePages() {
  log('\n📄 Validando páginas del sitio...', 'blue');
  const appDir = path.join(process.cwd(), 'app');
  const pages = [];
  
  // Función recursiva para encontrar páginas
  async function findPages(dir, basePath = '') {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const urlPath = path.join(basePath, entry.name).replace(/\\/g, '/');
        
        if (entry.isDirectory() && !entry.name.startsWith('api')) {
          await findPages(fullPath, urlPath);
        } else if (entry.name === 'page.tsx') {
          const route = basePath === '' ? '/' : basePath;
          pages.push({
            route,
            file: fullPath,
            exists: true
          });
        }
      }
    } catch (error) {
      // Ignorar errores de acceso a directorios
    }
  }
  
  await findPages(appDir);
  
  log(`✅ Encontradas ${pages.length} páginas`, 'green');
  pages.forEach(page => {
    log(`  📄 ${page.route}`, 'cyan');
  });
  
  return pages;
}

// Validar configuración de Next.js
async function validateNextConfig() {
  log('\n⚙️ Validando configuración de Next.js...', 'blue');
  const results = {
    redirects: false,
    sitemap: false,
    errors: []
  };
  
  try {
    const configPath = path.join(process.cwd(), 'next.config.mjs');
    const configContent = await fs.readFile(configPath, 'utf-8');
    
    if (configContent.includes('async redirects()')) {
      results.redirects = true;
      log('✅ Redirecciones configuradas', 'green');
    } else {
      results.errors.push('Faltan redirecciones');
      log('❌ Redirecciones no configuradas', 'yellow');
    }
    
    // Verificar next-sitemap
    try {
      const sitemapConfigPath = path.join(process.cwd(), 'next-sitemap.config.js');
      await fs.access(sitemapConfigPath);
      results.sitemap = true;
      log('✅ Configuración de sitemap encontrada', 'green');
    } catch {
      results.errors.push('Falta configuración de sitemap');
      log('❌ Configuración de sitemap no encontrada', 'yellow');
    }
    
  } catch (error) {
    results.errors.push('Error leyendo next.config.mjs');
    log('❌ Error validando configuración de Next.js', 'red');
  }
  
  return results;
}

// Generar reporte HTML
async function generateHTMLReport(results) {
  const timestamp = new Date().toISOString();
  const reportPath = path.join(CONFIG.outputDir, `seo-report-${Date.now()}.html`);
  
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte SEO - TecnoCrypter</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 30px; }
        .success { color: #28a745; }
        .warning { color: #ffc107; }
        .error { color: #dc3545; }
        .info { color: #17a2b8; }
        .card { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        ul { list-style-type: none; padding: 0; }
        li { padding: 5px 0; }
        .icon { margin-right: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 Reporte SEO - TecnoCrypter</h1>
            <p class="info">Generado el: ${new Date(timestamp).toLocaleString('es-ES')}</p>
        </div>
        
        <div class="section">
            <h2>📊 Resumen Ejecutivo</h2>
            <div class="grid">
                <div class="card">
                    <h3>Archivos SEO</h3>
                    <ul>
                        <li><span class="icon">${results.files.sitemap.valid ? '✅' : '❌'}</span>Sitemap (${results.files.sitemap.urls} URLs)</li>
                        <li><span class="icon">${results.files.robots.valid ? '✅' : '❌'}</span>Robots.txt</li>
                        <li><span class="icon">${results.files.metadata.valid ? '✅' : '❌'}</span>Metadata</li>
                    </ul>
                </div>
                <div class="card">
                    <h3>Configuración</h3>
                    <ul>
                        <li><span class="icon">${results.config.redirects ? '✅' : '❌'}</span>Redirecciones</li>
                        <li><span class="icon">${results.config.sitemap ? '✅' : '❌'}</span>Next-Sitemap</li>
                    </ul>
                </div>
                <div class="card">
                    <h3>Páginas</h3>
                    <p><strong>${results.pages.length}</strong> páginas encontradas</p>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>📄 Páginas del Sitio</h2>
            <div class="card">
                <ul>
                    ${results.pages.map(page => `<li><span class="icon">📄</span>${page.route}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="section">
            <h2>🔧 Recomendaciones</h2>
            <div class="card">
                <ul>
                    ${results.files.sitemap.errors.length > 0 ? '<li class="error">🔴 Corregir errores en sitemap</li>' : ''}
                    ${results.files.robots.errors.length > 0 ? '<li class="error">🔴 Corregir errores en robots.txt</li>' : ''}
                    ${results.config.errors.length > 0 ? '<li class="warning">🟡 Revisar configuración de Next.js</li>' : ''}
                    <li class="info">🔵 Ejecutar validación regularmente</li>
                    <li class="info">🔵 Monitorear Google Search Console</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
  `;
  
  await fs.writeFile(reportPath, html);
  return reportPath;
}

// Función principal
async function main() {
  log('🚀 Iniciando validación SEO de TecnoCrypter...', 'magenta');
  
  try {
    await ensureReportDir();
    
    const results = {
      timestamp: new Date().toISOString(),
      files: await validateSEOFiles(),
      pages: await validatePages(),
      config: await validateNextConfig()
    };
    
    // Generar reporte JSON
    const jsonReportPath = path.join(CONFIG.outputDir, `seo-report-${Date.now()}.json`);
    await fs.writeFile(jsonReportPath, JSON.stringify(results, null, 2));
    
    // Generar reporte HTML
    const htmlReportPath = await generateHTMLReport(results);
    
    log('\n📊 Resumen de validación:', 'magenta');
    log(`✅ Archivos válidos: ${Object.values(results.files).filter(f => f.valid).length}/3`, 'green');
    log(`📄 Páginas encontradas: ${results.pages.length}`, 'blue');
    log(`⚙️ Configuraciones válidas: ${[results.config.redirects, results.config.sitemap].filter(Boolean).length}/2`, 'cyan');
    
    log('\n📁 Reportes generados:', 'magenta');
    log(`📄 JSON: ${jsonReportPath}`, 'cyan');
    log(`🌐 HTML: ${htmlReportPath}`, 'cyan');
    
    log('\n✅ Validación SEO completada!', 'green');
    
  } catch (error) {
    log(`\n❌ Error durante la validación: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { main, validateSEOFiles, validatePages, validateNextConfig };