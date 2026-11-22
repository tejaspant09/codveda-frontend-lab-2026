import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { openBrowser } from "./browser.mjs";

const origin = process.env.BASE_URL || "http://127.0.0.1:4173";
const browser = await openBrowser();
const results = {
  date: new Date().toISOString(),
  origin,
  browser: browser.version(),
  checks: [],
  pages: [],
  errors: [],
};
await mkdir("evidence/screenshots", { recursive: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
page.on("pageerror", (error) => results.errors.push(error.message));

async function check(name, run) {
  try {
    await run();
    results.checks.push({ name, status: "passed" });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.checks.push({ name, status: "failed", error: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}
try {
  for (const [name, route] of [
    ["hub", "/"],
    ["landing", "/level-1/landing/"],
    ["form", "/level-1/form/"],
    ["counter", "/level-1/counter/"],
    ["devfinder", "/level-2/"],
  ]) {
    for (const width of [360, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${origin}${route}`);
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((node) => node.decode().catch(() => {}));
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      const images = await page
        .locator("img")
        .evaluateAll(
          (images) =>
            images.filter((image) => !image.complete || !image.naturalWidth)
              .length,
        );
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      const violations = axe.violations.map(
        ({ id, impact, description, nodes }) => ({
          id,
          impact,
          description,
          elements: nodes.map((node) => node.target),
        }),
      );
      await page.screenshot({
        path: `evidence/screenshots/${name}-${width}.png`,
        fullPage: true,
      });
      results.pages.push({
        name,
        width,
        route,
        overflow,
        brokenImages: images,
        violations,
      });
      console.log(
        `${name} ${width}: overflow=${overflow}, brokenImages=${images}, violations=${violations.length}`,
      );
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await check(
    "counter lower bound, increment, decrement and reset",
    async () => {
      await page.goto(`${origin}/level-1/counter/`);
      assert.equal(await page.locator("#count").textContent(), "0");
      const down = page.getByRole("button", { name: "Decrease count" });
      if (!(await down.isDisabled())) await down.click();
      assert.equal(await page.locator("#count").textContent(), "0");
      await page.getByRole("button", { name: "Increase count" }).press("Enter");
      await page.getByRole("button", { name: "Increase count" }).press("Space");
      assert.equal(await page.locator("#count").textContent(), "2");
      await down.click();
      assert.equal(await page.locator("#count").textContent(), "1");
      await page.getByRole("button", { name: "Reset", exact: true }).click();
      assert.equal(await page.locator("#count").textContent(), "0");
    },
  );
  await check(
    "form errors, focus, live correction and honest demo confirmation",
    async () => {
      await page.goto(`${origin}/level-1/form/`);
      const previousStorage = await page.evaluate(() => JSON.stringify(Object.entries(localStorage)));
      await page.getByRole("button", { name: "Check details" }).click();
      assert.equal(
        await page.locator("#name").getAttribute("aria-invalid"),
        "true",
      );
      assert.equal(
        await page.evaluate(() => document.activeElement.id),
        "name",
      );
      await page.getByLabel("Name", { exact: true }).fill("Sample Learner");
      await page
        .getByLabel("Email", { exact: true })
        .fill("learner@example.com");
      await page.getByLabel("Phone", { exact: true }).fill("+91 98765 43210");
      await page.getByLabel("Password", { exact: true }).fill("Learning123!");
      await page.getByRole("button", { name: "Check details" }).click();
      assert.match(
        await page.locator("#result").textContent(),
        /nothing was sent/,
      );
      assert.equal(await page.evaluate(() => JSON.stringify(Object.entries(localStorage))), previousStorage);
    },
  );
  await check("timer start, pause, break mode and reset", async () => {
    await page.goto(`${origin}/level-1/landing/`);
    await page.getByRole("button", { name: "Start session" }).click();
    await page.waitForTimeout(1150);
    assert.notEqual(await page.locator("#time").textContent(), "25:00");
    await page.getByRole("button", { name: "Pause", exact: true }).click();
    await page.locator('[data-mode="break"]').click();
    assert.equal(await page.locator("#time").textContent(), "05:00");
    await page.getByRole("button", { name: "Reset", exact: true }).click();
    assert.equal(await page.locator("#time").textContent(), "05:00");
  });
  await check(
    "reduced motion, no-script content and native links",
    async () => {
      await page.goto(`${origin}/level-1/landing/`);
      await page.getByRole("button", { name: "Replay introduction" }).click();
      const moving = await page
        .locator("h1")
        .evaluate((node) => getComputedStyle(node).transform);
      assert.equal(moving, "none");
      const noScript = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width: 360, height: 900 },
      });
      const staticPage = await noScript.newPage();
      await staticPage.goto(`${origin}/level-1/landing/`);
      assert.equal(
        await staticPage.getByRole("heading", { level: 1 }).isVisible(),
        true,
      );
      assert.equal(await staticPage.locator("#time").isVisible(), true);
      await noScript.close();
    },
  );
  await check(
    "form cannot submit personal details when JavaScript is disabled",
    async () => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const staticPage = await context.newPage();
      const requests = [];
      staticPage.on("request", (request) => requests.push(request.url()));
      await staticPage.goto(`${origin}/level-1/form/`);
      assert.equal(
        await staticPage.getByLabel("Password", { exact: true }).isDisabled(),
        true,
      );
      assert.equal(
        await staticPage
          .getByRole("button", { name: "Check details" })
          .isDisabled(),
        true,
      );
      await staticPage.keyboard.press("Enter");
      assert.equal(
        requests.some(
          (url) => url.includes("password=") || url.includes("email="),
        ),
        false,
      );
      await context.close();
    },
  );
  await check(
    "normal-motion replay and scroll animation run and settle",
    async () => {
      const context = await browser.newContext({
        reducedMotion: "no-preference",
        viewport: { width: 1440, height: 900 },
      });
      const animated = await context.newPage();
      await animated.goto(`${origin}/level-1/landing/`);
      await animated.waitForTimeout(900);
      await animated
        .getByRole("button", { name: "Replay introduction" })
        .click();
      const transform = await animated
        .locator("h1")
        .evaluate((node) => getComputedStyle(node).transform);
      assert.notEqual(transform, "none");
      await animated.waitForTimeout(900);
      assert.equal(
        await animated
          .locator("h1")
          .evaluate((node) => getComputedStyle(node).transform),
        "none",
      );
      await animated.locator(".reveal").scrollIntoViewIfNeeded();
      await animated.waitForTimeout(800);
      assert.equal(
        await animated
          .locator(".reveal article")
          .first()
          .evaluate((node) => getComputedStyle(node).transform),
        "none",
      );
      await context.close();
    },
  );
  await check(
    "SPA real API search, favorites, client routing and direct reload",
    async () => {
      await page.goto(`${origin}/level-2/`);
      const liveResponse = page.waitForResponse((response) =>
        response.url().startsWith("https://api.github.com/search/users?"),
      );
      await page.getByRole("searchbox").fill("octocat");
      const response = await liveResponse;
      const body = await response.json();
      await writeFile(
        "evidence/live-api.json",
        JSON.stringify(
          {
            date: new Date().toISOString(),
            endpoint: response.url(),
            status: response.status(),
            total: body.total_count,
            users: body.items?.map((item) => item.login),
            message: body.message,
          },
          null,
          2,
        ),
      );
      if (!response.ok())
        throw new Error(
          `Live API returned ${response.status()}; mocked behavior tests remain separate.`,
        );
      const save = page.getByRole("button", {
        name: "Save octocat",
        exact: true,
      });
      await save.click();
      await page.evaluate(() => {
        window.__navigationMarker = true;
      });
      await page.getByRole("link", { name: /^About$/ }).click();
      assert.equal(await page.evaluate(() => window.__navigationMarker), true);
      await page.getByRole("link", { name: /^Saved 1$/ }).click();
      assert.equal(
        await page
          .getByRole("link", { name: "octocat", exact: true })
          .isVisible(),
        true,
      );
      await page.reload();
      assert.equal(
        await page
          .getByRole("link", { name: "octocat", exact: true })
          .isVisible(),
        true,
      );
      await page.getByRole("button", { name: "Remove octocat" }).click();
    },
  );
  await check("Storybook serves an actual documented component", async () => {
    await page.goto(
      `${origin}/library/iframe.html?id=still-ui-button--default&viewMode=story`,
    );
    await page.getByRole("button", { name: "Start focus" }).waitFor();
    await page.screenshot({
      path: "evidence/screenshots/library-button-1440.png",
    });
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    results.pages.push({
      name: "library-button",
      width: 1440,
      route: "/library/iframe.html",
      overflow: false,
      brokenImages: 0,
      violations: axe.violations.map(({ id, impact, description }) => ({
        id,
        impact,
        description,
      })),
    });
  });
} catch (error) {
  results.errors.push(`Harness failure: ${error.message}`);
  throw error;
} finally {
  await browser.close();
  results.status =
    results.checks.some((item) => item.status === "failed") ||
    results.errors.length ||
    results.pages.some(
      (item) => item.overflow || item.brokenImages || item.violations.length,
    )
      ? "failed"
      : "passed";
  await writeFile(
    "evidence/browser-results.json",
    JSON.stringify(results, null, 2),
  );
  if (results.status === "failed") process.exitCode = 1;
}
