import os
import re
import time
import urllib.request
import urllib.parse
import json

# Setup directories
base_dir = r"d:\Clients\tecnocrypter\tecnocrypter-platform\content\blog"
locales = ["es", "en", "fr", "pt"]

# Ensure directories exist
for locale in locales:
    os.makedirs(os.path.join(base_dir, locale), exist_ok=True)

def translate_text(text, target_lang):
    if not text.strip():
        return text
    # Avoid translating numbers or short symbols
    if re.match(r'^[0-9\s\-\_\.\,\:\;\/\(\)\"\'\&\%\$\#\@\!]+$', text):
        return text

    url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=" + target_lang + "&dt=t&q=" + urllib.parse.quote(text)
    
    # Retry logic up to 5 times
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=15) as response:
                data = json.loads(response.read().decode('utf-8'))
                # Google Translate returns segments in a list. We need to join them.
                translated_segments = []
                for segment in data[0]:
                    if segment[0]:
                        translated_segments.append(segment[0])
                translated = "".join(translated_segments)
                # Small delay to prevent rate limit
                time.sleep(0.2)
                return translated
        except Exception as e:
            print(f"Error translating '{text[:30]}...' to {target_lang} (Attempt {attempt+1}): {e}")
            time.sleep(2 ** attempt) # Exponential backoff
    
    # Return original on failure
    return text

def parse_frontmatter_tags(tags_str):
    tags_match = re.search(r'\[(.*?)\]', tags_str)
    if tags_match:
        items = re.findall(r'"([^"]*)"', tags_match.group(1))
        if not items:
            items = re.findall(r"'([^']*)'", tags_match.group(1))
        if not items:
            items = [x.strip() for x in tags_match.group(1).split(',')]
        return items
    return []

def translate_frontmatter(frontmatter, target_lang):
    new_lines = []
    in_faqs = False

    for line in frontmatter.splitlines():
        # Handle tags
        if line.startswith("tags:"):
            tags_val = line[5:].strip()
            tags = parse_frontmatter_tags(tags_val)
            translated_tags = []
            for tag in tags:
                if tag.isupper() or len(tag) <= 3:
                    translated_tags.append(tag)
                else:
                    translated_tags.append(translate_text(tag, target_lang))
            tags_str = ", ".join(f'"{t}"' for t in translated_tags)
            new_lines.append(f"tags: [{tags_str}]")
            continue

        # Handle title
        if line.startswith("title:"):
            title_match = re.match(r'^title:\s*["\'](.*)["\']\s*$', line)
            if title_match:
                title = title_match.group(1)
                trans_title = translate_text(title, target_lang).replace('"', '\\"')
                new_lines.append(f'title: "{trans_title}"')
            else:
                title = line[6:].strip()
                trans_title = translate_text(title, target_lang)
                new_lines.append(f'title: "{trans_title}"')
            continue

        # Handle excerpt
        if line.startswith("excerpt:"):
            excerpt_match = re.match(r'^excerpt:\s*["\'](.*)["\']\s*$', line)
            if excerpt_match:
                excerpt = excerpt_match.group(1)
                trans_excerpt = translate_text(excerpt, target_lang).replace('"', '\\"')
                new_lines.append(f'excerpt: "{trans_excerpt}"')
            else:
                excerpt = line[8:].strip()
                trans_excerpt = translate_text(excerpt, target_lang)
                new_lines.append(f'excerpt: "{trans_excerpt}"')
            continue

        # Check for FAQs start
        if line.strip().startswith("faqs:"):
            in_faqs = True
            new_lines.append(line)
            continue

        if in_faqs:
            if line.strip() and not line.startswith(" ") and not line.startswith("-"):
                in_faqs = False
            else:
                q_match = re.match(r'^(\s*-\s*question:\s*["\'])(.*)(["\']\s*)$', line)
                a_match = re.match(r'^(\s*answer:\s*["\'])(.*)(["\']\s*)$', line)
                if q_match:
                    prefix, q_text, suffix = q_match.groups()
                    trans_q = translate_text(q_text, target_lang).replace('"', '\\"')
                    new_lines.append(f'{prefix}{trans_q}{suffix}')
                    continue
                elif a_match:
                    prefix, a_text, suffix = a_match.groups()
                    trans_a = translate_text(a_text, target_lang).replace('"', '\\"')
                    new_lines.append(f'{prefix}{trans_a}{suffix}')
                    continue

        new_lines.append(line)

    return "\n".join(new_lines)

def translate_body(body, target_lang):
    # Extract code blocks
    code_blocks = []
    def save_code_block(match):
        code_blocks.append(match.group(0))
        return f"\n\n__CODE_BLOCK_{len(code_blocks)-1}__\n\n"
    
    # Replace code blocks with placeholders
    temp_body = re.sub(r'```[\s\S]*?```', save_code_block, body)
    
    # Chunk by paragraphs to stay under 4500 characters
    paragraphs = temp_body.split("\n\n")
    chunks = []
    current_chunk = []
    current_len = 0
    for p in paragraphs:
        if current_len + len(p) + 2 > 4000:
            chunks.append("\n\n".join(current_chunk))
            current_chunk = [p]
            current_len = len(p)
        else:
            current_chunk.append(p)
            current_len += len(p) + 2
    if current_chunk:
        chunks.append("\n\n".join(current_chunk))
        
    # Translate chunks
    translated_chunks = []
    for chunk in chunks:
        translated_chunks.append(translate_text(chunk, target_lang))
        
    translated_body = "\n\n".join(translated_chunks)
    
    # Restore code blocks
    for i, block in enumerate(code_blocks):
        # Handle varying spaces around placeholders
        pattern = r'__CODE_BLOCK_\s*' + str(i) + r'\s*__'
        translated_body = re.sub(pattern, block, translated_body)
        
    return translated_body

def translate_markdown_file(file_path, filename):
    print(f"\nProcessing {filename}...")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Split frontmatter
    parts = re.split(r'^---\s*$', content, flags=re.MULTILINE)
    if len(parts) < 3:
        print(f"Skipping {filename}: Invalid frontmatter structure.")
        return

    frontmatter = parts[1]
    body = "---".join(parts[2:])

    # Step 1: Write Spanish version directly to content/blog/es/
    es_dest = os.path.join(base_dir, "es", filename)
    with open(es_dest, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Saved Spanish version to {es_dest}")

    # Step 2: Translate for other languages
    for lang in ["en", "fr", "pt"]:
        lang_dest = os.path.join(base_dir, lang, filename)
        if os.path.exists(lang_dest):
            print(f"  Translation for {lang} already exists. Skipping.")
            continue

        print(f"  Translating to {lang}...")
        
        # Translate frontmatter
        trans_fm = translate_frontmatter(frontmatter, lang)
        
        # Translate body
        trans_body = translate_body(body, lang)
        
        # Write translated file
        with open(lang_dest, "w", encoding="utf-8") as f:
            f.write(f"---\n{trans_fm}\n---\n{trans_body}")
        
        print(f"  Saved {lang} version to {lang_dest}")

def main():
    # Find all .md files in the root of content/blog
    files = [f for f in os.listdir(base_dir) if f.endswith(".md") and os.path.isfile(os.path.join(base_dir, f))]
    print(f"Found {len(files)} files to translate in {base_dir}.")
    
    for filename in files:
        file_path = os.path.join(base_dir, filename)
        translate_markdown_file(file_path, filename)
        
    print("\nTranslation script completed!")

if __name__ == "__main__":
    main()
