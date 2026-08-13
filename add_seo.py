import os
import glob
import re

os.chdir('src/pages')
pages = glob.glob('*.jsx')

for page in pages:
    if page == "SEO.jsx": continue
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'import SEO from' in content: 
        continue
        
    name = page.replace('.jsx', '')
    lines = content.split('\n')
    
    # Find the last import statement
    import_indices = [i for i, l in enumerate(lines) if l.strip().startswith('import ')]
    last_import = max(import_indices) if import_indices else 0
    
    lines.insert(last_import + 1, "import SEO from '../components/SEO';")
    content = '\n'.join(lines)
    
    # Match return (, ignoring inner returns by targeting the main component export
    pattern = r"export default function.*?return\s*\(\s*(<[a-zA-Z]+[^>]*>|<>)"
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        tag_end = match.end()
        seo_tag = f'\n            <SEO title="{name}" description="Explore the {name} page of Kalpesh Katariya portfolio." />'
        content = content[:tag_end] + seo_tag + content[tag_end:]
        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Updated', page)
    else:
        print('Failed to parse', page)
