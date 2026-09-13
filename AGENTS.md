# GitHub Pages Agent Rules

This repo serves Ted Zhao’s GitHub Pages homepage and HTML artifacts from the root of `main`.
The root `index.html` redirects to `https://tedzhao.notion.site/`; `frozen-dawn/` serves the walkthrough.
Read `MEMORY.md` when changing routing, guide references, or deployment, for prior decisions and known limits.
Keep rules here and append history to `MEMORY.md` using `## YYYY-MM-DD — title` entries of at most ten lines.

## Artifact Layout

Keep each artifact’s editable sources, assets, and generated pages together in one top-level folder.
Use that folder’s name as its public URL path.

## Frozen Dawn Artifact

Edit guide sources under `frozen-dawn/` and regenerate the HTML with `npm run guide:build`.
Treat `frozen-dawn/assets/` as the canonical screenshot inputs; filenames record video seconds.
When changing gameplay instructions or screenshots, consult [the guide’s reference notes](frozen-dawn/README.md) and verify the relevant video segment.
Preserve source attribution, chronological stages, and the distinction between example patterns and the player’s own puzzle values.
Keep raw research material under Git-ignored `private/`.

## Verification

Run `npm run check` for changes to the site or shared configuration.
For guide edits, run `npm run guide:build` first and check stage links, enlarged images, and the offline edition.
After an authorized deployment, wait for GitHub Pages success and verify the homepage destination and `/frozen-dawn/` URL.
