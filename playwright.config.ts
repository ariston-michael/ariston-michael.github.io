import { defineConfig } from "@playwright/test";
const previewPort = Number(process.env.PLAYWRIGHT_PORT ?? 3100);
const previewUrl = `http://127.0.0.1:${previewPort}`;
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  // Hosted WebKit shares a software compositor: concurrent browser processes can
  // starve requestAnimationFrame for seconds. Keep the same motion deadlines and
  // assertions, and give each CI case an exclusive rendering budget.
  workers: process.env.CI ? 1 : 3,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: previewUrl,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium", channel: process.env.PLAYWRIGHT_CHANNEL },
    },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
  webServer: {
    command: `node scripts/preview.mjs ${previewPort}`,
    url: previewUrl,
    reuseExistingServer: false,
    timeout: 15_000,
    stdout: "ignore",
    stderr: "ignore",
  },
});
