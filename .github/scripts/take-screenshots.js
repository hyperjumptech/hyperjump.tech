const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(process.cwd(), "screenshots");
const SERVER_URL = "http://localhost:3000"; // Use the server URL instead of file paths

// Create screenshots directory if it doesn't exist
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Helper function for delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Get all HTML files from the export directory to determine pages
const getPages = (dir) => {
  const baseDir = path.join(process.cwd(), "out");
  const files = fs.readdirSync(dir);
  const pages = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      pages.push(...getPages(filePath));
    } else if (file === "index.html") {
      // Get relative path from baseDir
      const relativePath = path.relative(baseDir, dir);
      pages.push(relativePath || "");
    }
  }

  return pages;
};

// Function to scroll the page to load lazy images
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0); // Scroll back to top
          resolve();
        }
      }, 100);
    });
  });
}

(async () => {
  // Launch with no-sandbox flag for GitHub Actions
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 1280, height: 800 }
  });
  const page = await browser.newPage();

  // Get pages from the out directory
  const pages = getPages(path.join(process.cwd(), "out"));

  for (const pagePath of pages) {
    // Create URL for the server
    const pageUrl = pagePath ? `${SERVER_URL}/${pagePath}` : SERVER_URL;

    console.log(`Navigating to ${pageUrl}`);

    try {
      // Navigate to the page on the local server
      await page.goto(pageUrl, {
        waitUntil: "networkidle0",
        timeout: 30000 // Increase timeout to 30 seconds
      });

      // Scroll through the page to load lazy images
      await autoScroll(page);

      // Wait for additional time to ensure images are loaded
      await delay(2000);

      // Take screenshot
      const screenshotName = pagePath || "home";
      const screenshotPath = path.join(OUT_DIR, `${screenshotName}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      console.log(`Screenshot taken for ${screenshotName}`);
    } catch (error) {
      console.error(`Error taking screenshot for ${pagePath}:`, error);
    }
  }

  await browser.close();
})();
