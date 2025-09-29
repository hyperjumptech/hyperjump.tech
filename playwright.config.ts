import { defineConfig, devices } from "@playwright/test";

const languages = ["en", "id"];
const PORT = 3001;

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  testDir: "e2e",
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [
        ["github"],
        ["html", { outputFolder: "playwright-report", open: "never" }]
      ]
    : [
        ["list"],
        ["html", { outputFolder: "playwright-report", open: "never" }]
      ],
  use: {
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },

  webServer: isProd
    ? undefined
    : {
        command: `bun run build && npx serve@latest out -l ${PORT}`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: true,
        timeout: 60 * 1000
      },

  projects: languages.flatMap((lang) => [
    {
      name: `chromium-${lang}`,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: isProd
          ? `https://hyperjump.tech/${lang}`
          : `http://localhost:${PORT}/${lang}`
      }
    },
    {
      name: `firefox-${lang}`,
      use: {
        ...devices["Desktop Firefox"],
        baseURL: isProd
          ? `https://hyperjump.tech/${lang}`
          : `http://localhost:${PORT}/${lang}`
      }
    },
    {
      name: `webkit-${lang}`,
      use: {
        ...devices["Desktop Safari"],
        baseURL: isProd
          ? `https://hyperjump.tech/${lang}`
          : `http://localhost:${PORT}/${lang}`
      }
    }
  ])
});
