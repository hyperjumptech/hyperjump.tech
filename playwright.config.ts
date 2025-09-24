import { defineConfig, devices } from "@playwright/test";

const PORT = parseInt(process.env.PORT || "3000", 10);
const baseURL = process.env.E2E_BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "e2e",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  // Always produce an HTML report so `playwright show-report` works locally and in CI artifacts
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
    baseURL,
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  webServer: {
    // Build the static export, run postbuild tasks, then serve the 'out' directory
    // Use npx (Node) instead of bunx to avoid ESM default export issues in Bun with serve
    command: `bash -c 'bun run build && bun run postbuild && npx --yes serve@latest -s out -l ${PORT}'`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 2 * 60 * 1000
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] }
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] }
    }
  ]
});
