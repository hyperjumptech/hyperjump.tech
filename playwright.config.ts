import { defineConfig, devices } from "@playwright/test";

const languages = ["en", "id"];
const PORT = 3000;

export default defineConfig({
  testDir: "e2e",
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 2,

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }]
  ],

  use: {
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },

  webServer: undefined,

  projects: languages.flatMap((lang) => [
    {
      name: `chromium-${lang}`,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: `http://localhost:${PORT}/${lang}`
      }
    },
    {
      name: `firefox-${lang}`,
      use: {
        ...devices["Desktop Firefox"],
        baseURL: `http://localhost:${PORT}/${lang}`
      }
    },
    {
      name: `webkit-${lang}`,
      use: {
        ...devices["Desktop Safari"],
        baseURL: `http://localhost:${PORT}/${lang}`
      }
    }
  ])
});
