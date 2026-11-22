import { mkdir } from "node:fs/promises";
import { openBrowser } from "./browser.mjs";

const browser = await openBrowser();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  await page.goto(
    process.env.PREVIEW_URL || "http://127.0.0.1:5173/level-1/landing/",
  );
  await page.evaluate(() => document.fonts.ready);
  await mkdir("level-1/landing/assets", { recursive: true });
  await page
    .locator(".timer")
    .screenshot({ path: "level-1/landing/assets/session-preview.png" });
  console.log("Captured the real Still timer interface.");
} finally {
  await browser.close();
}
