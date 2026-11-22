# Level 1

- Landing: `/level-1/landing/` — responsive Still landing page with a functional 25-minute focus and five-minute break timer. The Level 3 animation requirement is also demonstrated here with a GSAP timeline, scroll reveal, replay, and reduced-motion handling. Content remains visible without JavaScript.
- Form: `/level-1/form/` — accessible client-side validation for name, email, phone and password. This is a demo; no data is submitted or saved. Validation and strength logic are exported separately for testing.
- Counter: `/level-1/counter/` — increment, decrement and reset controls, with a zero lower bound. The count operation is exported separately for testing.

Run the repository's Vitest command to exercise `tests/level1.test.js`. The timer uses wall-clock deadlines so a backgrounded tab does not accumulate interval drift.
