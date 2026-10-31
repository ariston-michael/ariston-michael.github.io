import { expect, test, type Page } from "@playwright/test";

const widths = [
  320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440, 1920, 2560,
];
const scale = (page: Page) =>
  page
    .locator(".planet-approach")
    .evaluate(
      (element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).a,
    );

async function heroGeometry(page: Page) {
  return page.locator(".hero").evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const stage = element.querySelector<HTMLElement>(".hero-stage")!;
    const pinned = getComputedStyle(stage).position === "sticky";
    return {
      top:
        rect.top +
        scrollY -
        (pinned ? parseFloat(getComputedStyle(stage).top) : 0),
      height: pinned ? (rect.height - stage.offsetHeight) / 0.85 : rect.height,
    };
  });
}
async function jump(page: Page, y: number) {
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    y,
  );
}
async function assertBounded(page: Page) {
  const safe = await page.evaluate(() => {
    const copy = document.querySelector(".hero-copy")!.getBoundingClientRect();
    const stage = document.querySelector(".hero-stage")!;
    return (
      document.documentElement.scrollWidth <= innerWidth &&
      copy.left >= 0 &&
      copy.right <= innerWidth &&
      getComputedStyle(stage).overflowX === "clip" &&
      Number(getComputedStyle(document.querySelector(".hero-copy")!).zIndex) >
        Number(
          getComputedStyle(document.querySelector(".planet-scene")!).zIndex,
        )
    );
  });
  expect(safe).toBe(true);
}

for (const width of widths) {
  test(`bounded hero approach and scroll reversal at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect.poll(() => scale(page)).toBe(1);
    const hero = await heroGeometry(page);
    await jump(page, hero.top + hero.height * 0.5);
    await expect.poll(() => scale(page)).toBeGreaterThan(1.08);
    const zoomed = await scale(page);
    const limit =
      width < 768
        ? 1.551
        : width < 1024
          ? 1.951
          : width >= 1920
            ? 3.301
            : 3.601;
    expect(zoomed).toBeLessThanOrEqual(limit);
    await assertBounded(page);
    await jump(page, hero.top + hero.height);
    await expect.poll(() => scale(page)).toBeGreaterThan(zoomed);
    expect(await scale(page)).toBeLessThanOrEqual(limit);
    await assertBounded(page);
    await jump(page, 0);
    await expect.poll(() => scale(page)).toBeLessThan(1.0003);
    await assertBounded(page);
  });
}

for (const width of [1024, 1280, 1440, 1920, 2560]) {
  test(`desktop stars damp parallax and brighten near the pointer at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".star")).toHaveCount(72);
    const position = await page
      .locator(".star-point")
      .evaluateAll((elements) => {
        const index = elements.findIndex((element) => {
          const rect = element.getBoundingClientRect();
          return (
            rect.top > 180 &&
            rect.top < 700 &&
            rect.left > 70 &&
            rect.left < innerWidth * 0.35
          );
        });
        const rect = elements[index].getBoundingClientRect();
        return {
          index,
          x: rect.x + rect.width / 2,
          y: rect.y + rect.height / 2,
        };
      });
    const star = page.locator(".star-point").nth(position.index);
    await page.mouse.move(position.x, position.y);
    await expect
      .poll(() =>
        star.evaluate((element) =>
          Number(getComputedStyle(element).getPropertyValue("--proximity")),
        ),
      )
      .toBeGreaterThan(0.8);
    expect(
      await star.evaluate((element) =>
        Number(getComputedStyle(element, "::after").opacity),
      ),
    ).toBeGreaterThan(0.3);
    await expect
      .poll(() =>
        page
          .locator(".star-layer")
          .last()
          .evaluate((element) =>
            Math.abs(
              new DOMMatrixReadOnly(getComputedStyle(element).transform).m41,
            ),
          ),
      )
      .toBeGreaterThan(0.5);
    expect(
      await page
        .locator(".star-layer")
        .last()
        .evaluate((element) =>
          Math.abs(
            new DOMMatrixReadOnly(getComputedStyle(element).transform).m41,
          ),
        ),
    ).toBeLessThanOrEqual(8.01);
    // Decoration must not become a pointer target even where stars overlap content.
    expect(
      await page
        .locator(".starfield")
        .evaluate((element) => getComputedStyle(element).pointerEvents),
    ).toBe("none");
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Projects", exact: true })
      .click();
    await expect(page).toHaveURL(/#projects$/);
  });
}

