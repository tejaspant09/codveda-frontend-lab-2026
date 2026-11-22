# DevFinder — Level 2

Run from the delivery root with `npm run dev:level2`; build with `npm run build:level2` (see the root README for all scripts). The deployed base is `/level-2/`; configure SPA history fallback to `level-2/index.html` for direct links such as `/level-2/saved`.

## Task mapping

- **Task 1 / SPA:** React JavaScript pages for Search, Saved, About, and Contact. React Router changes pages without reloads; the navigation includes active states, mobile menu, and a saved count.
- **Task 2 / API:** Real unauthenticated GitHub user search, with encoded queries, 400 ms debounce, a two-character minimum, AbortController cleanup, and a sequence guard that rejects stale responses even when a fetch mock or network ignores abort. Loading, empty, offline, HTTP failures, rate limits (403/429), and retry are represented honestly.
- **Task 3 / Bootstrap:** Bootstrap supplies the responsive row/column grid, form foundation, and utilities. Imported first, it is customized by shared Console tokens and `src/styles.css` for typography, graphite surfaces, amber controls, focus, hover, disabled states, and 48px targets.

## State and data

`useState` holds the controlled search/form/menu state. `useEffect` schedules and cleans up requests and persists favorites. `useRef` holds the request sequence and first-navigation flag. React Context holds saved profiles above all routes. Favorites are bounded to 100, reduced to a safe shape, validated against exact HTTPS GitHub profile URLs, and loaded defensively when browser storage is corrupted. Storage failure leaves in-memory favorites usable. Avatars accept only HTTPS `avatars.githubusercontent.com` URLs and have an initials fallback. React text rendering is used throughout.

Public GitHub search exposes public profiles only, may lag changes, and has a shared unauthenticated request limit. No token, private data, invented results, or estimated totals are used. The Contact form validates locally and explicitly says nothing is sent. External profiles open a new tab.

## Verification

`tests/level2.test.jsx` exercises real components with mocked network responses: debounce and encoding, empty/error/rate-limit states, retry, late-response suppression, saved state across navigation, corrupt storage, and contact validation. These tests do not claim live API availability; manually try a real search when online. Test scripts and build commands are documented at the delivery root.
