const fs = require('fs');
const path = require('path');
const https = require('https');

const toolsDir = path.join(__dirname, '..', 'app', '[locale]', 'tools');
const messagesDir = path.join(__dirname, '..', 'messages');
const locales = ['es', 'en', 'fr', 'pt'];

function translateText(text, targetLang) {
  return new Promise((resolve) => {
    if (!text || !text.trim()) return resolve(text);
    if (/^[0-9\s\-\_\.\,\:\;\/\(\)\"\'\&\%\$\#\@\!]+$/.test(text)) {
      return resolve(text);
    }
    
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=" + targetLang + "&dt=t&q=" + encodeURIComponent(text);
    
    let attempts = 0;
    const maxAttempts = 5;
    
    function makeRequest() {
      https.get(url, { timeout: 15000 }, (res) => {
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const data = JSON.parse(rawData);
            let translatedSegments = [];
            for (const segment of data[0]) {
              if (segment[0]) {
                translatedSegments.push(segment[0]);
              }
            }
            const translated = translatedSegments.join('');
            // Small delay to prevent rate limit
            setTimeout(() => resolve(translated), 150);
          } catch (e) {
            handleError(e);
          }
        });
      }).on('error', (e) => {
        handleError(e);
      });
    }
    
    function handleError(e) {
      attempts++;
      if (attempts < maxAttempts) {
        const backoff = Math.pow(2, attempts) * 1000;
        console.warn(`Error translating '${text}' to ${targetLang} (attempt ${attempts}): ${e.message}. Retrying in ${backoff}ms...`);
        setTimeout(makeRequest, backoff);
      } else {
        console.error(`Failed to translate '${text}' to ${targetLang} after ${maxAttempts} attempts.`);
        resolve(text);
      }
    }
    
    makeRequest();
  });
}

function extractKeywords(content) {
  const match = content.match(/keywords:\s*\[([\s\S]*?)\]/);
  if (!match) return null;
  
  const rawArrayContent = match[1];
  const stringRegex = /["']([^"']+)["']/g;
  const keywords = [];
  let stringMatch;
  while ((stringMatch = stringRegex.exec(rawArrayContent)) !== null) {
    keywords.push(stringMatch[1]);
  }
  return keywords;
}

async function run() {
  console.log('🚀 Starting extraction and translation of tool keywords...');
  
  if (!fs.existsSync(toolsDir)) {
    console.error(`Tools directory not found at: ${toolsDir}`);
    process.exit(1);
  }
  
  // Read all tool page.tsx files
  const items = fs.readdirSync(toolsDir);
  const toolKeywordsMap = {};
  
  for (const item of items) {
    const itemPath = path.join(toolsDir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      const pagePath = path.join(itemPath, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        const content = fs.readFileSync(pagePath, 'utf8');
        const keywords = extractKeywords(content);
        if (keywords && keywords.length > 0) {
          toolKeywordsMap[item] = keywords;
        } else {
          console.log(`⚠️ No keywords found for tool: ${item}`);
        }
      }
    }
  }
  
  const toolsFound = Object.keys(toolKeywordsMap);
  console.log(`Found ${toolsFound.length} tools with keywords to translate.\n`);
  
  // For each locale, read common.json, update keywords, and write back
  for (const locale of locales) {
    const commonPath = path.join(messagesDir, locale, 'common.json');
    if (!fs.existsSync(commonPath)) {
      console.error(`common.json not found for locale ${locale}`);
      continue;
    }
    
    console.log(`Processing locale: ${locale}...`);
    const commonData = JSON.parse(fs.readFileSync(commonPath, 'utf8'));
    
    if (!commonData.tools) {
      commonData.tools = {};
    }
    
    for (const slug of toolsFound) {
      if (!commonData.tools[slug]) {
        console.warn(`⚠️ Tool ${slug} not found in common.json for locale ${locale}, creating placeholder`);
        commonData.tools[slug] = { name: slug, description: "" };
      }
      
      if (locale === 'es') {
        // Spanish is the source language
        commonData.tools[slug].keywords = toolKeywordsMap[slug];
      } else {
        // Translate from Spanish keywords
        const originalKeywords = toolKeywordsMap[slug];
        const translatedKeywords = [];
        console.log(`  Translating keywords for '${slug}' into ${locale}...`);
        
        for (const kw of originalKeywords) {
          const transKw = await translateText(kw, locale);
          translatedKeywords.push(transKw);
        }
        
        commonData.tools[slug].keywords = translatedKeywords;
        console.log(`    Original: [${originalKeywords.join(', ')}]`);
        console.log(`    Translated: [${translatedKeywords.join(', ')}]`);
      }
    }
    
    fs.writeFileSync(commonPath, JSON.stringify(commonData, null, 2), 'utf8');
    console.log(`✅ Saved common.json for locale: ${locale}\n`);
  }
  
  console.log('🎉 Extraction and translation of keywords completed successfully!');
}

run().catch(console.error);
