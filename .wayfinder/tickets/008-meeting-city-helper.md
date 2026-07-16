---
id: 8
title: Design the real-life meeting-city helper
labels: [wayfinder:prototype]
status: closed
assignee: alp
blocked-by: []
---

## Question

The page should help the group pick where to meet in real life (user decision: this is a feature *on the map*, not a side discussion). Members are spread across Germany, so a natural helper is "where is central for us?" — but the exact shape is open. Decide, by reacting to a cheap prototype on the approved stack + real member data:

- **What "meeting city" means**: the geographic centroid of members, the *member* city that minimizes total travel, a set of top candidate cities, or a small ranked shortlist. Weight by member count (Mainz has 5) or one-person-one-vote?
- **How it surfaces on the page**: a highlighted pin/marker for the suggested city, a separate "Treffpunkt" panel/list, a toggle, or always-on. It must sit inside the approved design language (dark sidebar, amber-on-dark, Liberty map — see [docs/design-spec.md](../../docs/design-spec.md)) and coexist with the single pins view without cluttering it.
- **How interactive**: static suggestion vs. letting the user pick who's attending / filter members and re-computing the central city.

Resolve to a written spec the build (ticket 5) implements: the selection rule, the on-page presentation, and the interaction. Link the prototype as the asset.

## Resolution

Resolved over two prototype rounds with live feedback; **the "Treffpunkt-Check" fairness-checker approved** (Alper, 2026-07-16).

**The three "compute the best city" framings were all rejected in round 1** (`.prototypes/meeting-city-helper.html`, variants A/B/C):
- **A — single member Treffpunkt** (min total travel → Mainz): they don't meet in one fixed place, they rotate.
- **B — ranked ICE-hub shortlist** (→ Frankfurt): they mix car + train, so a rail-optimized ranking is the wrong metric.
- **C — abstract weighted Schwerpunkt** (centroid near Frankfurt): not an actual city you can meet in, and it barely moves since nearly everyone attends ("always the same").

The reframe: the helper is a **fairness checker, not a recommender**. Key user note — *"not always about the best choice, just to choose one."* Round 2 (`.prototypes/meeting-city-checker.html`) approved:

- **Selection rule**: user picks any candidate city (map pin or dropdown); candidates = 9 member cities + neutral central cities (Fulda, Gießen, Würzburg, Marburg, Erfurt). No auto-selection, no ranking, no winner.
- **Presentation**: sidebar readout — Ø km/person, the named worst-off attendee ("weitester Weg"), and all attendees sorted near→far with green→red bars; map spokes color-graded near→far.
- **Metric**: straight-line haversine km (mode-agnostic; no transit weighting).
- **Interaction**: "Wer kommt?" attendee filter re-scopes the check; toggling individuals gives one-person-one-vote weighting for free. Starts empty.

Full buildable spec: [docs/design-spec.md § Meeting-city helper](../../docs/design-spec.md) — the section ticket 5 implements.
Prototype assets: [.prototypes/meeting-city-checker.html](../../.prototypes/meeting-city-checker.html) (approved round 2), [.prototypes/meeting-city-helper.html](../../.prototypes/meeting-city-helper.html) (rejected round-1 variants A/B/C, kept as the primary-source record). Park both on a throwaway branch per the prototype-capture convention noted in ticket 2.
Deferred (not v1): drive-time vs straight-line, two-city comparison, arbitrary non-list points.
