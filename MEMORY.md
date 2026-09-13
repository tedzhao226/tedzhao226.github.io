# Project Memory

## 2026-09-13 — GitHub Pages routing and repository ownership

- Ted requested reuse of the existing [tedzhao226.github.io repository](https://github.com/tedzhao226/tedzhao226.github.io), whose durable local checkout is `/Users/ted/workspace/blog`.
- The homepage destination is explicitly `https://tedzhao.notion.site/`, replacing the earlier `/my-blog` destination.
- Pages is configured to serve `main` from the repository root with `.nojekyll`; the Frozen Dawn guide remains at `/frozen-dawn/`.
- Keep editable artifacts and their published output in this repository; see [README](README.md) for build and deployment commands.

## 2026-09-13 — Frozen Dawn artifact provenance and migration

- Ted wanted a chronological playthrough reference to avoid repeatedly scrubbing the [source video](https://www.youtube.com/watch?v=45dG6srGVMA).
- The guide includes 12 stages, 48 chapter links, 102 screenshots, puzzle tables, constellation references, and an offline HTML edition.
- Editable files moved from Obsidian’s temporary guide directory to `artifacts/frozen-dawn/`; original research and the old build moved under local Git-ignored `private/`.
- File hashes were checked before and after moving both original directories; the published screenshots remain the canonical build inputs.
- Preserve run-dependent code warnings and the narration discrepancies recorded in [the guide notes](artifacts/frozen-dawn/README.md).
- The original guide deployment was commit `20b39b7505adacd13ac179c4d9ab5d57e8533a33`; the prior `/my-blog` redirect was commit `0d4c424d701654888c3048ce09a2629de796535f`.

## 2026-09-13 — Existing Quartz build limitation

- Earlier Node.js 22 Quartz builds parsed the content but failed when `CustomOgImages` fetched remote fonts.
- GitHub Pages deployments succeeded independently because the active site serves committed static files.
- Embedded YouTube playback was not confirmed; the guide also provides direct timestamp links and an offline image edition.

## 2026-09-13 — Migration verification

- Running `npm run guide:build` from the durable checkout reproduced both already-published HTML files without a Git diff.
- `npm run check` passed; stage and image order remained unchanged, internal anchors resolved, and the instruction-file paths were checked.
- Ego Lite verified screenshot enlargement at 1920 pixels and loaded all 102 embedded offline images at their full 1920 × 1080 resolution.
- The homepage canonical link, automatic redirects, and fallback link all target Ted’s requested Notion root URL.
