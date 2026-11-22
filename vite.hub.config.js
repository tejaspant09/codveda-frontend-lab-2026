import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  root: resolve("hub"),
  base: "/",
  build: { outDir: resolve("dist"), emptyOutDir: false, assetsInlineLimit: 0 },
});
