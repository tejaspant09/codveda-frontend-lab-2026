import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const root = resolve("dist");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".md": "text/plain; charset=utf-8",
  ".webm": "video/webm",
  ".tgz": "application/gzip",
};

createServer(async (request, response) => {
  try {
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
    } catch {
      response.writeHead(400).end("Bad request");
      return;
    }
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    try {
      const info = await stat(file);
      if (info.isDirectory()) file = resolve(file, "index.html");
      await stat(file);
    } catch {
      const isAppRoute = pathname.startsWith("/level-2/") && !extname(pathname);
      if (isAppRoute) file = resolve(root, "level-2/index.html");
      else {
        response.writeHead(404).end("Not found");
        return;
      }
    }
    const hashed =
      /\/assets\/[^/]+-[\w-]{8,}\./.test(pathname) &&
      !pathname.startsWith("/baseline/");
    response.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Cache-Control": hashed
        ? "public, max-age=31536000, immutable"
        : "no-cache",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
    response.end(await readFile(file));
  } catch (error) {
    response.writeHead(500).end("Unable to serve file");
    console.error(error.message);
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Local: http://127.0.0.1:${port}/`),
);
