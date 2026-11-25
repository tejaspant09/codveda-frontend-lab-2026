# Level 3 record

## Task 1: Custom Component Library

Implementation: component-library/. Four named exports (Button, TextField, Card, Alert), standalone CSS, native attributes and ref forwarding, stable field IDs, hint/error descriptions, documented Storybook states. Tests: tests/library.test.jsx. Build: `npm run build:library`; docs: `npm run build:storybook`; clean archive installation: `npm run test:package`.

The component-library implementation follows the task title and objectives. The PDF's longer description conflicts with them, so a separate supplemental Django authentication demo is in django-auth-demo/. This covers both interpretations without claiming Codveda approved either one. Ask Codveda which version they expect before submission. The archive installation check is not a claim of npm publication; registry publication remains pending.

## Task 2: Performance Optimization

Implementation: the existing Still landing source, vite.level1.config.js, scripts/performance.mjs, hosting-headers.txt. The measured baseline is a declared, reproducible unoptimized variant of the same source, not an earlier production release. It uses PNG, eager preview loading, unminified bundles and revalidated assets. The optimized variant uses WebP, lazy loading, explicit dimensions, minification and fingerprinted immutable assets.

Raw Lighthouse JSON/HTML, three interleaved mobile runs per variant, medians and limitations: evidence/performance/. The local server applies caching configuration; production headers need their own check after publication. No claim about actual user traffic is made.

## Task 3: Advanced Animations

Implementation: level-1/landing/main.js. GSAP sequences an introduction and triggers a feature movement on scroll. The replay control is beside the affected hero content. Only transforms animate. Reduced-motion preference disables movement, changes are observed live, and context is reverted on page exit/restoration. Core content is visible without scripting.

Behavior evidence: evidence/browser-results.json, normal-motion and reduced-motion cases. The timer remains a real DOM product demo and animations do not gate interaction.

## Your demonstration

Follow docs/LEARNING-GUIDE.md and docs/VIDEO-SCRIPTS.md. Captioned technical recordings are provided separately from a personal narrated explanation. Record the specific component or animation you changed and explain its behavior. Do not claim the learning exercise, npm publication, or employer approval until it has happened.
