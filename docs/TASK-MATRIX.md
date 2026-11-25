# Task requirements and evidence

All nine listed tasks are included, although the PDF requires any two per level. Status must be assessed from evidence; a row is not proof of completion.

| ID | Source location | Required behavior | Evidence location |
| --- | --- | --- | --- |
| L1-1 | level-1/landing | Semantic navigation, hero, feature content, footer; mobile-first layouts; scrolling/basic motion | screenshots/landing-*.png; browser-results.json |
| L1-2 | level-1/form | Name/email/phone/password; required/format/strength validation; input, focus, blur; accessible errors; honest demo confirmation | tests/level1.test.js; browser-results.json |
| L1-3 | level-1/counter | DOM increment/decrement/reset; nonnegative state; clear controls | tests/level1.test.js; browser-results.json |
| L2-1 | level-2/src | Home/About/Contact; React Router; Context shared saved state; deployable SPA | tests/level2.test.jsx; browser-results.json; deployment.json if published |
| L2-2 | level-2/src | Real Fetch API data; search; debounce; loading, empty, error, rate limits; stale suppression | tests/level2.test.jsx; live-api.json; browser-results.json |
| L2-3 | level-2/src/styles.css | Bootstrap, customized theme/type/spacing, responsive accessible components | screenshots/devfinder-*.png; browser accessibility results |
| L3-1 | level-3/component-library; supplemental level-3/django-auth-demo | Component library follows the title/objectives; Django app covers the conflicting longer description. Codveda clarification still needed. | tests/library.test.jsx; package-smoke.json; Storybook build; Django tests/check; registry publication PENDING |
| L3-2 | scripts/performance.mjs | Lighthouse before/after; WebP/lazy loading; bundling/minification; caching; reduced blocking | performance/REPORT.md; raw JSON/HTML; production headers |
| L3-3 | level-1/landing/main.js | GSAP timeline; scroll reveal; interactive replay; reduced-motion fallback; clean lifecycle | browser-results.json; animation source; performance report |

Evidence paths above are relative to evidence/ unless they begin with tests/. Both L3-1 interpretations are now included, but Codveda must clarify which is required. Shared project reuse and AI assistance also need confirmation against actual portal/offer rules.
