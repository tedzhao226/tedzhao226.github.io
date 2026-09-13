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

## 2026-09-13 — Rename checkout and remove the old blog system

- Ted requested matching local/GitHub naming and removal of the old blog system.
- The durable checkout is now `/Users/ted/workspace/tedzhao226.github.io`, matching the existing GitHub repo; this supersedes the earlier 2026-09-13 checkout path.
- The remote retains `tedzhao226.github.io`, which GitHub requires for the existing user-site URL.
- Quartz, old posts and attachments, blog specifications, publishing tools, generated output, and TypeScript tooling were removed; earlier retained-Quartz notes describe history only.
- Removed files remain recoverable from Git history or macOS Trash; original Frozen Dawn research stays under local Git-ignored `private/`.
- The guide, editable sources, research archive, and homepage were hash-checked across the rename and removal.
- Prettier is the only remaining development dependency; active instructions now describe the static Pages workflow.

## 2026-09-13 — Static Pages cleanup verification

- `npm ci` installed one package; `npm run guide:build` and `npm run check` passed after the old blog system was removed.
- The root redirect and both guide HTML editions remained byte-identical to the preceding commit.
- The local preview was restarted from the renamed checkout and returned the expected guide and Notion redirect.

## 2026-09-13 — One folder per artifact

- Ted found the two Frozen Dawn folders confusing and requested a single artifact.
- All editable files moved from `artifacts/frozen-dawn/` into `frozen-dawn/`, beside its screenshots and published pages; the empty `artifacts/` directory was removed.
- The build and validation commands now use that single folder; the guide URL remains `/frozen-dawn/`.
- Online and offline HTML are two editions of the same guide, built from the same source.
- The redundant local `private/frozen-dawn-original-build/` copy was moved to Trash; the original research remains under `private/frozen-dawn-source/`.
- These paths supersede the earlier 2026-09-13 source-layout and archived-build notes; `AGENTS.md` now requires one top-level folder per artifact.

## 2026-09-13 — Single-folder artifact verification

- The updated `npm run guide:build` and `npm run check` passed with all source paths under `frozen-dawn/`.
- The homepage and both guide editions are byte-identical to the preceding commit; all 102 screenshots and internal anchor targets resolve.
- Active instruction paths were checked, and the research transcript remains preserved after removing the duplicate folders.

## 2026-09-13 — Shared multilingual Frozen Dawn guide

- Ted requested Simplified Chinese, Japanese, Korean, Russian, French, and Spanish with official game terminology where available.
- The same artifact now contains English plus these six languages; query links select a language, and the single offline HTML includes every translation and screenshot.
- Official PC map, achievement, and Raven names use Steam game text; descriptive location/equipment labels retain English references where official wording was not verified.
- Translation catalogs and term provenance live under `frozen-dawn/locales/`; see [editing notes](frozen-dawn/README.md#languages).
- The HTML parser dependency `parse5` joins Prettier, superseding the earlier statement that Prettier was the only development dependency.
- All six catalogs cover 770 entries; 11 checks passed, and browser checks preserved 12 stages, numeric puzzle tables, translated image dialogs, and all 102 offline images at 1920 × 1080.
- The Japanese video dialog and timestamp were verified; actual YouTube playback remains dependent on the external player.

## 2026-09-13 — Language publication pending

- The multilingual guide is built and verified locally, with a clean committed checkout.
- Publishing failed: SSH to GitHub timed out, HTTPS could not resolve `github.com`, the GitHub API timed out in both CLI and browser, and an independent public DNS check also timed out.
- The public guide still showed the earlier English-only page when checked; retry the already-authorized push and verify Pages once GitHub connectivity returns.

## 2026-09-13 — Round plate and raven setup clarified

- Ted flagged that the opening stage did not make the round plate pickup and raven interaction clear enough.
- Source footage shows the Morgue pool already plated at [1:09](https://www.youtube.com/watch?v=45dG6srGVMA&t=69s), the separate Bloodraven stone at [1:27](https://www.youtube.com/watch?v=45dG6srGVMA&t=87s), and the Overlook raven at [12:50](https://www.youtube.com/watch?v=45dG6srGVMA&t=770s).
- Stage 1 now names the round plate explicitly and includes a later-use checklist: repair the Overlook pool before kills, then activate the raven for the shield-upgrade hunt.
- Pool names accompany the route order to prevent confusing the Morgue pool with the Overlook pool; raven activation and filling a pool have separate purposes.
- English and all six translations now cover 782 entries; the new pickup close-up brings the guide to 103 distinct screenshots.
- The build and all 11 checks passed; browser checks covered every language, the mobile layout, linked stages, and full-size image dialogs.
- The offline edition loaded all 103 distinct images at 1920 × 1080 without external image requests.

## 2026-09-13 — Multilingual guide and pool correction published

- GitHub connectivity returned; the language editions and pool correction were pushed through commit `96d3dbe`.
- [Pages run 34740878331](https://github.com/tedzhao226/tedzhao226.github.io/actions/runs/34740878331) completed successfully.
- The public guide returned the corrected pool setup, all seven language choices, and the new plate caption; the homepage still redirects to `https://tedzhao.notion.site/`.
- This resolves the earlier 2026-09-13 language-publication-pending entry.

## 2026-09-13 — Orrery viewpoint warning

- Ted reported that the cipher-to-Orrery step did not explain the viewpoint change; MARS-8 and MARS-16 track the fix.
- The preserved transcript at [6:12–6:29](https://www.youtube.com/watch?v=45dG6srGVMA&t=372s) says the top is the big arm, the bottom is the small arm, and the rest is flipped; TrueAchievements and mmmrkennedy describe north/south unchanged and east/west swapped.
- The cipher step now links to `#orrery-chart`, and a warning note before the chart explains the underside view, the left/right mirror, the 9→3 and 7:30→4:30 position examples, and that the chart’s landmarks must not be mirrored again.
- The landmark table, the own-game code reminder, and the screenshots are unchanged; all seven languages cover 783 entries.
- The video segment was checked through the preserved transcript and frames under `private/frozen-dawn-source/`, not by playback.
