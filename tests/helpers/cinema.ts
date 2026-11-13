import { expect, type Page } from "@playwright/test";

export async function sceneGeometry(page: Page) {
  return page.locator(".cosmic-journey").evaluate((journey) => {
    const hero = journey.querySelector<HTMLElement>(".hero")!;
    const stage = hero.querySelector<HTMLElement>(".hero-stage")!;
    const rect = hero.getBoundingClientRect();
    const pinned = getComputedStyle(stage).position === "sticky";
    if (innerWidth < 768) {
      return {
        top:
          hero.querySelector(".planet-reserve")!.getBoundingClientRect().top +
          scrollY -
          innerHeight * 0.52,
        range: Math.max(innerHeight * 0.9, rect.height * 0.75),
      };
    }
    return {
      top:
        rect.top +
        scrollY -
        (pinned ? parseFloat(getComputedStyle(stage).top) : 0),
      range: pinned
        ? rect.height - stage.offsetHeight + innerHeight * 0.55
        : rect.height * 0.85 + innerHeight * 0.4,
    };
  });
}
export async function seekScene(page: Page, progress: number) {
  await expect(page.locator(".cosmic-journey")).toHaveAttribute(
    "data-scene-ready",
    "",
  );
  // Let the software compositor present its first frame before timing motion.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  const { top, range } = await sceneGeometry(page);
  await page.evaluate(
    (y) => scrollTo({ top: y, behavior: "instant" }),
    top + range * progress,
  );
}
