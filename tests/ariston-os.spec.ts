import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { email, githubUrl, linkedInUrl, projects } from "../lib/content";
import { siteUrl } from "../lib/site";
import { buildVCard, vCardPath } from "../lib/card";

async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const clipped = await page
    .locator("h1,h2,h3,p,a,button,article,nav")
    .evaluateAll((elements) =>
      elements
        .filter((element) => {
          if (element.classList.contains("skip-link")) return false;
          const rect = element.getBoundingClientRect();
          return (
            rect.width > 0 &&
            (rect.left < -1 ||
              rect.right > innerWidth + 1 ||
              (element as HTMLElement).scrollWidth >
                (element as HTMLElement).clientWidth + 1)
          );
        })
        .map((element) => ({
          tag: element.tagName,
          text: element.textContent?.slice(0, 60),
          display: getComputedStyle(element).display,
          client: (element as HTMLElement).clientWidth,
          scroll: (element as HTMLElement).scrollWidth,
          left: element.getBoundingClientRect().left,
          right: element.getBoundingClientRect().right,
        })),
    );
  expect(clipped).toEqual([]);
}
for (const width of [
  320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440, 1920, 2560,
]) {
  test(`workspace reflows at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "AristonMichael.",
    );
    await expect(page.locator(".project-file")).toHaveCount(4);
    await noOverflow(page);
    for (const height of [430, 1100]) {
      await page.setViewportSize({ width, height });
      await noOverflow(page);
    }
    const targets = await page
      .locator(
        ".site-header a,.hero-actions a,.contact-links a,.filter-group button",
      )
      .evaluateAll(
        (elements) =>
          elements
            .map((element) => element.getBoundingClientRect())
            .filter((rect) => rect.height < 44 || rect.width < 44).length,
      );
    expect(targets).toBe(0);
    expect(errors).toEqual([]);
  });
}
for (const width of [320, 375, 430, 768, 1440]) {
  test(`NFC card has phone-friendly links at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 812 });
    const response = await page.goto("/card/");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Ariston Michael",
    );
    await expect(
      page.getByRole("img", { name: /placeholder for Ariston Michael/ }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /^LinkedIn/ })).toHaveAttribute(
      "href",
      linkedInUrl,
    );
    await expect(page.getByRole("link", { name: /^GitHub/ })).toHaveAttribute(
      "href",
      githubUrl,
    );
    await expect(page.getByRole("link", { name: /^Email/ })).toHaveAttribute(
      "href",
      `mailto:${email}`,
    );
    await expect(
      page.getByRole("link", { name: /^Visit Portfolio/ }),
    ).toHaveAttribute("href", "/");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${siteUrl}/card/`,
    );
    await noOverflow(page);
    for (const link of await page.locator("[data-action]").all()) {
      const box = await link.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(48);
      expect(box?.width).toBeGreaterThanOrEqual(240);
    }
  });
}
test("project explorer filters with keyboard and opens case studies", async ({
  page,
}) => {
  await page.goto("/");
  const filter = page.getByRole("button", { name: "Web & data", exact: true });
  await filter.focus();
  await page.keyboard.press("Enter");
  await expect(filter).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".project-file")).toHaveCount(2);
  await expect(page.getByRole("status")).toHaveText("2 projects");
  await expect(page.locator(".project-file h3")).toHaveText([
    "Seneca Energy",
    "FireGuard XR",
  ]);
  await page.getByRole("button", { name: "Interactive", exact: true }).click();
  await expect(page.locator(".project-file h3")).toHaveText([
    "AirControl",
    "Chicken Shooter",
  ]);
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  await expect(page.locator(".project-file")).toHaveCount(4);
  await page.getByRole("link", { name: "Read AirControl case study" }).click();
  await expect(page).toHaveURL(/\/projects\/aircontrol\/$/);
  await page.getByRole("link", { name: "All projects" }).click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator("#projects")).toBeInViewport();
});
test("skip link and every main navigation destination work", async ({
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
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  for (const section of ["Projects", "Experience", "Skills", "Contact"]) {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: section, exact: true })
      .click();
    await expect(page.locator(`#${section.toLowerCase()}`)).toBeInViewport();
  }
  await page.getByRole("link", { name: "Open contact card" }).click();
  await expect(page).toHaveURL(/\/card\/$/);
});
test("vCard downloads only the approved contact fields", async ({
  page,
  request,
}) => {
  await page.goto("/card/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: /^Save Contact/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("ariston-michael.vcf");
  expect(await download.failure()).toBeNull();
  const response = await request.get(vCardPath);
  expect(response.ok()).toBe(true);
  expect(await response.text()).toBe(buildVCard());
});
for (const project of projects) {
  test(`${project.name} notes preserve scope and reflow`, async ({ page }) => {
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(`/projects/${project.id}/`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        project.name,
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${siteUrl}/projects/${project.id}/`,
      );
      await expect(page.getByText(project.study!.boundary)).toBeVisible();
      await noOverflow(page);
    }
  });
}
for (const path of ["/", "/card/", "/projects/fireguard/", "/missing-page/"]) {
  for (const width of [375, 1440]) {
    test(`WCAG scan ${path} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(result.violations).toEqual([]);
    });
  }
}
test("static content, contact routes and filters fallback work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();
  await page.goto(`${test.info().project.use.baseURL}/`);
  await expect(page.locator(".project-file")).toHaveCount(4);
  await page
    .getByRole("link", { name: "Read Seneca Energy case study" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Seneca Energy",
  );
  await page.goto(`${test.info().project.use.baseURL}/card/`);
  await expect(page.getByRole("link", { name: /^Save Contact/ })).toBeVisible();
  await noOverflow(page);
  await context.close();
});
test("reduced motion keeps navigation instant and content visible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page.locator("#projects")).toBeInViewport();
  await expect(page.locator(".project-file")).toHaveCount(4);
});
test("static assets and local links exist; withheld media stay excluded", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const links = await page
    .locator("a[href]")
    .evaluateAll((elements) => [
      ...new Set(elements.map((element) => element.getAttribute("href")!)),
    ]);
  for (const href of links.filter((href) => href.startsWith("/"))) {
    expect((await request.get(href)).status(), href).toBe(200);
  }
  for (const href of links.filter((href) => href.startsWith("#"))) {
    await expect(page.locator(href)).toHaveCount(1);
  }
  for (const file of [
    "fireguard-demo-1280.mp4",
    "fireguard-dashboard-1600.jpg",
    "fireguard-forecast-analysis-1600.jpg",
    "fireguard-analytics-1600.jpg",
  ]) {
    expect(
      (await request.get(`/media/projects/fireguard-xr/${file}`)).status(),
    ).toBe(404);
  }
  const image = await request.get(
    "/media/projects/fireguard-xr/fireguard-simulation-1120.jpg",
  );
  expect(image.status()).toBe(200);
  expect((await image.body()).length).toBe(45366);
  await page.goto("/missing-page/");
  await page.getByRole("link", { name: "Return to Ariston OS" }).click();
  await expect(page).toHaveURL("/");
});
test("touch card navigation works on a phone", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: test.info().project.name !== "firefox",
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(`${test.info().project.use.baseURL}/`);
  await page
    .getByRole("link", { name: "Contact card", exact: false })
    .first()
    .tap();
  await expect(page).toHaveURL(/\/card\/$/);
  await noOverflow(page);
  await context.close();
});
