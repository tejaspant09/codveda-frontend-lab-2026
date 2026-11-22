import { spawn } from "node:child_process";

console.log(
  "For the complete built showcase: npm run build, then npm run preview.",
);
console.log(
  "Starting Level 1 development at http://127.0.0.1:5173/level-1/landing/",
);
const child = spawn(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "--config", "vite.level1.config.js"],
  { stdio: "inherit" },
);
process.on("SIGINT", () => child.kill("SIGINT"));
