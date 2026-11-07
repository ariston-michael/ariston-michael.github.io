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
  routes.length >= 5,
  "Homepage and four project pages must be exported.",
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
    await access(join(root, match[1]));
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
await access(join(root, "404.html"));
await access(join(root, "robots.txt"));
await access(join(root, "social-card.png"));
console.log(
  `Static export verified: ${routes.length} canonical routes, ${files} files, root assets present, no PDFs/secrets folders/symlinks.`,
);
