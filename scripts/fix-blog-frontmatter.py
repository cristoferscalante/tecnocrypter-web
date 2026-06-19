import os
import re

base_dir = r"d:\Clients\tecnocrypter\tecnocrypter-platform\content\blog"
locales = ["es", "en", "fr", "pt"]

for locale in locales:
    locale_dir = os.path.join(base_dir, locale)
    if not os.path.exists(locale_dir):
        continue
    for filename in os.listdir(locale_dir):
        if not filename.endswith(".md"):
            continue
        file_path = os.path.join(locale_dir, filename)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        parts = re.split(r'^---\s*$', content, flags=re.MULTILINE)
        if len(parts) >= 3:
            frontmatter = parts[1]
            body = "---".join(parts[2:])
            
            # Fix 1: Remove backslash before backtick: \` -> `
            new_frontmatter = frontmatter.replace("\\`", "`")
            
            # Fix 2: Replace double backslash before quote: \\" -> \"
            new_frontmatter = new_frontmatter.replace('\\\\"', '\\"')
            
            # Reconstruct content
            content = f"---\n{new_frontmatter}\n---\n{body}"
            with open(file_path, "w", encoding="utf-8") as f_out:
                f_out.write(content)
            print(f"Fixed frontmatter for {locale}/{filename}")
