const { existsSync } = require("fs");
const { writeFile, mkdir } = require("fs/promises");
const { join } = require("path");
const { findAllPages } = require("./find-all-pages");

// Next.js export directory
const OUTPUT_DIR = join(process.cwd(), "out");
const DEFAULT_LOCALE = "en";

await (async function generateSitemap() {
  if (!existsSync(OUTPUT_DIR)) {
    console.error("❌ Output directory 'out' not found.");
    return;
  }

  const pages = findAllPages(OUTPUT_DIR)
    // exclude preserved paths
    .filter((page) => !["en", "id", "404"].includes(page))
    // remove duplication
    .filter((page) => page.startsWith(`${DEFAULT_LOCALE}/`))
    // remove locale
    .map((page) => page.replace(`${DEFAULT_LOCALE}/`, ""));
  const pagesWithRootPage = ["", ...pages];

  await Promise.all(
    pagesWithRootPage.map(
      async (page) =>
        await createRedirectPage(page, `/${DEFAULT_LOCALE}/${page}`)
    )
  );
})();

async function createRedirectPage(fromPath, toPath) {
  const dir = join(OUTPUT_DIR, fromPath);

  await mkdir(dir, { recursive: true });

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=${toPath}" />
    <script>window.location.replace("${toPath}")</script>
    <title>Redirecting...</title>
  </head>
  <body>Redirecting to <a href="${toPath}">${toPath}</a></body>
</html>
`;

  await writeFile(join(dir, "index.html"), html.trim(), "utf8");
  console.log(`Generated redirect: ${fromPath} -> ${toPath}`);
}
