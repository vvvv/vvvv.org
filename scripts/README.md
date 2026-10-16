# Development News Frontmatter Swapper Script

This directory contains a Node.js utility script designed to process blog posts under **Development News** in `content/blog/`.

## Script Overview

File: [`swap-dev-news-title-desc.js`](file:///c:/Work/vvvv-visualprogramming.net/scripts/swap-dev-news-title-desc.js)

### What it does:
1. **Identifies Target Posts**: Scans `content/blog/` for markdown files categorized as `Development News` (either by directory structure `**/Development News/**/index.md` or frontmatter `categories: "Development News"`).
2. **Filters Non-Empty Descriptions**: Finds posts that have a non-empty `description` in their YAML frontmatter (47 posts identified).
3. **Preserves Hugo Permalinks**:
   - Queries `hugo list all` before modifying files to capture the exact active Hugo permalink slug for each post.
   - If a post does not currently have `slug` explicitly set in its frontmatter, the script inserts `slug: "<old-title-slug>"` using the exact Hugo slug. This guarantees that all post URLs remain 100% stable and unchanged.
4. **Swaps Title & Description**:
   - Sets `title` to the previous `description`.
   - Sets `description` to the previous `title`.
   - Preserves all other frontmatter fields, formatting, line endings, and post body markdown content.

---

## How to Use

Run the commands below from the root of the repository (`c:\Work\vvvv-visualprogramming.net`):

### 1. Preview Changes (Dry Run Mode)
Run with the `--dry-run` flag to preview all title/description swaps and generated slugs without writing any changes to disk:

```bash
node scripts/swap-dev-news-title-desc.js --dry-run
```

### 2. Apply Changes (Live Execution)
Run without flags to apply the frontmatter updates directly to the blog posts:

```bash
node scripts/swap-dev-news-title-desc.js
```

---

## Output & Verification

When executed, the script will output a summary showing:
- Total Development News posts processed and swapped (47 posts).
- Total skipped posts (posts without a description).
- A detailed sample table showing Old Title, New Title, and Locked Slug for each swapped post.
