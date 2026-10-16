const fs = require('fs');
const path = require('path');

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

console.log('[fix-export-paths] NEXT_PUBLIC_BASE_PATH:', basePath || '(none, local build)');

if (!basePath) {
  console.log('[fix-export-paths] No basePath defined, skipping post-export path fix.');
  process.exit(0);
}

const outDir = path.resolve(__dirname, '../out');
if (!fs.existsSync(outDir)) {
  console.log('[fix-export-paths] Output directory not found:', outDir);
  process.exit(0);
}

let modifiedFiles = 0;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (/\.(html|js|css|json|txt)$/.test(file)) {
      fixFile(fullPath);
    }
  }
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace src="/images/ with src="${basePath}/images/
  // Replace href="/images/ with href="${basePath}/images/
  // Replace url(/images/ or url("/images/ with url("${basePath}/images/
  // Also replace JSON/JS string literals "/images/ with "${basePath}/images/
  
  // 1. HTML attributes & links
  content = content.replace(/(src|href)=["']\/images\//g, `$1="${basePath}/images/`);
  content = content.replace(/(src|href)=["']\/logo\.png["']/g, `$1="${basePath}/logo.png"`);

  // 2. CSS url(/images/...)
  content = content.replace(/url\((['"]?)\/images\//g, `url($1${basePath}/images/`);

  // 3. JS and JSON string literals: "/images/real/..." or "/images/..."
  // Make sure not to duplicate if already prefixed
  const pattern = new RegExp(`(?<!${basePath})"/images/`, 'g');
  content = content.replace(pattern, `"${basePath}/images/`);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles++;
  }
}

walk(outDir);
console.log(`[fix-export-paths] Successfully patched ${modifiedFiles} files with basePath: ${basePath}`);
