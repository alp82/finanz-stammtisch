---
id: 1
title: Choose the map rendering stack
labels: [wayfinder:research]
status: closed
assignee: alp
blocked-by: []
---

## Question

Which map rendering stack should the page use? Constraints: static public GitHub Pages site, no API key / no billing, must render Germany beautifully (the "beautiful" requirement pushes toward vector tiles or a well-styled raster layer), and must support both markers and at least one alternative view (heatmap or similar) for ~9 city-level points. Compare at minimum Leaflet + raster tiles vs MapLibre GL JS + free vector tile sources; name the recommended stack, tile source, and any attribution requirements. Output: a markdown summary linked from this ticket.

## Resolution

**Chosen stack: MapLibre GL JS (plain CDN `<script>` tag, no bundler) + OpenFreeMap vector tiles**, style `https://tiles.openfreemap.org/styles/liberty`.

Why:
- OpenFreeMap is the only surveyed tile source that is explicitly **key-free, registration-free, and limit-free**, with public/commercial use allowed — a clean fit for a public GitHub Pages site.
- MapLibre covers **markers natively** and has a built-in weighted **`heatmap` layer type**, so both the pins view and an alternative view need no plugins (relevant for ticket 3's candidates).
- Vector tiles + the Liberty style satisfy the "renders Germany beautifully" requirement out of the box, with room to restyle.

Disqualified alternatives:
- **CARTO basemaps**: restricted to grantees/Enterprise — commonly misused, not actually free for this.
- **Stadia/Stamen raster**: free tier needs signup + domain registration (no credit card, but not key-free).
- **Self-hosted Germany PMTiles extract**: exceeds GitHub's 100 MiB file limit at useful zooms.

**Required attribution**: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap", with OpenStreetMap linked to https://www.openstreetmap.org/copyright. MapLibre's attribution control adds this automatically from the style; the OpenFreeMap credit itself is optional per their policy.

Full comparison with primary-source citations: [docs/research/map-rendering-stack.md](../../docs/research/map-rendering-stack.md)
