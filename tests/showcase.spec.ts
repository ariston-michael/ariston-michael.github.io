import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

// Exercise the integrated homepage, including the real rocket column.
const route = "/";
const widths = [320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440, 1920, 2560];

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  return errors;
}

async function expectNoOverflow(page: Page) {
  const outside = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    return [
      ...document.querySelectorAll<HTMLElement>(
        ".showcase-slot h2, .showcase-slot h3, .showcase-slot p, .showcase-slot a, .showcase-slot button, .showcase-slot summary, .showcase-slot figure, .showcase-slot dl, .showcase-slot li, #play h2, #play h3, #play p, #play a, #play summary, #play figure",
      ),
    ]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        if (getComputedStyle(element).clipPath === "inset(50%)") return false;
        if (!rect.width || !rect.height) return false;
        return (
          rect.left < -1 ||
          rect.right > viewport + 1 ||
          element.scrollWidth > element.clientWidth + 1
        );
      })
      .map((element) => `${element.tagName} ${element.textContent?.slice(0, 50)}`);
  });
  expect(outside).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

for (const width of widths) {
  test(`showcase layout ${width}px`, async ({ page }) => {
    const errors = await collectErrors(page);
    await page.setViewportSize({ width, height: 900 });
    await page.goto(route);
    await page.getByText("Yes", { exact: true }).click();
    await expect(page.getByRole("heading", { level: 3, name: "Chicken Shooter" })).toBeVisible();
    await expectNoOverflow(page);
    // Tap targets for every interactive control in the showcase.
    const small = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>(".showcase-slot a, .showcase-slot button, .showcase-slot summary, #play a, #play summary")]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && (rect.height < 44 || rect.width < 44);
        })
        .map((element) => element.textContent?.trim() || element.getAttribute("aria-label")),
    );
    expect(small).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("sections, headings and accessibility", async ({ page }) => {
  await page.goto(route);
  for (const name of ["Selected work, in detail.", "Built against the clock.", "Ready to play?"])
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  for (const name of ["AirControl", "Seneca Energy", "FireGuard XR"])
    await expect(page.locator("#projects").getByRole("heading", { level: 3, name })).toBeVisible();
  await page.getByText("Yes", { exact: true }).click();
  await page.locator("#projects details").first().evaluate((d) => ((d as HTMLDetailsElement).open = true));
  // Let the disclosure fade-in and button transition finish before measuring contrast.
  await page.evaluate(() => Promise.all(document.getAnimations().filter(a => a.effect?.getComputedTiming().iterations !== Infinity).map(a => a.finished)));
  const results = await new AxeBuilder({ page }).include("main").analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://ariston-michael.github.io/");
});

test("authentic media loads with correct types and labels", async ({ page, request }) => {
  await page.goto(route);
  const fireguard = page.locator("article", { has: page.locator("#showcase-fireguard") });
  const video = fireguard.locator("video");
  await expect(video).toHaveAttribute("controls", "");
  await expect(video).toHaveAttribute("preload", "none");
  await expect(video).toHaveAttribute("aria-label", /no audio/);
  const poster = await video.getAttribute("poster");
  const source = await video.locator("source").getAttribute("src");
  for (const [url, type] of [
    [poster!, "image/jpeg"],
    [source!, "video/mp4"],
  ] as const) {
    const response = await request.head(url);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe(type);
  }
  expect(Number((await request.head(source!)).headers()["content-length"])).toBeLessThan(5_000_000);

  const thumbs = fireguard.getByRole("button");
  await expect(thumbs).toHaveCount(5);
  await expect(thumbs.first()).toHaveAttribute("aria-pressed", "true");
  await thumbs.nth(2).click();
  await expect(thumbs.nth(2)).toHaveAttribute("aria-pressed", "true");
  await expect(fireguard.locator("video")).toHaveCount(0);
  const still = fireguard.locator("figure img").first();
  await expect(still).toHaveAttribute("alt", /3D wildfire simulation/);
  await expect
    .poll(() => still.evaluate((img) => (img as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);
  await expect(fireguard.locator("figcaption")).toContainText("FIG. 03");
  await expect(fireguard.locator("figcaption")).toContainText("demo recording");
});

test("demo excerpt plays where the browser supports H.264", async ({ page }) => {
  await page.goto(route);
  const video = page.locator("#projects video");
  const supported = await video.evaluate((v) =>
    (v as HTMLVideoElement).canPlayType('video/mp4; codecs="avc1.640028"'),
  );
  test.skip(supported === "", "This browser build lacks an H.264 decoder.");
  await video.evaluate((v) => (v as HTMLVideoElement).play());
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).currentTime), { timeout: 10_000 })
    .toBeGreaterThan(0.2);
  const size = await video.evaluate((v) => [
    (v as HTMLVideoElement).videoWidth,
    (v as HTMLVideoElement).videoHeight,
    Math.round((v as HTMLVideoElement).duration),
  ]);
  expect(size).toEqual([1280, 758, 30]);
});

