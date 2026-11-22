import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, writeFile, cp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";

const npmCli = process.env.npm_execpath;
function npm(args, cwd = process.cwd()) {
  const result = spawnSync(process.execPath, [npmCli, ...args], {
    cwd,
    encoding: "utf8",
  });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
  return result.stdout;
}

await mkdir("evidence/package", { recursive: true });
const library = resolve("level-3/component-library");
const packed = JSON.parse(
  npm(
    ["pack", "--json", "--pack-destination", resolve("evidence/package")],
    library,
  ),
);
const archive = resolve("evidence/package", packed[0].filename);
const consumer = await mkdtemp(join(tmpdir(), "still-ui-consumer-"));
const manifest = JSON.parse(await readFile("package.json", "utf8"));
await writeFile(
  join(consumer, "package.json"),
  JSON.stringify({ private: true, type: "module" }),
);
// A separate directory and registry React install prove the archive has no source-tree imports.
npm(
  [
    "install",
    "--ignore-scripts",
    "--no-audit",
    "--no-fund",
    archive,
    `react@${manifest.dependencies.react}`,
    `react-dom@${manifest.dependencies["react-dom"]}`,
  ],
  consumer,
);
const packageName = JSON.parse(
  await readFile(join(library, "package.json"), "utf8"),
).name;
await writeFile(
  join(consumer, "check.mjs"),
  `
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Button,TextField,Card,Alert} from ${JSON.stringify(packageName)};
import {readFileSync} from 'node:fs';
const h = React.createElement;
const output = renderToStaticMarkup(h('main', null,
  h(Button, {disabled:true}, 'Continue'),
  h(TextField, {label:'Email', error:'Check address', name:'email'}),
  h(Card, {title:'Session'}, 'Content'),
  h(Alert, {variant:'danger'}, 'Request failed')));
assert.match(output, /disabled/);
assert.match(output, /aria-invalid="true"/);
assert.match(output, /role="alert"/);
const css = readFileSync(import.meta.resolve(${JSON.stringify(`${packageName}/styles.css`)}).replace('file:///', ''), 'utf8');
assert.ok(css.includes('--color-paper'));
console.log('Clean consumer rendered four exports and resolved standalone CSS.');
`,
);
// Use fileURLToPath in the consumer for cross-platform CSS resolution.
let check = await readFile(join(consumer, "check.mjs"), "utf8");
check =
  "import {fileURLToPath} from 'node:url';\n" +
  check.replace(
    "import.meta.resolve(" +
      JSON.stringify(`${packageName}/styles.css`) +
      ").replace('file:///', '')",
    "fileURLToPath(import.meta.resolve(" +
      JSON.stringify(`${packageName}/styles.css`) +
      "))",
  );
await writeFile(join(consumer, "check.mjs"), check);
const result = spawnSync(process.execPath, ["check.mjs"], {
  cwd: consumer,
  encoding: "utf8",
});
if (result.status !== 0) throw new Error(result.stderr || result.stdout);
const evidence = {
  date: new Date().toISOString(),
  status: "passed",
  package: packageName,
  version: packed[0].version,
  archive: `package/${packed[0].filename}`,
  integrity: packed[0].integrity,
  packedFiles: packed[0].files.map((file) => file.path),
  cleanConsumer: true,
  output: result.stdout.trim(),
  registryPublication: "pending npm sign-in and verified scope ownership",
};
await writeFile(
  "evidence/package-smoke.json",
  JSON.stringify(evidence, null, 2),
);
console.log(result.stdout.trim());
console.log(`Package archive: ${archive}`);
