import { test, expect, Page } from "@playwright/test";

const BASE_URL = "https://hyperjump.tech/en";

test.describe("UI Regression Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("Branding: Company logo should be visible in header and footer", async ({
    page
  }) => {
    await page.goto("https://hyperjump.tech/en");

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

  //  Images
  // test("Images: all images should load correctly", async ({ page }) => {
  //   const images = page.locator("img");
  //   const count = await images.count();

  //   for (let i = 0; i < count; i++) {
  //     const img = images.nth(i);
  //     const src = await img.getAttribute("src");
  //     if (!src) continue;

  //     const loaded = await img.evaluate(
  //       (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
  //     );
  //     expect(loaded, `Image failed to load: ${src}`).toBeTruthy();
  //   }
  // });

  // Text & Content
  // test("Text & Content: key elements and section titles should be visible", async ({
  //   page
  // }) => {
  //   const expectedTexts = [
  //     "Our Services",
  //     "Case Studies",
  //     "Open Source",
  //     "FAQ",
  //     "Empowering Your Digital Transformation",
  //     "Contact"
  //   ];

  //   for (const text of expectedTexts) {
  //     await expect(page.getByText(text, { exact: false })).toBeVisible();
  //   }
  // });

  // SEO & Metadata
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

  // 7. Test Structure - Section Visibility
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

  // async function scrollToAndScreenshot(
  //   page: Page,
  //   selector: string,
  //   sectionName: string
  // ): Promise<void> {
  //   const element = page.locator(selector).first();
  //   await element.scrollIntoViewIfNeeded();
  //   await page.waitForTimeout(800);
  //   await expect(element).toBeVisible();

  //   await page.screenshot({
  //     path: `screenshots/sections-${sectionName.toLowerCase().replace(/\s+/g, "-")}.png`,
  //     fullPage: false
  //   });
  // }

  // test.describe("UI Sections Visibility & Content", () => {
  //   test.beforeEach(async ({ page }) => {
  //     await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  //   });

  //   test.describe("Hero Section", () => {
  //     test.beforeEach(async ({ page }) => {
  //       await page.goto(BASE_URL);
  //     });

  //     test("should display hero section with heading, description, and client logos", async ({
  //       page
  //     }) => {

  //       const heroSection = page.locator("#hero");
  //       await heroSection.scrollIntoViewIfNeeded();
  //       await expect(heroSection).toBeVisible();

  //       const backgroundImage = heroSection.locator(
  //         'img[alt="Hero background"]'
  //       );
  //       await expect(backgroundImage).toBeVisible();

  //       const heading = heroSection.locator("h1");
  //       await expect(heading).toBeVisible();
  //       await expect(await heading.textContent()).not.toBeNull();

  //       const description = heroSection.locator("p");
  //       await expect(description).toBeVisible();
  //       await expect(await description.textContent()).not.toBeNull();

  //       const clients = heroSection.locator("div >> nth=2 img"); // atau bisa pakai selector lebih spesifik jika ada class di Clients
  //       await expect(clients.first()).toBeVisible();
  //     });
  //   });

  //   test("Services: should display title and multiple service cards", async ({
  //     page
  //   }) => {
  //     const servicesSelector = "#services, section:has-text('Services')";
  //     await scrollToAndScreenshot(page, servicesSelector, "Services");

  //     const title = page.locator(
  //       `${servicesSelector} h2, ${servicesSelector} h3`
  //     );
  //     await expect(title).toBeVisible();
  //   });

  //   test("Case Studies: should display section and at least one case study item", async ({
  //     page
  //   }) => {
  //     const caseStudiesSelector =
  //       "#case-studies, section:has-text('Case Studies')";
  //     await scrollToAndScreenshot(page, caseStudiesSelector, "Case Studies");

  //     const items = page.locator(
  //       `${caseStudiesSelector} a, ${caseStudiesSelector} article, ${caseStudiesSelector} div:has(img)`
  //     );
  //     await expect(items.first()).toBeVisible();
  //   });

  //   test("Open Source: should be visible and show repository/project links", async ({
  //     page
  //   }) => {
  //     const openSourceSelector =
  //       "#open-source, section:has-text('Open Source')";
  //     await scrollToAndScreenshot(page, openSourceSelector, "Open Source");

  //     const repos = page.locator(`${openSourceSelector} a[href*='github.com']`);
  //     await expect(repos.first()).toBeVisible();
  //   });

  //   test("Footer: should be visible and contain company info", async ({
  //     page
  //   }) => {
  //     const footerSelector = "footer";
  //     await scrollToAndScreenshot(page, footerSelector, "Footer");

  //     const footerText = page.locator(`${footerSelector} >> text=Hyperjump`);
  //     await expect(footerText).toBeVisible();
  //   });
  // });

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

        await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

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
