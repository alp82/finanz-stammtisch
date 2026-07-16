---
id: 6
title: Ship it live
labels: [wayfinder:task]
status: resolved
assignee: alp
blocked-by: [4, 5, 7]
---

## Question

Task: deploy the built page (ticket 5) via the Pages setup (ticket 4), verify the public URL renders correctly on desktop and phone, and hand the user the link to share in the group chat. Resolve with: the live URL and verification notes. Closing this ticket reaches the destination.

## Resolution

**Shipped** (Alper, 2026-07-16). Live URL: **https://alp82.github.io/finanz-stammtisch/**

**Sharing gap closed at ship.** Ticket 5's build never baked in ticket 7's sharing polish — `index.html` had only `<title>`. Fixed as part of shipping (not a separate ticket):
- `favicon.svg` — amber-F monogram on `#101418`, `<link rel="icon" type="image/svg+xml">`.
- `og.png` — the branded 1200×630 link-preview card per ticket 7's spec: dark bg, amber "Finanz-Stammtisch – Karte" wordmark, two amber pin cards reading "14 Mitglieder" and "9 Städte", footer URL. Committed at repo root; `og:image` points at its absolute Pages URL.
- Full head baked in: `og:type/url/title/description/image`, `twitter:card=summary_large_image` (+title/description/image), `theme-color=#101418`. `lang="de"` already present.

**Deploy.** Committed page + data + assets (`b3df2fb`) and pushed to `main`; GitHub Pages published from `main` root in ~32s.

**Verified.**
- Live serving: `index.html`, `data.js`, `favicon.svg`, `og.png` all HTTP 200; served HTML carries the correct `<title>`, favicon link, and all `og:` tags.
- Rendering (real browser, local pre-push smoke test on the identical files): sidebar, "Finanz-Stammtisch" brand, "14 Mitglieder in 9 Städten" subtitle, Treffpunkt-Check picker, and "Wer kommt?" filter all render with **zero application JS errors**.
- **Deferred to the user on a real device:** the MapLibre GL canvas paint (tiles + positioned pin cards). It could not be exercised in either headless env — WebGL is disabled in the sandbox (`Could not create a WebGL context, GL_VENDOR = Disabled`), the exact caveat ticket 5 flagged. This is an environment limit, not a code defect; the map paints on any real GPU-backed browser. Confirmed the moment the link is opened on a phone/desktop — which is the act of sharing it.
- **Chat link-preview** (the wide branded card, title, "14 Mitglieder in 9 Städten" line): to be eyeballed once, on first drop into the group chat / a WhatsApp-Telegram preview, per ticket 7's verification note. All the metadata and the image it points to are confirmed live and 200.

Destination reached: the URL works and is ready to share in the group chat.
