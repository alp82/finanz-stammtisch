---
id: 8
title: Design the real-life meeting-city helper
labels: [wayfinder:prototype]
status: open
assignee:
blocked-by: []
---

## Question

The page should help the group pick where to meet in real life (user decision: this is a feature *on the map*, not a side discussion). Members are spread across Germany, so a natural helper is "where is central for us?" — but the exact shape is open. Decide, by reacting to a cheap prototype on the approved stack + real member data:

- **What "meeting city" means**: the geographic centroid of members, the *member* city that minimizes total travel, a set of top candidate cities, or a small ranked shortlist. Weight by member count (Mainz has 5) or one-person-one-vote?
- **How it surfaces on the page**: a highlighted pin/marker for the suggested city, a separate "Treffpunkt" panel/list, a toggle, or always-on. It must sit inside the approved design language (dark sidebar, amber-on-dark, Liberty map — see [docs/design-spec.md](../../docs/design-spec.md)) and coexist with the single pins view without cluttering it.
- **How interactive**: static suggestion vs. letting the user pick who's attending / filter members and re-computing the central city.

Resolve to a written spec the build (ticket 5) implements: the selection rule, the on-page presentation, and the interaction. Link the prototype as the asset.
