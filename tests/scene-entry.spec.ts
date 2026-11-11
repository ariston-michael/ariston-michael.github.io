import { expect, test } from "@playwright/test";
import { sceneGeometry } from "./helpers/cinema";

for (const width of [375, 1440]) {
  test(`fragment decoration waits for its measured phase at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    let release!: () => void;
    const scripts = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route(/\/_next\/.*\.js(?:\?.*)?$/, async (route) => {
      await scripts;
      await route.continue();
    });
    try {
      await page.goto("/#solar-system", { waitUntil: "domcontentloaded" });
      await expect(page.locator("#solar-title")).toBeInViewport();
      await expect(page.locator(".cinematic-planet")).toBeHidden();
      release();
      await expect(page.locator(".cosmic-journey")).toHaveAttribute(
        "data-scene-ready",
        "",
      );
      const geometry = await sceneGeometry(page);
      const expected = await page.evaluate(
        ({ top, range }) => Math.min(1, Math.max(0, (scrollY - top) / range)),
        geometry,
      );
      await expect
        .poll(async () =>
          Math.abs(
            (await page
              .locator(".cosmic-journey")
              .evaluate((e) =>
                Number(
                  (e as HTMLElement).style.getPropertyValue("--scene-progress"),
                ),
              )) - expected,
          ),
        )
        .toBeLessThan(0.001);
      await expect(page.locator("#solar-title")).toBeInViewport();
    } finally {
      release();
    }
  });
}

test("early user scrolling is preserved when deferred hydration completes", async ({
  page,
}) => {
  let release!: () => void;
  const scripts = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(/\/_next\/.*\.js(?:\?.*)?$/, async (route) => {
    await scripts;
    await route.continue();
  });
  try {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.mouse.wheel(0, 400);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(300);
    const position = await page.evaluate(() => scrollY);
    release();
    await page.waitForLoadState("networkidle");
    await expect(page.locator(".cosmic-journey")).toHaveAttribute(
      "data-scene-ready",
      "",
    );
    expect(
      Math.abs((await page.evaluate(() => scrollY)) - position),
    ).toBeLessThan(2);
    expect(await page.evaluate(() => history.scrollRestoration)).toBe("auto");
  } finally {
    release();
  }
});
