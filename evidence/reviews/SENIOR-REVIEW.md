# Senior implementation review

**Reviewer:** GPT-6.2 Astra, 22 November 2026. This is an AI code review of work drafted by the implementation agents. The integration agent owns source changes and evidence generation.

I inspected the nine requirements, project source, tests, build configuration, design brief and assistance record. I ran `npm test` from the workspace root on Node v24.19.0. Three files and 21 tests passed. Five tests cover Level 1 validation and count logic, ten cover the React app with simulated responses, and six cover the reusable components. The recorded results are in `../unit-tests.json`.

## Findings sent to the integration agent

| Priority | Source at initial review | Finding and reproduction |
| --- | --- | --- |
| High | `level-1/form/index.html:11`, `:18` | A form without a submit guard defaults to a GET to the current page. Before the module loads, or with JavaScript disabled, submitting the original named controls could put the synthetic password and contact fields in the request URL. Reproduce with dummy values only. Delay activation until the local submit guard is installed, or remove control names used for serialization. Verify both Enter and clicking the submit control with scripting disabled. |
| Medium | `level-2/src/App.jsx:188` | The original Save and Saved visuals used different words from their accessible names. Speak the visible button name or inspect the accessible name for a saved result. Preserve the visible action in the accessible name across both states. |
| Medium | `level-1/landing/index.html:37`, `vite.level1.config.js:11` | The initial WebP had no lazy-loading attribute. The baseline replaced a source file name in a post-build HTML transform. Inspect the actual built image references, formats, loading attributes and asset bytes for both variants before making an optimization claim. |
| Medium | `level-3/component-library/.storybook/main.js:3` | Autodocs tags were present while the configuration loaded only the accessibility addon. Check the built Storybook index for actual docs entries for each component and view a docs page. |
| Medium | `scripts/browser-tests.mjs` | The original probe used reduced motion throughout and verified only the fallback. Exercise replay and scroll at normal motion and check that content settles. Report reduced and normal motion separately. |
| Low | `README.md:9`, `level-2/README.md:3` | The advertised Node 22.12 minimum is below the locked jsdom and React Router engines. The advertised `build:level2` script was absent. Show a supported Node release and runnable command. |

## Nine task decisions at first inspection

| Task | Decision | What the evidence currently supports |
| --- | --- | --- |
| L1-1 landing | Implementation pass | Semantic landmarks, native links, Grid breakpoints and a deadline-based timer exist. Browser evidence pending. |
| L1-2 validation | Correction required | Field, format and strength logic passed. The disabled-script submission path needs correction and independent coverage. |
| L1-3 counter | Implementation pass | The lower bound and count changes passed unit tests. Source wires native increment, decrement and reset buttons and the live output. Keyboard and reset evidence pending. |
| L2-1 SPA | Implementation pass; deployment external pending | Four routes, navigation, shared favorites, defensive storage recovery and local contact validation are present. The route and state unit tests passed. A simulated router does not verify a hosting rewrite. |
| L2-2 API | Implementation pass | Unit tests cover debounce, encoding, stale requests, cancellation, empty/error/offline/rate-limit states and retry. A real response remains separately verifiable. |
| L2-3 Bootstrap | Correction required | Bootstrap grid, form controls, custom focus and responsive menu are implemented. Verify the card button naming correction as well as keyboard/mobile use. |
| L3-1 library | Implementation pass; registry external pending | Six unit tests passed for four React components. Confirm the packed consumer, actual Storybook documentation and the employer's intended requirement. |
| L3-2 performance | Verification pending | Build configuration defines controlled variants. Raw measurements, actual variant differences and cache header evidence are required. |
| L3-3 animation | Implementation pass | Source has a GSAP timeline, scroll trigger, replay handler, live media-preference change and page restoration hooks. Normal motion and fallback need distinct runtime evidence. |

## Originality and submission limits

The task matrix explicitly maps shared projects to separate requirements. The assistance record names the model contributions and the Hallmark design scaffold. The application-specific code and tests are consistent with the documented design. A source inspection cannot certify originality across external repositories, personal authorship or the intern's mastery. The intern's contribution record is blank. No reviewed material proves the intern made a personal change or that Codveda permits this workflow.

The supplied originality rules require genuine effort and prohibit copied or duplicated work. The review found no organizer decision about AI assistance, shared implementations, or the contradictory Django and component-library descriptions for L3-1. The clarification draft asks about each. GitHub identity does not establish npm scope ownership. Public registry publication, signed-out evaluator access, LinkedIn posting, submission and certificate issuance require separate evidence.
