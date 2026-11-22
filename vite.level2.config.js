import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  root: resolve("level-2"),
  base: "/level-2/",
  plugins: [react()],
  build: {
    outDir: resolve("dist/level-2"),
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
  server: { host: "127.0.0.1", port: 5174, fs: { allow: [resolve(".")] } },
});
