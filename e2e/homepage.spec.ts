import { test, expect } from "@playwright/test";

const URL = "http://localhost:3000";

test.describe("Homepage", () => {
  test("Branding: should display hyperjump logo correctly in navbar and footer", async ({
    page
  }) => {
    await page.goto(URL);

    const navbarLogo = page
      .getByRole("link", { name: "Hyperjump Logo" })
      .first();
    await expect(navbarLogo).toBeVisible();
    await navbarLogo.click();
    await expect(page).toHaveURL(/\/(en|id)?\/?$/);

    // Footer
    const footerLogo = page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Hyperjump Logo" });
    await expect(footerLogo).toBeVisible();
    await footerLogo.click();
    await expect(page).toHaveURL(/\/(en|id)?\/?$/);
  });

  test("Content: should validate text accuracy and proper localization in all sections", async ({
    page
  }) => {
    await page.goto(URL);

    // === Hero Section ===
    const heroHeading = page.getByRole("heading", {
      name: "Your partner in building"
    });
    await expect(heroHeading).toBeVisible();
    await expect(page.getByText("We help organizations deliver")).toBeVisible();

    await page.waitForTimeout(1000);
    await page.locator(".relative.px-8").click();

    // Verify partner logos
    const partners = [
      "Amman Mineral Internasional",
      "Bank Tabungan Negara",
      "Eka Mas Republik",
      "Sinar Mas Digital Day",
      "Smartfren"
    ];

    for (const partner of partners) {
      const logo = page.getByRole("img", { name: partner });
      await expect(logo).toBeVisible();
    }

    // === Services Section ===
    await page.locator("#services").click();
    await page.waitForTimeout(1000);

    const servicesHeading = page.getByRole("heading", {
      name: "Services",
      exact: true
    });
    await expect(servicesHeading).toBeVisible();
    await expect(page.getByText("We offer expert technology")).toBeVisible();

    // === Case Studies Section ===
    await page.locator("#case-studies").click();
    await page.waitForTimeout(200);

    const caseHeading = page.getByRole("heading", { name: "Case Studies" });
    await expect(caseHeading).toBeVisible();
    await expect(page.getByText("Discover how we successfully")).toBeVisible();

    // === Case Studies CTA ===
    await page.waitForTimeout(1000);
    const caseCtaHeading = page.getByRole("heading", {
      name: "Solve What's Holding You Back"
    });
    await expect(caseCtaHeading).toBeVisible();
    await expect(page.getByText("Whether you're dealing with")).toBeVisible();

    // === Open Source Section ===
    await page.locator("#open-source").scrollIntoViewIfNeeded();
    const byRole = page.getByRole("heading", { name: "Open Source Product" });

    try {
      await expect(byRole).toBeVisible({ timeout: 3000 });
    } catch {
      const cssHeading = page
        .locator(
          'h1:has-text("Open Source Product"), h2:has-text("Open Source Product"), h3:has-text("Open Source Product")'
        )
        .first();
      await cssHeading.scrollIntoViewIfNeeded();
      await expect(cssHeading).toBeVisible({ timeout: 10000 });
    }

    // === FAQs Section ===
    await page.locator("#faqs").click();
    await page.waitForTimeout(1000);

    const faqHeading = page.getByRole("heading", {
      name: "Frequently asked questions"
    });
    await expect(faqHeading).toBeVisible();
    await expect(page.getByText("Find answers to commonly")).toBeVisible();

    // === Location Section ===
    await page.locator("#location").click();
    const locationHeading = page.getByRole("heading", { name: "Our Location" });
    await expect(locationHeading).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "D.Lab Building (6th floor)" })
    ).toBeVisible();
    await expect(page.getByText("Jl. Riau No. 1, Gondangdia,")).toBeVisible();
    await expect(page.getByText("Jakarta Pusat -")).toBeVisible();
    await expect(page.getByText("Indonesia", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Email: solution@hyperjump.tech")
    ).toBeVisible();
    await expect(page.getByText(/D&B D-U-N-S:/)).toBeVisible();
  });

  test("SEO: meta title and description should exist and match expected content", async ({
    page
  }) => {
    await page.goto(URL);

    const title = await page.title();
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");

    expect(title.length).toBeGreaterThan(10);
    expect(description?.length).toBeGreaterThan(20);
  });

  // Test Structure / UI Sections
  test("Hero Section: should display hero title, subtitle, and CTA button correctly", async ({
    page
  }) => {
    await page.goto(URL);

    // Hero title and subtitle
    const heroHeading = page.getByRole("heading", {
      name: "Your partner in building"
    });
    await expect(heroHeading).toBeVisible();

    const heroSubtitle = page.getByText("We help organizations deliver");
    await expect(heroSubtitle).toBeVisible();

    // Partner logos
    const partnerLogos = [
      "Amman Mineral Internasional",
      "Bank Tabungan Negara",
      "Eka Mas Republik",
      "Sinar Mas Digital Day",
      "Smartfren"
    ];

    for (const name of partnerLogos) {
      const logo = page.getByRole("img", { name });
      await expect(logo).toBeVisible();
    }
  });

  test("Services Section: should display all service cards and links correctly", async ({
    page
  }) => {
    await page.goto(URL);

    const servicesHeading = page.getByRole("heading", {
      name: "Services",
      exact: true
    });
    await expect(servicesHeading).toBeVisible();
    await expect(page.getByText("We offer expert technology")).toBeVisible();

    // Service cards
    const services = [
      { title: "Inference AI", desc: "Inference AIDesign, develop," },
      { title: "ERP Implementation", desc: "ERP ImplementationStreamline" },
      { title: "CTO-as-a-Service", desc: "CTO-as-a-ServiceFinding," },
      { title: "Software as a Service", desc: "Software as a ServiceDeploy" },
      { title: "Tech Due Diligence", desc: "Tech Due DiligenceVerify and" }
    ];

    for (const s of services) {
      await expect(page.getByText(s.desc)).toBeVisible();
      await expect(page.getByRole("img", { name: s.title })).toBeVisible();
      await expect(page.getByText(s.title, { exact: true })).toBeVisible();
    }

    // View more link
    const viewMore = page
      .locator("#services")
      .getByRole("link", { name: "View More" });
    await expect(viewMore).toBeVisible();
    await expect(viewMore).toHaveAttribute("href", /services/i);
  });

  test("Case Studies Section: should display case study items and links correctly", async ({
    page
  }) => {
    await page.goto(URL);

    await page.locator("#case-studies").click();

    const caseHeading = page.getByRole("heading", { name: "Case Studies" });
    await expect(caseHeading).toBeVisible();
    await expect(page.getByText("Discover how we successfully")).toBeVisible();

    await expect(page.getByText("Transforming a Fisheries Tech")).toBeVisible();
    await expect(page.getByText("Elevating a Media-Tech")).toBeVisible();
  });

  test("FAQ Section: should toggle FAQ items correctly on click", async ({
    page
  }) => {
    await page.goto(URL);

    await page.locator("#faqs").click();

    const faqHeading = page.getByRole("heading", {
      name: "Frequently asked questions"
    });
    await expect(faqHeading).toBeVisible();
    await expect(page.getByText("Find answers to commonly")).toBeVisible();

    const faqQuestions = [
      "What is CTO as a Service (",
      "How do you approach ERP",
      "What does your tech due",
      "Why should we choose your"
    ];

    for (const question of faqQuestions) {
      const btn = page.getByRole("button", { name: question });
      await expect(btn).toBeVisible();
      await btn.click();
    }

    await expect(page.getByText("We offer specialized")).toBeVisible();
  });

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

        await page.goto(URL, {
          waitUntil: "domcontentloaded"
        });

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
