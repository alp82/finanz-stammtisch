---
id: 3
title: Pick the one alternative display format
labels: [wayfinder:prototype]
status: closed
assignee: alp
blocked-by: [1]
---

## Question

Which single alternative view accompanies the pins? A classic heatmap may read as sparse blobs with only 9 city-level points — candidates include heatmap, weighted bubbles (bubble size = member count), or a stylized density/glow view. Prototype the strongest 1–2 candidates on the chosen stack (ticket 1) with the real member data so the user picks by looking, not imagining. Resolve to: the chosen format plus how the toggle between views should work.

## Answer

**No alternative view — the concept is cut. The page ships with the pins view only.** Ruled out of scope rather than resolved with a pick.

Prototyped on the Liberty stack with real member data (`.prototypes/second-format.html`):

- **Weighted bubbles** (area = member count) — rejected: read too much like the pins (another per-city marker with a count), so they added a second view without adding a second *lens*.
- **Density-glow heatmap** — iterated after that feedback: darkened base map so warm glows read as embers, glow size scaled by member count, each city a clickable core that pops its member-name card, live size/intensity sliders. Still rejected on looks; a heatmap over 9 city-level points doesn't earn its place.

Decision (Alper): one display style is enough — drop the alternative view entirely. The destination is redrawn to pins-only, which removes the toggle question and unblocks the build without an alternative format. Recorded under the map's **Out of scope**, not Decisions-so-far (a scope boundary, not a step on the route).
