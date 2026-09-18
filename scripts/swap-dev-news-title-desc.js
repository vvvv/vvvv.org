const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const isDryRun = process.argv.includes('--dry-run');
const blogDir = path.resolve(__dirname, '../content/blog');
const projectRoot = path.resolve(__dirname, '..');

// Helper: Hugo slugifier function matching Go Hugo's internal URLize / Slugify
function hugoSlugify(str) {
  if (!str) return '';
  // Clean quotes
  let cleaned = str.replace(/^["']|["']$/g, '').trim();
  return cleaned
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/’|'/g, '') // strip single quotes / apostrophes
    .replace(/[^a-z0-9.\-_]+/g, '-') // replace non-alphanumeric (except dot, dash, underscore) with dash
    .replace(/-+/g, '-') // collapse consecutive dashes
    .replace(/^-|-$/g, ''); // trim leading/trailing dashes
}

// Build permalink map using 'hugo list all'
function buildHugoPermalinkMap() {
  const map = new Map();
  try {
    const hugoOutput = execSync('hugo list all', { cwd: projectRoot, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const lines = hugoOutput.split('\n');
    lines.forEach(line => {
      // Hugo CSV output line: path,slug,title,date,expiryDate,publishDate,draft,permalink,resourceType,section
      const parts = line.split(',');
      if (parts.length >= 8) {
        const fileRelPath = parts[0].trim().replace(/\//g, path.sep);
        const permalink = parts[7].trim();
        if (permalink.startsWith('http://') || permalink.startsWith('https://')) {
          const urlParts = permalink.replace(/\/$/, '').split('/');
          const slug = urlParts[urlParts.length - 1];
          map.set(fileRelPath, slug);
        }
      }
    });
  } catch (err) {
    console.warn('Warning: Could not run "hugo list all". Will fallback to JS slugifier.', err.message);
  }
  return map;
}

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(full));
    } else if (file.endsWith('.md')) {
      results.push(full);
    }
  });
  return results;
}

function formatYamlValue(val) {
  if (val === null || val === undefined) return '""';
  // If already quoted properly, clean or re-quote
  let unquoted = val.trim();
  if ((unquoted.startsWith('"') && unquoted.endsWith('"')) || (unquoted.startsWith("'") && unquoted.endsWith("'"))) {
    unquoted = unquoted.slice(1, -1);
  }
  // Escape inner double quotes
  const escaped = unquoted.replace(/"/g, '\\"');
  return `"${escaped}"`;
}

function processFiles() {
  console.log(`Starting title/description swap script... ${isDryRun ? '[DRY RUN MODE]' : '[LIVE MODE]'}`);
  
  const permalinkMap = buildHugoPermalinkMap();
  console.log(`Loaded ${permalinkMap.size} permalink entries from Hugo.`);

  const markdownFiles = walkDir(blogDir);
  console.log(`Found ${markdownFiles.length} total markdown files in content/blog.`);

  let processedCount = 0;
  let skippedCount = 0;
  let updatedFiles = [];

  markdownFiles.forEach(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const fmMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n[\s\S]*)?$/);
    if (!fmMatch) return;

    const frontmatterRaw = fmMatch[1];
    const bodyContent = fmMatch[2] || '';

    // Check if Development News post
    const isDevNewsDir = filePath.includes('Development News');
    const isDevNewsCategory = /categories:\s*["']?Development News["']?/.test(frontmatterRaw);

    if (!isDevNewsDir && !isDevNewsCategory) {
      return;
    }

    // Extract title, description, slug
    const titleMatch = frontmatterRaw.match(/^title:\s*(.+)$/m);
    const descMatch = frontmatterRaw.match(/^description:\s*(.+)$/m);
    const slugMatch = frontmatterRaw.match(/^slug:\s*(.+)$/m);

    if (!titleMatch || !descMatch) {
      skippedCount++;
      return;
    }

    let rawTitle = titleMatch[1].trim();
    let rawDescription = descMatch[1].trim();
    let rawSlug = slugMatch ? slugMatch[1].trim() : null;

    // Check if description is non-empty
    let cleanDesc = rawDescription;
    if ((cleanDesc.startsWith('"') && cleanDesc.endsWith('"')) || (cleanDesc.startsWith("'") && cleanDesc.endsWith("'"))) {
      cleanDesc = cleanDesc.slice(1, -1).trim();
    }

    if (!cleanDesc || cleanDesc.length === 0) {
      skippedCount++;
      return;
    }

    let cleanTitle = rawTitle;
    if ((cleanTitle.startsWith('"') && cleanTitle.endsWith('"')) || (cleanTitle.startsWith("'") && cleanTitle.endsWith("'"))) {
      cleanTitle = cleanTitle.slice(1, -1).trim();
    }

    let hasSlug = rawSlug && rawSlug !== '""' && rawSlug !== "''" && rawSlug.length > 0;
    let finalSlug = null;

    if (!hasSlug) {
      const relPath = path.relative(projectRoot, filePath);
      const hugoSlugFromMap = permalinkMap.get(relPath);
      finalSlug = hugoSlugFromMap || hugoSlugify(cleanTitle);
    }

    // Swap title and description
    const newTitleVal = formatYamlValue(cleanDesc);
    const newDescVal = formatYamlValue(cleanTitle);

    let updatedFm = frontmatterRaw;

    // Replace title
    updatedFm = updatedFm.replace(/^title:\s*(.+)$/m, `title: ${newTitleVal}`);
    
    // Replace description
    updatedFm = updatedFm.replace(/^description:\s*(.+)$/m, `description: ${newDescVal}`);

    // Insert slug if not present
    if (!hasSlug && finalSlug) {
      const slugLine = `slug: "${finalSlug}"`;
      // Insert right after title
      if (/^title:\s*.+$/m.test(updatedFm)) {
        updatedFm = updatedFm.replace(/^title:\s*.+$/m, (match) => `${match}\n${slugLine}`);
      } else {
        updatedFm += `\n${slugLine}`;
      }
    }

    const eol = fileContent.includes('\r\n') ? '\r\n' : '\n';
    if (eol === '\r\n') {
      updatedFm = updatedFm.replace(/\n/g, '\r\n').replace(/\r\r\n/g, '\r\n');
    }

    const newContent = `---${eol}${updatedFm}${eol}---${bodyContent}`;

    processedCount++;
    const relFile = path.relative(projectRoot, filePath);
    updatedFiles.push({
      file: relFile,
      oldTitle: cleanTitle,
      newTitle: cleanDesc,
      slugAdded: !hasSlug ? finalSlug : '(existing slug)'
    });

    if (!isDryRun) {
      fs.writeFileSync(filePath, newContent, 'utf8');
    }
  });

  console.log('\n================ PROCESSING SUMMARY ================');
  console.log(`Total Development News posts processed/swapped: ${processedCount}`);
  console.log(`Skipped posts (no description or empty description): ${skippedCount}`);
  console.log('\nSample swapped posts:');
  updatedFiles.slice(0, 10).forEach((item, idx) => {
    console.log(`\n[${idx + 1}] File: ${item.file}`);
    console.log(`    Old Title (New Desc) : ${item.oldTitle}`);
    console.log(`    New Title (Old Desc) : ${item.newTitle}`);
    console.log(`    Slug                 : ${item.slugAdded}`);
  });

  if (isDryRun) {
    console.log('\n[DRY RUN] No files were changed on disk. Run without --dry-run to apply changes.');
  } else {
    console.log('\n[LIVE] Successfully updated frontmatter in all matching posts!');
  }
}

processFiles();
