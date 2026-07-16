---
id: 4
title: Set up repo + GitHub Pages
labels: [wayfinder:task]
status: resolved
assignee: alp
blocked-by: []
---

## Question

Task (unblocks deployment, no decision content): initialize git in this directory, create the GitHub repository (confirm name and public/private-with-public-Pages preference with the user), push, and enable GitHub Pages so pushes to the default branch publish. Resolve with: repo URL, Pages URL, and which branch/path publishes.

## Answer

Done. User decisions (asked at resolution): repo name **`finanz-stammtisch`**, **public** repo.

- **Repo URL**: https://github.com/alp82/finanz-stammtisch (account `alp82`, public)
- **Pages URL**: https://alp82.github.io/finanz-stammtisch/
- **Publishes from**: branch `main`, path `/` (root) — "build from a branch" / legacy source. Every push to `main` triggers a Pages build automatically.

Setup facts later tickets depend on:
- `git init -b main`; first commit is the effort's planning record (docs/, .wayfinder/). Remote `origin` set, `main` tracks `origin/main`.
- `.gitignore` keeps `.prototypes/` (throwaway) local-only; `docs/` and `.wayfinder/` are committed.
- The page itself does not exist yet — **the Pages URL 404s until ticket 5 adds `index.html` at the repo root** and it's pushed. Ticket 6 (ship) verifies the live URL renders on desktop + phone.
- HTTPS is enforced by Pages.
