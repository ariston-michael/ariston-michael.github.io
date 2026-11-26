import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

// Loopback-only static preview. No application backend is required in production.
const root = resolve("out");
const port = Number(process.argv[2] ?? 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".vcf": "text/vcard; charset=utf-8",
  ".xml": "application/xml",
  ".woff2": "font/woff2",
};
try {
  await stat(resolve(root, "index.html"));
} catch {
  console.error("Static export missing. Run npm run build first.");
  process.exit(1);
}
const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(
      new URL(request.url ?? "/", "http://localhost").pathname,
    );
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const content = await readFile(file);
    const headers = {
      "Content-Type": types[extname(file)] ?? "application/octet-stream",
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    };
    // Single byte ranges, as GitHub Pages provides; WebKit requires them for video.
    const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range ?? "");
    if (range && (range[1] || range[2])) {
      const size = content.length;
      const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
      const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
      if (start >= size || start > end) {
        response.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
        return;
      }
      const part = content.subarray(start, end + 1);
      response.writeHead(206, {
        ...headers,
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Content-Length": part.length,
      });
      response.end(request.method === "HEAD" ? undefined : part);
      return;
    }
    response.writeHead(200, { ...headers, "Content-Length": content.length });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch {
    const content = await readFile(resolve(root, "404.html"));
    response.writeHead(404, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Length": content.length,
    });
    response.end(request.method === "HEAD" ? undefined : content);
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Static preview: http://127.0.0.1:${port}`),
);
for (const signal of ["SIGTERM", "SIGINT"])
  process.on(signal, () => server.close(() => process.exit(0)));
