import { mkdir, rename, writeFile } from 'node:fs/promises';
import { openBrowser } from './browser.mjs';

const origin = process.env.BASE_URL || 'http://127.0.0.1:4173';
await mkdir('evidence/videos', { recursive: true });
const browser = await openBrowser();
const records = [];

async function caption(page, title, text) {
  await page.evaluate(({ title, text }) => {
    let bar = document.getElementById('walkthrough-caption');
    if (!bar) {
      bar = document.createElement('aside');
      bar.id = 'walkthrough-caption';
      Object.assign(bar.style, { position: 'fixed', bottom: '0', left: '0', right: '0', zIndex: '2147483647',
        background: 'var(--color-paper, #101316)', color: 'var(--color-ink, #edf0f2)',
        padding: '16px 32px', borderTop: '1px solid var(--color-rule-2, #60666b)',
        fontSize: '17px', lineHeight: '1.5', pointerEvents: 'none' });
      document.body.append(bar);
    }
    bar.replaceChildren();
    const head = document.createElement('strong'); head.textContent = title;
    const copy = document.createElement('div'); copy.textContent = text;
    bar.append(head, copy);
  }, { title, text });
}
const hold = (page, milliseconds = 2300) => page.waitForTimeout(milliseconds);

async function record(name, steps) {
  const context = await browser.newContext({ viewport: { width: 1200, height: 800 }, reducedMotion: 'reduce',
    recordVideo: { dir: 'evidence/videos', size: { width: 1200, height: 800 } } });
  const page = await context.newPage();
  const video = page.video();
  try {
    await steps(page);
    await hold(page);
  } finally {
    await context.close();
    const file = await video.path();
    const destination = `evidence/videos/${name}.webm`;
    await rename(file, destination);
    records.push({ name, file: `videos/${name}.webm`, audio: 'none', captions: 'burned in', data: 'actual app interactions; no mocked API results' });
    console.log(`Recorded ${destination}`);
  }
}

try {
  await record('level-1-demo', async (page) => {
    await page.goto(`${origin}/level-1/landing/`);
    await page.evaluate(() => document.fonts.ready);
    await caption(page, 'Level 1 / Still', 'Responsive HTML and CSS, a real timer, JavaScript validation, and DOM state.');
    await hold(page);
    await page.getByRole('button', { name: 'Start session' }).click();
    await hold(page, 1600);
    await page.getByRole('button', { name: 'Pause', exact: true }).click();
    await page.locator('[data-mode="break"]').click();
    await caption(page, 'Timer state', 'Start, pause, reset, and switch intervals. The countdown uses a deadline to avoid drift.');
    await hold(page);
    await page.goto(`${origin}/level-1/form/`);
    await page.getByRole('button', { name: 'Check details' }).click();
    await caption(page, 'Accessible validation', 'Invalid submission focuses the first field. Errors are connected to their inputs.');
    await hold(page);
    await page.getByLabel('Name', { exact: true }).fill('Sample Learner');
    await page.getByLabel('Email', { exact: true }).fill('learner@example.com');
    await page.getByLabel('Phone', { exact: true }).fill('+91 98765 43210');
    await page.getByLabel('Password', { exact: true }).fill('DemoLearning123!');
    await page.getByRole('button', { name: 'Check details' }).click();
    await caption(page, 'Honest demo feedback', 'The details validate locally. Nothing is sent, stored, or used to create an account.');
    await hold(page);
    await page.goto(`${origin}/level-1/counter/`);
    await page.getByRole('button', { name: 'Increase count' }).press('Enter');
    await page.getByRole('button', { name: 'Increase count' }).press('Space');
    await page.getByRole('button', { name: 'Decrease count' }).click();
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    await caption(page, 'Small state, clear rules', 'Native buttons work with a keyboard. The counter cannot fall below zero.');
  });
  await record('level-2-demo', async (page) => {
    await page.goto(`${origin}/level-2/`);
    await caption(page, 'Level 2 / DevFinder', 'A React application with client routing, shared saved state, and a customized Bootstrap theme.');
    await hold(page);
    const responsePromise = page.waitForResponse((response) => response.url().startsWith('https://api.github.com/search/users?'));
    await page.getByRole('searchbox').fill('octocat');
    const response = await responsePromise;
    if (response.ok()) {
      await page.getByRole('button', { name: 'Save octocat', exact: true }).waitFor();
      await caption(page, 'Live public GitHub data', 'The input is debounced. The app handles loading, empty results, errors, and stale responses.');
      await hold(page);
      await page.getByRole('button', { name: 'Save octocat', exact: true }).click();
      await page.getByRole('link', { name: /^About$/ }).click();
      await hold(page, 1300);
      await page.getByRole('link', { name: /^Saved 1$/ }).click();
      await caption(page, 'State across routes', 'The saved profile survives navigation through Context, with guarded local storage.');
      await hold(page);
      await page.getByRole('button', { name: 'Remove octocat' }).click();
    } else {
      await caption(page, 'API availability is external', `GitHub returned ${response.status()}. This recording shows the actual error state, not substituted results.`);
      await hold(page, 5000);
    }
    await page.getByRole('link', { name: /^Contact$/ }).click();
    await caption(page, 'Routing without reloads', 'Home, About, Saved, and Contact share one application. Contact is an explicitly local demo.');
  });
  await record('level-3-demo', async (page) => {
    await page.goto(`${origin}/library/iframe.html?id=still-ui-button--interaction&viewMode=story`);
    await page.getByRole('button', { name: 'Complete a session' }).waitFor();
    await caption(page, 'Level 3 / Still UI', 'Four reusable React primitives. This Storybook example uses a real stateful button.');
    await page.getByRole('button', { name: 'Complete a session' }).click();
    await page.getByRole('button', { name: 'Complete a session' }).click();
    await hold(page);
    await page.goto(`${origin}/library/iframe.html?id=still-ui-textfield--with-error&viewMode=story`);
    await page.locator('input').waitFor();
    await caption(page, 'Documented states', 'The field connects its visible label, help, and error. The package installs in a clean consumer.');
    await hold(page, 3000);
    await page.goto(`${origin}/library/iframe.html?id=still-ui-alert--danger&viewMode=story`);
    await page.getByRole('alert').waitFor();
    await caption(page, 'Native-first accessibility', 'Danger feedback uses an alert role. Registry publication remains separate from local package verification.');
    await hold(page);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(`${origin}/level-1/landing/`);
    await caption(page, 'Accessible motion', 'A short GSAP timeline and scroll trigger enhance the page without hiding its content.');
    await hold(page);
    await page.getByRole('button', { name: 'Replay introduction' }).click();
    await page.locator('.reveal').scrollIntoViewIfNeeded();
    await hold(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.evaluate(() => window.scrollTo(0, 0));
    await caption(page, 'Reduced motion respected', 'Movement is disabled when requested. Raw performance measurements are included in the case study.');
  });
} finally {
  await browser.close();
  await writeFile('evidence/videos/index.json', JSON.stringify({ date: new Date().toISOString(), purpose: 'captioned technical demonstrations; add your personal explanation before submission', recordings: records }, null, 2));
}
