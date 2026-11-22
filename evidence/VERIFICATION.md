# Verification record

Verified on 22 November 2026 using Node 24.19.0, locked npm dependencies, and installed Chrome 157.0.8103.79. These are technical checks, not certification or a claim that the intern has completed the learning exercises.

| Check | Observed result | Evidence |
| --- | --- | --- |
| Unit/component tests | 21 passed, 0 failed, across three files | unit-tests.json |
| Production builds | Vanilla demos, React SPA, ESM library, Storybook and hub built successfully | Reproduce with npm run build |
| Browser behavior | 8 checks passed: counter keyboard/lower bound/reset, form validation/storage, timer modes, reduced motion, disabled-JS form protection, normal motion, live API/routing/favorites/reload, Storybook | browser-results.json |
| Responsive/accessibility | 15 scans at 360/768/1440 plus a library scan; no horizontal overflow, broken images, or detected WCAG A/AA violations; 0 recorded runtime errors | screenshots/, browser-results.json |
| Live REST API | Actual GitHub search returned HTTP 200 | live-api.json |
| Package installation | Packed archive installed and rendered in a separate clean consumer; CSS resolved | package-smoke.json, package/ |
| Performance | 3 interleaved runs per variant; final median performance 92 to 93; PNG 63,332 bytes to WebP 23,290 bytes | performance/REPORT.md and raw reports |
| Design checks | Hallmark static: 0 FAIL, 0 REFLEX; two documented benign dismissals. Published-build local render: 0 findings | reviews/, .hallmark/shots |
| Independent review | Initial GPT-6.2 Astra review found issues; fixes and bounded final GPT-6.1 Sol review settled the material finding with ship verdict | reviews/SENIOR-REVIEW.md, reviews/FINAL-REVIEW.md |
| Demo recordings | Three real, captioned, silent browser recordings; representative frames visually inspected | videos/index.json, videos/*.webm |
| Dependency audit | 0 known vulnerabilities after scoped Storybook transitive dependency overrides | package-lock.json; reproduce npm audit |

After the final Save/Remove correction and phone-layout refinement, the broad browser suite was repeated: all eight behaviors and all 16 scans passed. The targeted current unit check, full 21-test run, and subsequent real demo recording also verified the save/remove path. The final review records its earlier inspection ordering; this record includes the later integration checks.

Lighthouse measures a controlled unoptimized variant of this same project, not a previous live website. Final median CLS was 0.001 for both variants. Scores overlap substantially across runs (baseline 85/92/100, optimized 99/93/87), so the report does not claim a robust score improvement; the 63.2% image byte reduction is directly measured. Caching is configured and locally served; the published host needs a separate header check.

## Review settlements

- Form is disabled until its JS guard attaches, so failed/disabled scripting cannot natively submit personal details. Tested with no JavaScript.
- Save and Remove visible text is contained in the corresponding accessible name, including the full-list state.
- Both actual baseline PNG and optimized WebP references were checked; the baseline transform runs before bundling.
- Storybook includes actual Docs entries for all four components.
- Replay sits beside the affected hero, and both motion modes were exercised.
- README minimum runtime and advertised scripts match the installed engine requirements.

## External and personal actions still required

npm registry publication is pending sign-in and verified scope ownership. The locally packed installation is not publication. Codveda has not confirmed AI assistance, shared-project format, or the component-library interpretation of the conflicting advanced description. The submission portal URL has not been supplied. Personal learning/change records remain intentionally blank. LinkedIn drafts are unsent, and technical recordings should be accompanied by the intern's own explanation.

Hosting starts owner-private. Verify evaluator access before submitting a live link. Deployment and GitHub receipts, when available, are recorded separately; a successful local build alone does not prove either publication.

## Final integration updates

The post-draft hero review found the phone primary action below the first screen. Compact mobile spacing and mode controls corrected it; the revised headline states the default 25-minute interval. Four first-screen captures at 375x812, 1280x800, 1440x900 and 1920x1080 received a ship settlement. Performance was remeasured on this corrected build. The initial public GitHub CI run succeeded; see github-ci.json for its exact commit.
