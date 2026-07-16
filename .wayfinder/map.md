---
title: Finanz-Stammtisch member map — live on GitHub Pages
labels: [wayfinder:map]
status: open
---

## Destination

A simple but beautiful single-page map of the Finanz-Stammtisch members across Germany, live on a public GitHub Pages URL: a single member-pins view plus a helper for choosing a real-life meeting city, fed by a small data file in the repo. Done means the URL works and is shareable in the group chat.

## Notes

- **Execution is in scope for this map** (user decision at charting): tickets may build and deploy, not just decide. The final stretch is implementation + go-live.
- Skills to consult per ticket type: `/grilling` + `/domain-modeling` for decisions, `/prototype` for design/format explorations, `/research` for stack questions.
- Standing decisions from charting (not tickets):
  - **Hosting**: static, public URL — GitHub Pages, deploy on push.
  - **Scope**: a single pins view (the alternative-format toggle was prototyped and cut). Plus a real-life meeting-city helper on the same page.
  - **Data**: a small JSON/JS file in the repo with name, city, coordinates; updated by hand + redeploy.
  - **Member data** (real names everywhere): Lara → Berlin, Holger → Bonn, Daniel → Wiesbaden ("Spießbaden" is a joke), Andres/Carsten/Chris/Julia/Jannis → Mainz, Alper/Stephan → Kassel, Niklas → Frankfurt am Main (60314), Benni → Leonberg (71229), Alex → Hamburg, Walle → Stuttgart.
  - **Privacy**: first names + city-level pins on a public page is accepted.

## Decisions so far

<!-- one line per closed ticket: gist + link -->

- [Choose the map rendering stack](tickets/001-choose-map-rendering-stack.md) — MapLibre GL JS (CDN, no bundler) + OpenFreeMap vector tiles (Liberty style): key-free and limit-free, native markers + built-in weighted heatmap layer; OSM attribution auto-added by the style.
- [Design direction — what does "beautiful" look like](tickets/002-design-direction-prototype.md) — dark sidebar + Liberty map with all-in-one pin cards (count, city, names inside; centered pointer tail; no popups); generic collision layout with distance-capped cluster-merge, click-to-unmerge; spec in docs/design-spec.md.
- [Set up repo + GitHub Pages](tickets/004-repo-and-github-pages-setup.md) — public repo [alp82/finanz-stammtisch](https://github.com/alp82/finanz-stammtisch) created and pushed; Pages live at https://alp82.github.io/finanz-stammtisch/ publishing from `main` root on every push (404s until ticket 5 adds index.html).
- [Design the real-life meeting-city helper](tickets/008-meeting-city-helper.md) — a **fairness checker, not a recommender** ("Treffpunkt-Check"): pick any candidate city (member cities + neutral central ones), see Ø travel, the named worst-off member, and everyone sorted near→far with map spokes; straight-line km (mixed car/train), "Wer kommt?" filter re-scopes. No ranking/winner — the three auto-suggest framings (member Treffpunkt / ICE-hub shortlist / centroid) were all rejected. Spec in docs/design-spec.md.
- [Sharing polish — title, favicon, link preview](tickets/007-sharing-polish.md) — title `Finanz-Stammtisch – Karte` (also og:title); favicon = amber-F monogram SVG on dark; og:description `14 Mitglieder in 9 Städten`; og:image = a branded 1200×630 card (dark/amber) with two amber pins reading "14 Mitglieder" and "9 Städte" (absolute-URL `og.png` at repo root), `twitter:card=summary_large_image`.
- [Build the page](tickets/005-build-the-page.md) — production `index.html` + standalone `data.js` at the repo root: the "Alles im Pin" clustering pins view and the Treffpunkt-Check fairness checker merged into one MapLibre/Liberty page (both approved prototypes ported). Member data (`window.STAMMTISCH`) lives in `data.js` with an inline "how to add/move a member" header. Logic + wiring verified locally; on-device GL paint deferred to ship (WebGL context lost in headless, per the spec caveat).

## Not yet specified

<!-- empty: the "how to add/move a member" note graduated into data.js's header comment when the data format was decided in Build the page. -->
_(none — the way to the destination is one step: ship it live.)_

## Out of scope

- External live data sources (Google Sheets etc.) — data lives in the repo by decision.
- Auth, private hosting, or any backend — the page is public and static.
- Any alternative display format (heatmap / weighted bubbles / density-glow) — prototyped in [Pick the one alternative display format](tickets/003-pick-second-display-format.md) and cut; the single pins view is enough (a multi-view gallery was already out at charting).
- Member self-service editing.
