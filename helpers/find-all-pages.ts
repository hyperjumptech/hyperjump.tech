import fs from "fs";
import path from "path";

function findAllPages(
  dir: string,
  baseDir: string = dir,
  result: Set<string> = new Set()
): Set<string> {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively search directories
      findAllPages(fullPath, baseDir, result);
    } else if (file.endsWith(".html")) {
      // Found an HTML file, this is a page
      const relativePath = path.relative(baseDir, dir);
      const pagePath = relativePath
        ? path.join(
            relativePath,
            file === "index.html" ? "" : file.replace(".html", "")
          )
        : file === "index.html"
          ? ""
          : file.replace(".html", "");

      // Normalize and add to set
      const normalized = normalizePath("/" + pagePath).replace(/\\/g, "/");
      result.add(normalized);
    }
  }

  return result;
}

function normalizePath(pagePath: string): string {
  return pagePath.replace(/\/(en|id)$/, "");
}

export default findAllPages;
