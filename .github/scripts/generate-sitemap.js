const { existsSync } = require("fs");
const { writeFile } = require("fs/promises");
const { join } = require("path");
const { format } = require("prettier");
const { findAllPages } = require("./find-all-pages");

const BASE_URL = "https://hyperjump.tech";
// Next.js export directory
const OUTPUT_DIR = join(process.cwd(), "out");
const LOCALES = ["en", "id"];
const EXCLUDED_PAGES = ["_not-found", "404"];

await (async function generateSitemap() {
  if (!existsSync(OUTPUT_DIR)) {
    console.error("❌ Output directory 'out' not found.");
    return;
  }

  const sitemapUrls = findAllPages(OUTPUT_DIR)
    .filter((path) => !EXCLUDED_PAGES.includes(path))
    .filter(removePathWithLocale)
    .sort()
    .map((path) => generateSitemapURL(path).join("\n  "));

  await writeFile(
    join(OUTPUT_DIR, "sitemap.xml"),
    await format(sitemap(sitemapUrls), {
      parser: "html"
    }),
    "utf8"
  );
  console.log("✅ Sitemap generated");
})();

function removePathWithLocale(path) {
  for (const locale of LOCALES) {
    if (path.startsWith(locale)) {
      return false;
    }
  }
  return true;
}

function generateSitemapURL(path) {
  return LOCALES.map(
    (locale) =>
      `  <url>
    <loc>${BASE_URL}/${locale}${clean(path)}</loc>
    ${alternateLinks(path).join("\n    ")}
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
  );
}

function clean(path) {
  return path ? `/${path}` : "";
}

function alternateLinks(path) {
  return LOCALES.map((locale) =>
    `<xhtml:link rel="alternate" hreflang="${locale}" href="${BASE_URL}/${locale}${clean(path)}"/>`.trim()
  );
}

function sitemap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`.trim();
}
