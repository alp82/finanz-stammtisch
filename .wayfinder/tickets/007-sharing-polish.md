---
id: 7
title: Sharing polish — title, favicon, link preview
labels: [wayfinder:grilling]
status: resolved
assignee: alp
blocked-by: []
---

## Question

The page's shareable surface, now that the design exists (dark sidebar, "Finanz-Stammtisch" header, amber-on-dark look — see [docs/design-spec.md](../../docs/design-spec.md)): final page `<title>` and header wording, favicon, and the Open Graph / link-preview appearance (og:title, og:description, preview image or not) when the URL lands in the group chat. Resolve to concrete values the build bakes in and the ship ticket verifies in a real chat preview.

## Answer

Concrete values for the build (ticket 5) to bake in and the ship ticket (6) to verify in a real chat preview. Grilled with Alper 2026-07-16.

**Page title** (`<title>` and `og:title`, identical):
- `Finanz-Stammtisch - Karte` (en-dash in the actual value: `Finanz-Stammtisch – Karte`)

**On-page header** (unchanged from design spec): sidebar keeps "Finanz-Stammtisch" (Fraunces 900) + subtitle "14 Mitglieder in 9 Städten". No change requested.

**Favicon**: amber "F" monogram - Fraunces, amber `#f59e0b` glyph on the dark `#101418` square. Ship as an SVG favicon (`favicon.svg`), crisp at any size; optional PNG fallback. `<link rel="icon" href="favicon.svg" type="image/svg+xml">`.

**Link preview (Open Graph)**:
- `og:title` - `Finanz-Stammtisch – Karte`
- `og:description` - `14 Mitglieder in 9 Städten`
- `og:image` - a **branded preview card**, not a real map screenshot. 1200×630, dark `#101418` background, amber-on-dark look, "Finanz-Stammtisch – Karte" wordmark, and **two amber map-pin cards standing in for real locations**: one pin reads **14 Mitglieder**, the other reads **9 Städte** (reuse the on-map pin-card visual language: amber count badge + label). No real geography/pins required; a subtle Germany silhouette is optional, not required.
- Also set `og:type=website`, `og:url`, and `twitter:card=summary_large_image` so the image renders wide.

**Build asset notes (for ticket 5):**
- `og:image` **must be an absolute URL** for chat apps to fetch it: `https://alp82.github.io/finanz-stammtisch/og.png` - commit the generated 1200×630 image at the repo root (e.g. `og.png`).
- `favicon.svg` committed at repo root.
- Small extra bake-ins consistent with the look: `<meta name="theme-color" content="#101418">`, `lang="de"` on `<html>`.

**Verification (ticket 6):** drop the live URL into the real group chat (or a WhatsApp/Telegram link-preview) and confirm the wide branded card, the "Finanz-Stammtisch – Karte" title, and the "14 Mitglieder in 9 Städten" line all render; confirm the amber-F favicon shows in the browser tab.
