---
id: 2
title: Design direction — what does "beautiful" look like
labels: [wayfinder:prototype]
status: closed
assignee: alp
blocked-by: [1]
---

## Question

What visual direction makes this page "beautiful"? Build a cheap runnable prototype on the chosen stack (ticket 1) for the user to react to: overall style (map tint/theme, typography, page framing), pin design, and — the hard part — how multi-member cities display names (Mainz has 5 members, Kassel 2): always-visible labels vs hover/tap popups vs a side list. Resolve to a written design spec the build ticket can follow.

## Resolution

Resolved over five prototype iterations (variants A–E) with live feedback; **variant E approved**.

The design: dark sidebar (city list, counts, names; Fraunces display type, amber accent) + full-height **Liberty** map, and **all-in-one pin cards** — one dark card per city holding the count bubble, city name, and all member first names, with a centered pointer tail touching the exact coordinate. No popups anywhere. Card placement and cluster-merging are fully **generic** (fixed-point layout: above/below flips, merge only on >15% overlap within 60 km, split on zoom-in); merged cards click-to-unmerge, sidebar clicks fly to the city's unmerged zoom.

The multi-member-city question resolved as: **names always visible, inside the pin itself** — the side list additionally kept as navigation (combination of variants A and B, restyled).

Answer detail: [docs/design-spec.md](../../docs/design-spec.md) (the buildable spec, including the rejected directions and the WebGL-performance caveat).
Prototype asset: [.prototypes/design-direction.html](../../.prototypes/design-direction.html) — variants switchable via `?variant=`, E is canonical. No git repo exists yet; when ticket 4 sets one up, park this file on a throwaway branch per prototype-capture convention.
