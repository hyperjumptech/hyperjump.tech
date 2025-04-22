const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(process.cwd(), "screenshots");
const SITE_DIR = path.join(process.cwd(), "out"); // Adjust if your export directory is different

// Create screenshots directory if it doesn't exist
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Get all HTML files from the export directory
const getHtmlFiles = (dir) => {
  const files = fs.readdirSync(dir);
  const htmlFiles = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      htmlFiles.push(...getHtmlFiles(filePath));
    } else if (file === "index.html") {
      // Get relative path from SITE_DIR
      const relativePath = path.relative(SITE_DIR, dir);
      htmlFiles.push(relativePath || "home");
    }
  }

  return htmlFiles;
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport size
  await page.setViewport({ width: 1280, height: 800 });

  const pages = getHtmlFiles(SITE_DIR);

  for (const pagePath of pages) {
    // Create file URL
    const filePath =
      pagePath === "home"
        ? path.join(SITE_DIR, "index.html")
        : path.join(SITE_DIR, pagePath, "index.html");

    const fileUrl = `file://${filePath}`;

    // Navigate to the page
    await page.goto(fileUrl, { waitUntil: "networkidle0" });

    // Take screenshot
    const screenshotPath = path.join(OUT_DIR, `${pagePath}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    console.log(`Screenshot taken for ${pagePath}`);
  }

  await browser.close();
})();
