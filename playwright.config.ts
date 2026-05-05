import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const isCI = !!process.env.CI;

function parseBrowsersFromEnv(
  value: string | undefined
): Array<"chromium" | "firefox" | "webkit"> {
  const raw = (value ?? "").trim();
  if (!raw) return ["chromium", "firefox", "webkit"];

  const parts = raw
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);

  const allowed = new Set(["chromium", "firefox", "webkit"]);
  const browsers = parts.filter((p): p is "chromium" | "firefox" | "webkit" =>
    allowed.has(p)
  );
  return browsers.length ? browsers : ["chromium", "firefox", "webkit"];
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 4 : undefined,
  reporter: isCI ? "blob" : "html",
  use: {
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: parseBrowsersFromEnv(process.env.E2E_BROWSERS).map((browser) => {
    if (browser === "chromium")
      return { name: "chromium", use: { ...devices["Desktop Chrome"] } };
    if (browser === "firefox")
      return { name: "firefox", use: { ...devices["Desktop Firefox"] } };
    return { name: "webkit", use: { ...devices["Desktop Safari"] } };
  }),
  webServer: {
    command: "bun run start",
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI
  }
});
