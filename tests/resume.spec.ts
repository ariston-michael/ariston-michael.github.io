import { test, expect } from "@playwright/test";
import { resumeUrl } from "../lib/content";
for (const width of [375, 1440]) {
  test(`resume CTA opens verified Drive target in a new tab at ${width}`, async ({
    page,
    context,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    // Signed-out live viewing was independently verified; this check isolates CTA behavior from Drive uptime.
    await context.route(resumeUrl, (route) =>
      route.fulfill({
        contentType: "text/html",
        body: "<title>Drive target</title>Resume target reached",
      }),
    );
    await page.goto("/");
    const link = page.locator(".hero-links a").filter({ hasText: "Resume" });
    const opened = context.waitForEvent("page");
    await link.click();
    const popup = await opened;
    await expect(popup).toHaveURL(resumeUrl);
    await expect(popup).toHaveTitle("Drive target");
    await expect(page).toHaveURL(/127\.0\.0\.1:3100\/$/);
    await popup.close();
  });
}
