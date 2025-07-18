const { readdirSync, statSync } = require("fs");
const { join, relative } = require("path");

// Improved function to find all HTML pages in the Next.js export directory
export function findAllPages(dir, baseDir = dir, result = []) {
  const files = readdirSync(dir);

  for (const file of files) {
    const fullPath = join(dir, file);

    if (statSync(fullPath).isDirectory()) {
      // Recursively search directories
      findAllPages(fullPath, baseDir, result);
    } else if (file.endsWith(".html")) {
      // Found an HTML file, this is a page
      const relativePath = relative(baseDir, dir);
      const pagePath = relativePath
        ? join(
            relativePath,
            file === "index.html" ? "" : file.replace(".html", "")
          )
        : file === "index.html"
          ? ""
          : file.replace(".html", "");

      // Skip duplicate routes (e.g., /index.html and /)
      if (!result.includes(pagePath)) {
        result.push(pagePath);
      }
    }
  }

  return result;
}
