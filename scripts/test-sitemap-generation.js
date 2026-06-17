const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const sitemapTsPath = path.join(__dirname, '..', 'app', 'sitemap.ts');

function run() {
  console.log('Testing sitemap generation...');

  if (!fs.existsSync(sitemapTsPath)) {
    console.error(`sitemap.ts not found at: ${sitemapTsPath}`);
    process.exit(1);
  }

  // 1. Read sitemap.ts content
  const tsContent = fs.readFileSync(sitemapTsPath, 'utf8');

  // 2. Transpile TS to JS using TypeScript compiler API
  const jsContent = ts.transpileModule(tsContent, {
    compilerOptions: { 
      module: ts.ModuleKind.CommonJS, 
      target: ts.ScriptTarget.ES2020 
    }
  }).outputText;

  // 3. Mock the 'next' module and relative imports if necessary
  // Since sitemap.ts only imports { MetadataRoute } from 'next' which is just a type,
  // we can mock it as an empty object.
  const moduleMock = {
    exports: {}
  };

  const requireMock = (id) => {
    if (id === 'next') {
      return {};
    }
    return require(id);
  };

  // 4. Evaluate the transpiled code in a sandbox-like wrapper
  const scriptFunc = new Function('module', 'exports', 'require', '__dirname', '__filename', jsContent);
  
  try {
    scriptFunc(moduleMock, moduleMock.exports, requireMock, path.dirname(sitemapTsPath), sitemapTsPath);
  } catch (err) {
    console.error('Failed to execute sitemap script:', err);
    process.exit(1);
  }

  const sitemapFn = moduleMock.exports.default;
  if (typeof sitemapFn !== 'function') {
    console.error('Default export of sitemap.ts is not a function');
    process.exit(1);
  }

  // 5. Execute sitemap generator
  const urls = sitemapFn();

  console.log('\n--- Sitemap URL Summary ---');
  console.log(`Total URLs generated: ${urls.length}`);

  // Count by page types
  const staticUrls = urls.filter(u => !u.url.includes('/blog/') && !u.url.includes('/tools/'));
  const blogUrls = urls.filter(u => u.url.includes('/blog/'));
  const toolUrls = urls.filter(u => u.url.includes('/tools/'));

  console.log(`- Static pages: ${staticUrls.length}`);
  console.log(`- Blog posts: ${blogUrls.length}`);
  console.log(`- Tool pages: ${toolUrls.length}`);

  console.log('\n--- Sample URLs by category ---');
  if (staticUrls.length > 0) {
    console.log('Static Pages sample:', staticUrls.slice(0, 3).map(u => u.url));
  }
  if (blogUrls.length > 0) {
    console.log('Blog Pages sample:', blogUrls.slice(0, 3).map(u => u.url));
  }
  if (toolUrls.length > 0) {
    console.log('Tool Pages sample:', toolUrls.slice(0, 3).map(u => u.url));
  }

  // Verify alternates
  console.log('\n--- Alternate languages verification ---');
  const sampleUrl = urls[0];
  if (sampleUrl && sampleUrl.alternates) {
    console.log(`URL: ${sampleUrl.url}`);
    console.log('Alternates:', JSON.stringify(sampleUrl.alternates, null, 2));
  } else {
    console.warn('WARNING: No alternates found for URLs!');
  }

  // Verify presence of all 40 tools
  const uniqueTools = new Set();
  toolUrls.forEach(u => {
    const match = u.url.match(/\/tools\/([^\/]+)$/);
    if (match) uniqueTools.add(match[1]);
  });
  console.log(`\nUnique tools found in sitemap: ${uniqueTools.size} (Expected: 40)`);
  if (uniqueTools.size !== 40) {
    console.warn(`WARNING: Expected 40 tools but found ${uniqueTools.size}`);
  }
}

run();
