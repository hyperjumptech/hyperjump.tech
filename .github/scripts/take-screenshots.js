const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(process.cwd(), "screenshots");
const SERVER_URL = "http://localhost:3000"; // Use the server URL instead of file paths
const SITE_DIR = path.join(process.cwd(), "out"); // Next.js export directory

// Create screenshots directory if it doesn't exist
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Helper function for delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Improved function to find all HTML pages in the Next.js export directory
function findAllPages(dir, baseDir = dir, result = []) {
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

      // Skip duplicate routes (e.g., /index.html and /)
      if (!result.includes(pagePath)) {
        result.push(pagePath);
      }
    }
  }

  return result;
}

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

// Function to force load all images
async function forceImagesLoad(page) {
  await page.evaluate(async () => {
    // Find all image elements
    const images = Array.from(document.querySelectorAll("img"));

    // Force load all images by setting their loading attribute to eager
    images.forEach((img) => {
      img.loading = "eager";

      // If the image has data-src attribute (common in lazy loading libraries)
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });

    // Wait for all images to load
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Also resolve on error to avoid hanging
        });
      })
    );
  });
}

(async () => {
  console.log("Starting screenshot process...");

  // Launch with no-sandbox flag for GitHub Actions
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 1280, height: 800 }
  });
  const page = await browser.newPage();

  // Find all pages in the export directory
  console.log(`Looking for pages in ${SITE_DIR}...`);
  const pages = findAllPages(SITE_DIR);
  console.log(`Found ${pages.length} pages: ${pages.join(", ")}`);

  // Add the home page if it's not already in the list
  if (!pages.includes("")) {
    pages.unshift("");
  }

  for (const pagePath of pages) {
    // Create URL for the server
    const pageUrl = pagePath ? `${SERVER_URL}/${pagePath}` : SERVER_URL;
    // Create a safe filename for the screenshot
    const pageName = pagePath.replace(/\//g, "-") || "home";

    console.log(`Processing page: ${pageName} (${pageUrl})`);

    try {
      // Navigate to the page on the local server
      console.log(`Navigating to ${pageUrl}...`);
      await page.goto(pageUrl, {
        waitUntil: "networkidle0",
        timeout: 30000 // Increase timeout to 30 seconds
      });

      // Scroll through the page to load lazy images
      console.log(`Scrolling page to load lazy content...`);
      await autoScroll(page);

      // Force load all images
      console.log(`Forcing all images to load...`);
      await forceImagesLoad(page);

      // Wait for additional time to ensure images are loaded
      console.log(`Waiting for all content to load...`);
      await delay(2000);

      // Take screenshot
      const screenshotPath = path.join(OUT_DIR, `${pageName}.png`);
      console.log(`Taking screenshot: ${screenshotPath}`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      console.log(`Screenshot taken for ${pageName}`);
    } catch (error) {
      console.error(`Error taking screenshot for ${pageName}:`, error);
    }
  }

  await browser.close();
  console.log("Screenshot process completed.");
})();
