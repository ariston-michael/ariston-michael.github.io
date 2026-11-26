import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { cardLinks, cardProfile, vCardPath } from "../lib/card";

const widths = [320, 360, 375, 390, 414, 430, 768, 1024, 1440];
const actionOrder = ["linkedin", "github", "portfolio", "email", "save"];

async function openCard(page: Page, width: number, height = 860) {
  await page.setViewportSize({ width, height });
  const failures: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
  });
  await page.goto("/card/");
  return failures;
}

test.describe("Ariston OS contact card", () => {
  for (const width of widths) {
    test(`fits and stays tappable at ${width}px`, async ({ page }) => {
      const failures = await openCard(page, width);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(cardProfile.fullName);
      const overflow = await page.evaluate(() => {
        const viewport = document.documentElement.clientWidth;
        const outside = [...document.querySelectorAll<HTMLElement>("main, main *")]
          .filter((el) => {
            if (el.closest("svg") && el.tagName !== "svg") return false;
            const rect = el.getBoundingClientRect();
            if (!rect.width || !rect.height) return false;
            if (getComputedStyle(el).clipPath === "inset(50%)") return false;
            return rect.left < -1 || rect.right > viewport + 1;
          })
          .map((el) => el.className.toString().slice(0, 40));
        return { outside, scroll: document.documentElement.scrollWidth - innerWidth };
      });
      expect(overflow.outside).toEqual([]);
      expect(overflow.scroll).toBeLessThanOrEqual(0);

      const actions = page.locator("[data-action]");
      await expect(actions).toHaveCount(5);
      for (const action of await actions.all()) {
        const box = await action.boundingBox();
        expect(box?.height ?? 0).toBeGreaterThanOrEqual(56);
        expect(box?.width ?? 0).toBeGreaterThanOrEqual(240);
        const clipped = await action.evaluate(
          (el) => [...el.querySelectorAll<HTMLElement>(":scope > span:not([class*=srOnly]), :scope > span > span")].some((s) => s.scrollWidth > s.clientWidth + 1),
        );
        expect(clipped).toBe(false);
      }
      expect(failures).toEqual([]);
    });
  }

  test("all five actions fit in the first screen of a common phone", async ({ page }) => {
    await openCard(page, 390, 844);
    for (const id of actionOrder) {
      const box = await page.locator(`[data-action="${id}"]`).boundingBox();
      expect((box?.y ?? Infinity) + (box?.height ?? 0)).toBeLessThanOrEqual(844);
    }
  });

  test("links use verified destinations and safe attributes", async ({ page }) => {
    await openCard(page, 390);
    for (const link of cardLinks) {
      const anchor = page.locator(`[data-action="${link.id}"]`);
      await expect(anchor).toHaveAttribute("href", link.href);
      await expect(anchor).toContainText(link.label);
      if (link.external) {
        await expect(anchor).toHaveAttribute("target", "_blank");
        await expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
        await expect(anchor).toHaveAccessibleName(new RegExp(`${link.label}.*opens in a new tab`));
      } else {
        await expect(anchor).not.toHaveAttribute("target", /.+/);
      }
    }
    await expect(page.locator('[data-action="linkedin"]')).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/ariston-michael/",
    );
    await expect(page.locator('[data-action="github"]')).toHaveAttribute("href", "https://github.com/ariston-michael");
    await expect(page.locator('[data-action="email"]')).toHaveAttribute("href", "mailto:ariston.pmichael@gmail.com");
    const save = page.locator('[data-action="save"]');
    await expect(save).toHaveAttribute("href", vCardPath);
    await expect(save).toHaveAttribute("download", "ariston-michael.vcf");
    // No phone link anywhere on the card.
    await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  });

  test("portfolio action navigates to the homepage", async ({ page }) => {
    await openCard(page, 390);
    await page.locator('[data-action="portfolio"]').click();
    await expect(page).toHaveURL(/127\.0\.0\.1:\d+\/$/);
  });

  test("serves an importable vCard 3.0 without a phone number", async ({ request }) => {
    const response = await request.get(vCardPath);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/vcard");
    const text = await response.text();
    expect(text.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n")).toBe(true);
    expect(text.endsWith("END:VCARD\r\n")).toBe(true);
    const lines = text.split("\r\n").slice(0, -1);
    for (const line of lines) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
    const unfolded = text.replace(/\r\n /g, "");
    expect(unfolded).toContain("\r\nN:Michael;Ariston;;;\r\n");
    expect(unfolded).toContain("\r\nFN:Ariston Michael\r\n");
    expect(unfolded).toContain("\r\nEMAIL;TYPE=INTERNET,PREF:ariston.pmichael@gmail.com\r\n");
    expect(unfolded).toContain("URL:https://www.linkedin.com/in/ariston-michael/\r\n");
    expect(unfolded).toContain("URL:https://github.com/ariston-michael\r\n");
    expect(unfolded).toContain("URL:https://ariston-michael.github.io\r\n");
    expect(unfolded).toContain("Sheridan College");
    expect(unfolded).not.toMatch(/^TEL/m);
    expect(unfolded).not.toMatch(/\+?\d[\d\s().-]{8,}\d/);
  });

  test("Save Contact downloads the .vcf file", async ({ page, browserName }) => {
    test.skip(browserName === "webkit", "Desktop WebKit opens vCards in place; iOS behaviour needs a physical device.");
    await openCard(page, 390);
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.locator('[data-action="save"]').click(),
    ]);
    expect(download.suggestedFilename()).toBe("ariston-michael.vcf");
  });

  test("shows the documented portrait or an accessible placeholder", async ({ page }) => {
    const failures = await openCard(page, 390);
    const frame = page.locator("[data-portrait]");
    await expect(frame).toHaveCount(1);
    const kind = await frame.getAttribute("data-portrait");
    if (kind === "photo") {
      await expect(frame).toHaveAttribute("src", "/images/ariston-profile.webp");
      await expect(frame).toHaveAttribute("alt", /Ariston Michael/);
      expect(await frame.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    } else {
      await expect(frame).toHaveAttribute("role", "img");
      await expect(frame).toHaveAccessibleName(/placeholder for Ariston Michael/);
      await expect(page.locator("main img")).toHaveCount(0);
    }
    expect(failures).toEqual([]);
  });

  test("keyboard order follows the visual order with a visible focus ring", async ({ page, browserName }) => {
    // macOS WebKit only moves focus to links with Option+Tab (Safari default), as in portfolio.spec.ts.
    const tab = browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab";
    await openCard(page, 390);
    await page.keyboard.press(tab);
    await expect(page.locator(".skip-link")).toBeFocused();
    for (const id of actionOrder) {
      await page.keyboard.press(tab);
      const action = page.locator(`[data-action="${id}"]`);
      await expect(action).toBeFocused();
      const outline = await action.evaluate((el) => {
        const style = getComputedStyle(el);
        return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
      });
      expect(outline.style).toBe("solid");
      expect(outline.width).toBeGreaterThanOrEqual(2);
    }
  });

  test("skip link moves focus target to the card", async ({ page }) => {
    await openCard(page, 390);
    await expect(page.locator("main#main")).toHaveCount(1);
  });

  test("has no axe WCAG A/AA violations", async ({ page }) => {
    for (const width of [320, 1280]) {
      await openCard(page, width);
      await page.waitForTimeout(400);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    }
  });

  test("honours reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openCard(page, 390);
    const names = await page.evaluate(() =>
      ["main", "main footer b"].map((selector) => getComputedStyle(document.querySelector(selector)!).animationName),
    );
    expect(names).toEqual(["none", "none"]);
  });

  test("publishes card SEO metadata", async ({ page }) => {
    await openCard(page, 390);
    await expect(page).toHaveTitle("Ariston Michael | Contact Card · Ariston OS");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://ariston-michael.github.io/card/");
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://ariston-michael.github.io/card/");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Sheridan College/);
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#10243f");
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute("content", /viewport-fit=cover/);
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("every action still works", async ({ page }) => {
    await openCard(page, 375);
    await expect(page.locator("[data-action]")).toHaveCount(5);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
