# Frontend Lab

Nine frontend internship exercises, organized by level. The fictional product Still supplies the vanilla JavaScript demos; DevFinder is a real public GitHub search application; Still UI is a small React component library.

**Internship dates:** 21 November–21 December 2026. **Preparation target:** 30 November 2026. Early preparation does not change the internship duration or establish certification eligibility.

## Run locally

Requires Node.js 24.15+ (tested with 24.19.0) and npm. Tested dependency versions are pinned in package-lock.json.

```sh
npm ci
npm test
npm run build
npm run preview
```

Open http://127.0.0.1:4173/. Use the HTTP server rather than opening HTML files directly: these projects use bundled modules and client-side routing.

| Destination | Local path |
| --- | --- |
| Project hub | / |
| Landing page and animations | /level-1/landing/ |
| Registration validation demo | /level-1/form/ |
| Counter | /level-1/counter/ |
| DevFinder SPA, API, Bootstrap | /level-2/ |
| Component documentation | /library/ |
| Controlled performance baseline | /baseline/landing/ |

For development: `npm run dev:level1`, `npm run dev:level2`, or `npm run storybook`. These are separate development servers; the complete linked showcase is available through the production preview above.

## Verification and evidence

- `npm test`: meaningful validation, component, API-state, routing, and storage checks.
- `npm run test:browser`: browser behavior, responsive screenshots, and accessibility checks. Uses installed Chrome or Edge; optional CHROME_PATH selects another Chromium executable.
- `npm run test:package`: builds, packs, installs, and renders the actual package in a clean consumer directory.
- `npm run audit:performance`: comparable local Lighthouse runs and report. Run after building with the preview server running.
- `evidence/VERIFICATION.md`: actual checks and unresolved external actions.

## Requirement mapping

See docs/TASK-MATRIX.md and each level's README. Level 2's three tasks share an application but have distinct acceptance criteria. Level 3 performance and animation tasks extend the landing page. If the portal requires separate repositories, split these existing task areas rather than inventing a different submission format.

## Submission and originality

This repository was built with AI assistance and reviewed using automated checks and a stronger-model review. It is a learning scaffold until the intern has run it, understood it, made their own changes, and confirmed Codveda permits this workflow. Do not present generated work as entirely handwritten or claim exercises were completed before doing them.

The supplied guidelines prohibit copied or duplicated work; they do not explicitly approve AI assistance. See docs/ORIGINALITY.md, docs/LEARNING-GUIDE.md, and docs/CLARIFICATION-DRAFT.txt. The component-library interpretation of Level 3 Task 1 remains unconfirmed because the PDF also contains a conflicting Django description.

No real accounts are created by the form demos. No passwords are persisted or transmitted. DevFinder requests public GitHub data without a token; shared IP-based rate limits can affect it.

## Publishing

Netlify configuration is included, with a fallback for /level-2 client routes. Sites hosting metadata is maintained separately in .openai/hosting.json. Site deployments start private unless sharing is explicitly changed. Do not submit an owner-only URL to evaluators without checking their access.

The npm package scope is a placeholder based on the connected GitHub login, **not verified npm ownership**. Sign in, choose a scope you own, and follow the library README before publishing. The local package installation test does not prove registry publication.

## Learning and handoff

- docs/LEARNING-GUIDE.md: daily exercises and interview explanations.
- docs/WORKFLOW.md: model prompts, escalation, and 22–30 November schedule.
- docs/SUBMISSION-CHECKLIST.md: separate level records and pending external steps.
- docs/VIDEO-SCRIPTS.md: three project walkthroughs.
- docs/LINKEDIN-DRAFTS.md and docs/RESUME-DRAFT.md: editable, evidence-based drafts.
- THIRD-PARTY-NOTICES.md: dependencies and generated asset provenance.

Original application source is licensed under MIT. See LICENSE. Third-party libraries and fonts retain their own licenses.
