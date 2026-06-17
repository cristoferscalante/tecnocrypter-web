const fs = require('fs');
const path = require('path');

const pageFile = path.join(__dirname, '..', 'app', '[locale]', 'tools', 'page.tsx');
const seoDir = path.join(__dirname, '..', 'public', 'Seo');

const categoryFileMap = {
  'Seguridad': 'security-category.png',
  'Privacidad': 'privacy-category.png',
  'Desarrollo': 'development-category.png',
  'Utilidades': 'utilities-category.png'
};

function parseToolsAndCategories(content) {
  // Regex to extract objects inside the tools array
  // E.g., { title: "...", href: "/tools/slug", icon: ..., category: "Category" }
  const toolRegex = /\{\s*title:\s*["']([^"']+)["'],\s*description:[\s\S]*?href:\s*["']\/tools\/([^"']+)["'],[\s\S]*?category:\s*["']([^"']+)["']\s*\}/g;
  
  const tools = [];
  let match;
  while ((match = toolRegex.exec(content)) !== null) {
    tools.push({
      title: match[1],
      slug: match[2],
      category: match[3]
    });
  }
  return tools;
}

function run() {
  console.log('🚀 Starting population of tool preview images...');
  
  if (!fs.existsSync(pageFile)) {
    console.error(`Tools page file not found at: ${pageFile}`);
    process.exit(1);
  }
  
  const content = fs.readFileSync(pageFile, 'utf8');
  const tools = parseToolsAndCategories(content);
  
  console.log(`Parsed ${tools.length} tools from page.tsx.`);
  
  let copiedCount = 0;
  let skippedCount = 0;
  
  for (const tool of tools) {
    const destFileName = `${tool.slug}.png`;
    const destPath = path.join(seoDir, destFileName);
    
    // Check if the image already exists
    if (fs.existsSync(destPath)) {
      console.log(`- Image for '${tool.slug}' already exists (${destFileName}). Skipping.`);
      skippedCount++;
      continue;
    }
    
    const templateFileName = categoryFileMap[tool.category];
    if (!templateFileName) {
      console.error(`❌ Unknown category '${tool.category}' for tool: ${tool.slug}`);
      continue;
    }
    
    const srcPath = path.join(seoDir, templateFileName);
    if (!fs.existsSync(srcPath)) {
      console.error(`❌ Category template not found at: ${srcPath}`);
      continue;
    }
    
    // Copy template to destination
    fs.copyFileSync(srcPath, destPath);
    console.log(`+ Copied template '${templateFileName}' to '${destFileName}' (${tool.title})`);
    copiedCount++;
  }
  
  console.log(`\n🎉 Population completed!`);
  console.log(`  Copied: ${copiedCount}`);
  console.log(`  Skipped (already exist): ${skippedCount}`);
}

run();
