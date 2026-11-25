import { test, expect } from "@playwright/test";

for (const width of [320, 375, 768, 1440, 2560]) {
  test(`command copy stays inside the assembled hull at ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height:1000});
    await page.goto("/");
    const bounds = await page.evaluate(() => {
      const hull = document.querySelector(".vehicle-hull")!.getBoundingClientRect();
      const cap = document.querySelector(".vehicle-outline")!.getBoundingClientRect();
      const items = [...document.querySelectorAll(".command-registration,.launch-intro h1,.launch-intro p,.launch-actions,.vehicle-stages")].map(el => el.getBoundingClientRect());
      return items.every(box => box.left >= hull.left + hull.width * .09 && box.right <= hull.right - hull.width * .09 && box.top > cap.bottom && box.bottom < hull.bottom);
    });
    expect(bounds).toBe(true);
    await expect(page.getByRole("heading", {level:1})).toBeVisible();
    const stages = page.getByRole("navigation", {name:"Assembled rocket stages"});
    await expect(stages.getByRole("link")).toHaveCount(5);
    await stages.getByRole("link", {name:/02 Payload/}).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator("#projects")).toBeInViewport();
  });
}
