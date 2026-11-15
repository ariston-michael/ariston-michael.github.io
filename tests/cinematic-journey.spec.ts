import { test, expect } from "@playwright/test";

test("separation follows stage order and reverses to the assembled rocket", async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/");
  const modules = page.locator(".rocket-module");
  await expect(modules).toHaveCount(6);
  await expect(modules.first()).toBeEnabled();
  const progress = () => modules.evaluateAll(elements => elements.map(el => Number((el as HTMLElement).style.getPropertyValue("--separation"))));
  const initial = await progress();
  expect(initial.every(value => value === 0)).toBe(true);
  for (const [index, target] of ["introduction","projects","experience","education","about","contact"].entries()) {
    if (index === 0) await page.evaluate(() => scrollTo({top:650,behavior:"instant"}));
    else await page.locator(`#${target}`).evaluate(el => el.scrollIntoView({behavior:"instant"}));
    await expect.poll(async () => (await progress())[index]).toBeGreaterThan(.5);
    if (index < 5) expect((await progress())[index + 1]).toBeLessThanOrEqual((await progress())[index]);
  }
  await page.evaluate(() => scrollTo({top:0,behavior:"instant"}));
  await expect.poll(progress).toEqual(initial);
});

test("drag catch, magnetic return, keyboard move and reassemble", async ({page}) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/");
  const piece = page.locator(".rocket-module").nth(2);
  await expect(piece).toBeEnabled();
  const box = (await piece.boundingBox())!;
  await page.mouse.move(box.x+80,box.y+50);
  await page.mouse.down();
  await page.mouse.move(box.x+115,box.y+73,{steps:8});
  await page.mouse.up();
  await expect.poll(() => piece.evaluate(el => el.style.getPropertyValue("--manual-x"))).toBe("35px");
  expect(await page.evaluate(()=>scrollY)).toBe(0);
  await piece.focus();
  await page.keyboard.press("Home");
  await expect.poll(() => piece.evaluate(el => el.style.getPropertyValue("--manual-x"))).toBe("0px");
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => piece.evaluate(el => el.style.getPropertyValue("--manual-x"))).toBe("8px");
  await page.keyboard.press("Enter");
  await expect.poll(()=>page.evaluate(()=>document.getElementById("experience")!.getBoundingClientRect().top)).toBeLessThan(80);
  await page.getByRole("button",{name:"Reassemble",exact:true}).click();
  await expect.poll(()=>piece.evaluate(el=>el.style.getPropertyValue("--dx"))).toBe("0px");
  await expect.poll(()=>piece.evaluate(el=>el.style.getPropertyValue("--manual-x"))).toBe("0px");
  await expect(page.getByRole("status")).toContainText("Rocket reassembled");
  // A small catch snaps back to the attachment position on release.
  await page.evaluate(()=>scrollTo({top:0,behavior:"instant"}));
  const returned = (await piece.boundingBox())!;
  await page.mouse.move(returned.x+80,returned.y+50);
  await page.mouse.down(); await page.mouse.move(returned.x+90,returned.y+50,{steps:4}); await page.mouse.up();
  await expect.poll(()=>piece.evaluate(el=>el.style.getPropertyValue("--manual-x"))).toBe("0px");
});

test("reduced motion updates live and keeps the diagram static", async ({page}) => {
  await page.goto("/");
  await page.locator("#contact").evaluate(el=>el.scrollIntoView({behavior:"instant"}));
  await expect.poll(()=>page.locator(".rocket-module").last().evaluate(el=>Number(el.style.getPropertyValue("--separation")))).toBe(1);
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect.poll(()=>page.locator(".rocket-module").last().evaluate(el=>Number(el.style.getPropertyValue("--separation")))).toBe(0);
  expect(await page.locator(".rocket-module svg").first().evaluate(el=>getComputedStyle(el).animationName)).toBe("none");
});

test("fresh reload returns to the assembled entry and explicit fragments survive", async ({page}) => {
  await page.goto("/");
  await page.locator("#about").evaluate(el=>el.scrollIntoView({behavior:"instant"}));
  await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
  await page.reload();
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
  await page.goto("/#education"); await page.reload();
  await expect.poll(()=>page.locator("#education").evaluate(el=>Math.abs(el.getBoundingClientRect().top))).toBeLessThan(100);
  await page.getByRole("link",{name:"Explore AirControl",exact:true}).click();
  await page.getByRole("link",{name:"All projects"}).click();
  await expect(page).toHaveURL(/#projects$/);
});

for (const width of [320, 768, 1024, 1440, 2560]) {
  test(`separated drawing and keyboard displacement stay within ${width}px`, async ({page}) => {
    await page.setViewportSize({width,height:1000}); await page.goto("/");
    await page.locator("#contact").evaluate(el=>el.scrollIntoView({behavior:"instant"}));
    const piece = page.locator(".rocket-module").nth(3);
    await piece.focus();
    for (let step=0;step<8;step++) await page.keyboard.press("ArrowRight");
    await expect.poll(async()=>page.locator(".module-label").evaluateAll(labels=>labels.every(label=>{const box=label.getBoundingClientRect();return box.left>=0 && box.right<=innerWidth;}))).toBe(true);
    await page.keyboard.press("Home");
    await expect.poll(()=>piece.evaluate(el=>el.style.getPropertyValue("--dx"))).toBe("0px");
  });
}

test("touch modules navigate without taking over page scrolling", async ({browser}) => {
  const context=await browser.newContext({viewport:{width:375,height:812},hasTouch:true});
  const page=await context.newPage(); await page.goto("/");
  await page.locator(".rocket-module").last().tap();
  await expect.poll(()=>page.locator("#contact").evaluate(el=>Math.abs(el.getBoundingClientRect().top))).toBeLessThan(100);
  await page.getByRole("navigation",{name:"Portfolio sections"}).getByRole("link",{name:"Education / skills"}).tap();
  await expect(page).toHaveURL(/#education$/);
  await context.close();
});
