# Learn it, change it, explain it

Spend 30 focused minutes daily. First read the requirement, then follow the data through the code. Close the explanation and describe it aloud. Make one real change and record it in ORIGINALITY.md. These are exercises to do, not claims that you already completed them.

| Task | Explain without AI | Your change | Verify |
| --- | --- | --- | --- |
| L1-1 | Semantic sections, Grid, media queries, and why a timer uses a deadline rather than decrementing a number each tick | Add a 15-minute mode yourself | Start/pause/reset it, switch mode during a running session, resize |
| L1-2 | Input versus blur events; validity state; aria-describedby and aria-invalid; why client validation is not security | Add a confirm-password field and mismatch feedback | Invalid submit focuses first bad field; mismatch clears after correction; nothing is transmitted |
| L1-3 | Event listeners, state variable, DOM rendering, lower bound | Add a decrement-by-five control without allowing negative values | Start at 3, decrement by 5, verify 0; reset |
| L2-1 | Components, props, useState, useEffect, Context, client routing, and why a page refresh needs a hosting fallback | Add a short Help route and menu link | Internal navigation preserves saved state; direct URL refresh works |
| L2-2 | Promises, Fetch, debounce, AbortController, stale responses, and loading/error state transitions | Add a user-selected result-count option with a sensible limit | Old request cannot replace new results; loading and API errors still work |
| L2-3 | Bootstrap's base styles versus your tokens and overrides | Create a second accessible accent theme with CSS custom properties | Check text/focus contrast and three widths |
| L3-1 | Props, native semantics, forwarding attributes/ref, stable useId, package exports, and peer dependencies | Add a documented Button size prop | Story shows both sizes, keyboard works, pack/install still passes |
| L3-2 | LCP, CLS, TBT, lab variability, minification, image formats, lazy loading, and cache invalidation | Optimize one asset and capture comparable reruns | Keep raw measurements; explain if score or metric worsens |
| L3-3 | Timeline sequencing, scroll triggers, user interaction, reduced-motion preference, cleanup | Add a replayable animation that uses only transform/opacity | Reduced motion causes no movement; keyboard users retain access |

## React in one small learning sequence

1. Build a button whose text changes with useState.
2. Pass its label as a prop and move it into a separate component.
3. Render an array with stable keys.
4. Fetch data in an effect, including cleanup.
5. Share saved state through Context and navigate between routes.

Do these in a scratch folder before changing DevFinder if any concept is unfamiliar. Do not memorize the complete application.

## Interview walkthrough

Describe the problem, show a user flow, identify a failure you handled, explain a tradeoff, then show evidence. For DevFinder, discuss debouncing versus immediate requests and abort versus stale-response protection. For Still UI, discuss native HTML accessibility versus unnecessary ARIA. For performance, discuss controlled lab results versus real user experience.

Be candid about AI assistance and which parts you personally built or changed. A clear explanation of a small feature is more credible than an unexplained large repository.
