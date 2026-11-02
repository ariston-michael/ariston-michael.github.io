import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../lib/content";

const widths = [
  320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440, 1920, 2560,
];
const studies = projects.filter((project) => project.study);

async function expectNoOverflow(page: Page) {
  const outside = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    const elements = [
      ...document.querySelectorAll<HTMLElement>(
        "h1,h2,h3,h4,p,a,button,article,nav,dl",
      ),
    ];
    return elements
      .filter((element) => {
        if (element.classList.contains("skip-link")) return false;
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return false;
        return (
          rect.left < -1 ||
          rect.right > viewport + 1 ||
          element.scrollWidth > element.clientWidth + 1
        );
      })
      .map((element) => ({
        tag: element.tagName,
        text: element.textContent?.slice(0, 60),
        width: element.clientWidth,
        scroll: element.scrollWidth,
      }));
  });
  expect(outside).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}

for (const width of widths) {
  for (const height of [1000, 430]) {
    test(`home layout ${width}x${height}`, async ({ page }, testInfo) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("requestfailed", (request) =>
        errors.push(`${request.url()} ${request.failure()?.errorText}`),
      );
      page.on("response", (response) => {
        if (response.status() >= 400)
          errors.push(`${response.status()} ${response.url()}`);
      });
      await page.setViewportSize({ width, height });
      const response = await page.goto("/");
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "AristonMichael.",
      );
      await expect(page.locator("#projects article")).toHaveCount(4);
      await expect(
        page.locator(".experience-list > li, .achievement-list > li"),
      ).toHaveCount(6);
      await expectNoOverflow(page);
      expect(
        await page
          .locator(".hero-stage")
          .evaluate((element) => getComputedStyle(element).overflowX),
      ).toBe("clip");
      expect(
        await page
          .locator(".hero-copy")
          .evaluate((element) => Number(getComputedStyle(element).zIndex)),
      ).toBeGreaterThan(1);
      for (const link of await page
        .locator('nav[aria-label="Main navigation"] a')
        .all()) {
        const box = await link.boundingBox();
        expect(box!.height).toBeGreaterThanOrEqual(44);
        expect(box!.width).toBeGreaterThanOrEqual(44);
        await link.click();
        const target = await link.getAttribute("href");
        expect(await page.locator(target!).count()).toBe(1);
      }
      await page.goto("/");
      if (height === 1000) {
        const accessibility = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(accessibility.violations).toEqual([]);
        if ([320, 768, 1024, 1440, 2560].includes(width)) {
          await page.emulateMedia({ reducedMotion: "reduce" });
          await page.screenshot({
            path: testInfo.outputPath(`home-${width}.png`),
            fullPage: true,
          });
        }
      }
      expect(errors).toEqual([]);
    });
  }
}

