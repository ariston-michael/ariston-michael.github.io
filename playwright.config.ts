import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 3,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3100",
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
    command: "node scripts/preview.mjs 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 15_000,
    stdout: "ignore",
    stderr: "ignore",
  },
});
