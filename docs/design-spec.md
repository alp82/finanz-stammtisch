# Design spec — Finanz-Stammtisch member map

Resolved by ticket [Design direction — what does "beautiful" look like](../.wayfinder/tickets/002-design-direction-prototype.md).
Canonical visual reference: `.prototypes/design-direction.html?variant=E` (approved by Alper 2026-07-16).
The build implements this spec; the prototype is the reference for look and feel, not production code.

## Layout

Two-pane page, full viewport height:

- **Sidebar** (left, 320px, `#101418` background): display title "Finanz-Stammtisch"
  (Fraunces 900), subtitle "14 Mitglieder in 9 Städten", then one row per city sorted by
  member count descending — city name, member-count badge, member names underneath.
  On narrow screens the panes stack (sidebar on top, ~45%/55%).
- **Map** (remaining width): MapLibre GL JS + OpenFreeMap **Liberty** style (per the
  [stack decision](../.wayfinder/tickets/001-choose-map-rendering-stack.md)), initial view
  fitted to Germany, compact attribution control (auto-populated from the style).

## Typography & color

- Display: **Fraunces** (900 for the sidebar title; also used on count text inside pins).
- UI/body: **Inter**.
- Palette: near-black `#101418` (sidebar, pin cards at ~92% opacity), warm off-white text
  `#e8e6e1`, muted gray `#8b9199`-`#9aa3ad` for secondary text, **amber `#f59e0b`** as the
  single accent (count bubbles, city names on cards, sidebar badges).

## Pins ("Alles im Pin")

One dark rounded card per city — **all information inside, no popups/tooltips anywhere**:

- Header row: amber circular badge with the member count + city name in amber uppercase.
- Below: the member first names. Cities with >3 members wrap names two per line.
- Cities with >2 members use a scaled-up card (larger font, badge, padding) so member-heavy
  cities read bigger.
- **Pointer tail**: a 10px triangle, always horizontally centered on the card, touching the
  exact city coordinate. Default: card above the point, tail pointing down; the layout may
  flip a card below its point (tail on top, pointing up).

## Card placement & clustering (generic, no per-city constants)

Recomputed on every map move/zoom:

1. Project all city points to screen px.
2. Fixed-point loop: place cards north→south, each above or below its point, whichever
   overlaps already-placed cards less. If cards still collide, merge the worst-overlapping
   pair into a cluster and re-place; repeat until stable.
3. Merge rules: only when overlap exceeds **15% of the smaller card's area**, and only if
   every involved city is within **60 km** (`MERGE_KM`) — distant cities (e.g. Mainz vs
   Stuttgart) never share a cluster; a few px of residual overlap is accepted instead,
   with smaller cards z-ordered on top.
4. **Cluster cards**: total count in the badge; title = city names joined with " · " if it
   fits in ~24 chars, else "TopCity & Umgebung" (top = most members); body lists each city
   (amber) with its names. Clusters split automatically on zoom-in.

## Interactions

- **Cluster card click**: fly to the zoom where the cluster's members separate — computed
  from the closest member pair's geographic distance (zoom at which that distance ≥ ~260px:
  `z = log2(260 · 156543.03 · cos(lat) / d_m)`), centered on the cluster centroid, max z12.
- **Sidebar city click**: fly to that city at the zoom where it is guaranteed unmerged
  (same formula against its nearest neighbor city), clamped to z8–z12.
- No hover states required on pins; cluster cards show `cursor: pointer`.

## Rejected during exploration (variants A–D)

- Light/minimal map (Positron) and white label chips — user disliked map, pin and overlay style.
- Poster framing with warm/sepia tint — rejected outright.
- Separate count-bubble + name-chip pins (two elements) — replaced by all-in-one cards
  (inconsistent gaps and overlap-prone).
- Hand-tuned per-city pixel offsets — replaced by the generic placement algorithm.

## Open caveats for build/ship

- **Performance**: MapLibre needs working WebGL; on software-rendered browsers panning is
  slow (observed locally with a broken GPU state — not a stack defect). Verify on a phone at
  ship time; fallback lever if real devices struggle: lighter map style (Positron) at the
  cost of the approved look.
- The layout pass runs per frame during pan/zoom (9 cities, ≤12 iterations — trivial today);
  keep it O(n²)-honest if the member list ever grows substantially.