test("placeholders are labelled and never posed as screenshots", async ({ page }) => {
  await page.goto(route);
  for (const id of ["aircontrol", "energy"]) {
    const article = page.locator("article", { has: page.locator(`#showcase-${id}`) });
    await expect(article).toContainText("Screenshots pending owner verification");
    await expect(article).toContainText("not a product screenshot");
    await expect(article.locator("img, video")).toHaveCount(0);
  }
  const gallery = page.locator("#achievements");
  await expect(gallery.getByText("Event photo pending owner approval")).toHaveCount(2);
});

test("game disclosure works by keyboard and offers no unverified launch", async ({ page }) => {
  await page.goto(route);
  const yes = page.locator("#play summary");
  await expect(yes).toHaveText(/Yes/);
  await expect(page.getByRole("group", { name: "Chicken Shooter" })).toBeHidden();
  await yes.focus();
  await page.keyboard.press("Enter");
  const panel = page.getByRole("group", { name: "Chicken Shooter" });
  await expect(panel).toBeVisible();
  await expect(panel).toContainText("not gameplay footage");
  await expect(panel).toContainText("does not offer a launch button");
  await expect(panel.getByRole("link", { name: /launch/i })).toHaveCount(0);
  await expect(panel.locator("video")).toHaveCount(0);
  await page.keyboard.press("Enter");
  await expect(panel).toBeHidden();
});

test("links are verified destinations and open safely", async ({ page }) => {
  await page.goto(route);
  const external = await page
    .locator('.showcase-slot a[target="_blank"], #play a[target="_blank"]')
    .evaluateAll((links) => links.map((a) => [a.getAttribute("href"), a.getAttribute("rel")]));
  const allowed = new Set([
    "https://github.com/ariston-michael/BearHacks-2026",
    "https://github.com/ariston-michael/Seneca-Energy-Hackathon",
    "https://github.com/ariston-michael/fireguard",
    "https://devpost.com/ariston-michael",
  ]);
  expect(external.length).toBeGreaterThan(0);
  for (const [href, rel] of external) {
    expect(allowed.has(href!), href!).toBe(true);
    expect(rel).toBe("noopener noreferrer");
  }
  const internal = await page
    .locator('main a[href^="/projects/"]')
    .evaluateAll((links) => [...new Set(links.map((a) => a.getAttribute("href")))]);
  for (const href of internal) {
    const response = await page.request.get(href!);
    expect(response.status(), href!).toBe(200);
  }
});

test("preview route is removed and stays out of the sitemap", async ({request}) => {
  const sitemap = readFileSync("out/sitemap.xml", "utf8");
  expect(sitemap).not.toContain("showcase-preview");
  expect((await request.get("/showcase-preview/")).status()).toBe(404);
});

test("video bytes stay deferred until playback and media approval remains visible", async ({page}) => {
  const videos: string[] = [];
  page.on("request", request => { if (/\.mp4(?:\?|$)/.test(request.url())) videos.push(request.url()); });
  await page.goto(route);
  expect(videos).toEqual([]);
  await page.locator("#showcase-fireguard").scrollIntoViewIfNeeded();
  await expect(page.getByText(/Media review pending: confirm map-tile/)).toBeVisible();
  await expect(page.locator("#projects video")).toHaveAttribute("preload", "none");
  expect(videos).toEqual([]);
  const supported = await page.locator("#projects video").evaluate(video => (video as HTMLVideoElement).canPlayType('video/mp4; codecs="avc1.640028"'));
  test.skip(supported === "", "This browser build lacks an H.264 decoder; deferred-byte assertions above still ran.");
  await page.locator("#projects video").evaluate(video => (video as HTMLVideoElement).play());
  await expect.poll(()=>videos.length).toBeGreaterThan(0);
});

test("no-JavaScript still links and game disclosure remain usable", async ({browser}) => {
  const context = await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:800}});
  const page = await context.newPage(); await page.goto(route);
  await expect(page.locator(".media-thumbnails")).toBeHidden();
  const still = page.getByRole("link",{name:"3D simulation of wind-driven ember movement.",exact:true});
  await expect(still).toHaveAttribute("href",/fireguard-simulation-1120.jpg$/);
  expect((await page.request.get((await still.getAttribute("href"))!)).status()).toBe(200);
  await page.locator("#play summary").click();
  await expect(page.getByRole("group",{name:"Chicken Shooter"})).toBeVisible();
  await expect(page.locator("#play video")).toHaveCount(0);
  await context.close();
});

test("touch thumbnail selection keeps genuine FireGuard media separate from the game", async ({browser}) => {
  const context=await browser.newContext({hasTouch:true,viewport:{width:375,height:812}});
  const page=await context.newPage();await page.goto(route);
  const article=page.locator("article",{has:page.locator("#showcase-fireguard")});
  await article.getByRole("button").nth(1).tap();
  await expect(article.getByRole("button").nth(1)).toHaveAttribute("aria-pressed","true");
  await expect(article.locator("figure img").first()).toHaveAttribute("src",/fireguard-dashboard/);
  await page.locator("#play summary").tap();
  await expect(page.locator("#play img, #play video")).toHaveCount(0);
  await context.close();
});
