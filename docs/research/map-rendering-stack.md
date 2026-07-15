# Map rendering stack for the Finanz-Stammtisch map

Research date: 2026-07-15. All policy claims verified against primary sources (linked inline and in [Citations](#citations)).

## Recommendation

**MapLibre GL JS (plain `<script>` tag from unpkg) + OpenFreeMap vector tiles** (style `https://tiles.openfreemap.org/styles/liberty`, or `positron` for a muted look).

- **Why:** OpenFreeMap is the only surveyed tile source that is explicitly key-free, registration-free, and limit-free ("There's no registration, no user database, no API keys, and no cookies"; "no limits on the number of map views or requests") with commercial/public-site use expressly allowed. MapLibre gives crisp vector rendering of Germany at any zoom, a built-in `Marker` API, and a **native `heatmap` layer type** with per-point weighting — both required views, zero plugins.
- **Attribution required:** `OpenFreeMap © OpenMapTiles Data from OpenStreetMap` (with links; MapLibre's attribution control adds it automatically from the style). The OpenFreeMap part is optional but appreciated.

## Constraints recap

- Static page on public GitHub Pages, no backend, no build-time secrets.
- No API key, no billing/credit-card signup for the tile source.
- Germany must look good ("beautiful" ⇒ vector tiles or a well-styled raster layer).
- Markers/pins **and** an alternative weighted view (heatmap or bubbles) for ~9 city points, up to 5 members per city.
- One HTML page + small JSON; setup simplicity counts.

## Candidate comparison

### 1. Leaflet + raster tiles

Leaflet itself is fine: stable v1.9.4, plain CDN `<script>`/`<link>` include with SRI hashes ([leafletjs.com/download](https://leafletjs.com/download.html)), first-class `L.marker`, and heatmaps via the [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat) plugin (BSD-2-Clause, accepts per-point intensity `[lat, lng, intensity]`). Caveat: Leaflet.heat's changelog ends at v0.2.0 (Oct 2015) — it works but is effectively unmaintained. The problem is the raster tile *source*:

| Raster source | Key/signup? | Public third-party site allowed? | Notes |
|---|---|---|---|
| **OSM standard tiles** (`tile.openstreetmap.org`) | No key | Yes, with conditions | [OSMF tile usage policy](https://operations.osmfoundation.org/policies/tiles/): must send valid Referer/User-Agent, honor caching, no bulk download; "We may block access, without notice, if your usage degrades the service." Donation-funded, best-effort. Visually it is the default OSM cartography — functional, not "beautiful". |
| **CARTO basemaps** (Positron/Dark Matter, `basemaps.cartocdn.com`) | No key technically, but not licensed for general use | **No.** | [CARTO's FAQ](https://docs.carto.com/faqs/carto-basemaps): free use is limited to "CARTO grantees" (non-profit grants program); commercial use requires an Enterprise license. The [basemap-styles repo](https://github.com/CartoDB/basemap-styles) defers all policy to carto.com/basemaps. Hotlinking from an arbitrary public page is outside the stated terms — **disqualified**, despite being widely (mis)used. |
| **Stadia Maps / Stamen styles** | **Yes — account required** | Yes, on free tier | [Stadia auth docs](https://docs.stadiamaps.com/authentication/): free signup, "no credit card required", and production websites use domain-based auth (register your Pages domain) instead of an exposed key. Beautiful styles (Stamen Toner/Watercolor, Alidade), but the mandatory signup + domain registration fails the "no key/signup" preference. Documented here as the accurate negative: free tier exists, but it is gated. |

**Verdict:** the only policy-clean, signup-free raster option is default OSM tiles, which fail the "beautiful" bar and run on a donation-funded server whose policy explicitly reserves the right to block. Leaflet+raster is the fallback, not the pick.

### 2. MapLibre GL JS + free vector tiles (recommended)

**Library.** MapLibre GL JS (BSD-3-Clause, currently v5.x) works from a plain CDN script tag with no bundler ([docs](https://maplibre.org/maplibre-gl-js/docs/)):

```html
<script src="https://unpkg.com/maplibre-gl@^5.24.0/dist/maplibre-gl.js"></script>
<link href="https://unpkg.com/maplibre-gl@^5.24.0/dist/maplibre-gl.css" rel="stylesheet" />
```

- Markers: built-in [`Marker` API](https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/).
- Alternative view: **native [`heatmap` layer type](https://maplibre.org/maplibre-style-spec/layers/#heatmap)** in the style spec, with `heatmap-weight` (per-point contribution — perfect for member counts via a GeoJSON property), `heatmap-intensity`, `heatmap-radius`, `heatmap-color`, `heatmap-opacity`. A weighted-bubble view is equally trivial with a `circle` layer whose `circle-radius` is data-driven. No plugins needed for either.
- Cost: the JS bundle is heavier than Leaflet's (~800 kB vs ~150 kB minified), irrelevant for this page.

**Tile source: OpenFreeMap** ([openfreemap.org](https://openfreemap.org/), [GitHub](https://github.com/hyperknot/openfreemap)):

- **Key-free, limit-free:** "There's no registration, no user database, no API keys, and no cookies." "There are no limits on the number of map views or requests."
- **Commercial/public use:** explicitly allowed ("Yes.").
- **Styles:** Positron, Bright, Liberty, Dark, Fiord 3D — OpenMapTiles-schema styles that render Germany cleanly and label it properly. [Quick start](https://openfreemap.org/quick_start/) example: `style: 'https://tiles.openfreemap.org/styles/liberty'`.
- **Attribution:** "Attribution is required… you must add the following attribution: OpenFreeMap © OpenMapTiles Data from OpenStreetMap" — and "If you are using MapLibre, they are automatically added" (the style ships the attribution). The OpenFreeMap credit itself is optional: "You do not need to display the OpenFreeMap part, but it is nice if you do."
- **Risk:** run by one person (Zsolt Ero, of MapHub), donation-funded, no formal SLA. Mitigation: the whole stack is one style URL — swapping to VersaTiles (below) or a self-hosted OpenFreeMap instance is a one-line change.

**Backup no-key vector source: VersaTiles** ([versatiles.org](https://versatiles.org/)) — FLOSS public tile server at `tiles.versatiles.org`, "requires no API keys, charges no usage fees, and does not track your users"; German-community-run (aimed at newsrooms/NGOs). Good hot-spare if OpenFreeMap ever degrades.

### 3. Other stacks (briefly)

- **PMTiles on GitHub Pages (self-hosted, zero third-party dependency):** attractive in theory, but the [Protomaps planet build](https://docs.protomaps.com/basemaps/downloads) is ~120 GB at z0–15 and "each additional zoom level roughly doubles the size", so a Germany extract at full detail runs to gigabytes — far over GitHub's hard [100 MiB per-file limit](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github) (repos ideally <1 GB). A low-maxzoom Germany extract could fit under 100 MB, but capping zoom around z10–11 loses the street-level detail that makes city zoom-ins look good. Only worth it if third-party endpoints become unacceptable; Protomaps' hosted API requires a key, so it doesn't beat OpenFreeMap.
- **Protomaps + Leaflet adapter:** inherits the same hosting problem; no advantage here.
- **MapLibre-GL-Leaflet binding (OpenFreeMap's suggestion for Leaflet users):** loads both libraries — strictly worse than using MapLibre directly for a new page.

### Side-by-side

| | Leaflet + OSM raster | **MapLibre + OpenFreeMap** |
|---|---|---|
| Setup on one static HTML page | 1 script + 1 css + `L.tileLayer` | 1 script + 1 css + 1 style URL |
| Beauty for Germany | Default OSM cartography only | 5 designed vector styles, sharp at all zooms, retina-native |
| Markers | `L.marker` built-in | `maplibregl.Marker` built-in |
| Weighted heatmap / bubbles | Leaflet.heat plugin (unmaintained since 2015); `L.circleMarker` for bubbles | Native `heatmap` layer with `heatmap-weight`; data-driven `circle` layer |
| Key / billing | None | None |
| Rate limits | Unspecified; may be blocked "without notice" if service degrades | "No limits" stated |
| Allowed on public third-party site | Yes, with Referer/UA/caching conditions | Yes, explicitly, incl. commercial |
| Attribution | © OpenStreetMap contributors | OpenFreeMap © OpenMapTiles Data from OpenStreetMap |
| Sustainability risk | OSMF donation-funded shared infra, policy discourages growth | Single maintainer, donation-funded; trivial to swap source (VersaTiles backup) |

## Attribution HTML for the recommended stack

MapLibre's default attribution control injects this from the OpenFreeMap style automatically — verify it renders and do not disable the control. If ever rendered manually, use exactly:

```html
<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a>
<a href="https://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>
Data from <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>
```

Per the [OSMF attribution guidelines](https://osmfoundation.org/wiki/Licence/Attribution_Guidelines), the credit belongs in a corner of the map and the OpenStreetMap text must link to `openstreetmap.org/copyright` (which covers the ODbL notice).

## Citations

- OSM tile usage policy (Referer/UA, caching, no bulk download, block-without-notice): <https://operations.osmfoundation.org/policies/tiles/>
- OSM copyright & required credit: <https://www.openstreetmap.org/copyright>
- OSMF attribution guidelines (wording, placement, link target): <https://osmfoundation.org/wiki/Licence/Attribution_Guidelines>
- OpenFreeMap — no keys/registration/limits, commercial use, attribution text: <https://openfreemap.org/> and <https://github.com/hyperknot/openfreemap>
- OpenFreeMap quick start — style URLs, MapLibre snippet, attribution links: <https://openfreemap.org/quick_start/>
- CARTO basemaps FAQ — grantees/Enterprise only: <https://docs.carto.com/faqs/carto-basemaps>; tile URL/attribution in <https://github.com/CartoDB/basemap-styles>
- Stadia Maps authentication — free signup (no credit card), domain-based auth required for production: <https://docs.stadiamaps.com/authentication/>
- MapLibre GL JS docs — CDN script-tag usage, Marker, heatmap examples: <https://maplibre.org/maplibre-gl-js/docs/>
- MapLibre style spec — native heatmap layer and properties: <https://maplibre.org/maplibre-style-spec/layers/#heatmap>
- Leaflet download page — v1.9.4 CDN snippet: <https://leafletjs.com/download.html>
- Leaflet.heat — weighted intensity, script-tag usage, BSD-2-Clause, last release 2015: <https://github.com/Leaflet/Leaflet.heat>
- VersaTiles — key-free public tile server: <https://versatiles.org/>
- Protomaps basemap downloads — 120 GB planet z0–15, extract/maxzoom guidance: <https://docs.protomaps.com/basemaps/downloads>
- GitHub file size limits — 100 MiB hard limit per file: <https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github>