test("pause, resume and live reduced-motion changes stop both controllers", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const hero = await heroGeometry(page);
  await page.mouse.move(100, 300);
  await jump(page, hero.top + hero.height * 0.5);
  await expect.poll(() => scale(page)).toBeGreaterThan(1.02);
  await page.locator(".motion-toggle").first().click();
  await expect(page.locator(".motion-toggle").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await jump(page, hero.top + hero.height * 0.3);
  await page.mouse.move(800, 200);
  expect(await scale(page)).toBe(1);
  for (const selector of [".star-layer", ".planet-approach"])
    expect(
      await page
        .locator(selector)
        .first()
        .evaluate((element) => getComputedStyle(element).transform),
    ).toBe("none");
  expect(
    await page
      .locator(".star-point")
      .evaluateAll((elements) =>
        elements.every(
          (element) => !element.style.getPropertyValue("--proximity"),
        ),
      ),
  ).toBe(true);
  await page.locator(".motion-toggle").first().click();
  await jump(page, hero.top + hero.height * 0.5);
  await expect.poll(() => scale(page)).toBeGreaterThan(1.02);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.mouse.move(100, 300);
  await jump(page, hero.top + hero.height);
  expect(await scale(page)).toBe(1);
  expect(
    await page
      .locator(".star-layer")
      .first()
      .evaluate((element) => getComputedStyle(element).transform),
  ).toBe("none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect.poll(() => scale(page)).toBeGreaterThan(1.02);
});

test("touch uses restrained scroll motion without pointer effects", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  const visible = await page
    .locator(".star-point")
    .evaluateAll(
      (elements) =>
        elements.filter(
          (element) => getComputedStyle(element).display !== "none",
        ).length,
    );
  expect(visible).toBe(36);
  await page.dispatchEvent("body", "pointermove", {
    pointerType: "touch",
    clientX: 100,
    clientY: 100,
  });
  const hero = await heroGeometry(page);
  await jump(page, hero.top + hero.height * 0.5);
  await expect.poll(() => scale(page)).toBeGreaterThan(1.08);
  expect(await scale(page)).toBeLessThanOrEqual(1.551);
  expect(
    await page
      .locator(".star-layer")
      .first()
      .evaluate(
        (element) =>
          new DOMMatrixReadOnly(getComputedStyle(element).transform).m41,
      ),
  ).toBe(0);
  expect(
    await page
      .locator(".star-point")
      .evaluateAll((elements) =>
        elements.every(
          (element) =>
            Number(element.style.getPropertyValue("--proximity")) === 0,
        ),
      ),
  ).toBe(true);
  await assertBounded(page);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Contact", exact: true })
    .tap();
  await expect(page).toHaveURL(/#contact$/);
  await context.close();
});

test("motion controller settles instead of running an idle RAF loop", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = window.requestAnimationFrame.bind(window);
    const observed = window as Window & { __observedFrames?: number };
    observed.__observedFrames = 0;
    window.requestAnimationFrame = (callback) =>
      original((time) => {
        observed.__observedFrames = (observed.__observedFrames ?? 0) + 1;
        callback(time);
      });
  });
  await page.goto("/");
  await page.mouse.move(100, 300);
  // Damping has a finite epsilon; allow its convergence, then observe a quiet interval.
  await page.waitForTimeout(1800);
  const before = await page.evaluate(
    () => (window as Window & { __observedFrames?: number }).__observedFrames,
  );
  await page.waitForTimeout(300);
  expect(
    await page.evaluate(
      () => (window as Window & { __observedFrames?: number }).__observedFrames,
    ),
  ).toBe(before);
});

test("verified contact links and honest resume state", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.locator('#contact a[href="mailto:ariston.pmichael@gmail.com"]'),
  ).toHaveCount(2);
  await expect(
    page
      .locator("#contact")
      .getByRole("link", { name: "LinkedIn", exact: true }),
  ).toHaveAttribute("href", "https://www.linkedin.com/in/ariston-michael/");
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(
    page.getByText("Spindle Strategy", { exact: true }),
  ).toBeVisible();
  // No fabricated URL is exposed while the exact resume PDF remains unavailable.
  await expect(page.locator('a[href^="/resume/"]')).toHaveCount(0);
  await expect(
    page.getByText("PDF not yet available", { exact: true }),
  ).toHaveCount(2);
});
