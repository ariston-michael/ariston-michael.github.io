import { expect, test } from "@playwright/test";
import { seekScene } from "./helpers/cinema";
const widths = [
  320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440, 1920, 2560,
];
const morph = (page: import("@playwright/test").Page) =>
  page
    .locator(".cosmic-journey")
    .evaluate((e) =>
      Number((e as HTMLElement).style.getPropertyValue("--ring-morph")),
    );
for (const width of widths)
  for (const height of [430, 1000]) {
    test(`continuous reversible ring passage at ${width}x${height}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      const ring = page.locator('[data-ring="0"][data-front="true"]');
      const original = await ring.getAttribute("d");
      const node = await ring.elementHandle();
      await seekScene(page, 0.44);
      await expect
        .poll(() =>
          page
            .locator(".planet-approach")
            .evaluate(
              (e) => new DOMMatrixReadOnly(getComputedStyle(e).transform).a,
            ),
        )
        .toBeGreaterThan(
          width < 768 ? 1.5 : width < 1024 || height < 700 ? 1.9 : 3.2,
        );
      await seekScene(page, 0.62);
      await expect.poll(() => morph(page)).toBeGreaterThan(0.49);
      await expect.poll(() => morph(page)).toBeLessThan(0.52);
      expect(await ring.getAttribute("d")).not.toBe(original);
      expect(
        await node!.evaluate(
          (e) =>
            e === document.querySelector('[data-ring="0"][data-front="true"]'),
        ),
      ).toBe(true);
      await seekScene(page, 0.82);
      await expect.poll(() => morph(page)).toBeGreaterThan(0.999);
      const ys = await ring.evaluate((e) => {
        const values = e
          .getAttribute("d")!
          .match(/-?\d+(?:\.\d+)?/g)!
          .map(Number);
        return values.filter((_, i) => i % 2 === 1);
      });
      expect(Math.max(...ys) - Math.min(...ys)).toBeLessThan(0.1);
      // Fixed coordinate gradient remains valid when a path's bounding box becomes flat.
      await expect(page.locator("#rings")).toHaveAttribute(
        "gradientUnits",
        "userSpaceOnUse",
      );
      await seekScene(page, 1);
      await expect
        .poll(() =>
          page
            .locator(".cosmic-journey")
            .evaluate((e) =>
              Number(
                (e as HTMLElement).style.getPropertyValue("--trail-opacity"),
              ),
            ),
        )
        .toBeLessThan(0.001);
      const continuity = await page.locator(".cosmic-journey").evaluate((e) => {
        const sky = e
          .querySelector(".journey-backdrop")!
          .getBoundingClientRect();
        const hero = e.querySelector(".hero")!.getBoundingClientRect();
        const solar = e
          .querySelector(".solar-section")!
          .getBoundingClientRect();
        return {
          shared: sky.top <= hero.top + 1 && sky.bottom >= solar.bottom - 1,
          heroBackground: getComputedStyle(e.querySelector(".hero-stage")!)
            .backgroundColor,
          solarBackground: getComputedStyle(e.querySelector(".solar-section")!)
            .backgroundColor,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      expect(continuity).toEqual({
        shared: true,
        heroBackground: "rgba(0, 0, 0, 0)",
        solarBackground: "rgba(0, 0, 0, 0)",
        overflow: false,
      });
      await seekScene(page, 0.62);
      await expect.poll(() => morph(page)).toBeGreaterThan(0.49);
      await expect.poll(() => morph(page)).toBeLessThan(0.52);
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await expect.poll(() => morph(page)).toBe(0);
      await expect(ring).toHaveAttribute("d", original!);
    });
    test(`real reload and fragment entry at ${width}x${height}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      for (const part of [0, 0.5, 1]) {
        await page.evaluate(
          (part) =>
            scrollTo({
              top: (document.documentElement.scrollHeight - innerHeight) * part,
              behavior: "instant",
            }),
          part,
        );
        await page.reload({ waitUntil: "networkidle" });
        await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
        expect(
          await page.evaluate(
            () => performance.getEntriesByType("navigation")[0].toJSON().type,
          ),
        ).toBe("reload");
        await expect.poll(() => morph(page)).toBe(0);
      }
      await page.goto("/#contact");
      await expect(page.locator("#contact")).toBeInViewport();
      await page.reload();
      await expect(page.locator("#contact")).toBeInViewport();
      await page.goto("/#solar-system");
      await expect(page.locator("#solar-title")).toBeInViewport();
    });
  }

test("history preserves document return positions and explicit fragment traversal", async ({
  page,
}) => {
  await page.goto("/");
  const link = page.getByRole("link", {
    name: "Explore AirControl",
    exact: false,
  });
  await link.scrollIntoViewIfNeeded();
  // A genuine interaction releases the initial-document-only restoration guard.
  await page.mouse.move(100, 400);
  await page.mouse.wheel(0, 1);
  await page.waitForTimeout(150);
  await page.evaluate(() =>
    addEventListener(
      "pagehide",
      () => sessionStorage.setItem("departure-scroll", String(scrollY)),
      { once: true },
    ),
  );
  await link.click();
  await expect(page).toHaveURL(/\/projects\/aircontrol\/$/);
  const before = await page.evaluate(() =>
    Number(sessionStorage.getItem("departure-scroll")),
  );
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect
    .poll(async () => Math.abs((await page.evaluate(() => scrollY)) - before))
    .toBeLessThan(6);
  await page.goForward();
  await expect(page).toHaveURL(/\/projects\/aircontrol\/$/);
  await expect(page.locator("h1")).toBeInViewport();
  await page.goto("/#skills");
  await expect(page.locator("#skills")).toBeInViewport();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
  await page.goBack();
  await expect(page).toHaveURL(/#skills$/);
  await expect(page.locator("#skills")).toBeInViewport();
  await page.goForward();
  await expect(page.locator("#contact")).toBeInViewport();
});

test("pause and reduced motion keep a clear static scene and restore the current phase", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await seekScene(page, 0.62);
  await expect.poll(() => morph(page)).toBeGreaterThan(0.49);
  await page.locator(".motion-toggle").first().click();
  await expect.poll(() => morph(page)).toBe(0);
  await page.locator(".motion-toggle").first().click();
  await expect.poll(() => morph(page)).toBeGreaterThan(0.49);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => morph(page)).toBe(0);
  await expect(page.locator(".hero-stage")).toHaveCSS("position", "relative");
  await page
    .getByRole("button", { name: "Saturn Projects", exact: true })
    .click();
  await expect(page.locator("#solar-panel-title")).toHaveText(
    "Ideas into orbit.",
  );
});

test("client-side project return honors its explicit projects target", async ({
  page,
}) => {
  await page.goto("/projects/aircontrol/");
  const origin = await page.evaluate(() => performance.timeOrigin);
  await page.locator(".back-link").click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator("#projects")).toBeInViewport();
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(origin);
  await page.goBack();
  await expect(page).toHaveURL(/\/projects\/aircontrol\/$/);
  await expect(page.locator("h1")).toBeInViewport();
});
