import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

// Next.js export directory
const OUTPUT_DIR = join(process.cwd(), "out");
// Staging directory pushed to hyperjumptech/oneaisystem.tech
const DEPLOY_DIR = join(process.cwd(), "out-oneai");

const LOCALES = ["en", "id"];
const DEFAULT_LOCALE = "en";
const PAGE = "oneai";

if (!existsSync(OUTPUT_DIR)) {
  console.error("❌ Output directory 'out' not found.");
  process.exit(1);
}

await rm(DEPLOY_DIR, { recursive: true, force: true });
await mkdir(DEPLOY_DIR, { recursive: true });

// 1. Shared assets (_next, images, documents, icons, videos, etc.)
//    Everything from public/ plus generated assets — other pages and
//    redirect pages are NOT copied, this deploy is OneAI-only.
for (const entry of await readdir(join(process.cwd(), "public"))) {
  const src = join(OUTPUT_DIR, entry);
  if (!existsSync(src)) continue;
  await cp(src, join(DEPLOY_DIR, entry), { recursive: true });
  console.info(`Copied asset: /${entry}`);
}
for (const generated of ["_next", "favicon.ico"]) {
  const src = join(OUTPUT_DIR, generated);
  if (!existsSync(src)) continue;
  await cp(src, join(DEPLOY_DIR, generated), { recursive: true });
  console.info(`Copied asset: /${generated}`);
}

// 2. OneAI page per locale: /<locale>/{page}/
//    Path must match the canonical URLs baked into the HTML (e.g.
//    https://oneaisystem.tech/id/oneai) so hreflang alternates and the
//    language picker resolve correctly.
for (const locale of LOCALES) {
  const src = join(OUTPUT_DIR, locale, `${PAGE}.html`);
  const dest = join(DEPLOY_DIR, locale, PAGE);

  if (!existsSync(src)) {
    console.error(`❌ OneAI page not found for locale: ${locale}`);
    process.exit(1);
  }
  await mkdir(dest, { recursive: true });
  await cp(src, join(dest, "index.html"));
  console.info(`Copied page: /${locale}/${PAGE}`);
}

// Client-side redirect page (GitHub Pages has no server-side 301)
async function writeRedirect(dir, redirectTarget) {
  await mkdir(dir, { recursive: true });
  await writeFile(
    join(dir, "index.html"),
    [
      "<!DOCTYPE html>",
      "<html>",
      "  <head>",
      `    <meta http-equiv="refresh" content="0; url=${redirectTarget}" />`,
      `    <script>window.location.replace("${redirectTarget}")</script>`,
      "    <title>Redirecting...</title>",
      "  </head>",
      `  <body>Redirecting to <a href="${redirectTarget}">${redirectTarget}</a></body>`,
      "</html>"
    ].join("\n"),
    "utf8"
  );
  console.info(`Copied redirect: ${dir} -> ${redirectTarget}`);
}

// 3. Root page: redirect to the OneAI page of the default locale
//    (oneaisystem.tech/ -> /en/oneai). No content copy at / — the only
//    real pages in this deploy are /en/oneai and /id/oneai.
await writeRedirect(DEPLOY_DIR, `/${DEFAULT_LOCALE}/${PAGE}`);

// 4. Locale roots: /<locale>/ -> /<locale>/oneai/
//    Client-side redirects for visitors landing on /id (e.g. after using
//    the language picker at the site root, where the pathname is "/" and
//    the picker builds "/id").
for (const locale of LOCALES) {
  await writeRedirect(join(DEPLOY_DIR, locale), `/${locale}/${PAGE}`);
}

// 5. GitHub Pages custom domain for the target repository
await writeFile(join(DEPLOY_DIR, "CNAME"), "oneaisystem.tech\n", "utf8");
// Skip Jekyll processing so the _next directory is served as-is
await writeFile(join(DEPLOY_DIR, ".nojekyll"), "", "utf8");

console.info("✅ OneAI static deploy staging prepared");
