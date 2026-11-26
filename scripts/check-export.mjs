import { readFile, readdir, lstat, access } from "node:fs/promises";
import { resolve, join } from "node:path";
import assert from "node:assert/strict";
const root = resolve("out");
const origin = "https://ariston-michael.github.io";
const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => new URL(match[1]),
);
assert.ok(
  routes.length >= 6,
  "Homepage, contact card and four project pages must be exported.",
);
for (const route of routes) {
  assert.equal(route.origin, origin);
  assert.ok(route.pathname.endsWith("/"));
  const file = join(root, route.pathname, "index.html");
  const html = await readFile(file, "utf8");
  assert.equal(
    [...html.matchAll(/<h1(?:\s|>)/g)].length,
    1,
    `One main title: ${route.pathname}`,
  );
  assert.ok(
    html.includes(`rel="canonical" href="${route.href}"`),
    `Canonical: ${route.pathname}`,
  );
  for (const match of html.matchAll(
    /(?:src|href)="(\/_next\/[^"?]+)(?:[^\"]*)"/g,
  ))
    await access(join(root, decodeURIComponent(match[1])));
}
let files = 0;
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    assert.ok(
      !/^(?:node_modules|\.git|\.next|\.env.*)$/.test(entry.name),
      `Unexpected artifact: ${entry.name}`,
    );
    const path = join(directory, entry.name);
    assert.ok(
      !(await lstat(path)).isSymbolicLink(),
      `Symlink not allowed: ${path}`,
    );
    if (entry.isDirectory()) await inspect(path);
    else {
      assert.ok(
        !entry.name.toLowerCase().endsWith(".pdf"),
        "Resume must remain on Drive, not inside the artifact.",
      );
      files++;
    }
  }
}
await inspect(root);
await access(join(root, "card/index.html"));
const vcard = await readFile(join(root, "card/ariston-michael.vcf"), "utf8");
assert.ok(vcard.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n"));
assert.ok(vcard.endsWith("END:VCARD\r\n"));
assert.ok(!/^TEL[;:]/im.test(vcard), "No unapproved phone number in vCard.");
await assert.rejects(
  access(join(root, "ariston-michael.vcf")),
  "Only the canonical card vCard may be exported.",
);
await access(join(root, "404.html"));
await access(join(root, "robots.txt"));
await access(join(root, "social-card.png"));

// These wider recording assets include third-party imagery without verified
// reuse rights. Removing markup alone must not leave downloadable files behind.
for (const file of [
  "fireguard-demo-1280.mp4",
  "fireguard-dashboard-1600.jpg",
  "fireguard-forecast-analysis-1600.jpg",
  "fireguard-analytics-1600.jpg",
]) {
  await assert.rejects(
    access(join(root, "media/projects/fireguard-xr", file)),
    `Withheld media must not be published: ${file}`,
  );
}
console.log(
  `Static export verified: ${routes.length} canonical routes, ${files} files, root assets present, no PDFs/secrets folders/symlinks.`,
);
