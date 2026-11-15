import { expect, test } from "@playwright/test";

for (const width of [375, 1440]) {
  test(`fragment and rocket position survive deferred hydration at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    let release!: () => void;
    const scripts = new Promise<void>(resolve => { release = resolve; });
    await page.route(/\/_next\/.*\.js(?:\?.*)?$/, async route => {
      await scripts;
      await route.continue();
    });
    try {
      await page.goto("/#education", { waitUntil: "domcontentloaded" });
      await expect(page.locator("#education-title")).toBeInViewport();
      await expect(page.locator(".rocket-module").first()).toBeDisabled();
      const position = await page.evaluate(() => scrollY);
      release();
      await expect(page.locator(".rocket-module").first()).toBeEnabled();
      await expect.poll(() => page.locator(".rocket-module").nth(3).evaluate(el => Number(el.style.getPropertyValue("--separation")))).toBe(1);
      await expect(page.locator("#education-title")).toBeInViewport();
      expect(Math.abs((await page.evaluate(() => scrollY)) - position)).toBeLessThan(2);
    } finally { release(); }
  });
}

test("early user scrolling is preserved when deferred hydration completes", async ({ page }) => {
  let release!: () => void;
  const scripts = new Promise<void>(resolve => { release = resolve; });
  await page.route(/\/_next\/.*\.js(?:\?.*)?$/, async route => {
    await scripts;
    await route.continue();
  });
  try {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    await page.mouse.move(200, 300);
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    await page.mouse.wheel(0, 400);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(400);
    const position = await page.evaluate(() => scrollY);
    release();
    await expect(page.locator(".rocket-module").first()).toBeEnabled();
    expect(Math.abs((await page.evaluate(() => scrollY)) - position)).toBeLessThan(2);
    expect(await page.evaluate(() => history.scrollRestoration)).toBe("auto");
  } finally { release(); }
});
