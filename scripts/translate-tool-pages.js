const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'app', '[locale]', 'tools');

function run() {
  console.log('Starting translation of tool pages...');

  if (!fs.existsSync(toolsDir)) {
    console.error(`Tools directory not found at: ${toolsDir}`);
    process.exit(1);
  }

  const items = fs.readdirSync(toolsDir);
  let count = 0;

  for (const item of items) {
    const itemPath = path.join(toolsDir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      const pagePath = path.join(itemPath, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        processPageFile(item, pagePath);
        count++;
      }
    }
  }

  console.log(`Successfully refactored ${count} tool page files.`);
}

function processPageFile(slug, filePath) {
  console.log(`Processing tool: ${slug}`);
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Extract Client Import name and path
  const importRegex = /import\s+(\w+)\s+from\s+["'](@\/components\/tools\/[^"']+)["']/;
  const importMatch = content.match(importRegex);
  if (!importMatch) {
    console.warn(`WARNING: Could not find client component import in ${filePath}`);
    return;
  }
  const clientName = importMatch[1];
  const clientPath = importMatch[2];

  // 2. Extract generateMetadata block
  const metadataStart = content.indexOf('export async function generateMetadata');
  if (metadataStart === -1) {
    console.warn(`WARNING: Could not find generateMetadata in ${filePath}`);
    return;
  }
  const metadataEnd = content.indexOf('export default function');
  if (metadataEnd === -1) {
    console.warn(`WARNING: Could not find export default function in ${filePath}`);
    return;
  }
  const generateMetadataBlock = content.substring(metadataStart, metadataEnd).trim();

  // 3. Extract page component name
  const pageNameRegex = /export\s+default\s+function\s+(\w+)/;
  const pageNameMatch = content.match(pageNameRegex);
  if (!pageNameMatch) {
    console.warn(`WARNING: Could not find page name in ${filePath}`);
    return;
  }
  const pageName = pageNameMatch[1];

  // 4. Extract Category if specified
  const categoryRegex = /category\s*=\s*["']([^"']+)["']/;
  const categoryMatch = content.match(categoryRegex);
  const categoryProp = categoryMatch ? `category="${categoryMatch[1]}"` : '';

  // 5. Build rewritten page.tsx content
  const newContent = `import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import ${clientName} from "${clientPath}"
import { generateToolPageMetadata } from "@/lib/metadata"
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/seo/structured-data"

${generateMetadataBlock}

export default async function ${pageName}({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTools = await getTranslations({ locale, namespace: "tools" });

  const homeUrl = locale === "es" ? "https://tecnocrypter.com" : \`https://tecnocrypter.com/\${locale}\`;
  const toolsUrl = locale === "es" ? "https://tecnocrypter.com/tools" : \`https://tecnocrypter.com/\${locale}/tools\`;
  const toolUrl = locale === "es" ? "https://tecnocrypter.com/tools/${slug}" : \`https://tecnocrypter.com/\${locale}/tools/${slug}\`;

  const toolName = tTools("${slug}.name");
  const toolDesc = tTools("${slug}.description");

  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: tNav("home"), url: homeUrl },
        { name: tNav("tools"), url: toolsUrl },
        { name: toolName, url: toolUrl },
      ]} />
      <WebApplicationStructuredData
        name={\`\${toolName} - TecnoCrypter\`}
        description={toolDesc}
        url={toolUrl}
        inLanguage={locale}
        ${categoryProp}
      />
      <${clientName} />
    </>
  )
}
`;

  fs.writeFileSync(filePath, newContent, 'utf8');
}

run();
