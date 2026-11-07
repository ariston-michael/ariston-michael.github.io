import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { solarDestinations } from "../lib/solar";

for (const width of [
  320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440, 1920, 2560,
]) {
  test(`solar explorer at ${width}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const group = page.getByRole("group", {
      name: "Sun and eight planets: portfolio destinations",
    });
    await expect(group.getByRole("button")).toHaveCount(9);
    for (const world of solarDestinations) {
      const button = group.getByRole("button", {
        name: `${world.name} ${world.section}`,
        exact: true,
      });
      await button.click();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator("#solar-panel-title")).toHaveText(world.title);
      await expect(page.locator("#solar-panel a")).toHaveAttribute(
        "href",
        world.href,
      );
      const box = await button.boundingBox();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const axe = await new AxeBuilder({ page })
      .include("#solar-system")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axe.violations).toEqual([]);
    if ([320, 768, 1440, 2560].includes(width))
      await page
        .locator("#solar-system")
        .screenshot({ path: testInfo.outputPath(`solar-${width}.png`) });
  });
}

test("solar keyboard selection, direct route and cinematic skip", async ({
  page,
}) => {
  await page.goto("/");
  const earth = page.getByRole("button", {
    name: "Earth Experience",
    exact: true,
  });
  await earth.focus();
  await page.keyboard.press("Enter");
  await expect(earth).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#solar-panel-title")).toHaveText(
    "Connected to people and practice.",
  );
  await page.locator("#solar-panel a").click();
  await expect(page).toHaveURL(/#experience$/);
  await page.goto("/");
  await page.getByRole("link", { name: "Skip cinematic experience" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("#projects")).toBeInViewport();
});

test("solar touch and no-JavaScript direct fallback", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  await page
    .getByRole("button", { name: "Venus Education", exact: true })
    .tap();
  await expect(page.locator("#solar-panel-title")).toHaveText(
    "Grounded in computer science.",
  );
  await page.locator("#solar-panel a").tap();
  await expect(page).toHaveURL(/#education$/);
  await context.close();
  const staticContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const staticPage = await staticContext.newPage();
  await staticPage.goto("/");
  await expect(staticPage.locator(".solar-map")).toBeHidden();
  await expect(staticPage.locator(".hero-stage")).toHaveCSS(
    "position",
    "relative",
  );
  await staticPage
    .getByRole("navigation", { name: "Solar system direct navigation" })
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(staticPage).toHaveURL(/#projects$/);
  await staticContext.close();
});

test("cinematic pinning, maximum approach, camera depth and reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".hero-stage")).toHaveCSS("position", "sticky");
  const distance = await page
    .locator(".hero")
    .evaluate(
      (element) =>
        element.getBoundingClientRect().height -
        element.querySelector<HTMLElement>(".hero-stage")!.offsetHeight,
    );
  await page.evaluate(
    (y) => scrollTo({ top: y, behavior: "instant" }),
    distance,
  );
  await expect
    .poll(() =>
      page
        .locator(".planet-approach")
        .evaluate(
          (element) =>
            new DOMMatrixReadOnly(getComputedStyle(element).transform).a,
        ),
    )
    .toBeGreaterThan(3.5);
  expect(
    await page
      .locator(".star-layer")
      .last()
      .evaluate(
        (element) =>
          new DOMMatrixReadOnly(getComputedStyle(element).transform).a,
      ),
  ).toBeGreaterThan(1.1);
  const protectedCopy = await page
    .locator(".hero-actions a")
    .first()
    .evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return element.contains(
        document.elementFromPoint(
          rect.x + rect.width / 2,
          rect.y + rect.height / 2,
        ),
      );
    });
  expect(protectedCopy).toBe(true);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await expect
    .poll(() =>
      page
        .locator(".planet-approach")
        .evaluate(
          (element) =>
            new DOMMatrixReadOnly(getComputedStyle(element).transform).a,
        ),
    )
    .toBeLessThan(1.001);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".hero-stage")).toHaveCSS("position", "relative");
  await expect(page.locator(".planet-approach")).toHaveCSS("transform", "none");
  await page
    .getByRole("button", { name: "Saturn Projects", exact: true })
    .click();
  await expect(page.locator("#solar-panel-title")).toHaveText(
    "Ideas into orbit.",
  );
});
