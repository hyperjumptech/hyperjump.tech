const fs = require("fs");
const path = require("path");

const SERVER_URL = "https://hyperjump.tech";

function normalizePath(pagePath) {
  return pagePath.replace(/\/(en|id)$/, "");
}

function findAllPages(dir, baseDir = dir, result = new Set()) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively search directories
      findAllPages(fullPath, baseDir, result);
    } else if (file.endsWith(".html")) {
      // Found an HTML file
      const relativeDir = path.relative(baseDir, dir);
      let pagePath = path.join(
        relativeDir,
        file === "index.html" ? "" : file.replace(".html", "")
      );
      pagePath = pagePath.replace(/\\/g, "/"); // Normalize Windows paths
      const normalized = normalizePath("/" + pagePath);

      result.add(normalized);
    }
  }

  return Array.from(result);
}

async function generateSitemap() {
  const outDir = path.join(process.cwd(), "out");
  const publicDir = outDir;

  if (!fs.existsSync(outDir)) {
    console.error("❌ Output directory 'out' not found.");
    return;
  }

  const paths = findAllPages(outDir);
  const lastModified = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
   xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths
  .map((p) => {
    const basePath = p.replace(/\/en$/, "").replace(/\/id$/, "");
    return `
  <url>
    <loc>${SERVER_URL}${basePath}</loc>
    <xhtml:link
      rel="alternate"
      hreflang="en"
      href="${SERVER_URL}${basePath}"/>
    <xhtml:link
      rel="alternate"
      hreflang="id"
      href="${SERVER_URL}${basePath}/id"/>
    <lastmod>${lastModified}</lastmod>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap.trim());
  console.log("✅ Sitemap generated");
}

generateSitemap();
