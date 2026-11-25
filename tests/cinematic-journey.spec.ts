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
  await piece.scrollIntoViewIfNeeded();
  const scrollBeforeDrag = await page.evaluate(() => scrollY);
  const box = (await piece.boundingBox())!;
  await page.mouse.move(box.x+80,box.y+50);
  await page.mouse.down();
  await page.mouse.move(box.x+115,box.y+73,{steps:8});
  await page.mouse.up();
  await expect.poll(() => piece.evaluate(el => el.style.getPropertyValue("--manual-x"))).toBe("35px");
  expect(await page.evaluate(()=>scrollY)).toBe(scrollBeforeDrag);
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
  await piece.scrollIntoViewIfNeeded();
  await page.getByRole("button",{name:"Reassemble",exact:true}).evaluate(el => (el as HTMLButtonElement).click());
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
  await page.getByRole("link",{name:/Read case study\s*:\s*AirControl/,exact:true}).click();
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

test("separating stages preserve clear joints above the still-attached engine", async ({page}) => {
  await page.setViewportSize({width:1440,height:1000});await page.goto("/");
  for (const id of ["experience","education","about","contact","about","education"]) {
    await page.locator(`#${id}`).evaluate(el=>el.scrollIntoView({behavior:"instant"}));
    await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
    await page.evaluate(()=>Promise.all(document.getAnimations().filter(a=>a.effect?.getComputedTiming().iterations!==Infinity).map(a=>a.finished)));
    const gaps=await page.locator(".rocket-module").evaluateAll(elements=>elements.slice(1).map((el,i)=>el.getBoundingClientRect().top-elements[i].getBoundingClientRect().bottom));
    expect(gaps.every(gap=>gap>=-1),`${id}: ${gaps.join(", ")}`).toBe(true);
  }
});

test("the phone rocket is fully assembled when its complete drawing first enters view", async ({page}) => {
  await page.setViewportSize({width:375,height:1000});await page.goto("/");
  await page.locator(".rocket-drawing").evaluate(el=>el.scrollIntoView({block:"end",behavior:"instant"}));
  await expect.poll(()=>page.locator(".rocket-module").evaluateAll(elements=>elements.map(el=>Number((el as HTMLElement).style.getPropertyValue("--separation"))))).toEqual([0,0,0,0,0,0]);
  const limits=await page.locator(".rocket-module").evaluateAll(elements=>[elements[0].getBoundingClientRect().top,elements[5].getBoundingClientRect().bottom]);
  expect(limits[0]).toBeGreaterThan(0);expect(limits[1]).toBeLessThan(1000);
  await page.evaluate(()=>scrollBy({top:400,behavior:"instant"}));
  await expect.poll(()=>page.locator(".rocket-module").first().evaluate(el=>Number(el.style.getPropertyValue("--separation")))).toBeGreaterThan(.3);
});
