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
  test("Hero Section: should display partner logos", async ({ page }) => {
    await page.goto(URL);

    const partnerLogos = [
      "Amman Mineral Internasional",
      "Bank Tabungan Negara",
      "Eka Mas Republik (MyRepublic)",
      "Sinar Mas Digital Day",
      "SMDV",
      "Smartfren",
      "IDN Media",
      "Ismaya Group",
      "Aruna",
      "Cashbac",
      "Ausvet",
      "CoHive",
      "Trimegah Sekuritas",
      "Bali United",
      "1Engage"
    ];

    for (const name of partnerLogos) {
      const logo = page.locator(`img[alt="${name}"]`).first();
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
      await expect(
        page.locator("#services").getByText(s.title, { exact: true })
      ).toBeVisible();
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

    await expect(page.getByText("Transforming a fisheries tech")).toBeVisible();
    await expect(page.getByText("Elevating a media-tech")).toBeVisible();
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
