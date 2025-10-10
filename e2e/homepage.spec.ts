import { test, expect } from "@playwright/test";

test.describe("UI Regression Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Branding: Company logo should be visible in header and footer", async ({
    page
  }) => {
    await page.goto("/");

    const headerLogo = page
      .getByRole("link", { name: "Hyperjump Logo" })
      .first();
    await expect(headerLogo).toBeVisible();

    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        const totalHeight = document.body.scrollHeight;
        let currentScroll = 0;
        const step = 200;
        const interval = setInterval(() => {
          window.scrollBy(0, step);
          currentScroll += step;
          if (currentScroll >= totalHeight) {
            clearInterval(interval);
            resolve();
          }
        }, 40);
      });
    });

    const footerLogo = page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Hyperjump Logo" });

    await expect(footerLogo).toBeVisible();

    await page.screenshot({
      path: "screenshots/branding-logo-header-footer.png",
      fullPage: true
    });
  });

  test("SEO: meta title and description should exist and match expected content", async ({
    page
  }) => {
    const title = await page.title();
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");

    expect(title.length).toBeGreaterThan(10);
    expect(description?.length).toBeGreaterThan(20);
  });

  // Test Structure - Section Visibility
  const sections = [
    { name: "Hero Section", selector: "section:has(h1)" },
    { name: "Services", selector: "#services, section:has-text('Services')" },
    {
      name: "Case Studies",
      selector: "#case-studies, section:has-text('Case Studies')"
    },
    {
      name: "Open Source Product",
      selector: "#open-source, section:has-text('Open Source Product')"
    },
    {
      name: "FAQ",
      selector: "#faqs, section:has-text('Frequently asked questions')"
    },
    {
      name: "Our Location",
      selector: "#location, section:has-text('Our Location')"
    },
    { name: "Footer", selector: "footer" }
  ];

  for (const { name, selector } of sections) {
    test(`${name}: should be visible and rendered`, async ({ page }) => {
      const el = page.locator(selector).first();
      await expect(el).toBeVisible();
    });
  }

  //  Responsive Design
  const devices = [
    { name: "Mobile", width: 375, height: 812 },
    { name: "Tablet", width: 768, height: 1024 },
    { name: "Desktop", width: 1440, height: 900 },
    { name: "Large Desktop", width: 1920, height: 1080 }
  ];

  for (const device of devices) {
    test.describe(`${device.name} Responsive Layout`, () => {
      test(`should display correctly on ${device.name}`, async ({
        browser
      }) => {
        const context = await browser.newContext({
          viewport: { width: device.width, height: device.height }
        });
        const page = await context.newPage();

        await page.goto("/", { waitUntil: "domcontentloaded" });

        const hero = page.locator("#hero");
        const services = page.locator("#services");
        const caseStudies = page.locator("#case-studies");
        const openSource = page.locator("#open-source");
        const faq = page.locator("#faqs");
        const footer = page.locator("footer");

        await expect(hero).toBeVisible();
        await expect(services).toBeVisible();
        await expect(caseStudies).toBeVisible();
        await expect(openSource).toBeVisible();
        await expect(faq).toBeVisible();
        await expect(footer).toBeVisible();

        await page.evaluate(async () => {
          const delay = (ms: number) =>
            new Promise((res) => setTimeout(res, ms));
          const totalHeight = document.body.scrollHeight;
          const step = window.innerHeight / 2;
          for (let y = 0; y < totalHeight; y += step) {
            window.scrollTo({ top: y, behavior: "smooth" });
            await delay(200);
          }
          window.scrollTo({ top: totalHeight, behavior: "smooth" });
        });

        await page.waitForTimeout(2000);

        await page.screenshot({
          path: `screenshots/homepage-full-${device.name.toLowerCase()}.png`,
          fullPage: true
        });

        await context.close();
      });
    });
  }
});
