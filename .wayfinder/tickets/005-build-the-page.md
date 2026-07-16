---
id: 5
title: Build the page
labels: [wayfinder:task]
status: resolved
assignee: alp
blocked-by: [2, 8]
---

## Question

Task (execution authorized by map Notes): implement the page per the design spec (ticket 2) on the chosen stack (ticket 1) — member data in a small standalone data file (name, city, lat/lon), the single pins view (no alternative view / no toggle — that concept was cut in ticket 3), plus the real-life meeting-city helper as designed in ticket 8, responsive enough for phones in the group chat. Resolve with: what was built and where the data file lives.

## Resolution

**Built** (Alper, 2026-07-16). Two files at the repo root, ready for the Pages deploy (ticket 6):

- **`data.js`** — the standalone member data (the one file you edit to keep the map current). Exposes `window.STAMMTISCH` with `members` (14 × `{name, city}`), `cities` (9 member cities → `[lon, lat]`), and `neutral` (5 central candidate cities → `[lon, lat]`). A header comment documents how to add/move a member (edit a row; add the city + coords if new; push to redeploy) — this closes the map's "how to add/move a member" note inline, no separate artifact needed.
- **`index.html`** — the page. MapLibre GL JS + OpenFreeMap Liberty (CDN, no bundler), Fraunces/Inter, dark sidebar + amber accent. Merges both approved prototypes into one production page:
  - **Pins view** ("Alles im Pin", variant E): one dark card per city, all info inside, no popups; the generic north→south collision layout with distance-capped cluster-merge (`MERGE_KM=60`), click-to-unmerge, sidebar-row fly-to. Ported verbatim from `.prototypes/design-direction.html?variant=E`.
  - **Treffpunkt-Check** (fairness checker, ticket 8): sidebar panel + "Wer kommt?" attendee filter; pick a member card, a neutral dashed pin, or the dropdown → Ø km, named weitester Weg, near→far list, and color-graded map spokes. Ported from `.prototypes/meeting-city-checker.html`. Unified selection: member cards became the map's clickable candidates alongside the neutral pins.

**Verified locally** (headless Chrome): sidebar renders (title, 14/9 subtitle, count-sorted city list, panel, 14-member filter); clustering merges Mainz·Wiesbaden at the Germany-fit zoom; the fairness maths check out (Fulda/all-14 → Ø 159 km, worst Lara·Berlin 338 km, Kassel nearest, Mainz's 5 each counted); the attendee filter re-scopes readout + spokes. `data.js` serves 200; the one 404 is `/favicon.ico` (ticket 7 adds it). The GL map canvas could not be painted in this headless env (WebGL context lost — the exact "not a stack defect" caveat in the design spec); **on-device tile render + card positioning is deferred to ticket 6's desktop+phone verification.**

Data file lives at: **`data.js`** (repo root). Page: **`index.html`** (repo root).
