const { readdirSync, statSync } = require("fs");
const { join, relative } = require("path");

export function findAllPages(dir, baseDir = dir, result = []) {
  for (const file of readdirSync(dir)) {
    const fullPath = join(dir, file);

    if (statSync(fullPath).isDirectory()) {
      // Recursively search directories
      findAllPages(fullPath, baseDir, result);
      continue;
    }

    // HTML file is a page
    if (file.endsWith(".html")) {
      const pagePath = getPagePath(relative(baseDir, dir), file);

      // Skip duplicate routes
      if (!result.includes(pagePath)) {
        result.push(pagePath);
      }
    }
  }

  return result;
}

function getPagePath(dirPath, htmlFile) {
  const page = pageFrom(htmlFile);
  if (dirPath) {
    return join(dirPath, page);
  }

  return page;
}

function pageFrom(htmlFile) {
  if (htmlFile === "index.html") {
    return "";
  }

  return htmlFile.replace(".html", "");
}

export const LOCALES = ["en", "id"];
export const EXCLUDED_PAGES = [...LOCALES, "404", "_not-found"];

export function pathWithoutLocaleReducer(acc, path) {
  for (const locale of LOCALES) {
    if (path.startsWith(`${locale}/`)) {
      return mergePaths(acc, path.replace(`${locale}/`, ""));
    }
  }

  return mergePaths(acc, path);
}

function mergePaths(paths, path) {
  if (!paths.includes(path)) {
    return [...paths, path];
  }
  return paths;
}

export function clean(path) {
  return path ? `/${path}` : "";
}
