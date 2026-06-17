import { GET } from '../app/sitemap.xml/route';

async function run() {
  console.log('Testing dynamic sitemap XML generation route...');
  const response = await GET();
  const xml = await response.text();
  
  if (!xml.includes('<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>')) {
    console.error('ERROR: Sitemap does not link to sitemap.xsl!');
    process.exit(1);
  } else {
    console.log('✅ Hoja de estilos sitemap.xsl vinculada correctamente.');
  }

  const locs = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
  console.log(`Total URLs generated in XML: ${locs.length}`);

  const staticUrls = locs.filter(url => !url.includes('/blog/') && !url.includes('/tools/'));
  const blogUrls = locs.filter(url => url.includes('/blog/'));
  const toolUrls = locs.filter(url => url.includes('/tools/'));

  console.log(`- Static pages: ${staticUrls.length}`);
  console.log(`- Blog posts: ${blogUrls.length}`);
  console.log(`- Tool pages: ${toolUrls.length}`);

  console.log('\nStatic Pages sample:', staticUrls.slice(0, 4));
  console.log('Blog Pages sample:', blogUrls.slice(0, 4));
  console.log('Tool Pages sample:', toolUrls.slice(0, 4));

  // Verify alternates links are present
  const linksCount = Array.from(xml.matchAll(/<xhtml:link/g)).length;
  console.log(`\nTotal hreflang alternate links found in XML: ${linksCount}`);

  // Verify presence of all 40 tools
  const uniqueTools = new Set<string>();
  toolUrls.forEach(url => {
    const match = url.match(/\/tools\/([^\/]+)$/);
    if (match) uniqueTools.add(match[1]);
  });
  console.log(`\nUnique tools found in sitemap XML: ${uniqueTools.size} (Expected: 40)`);
  if (uniqueTools.size !== 40) {
    console.warn(`WARNING: Expected 40 tools but found ${uniqueTools.size}`);
  }
}

run();
