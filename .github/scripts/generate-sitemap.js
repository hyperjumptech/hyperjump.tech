const { existsSync } = require("fs");
const { writeFile } = require("fs/promises");
const { join } = require("path");
const { findAllPages } = require("./find-all-pages");

const BASE_URL = "https://hyperjump.tech";
// Next.js export directory
const OUTPUT_DIR = join(process.cwd(), "out");

await (async function generateSitemap() {
  if (!existsSync(OUTPUT_DIR)) {
    console.error("❌ Output directory 'out' not found.");
    return;
  }

  const sitemapUrls = findAllPages(OUTPUT_DIR).map(
    (path) => ` <url>
  <loc>${BASE_URL}/${path}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
 </url>`
  );
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls.join("\n")}
</urlset>`;

  await writeFile(join(OUTPUT_DIR, "sitemap.xml"), sitemap, "utf8");
  console.log("✅ Sitemap generated");
})();
