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

## Not yet specified

- A short "how to add/move a member" note (README or on-page) — shape depends on the final data file format.

## Out of scope

- External live data sources (Google Sheets etc.) — data lives in the repo by decision.
- Auth, private hosting, or any backend — the page is public and static.
- Any alternative display format (heatmap / weighted bubbles / density-glow) — prototyped in [Pick the one alternative display format](tickets/003-pick-second-display-format.md) and cut; the single pins view is enough (a multi-view gallery was already out at charting).
- Member self-service editing.
