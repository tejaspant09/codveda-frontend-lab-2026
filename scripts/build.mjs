import { build } from "vite";
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

// Build each independent task area; never remove sibling outputs.
await mkdir("dist", { recursive: true });
await build({ configFile: "vite.level1.config.js" });
await build({ configFile: "vite.level1.config.js", mode: "baseline" });
await build({ configFile: "vite.level2.config.js" });
for (const script of ["build:library", "build:storybook"]) {
  const result = spawnSync(
    process.execPath,
    [process.env.npm_execpath, "run", script],
    {
      stdio: "inherit",
      env: { ...process.env, STORYBOOK_DISABLE_TELEMETRY: "1" },
    },
  );
  if (result.status !== 0) process.exit(result.status || 1);
}
await build({ configFile: "vite.hub.config.js" });
await cp("docs", "dist/docs", { recursive: true });
await cp("evidence", "dist/evidence", { recursive: true });
await cp("shared", "dist/shared", { recursive: true });
await cp("third-party", "dist/third-party", { recursive: true });
await writeFile("dist/_redirects", "/level-2/* /level-2/index.html 200\n");
await writeFile("dist/_headers", await readFile("hosting-headers.txt", "utf8"));
console.log(
  "Built hub, three Level 1 demos, DevFinder, Still UI, Storybook, and controlled baseline.",
);