for (const project of studies) {
  for (const width of [320, 768, 1440, 2560]) {
    test(`${project.id} project notes at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(`/projects/${project.id}/`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        project.name,
      );
      await expect(page.locator(".feature-grid article")).toHaveCount(3);
      await expectNoOverflow(page);
      if (width === 320 || width === 1440) {
        const accessibility = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(accessibility.violations).toEqual([]);
      }
      await page.getByRole("link", { name: "All projects" }).click();
      await expect(page).toHaveURL(/\/#projects$/);
    });
  }
}

test("keyboard navigation, focus and motion controls", async ({
  page,
  browserName,
}) => {
  await page.goto("/");
  // macOS WebKit uses Option-Tab for links unless full keyboard navigation is enabled.
  await page.keyboard.press(
    browserName === "webkit" && process.platform === "darwin"
      ? "Alt+Tab"
      : "Tab",
  );
  await expect(page.getByText("Skip to content")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const toggle = page.locator(".motion-toggle").first();
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(
    await page
      .locator(".planet")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.keyboard.press("Space");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  expect(
    await page
      .locator(".planet")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("float");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const selector of [".star", ".planet", ".section-heading"]) {
    expect(
      await page
        .locator(selector)
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("none");
  }
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
});

test("every local link resolves and no placeholder hrefs exist", async ({
  page,
  request,
}) => {
  for (const path of [
    "/",
    ...studies.map((project) => `/projects/${project.id}/`),
  ]) {
    await page.goto(path);
    const hrefs = await page
      .locator("a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    for (const href of hrefs) {
      expect(href).toBeTruthy();
      expect(href).not.toBe("#");
      expect(href).not.toMatch(/example\.com|javascript:|tel:/);
      if (href!.startsWith("https:")) {
        expect([
          "https://github.com/ariston-michael",
          "https://github.com/ariston-michael/BearHacks-2026",
          "https://github.com/ariston-michael/Seneca-Energy-Hackathon",
          "https://github.com/ariston-michael/fireguard",
          "https://www.linkedin.com/in/ariston-michael/",
          "https://drive.google.com/file/d/12eRwVk3GQKjr0FVYOY-IFkmr66rd0er_/view",
        ]).toContain(href);
      } else if (href!.startsWith("mailto:")) {
        expect(href).toBe("mailto:ariston.pmichael@gmail.com");
      } else {
        const url = new URL(href!, `http://127.0.0.1:3100${path}`);
        expect((await request.get(url.pathname)).status()).toBe(200);
        if (url.hash && url.pathname === path)
          await expect(page.locator(url.hash)).toHaveCount(1);
      }
    }
  }
});

test("SEO resources and sharing assets are exported", async ({
  page,
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const path of [
    "/",
    ...studies.map((project) => `/projects/${project.id}/`),
  ]) {
    expect(xml).toContain(`https://ariston-michael.github.io${path}`);
    await page.goto(path);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://ariston-michael.github.io${path}`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://ariston-michael.github.io/social-card.png",
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
  }
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Sitemap: https://ariston-michael.github.io/sitemap.xml",
  );
  const absent = await request.get("/no-such-project/");
  expect(absent.status()).toBe(404);
  expect(await absent.text()).toContain("off course");
  const image = await request.get("/social-card.png");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  await page.goto("/404.html");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "off course",
  );
  await page.getByRole("link", { name: "Return to the portfolio" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("200% zoom-equivalent reflow", async ({ browser }) => {
  // A 1280x900 browser zoomed to 200% has an effective 640x450 CSS viewport.
  // DPR alone is not browser zoom. Assert the effective CSS viewport and 2x raster density.
  const context = await browser.newContext({
    viewport: { width: 640, height: 450 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto("/");
  await expectNoOverflow(page);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Explore AirControl" }).click();
  await expectNoOverflow(page);
  await context.close();
});

test("phone landscape and touch navigation", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 844, height: 390 },
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  await expectNoOverflow(page);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Contact", exact: true })
    .tap();
  await expect(page).toHaveURL(/#contact$/);
  await context.close();
});

test("content remains usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 800 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#projects article")).toHaveCount(4);
  await expect(page.locator(".motion-toggle").first()).toBeHidden();
  expect(
    await page
      .locator(".planet")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.getByRole("link", { name: "Explore AirControl" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "AirControl",
  );
  await context.close();
});

test("paused motion stays consistent after client return from project notes", async ({
  page,
}) => {
  await page.goto("/projects/aircontrol/");
  await page.locator(".motion-toggle").first().click();
  await page.getByRole("link", { name: "All projects" }).click();
  await expect(page.locator(".motion-toggle").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator(".motion-toggle").first()).toHaveText(
    "Motion paused",
  );
  expect(
    await page
      .locator(".planet")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

test("visible link labels match their accessible names", async ({ page }) => {
  for (const path of [
    "/",
    ...studies.map((project) => `/projects/${project.id}/`),
  ]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withRules(["label-content-name-mismatch"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
});
