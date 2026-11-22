import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig(({ mode }) => {
  const baseline = mode === "baseline";
  return {
    root: resolve("level-1"),
    base: baseline ? "/baseline/" : "/level-1/",
    plugins: [
      {
        name: "controlled-performance-baseline",
        transformIndexHtml: {
          order: "pre",
          handler(html) {
            if (!baseline) return html;
            return html
              .replaceAll("session-preview.webp", "session-preview.png")
              .replaceAll(' loading="lazy"', "")
              .replaceAll(' decoding="async"', "");
          },
        },
      },
    ],
    build: {
      outDir: resolve(baseline ? "dist/baseline" : "dist/level-1"),
      emptyOutDir: true,
      minify: !baseline,
      cssMinify: !baseline,
      assetsInlineLimit: 0,
      rollupOptions: {
        input: {
          landing: resolve("level-1/landing/index.html"),
          form: resolve("level-1/form/index.html"),
          counter: resolve("level-1/counter/index.html"),
        },
      },
    },
    server: { host: "127.0.0.1", port: 5173, fs: { allow: [resolve(".")] } },
  };
});
