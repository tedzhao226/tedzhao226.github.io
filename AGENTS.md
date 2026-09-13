# Blog Agent Rules

This repo serves Ted Zhao’s GitHub Pages homepage and HTML artifacts from the root of `main`.
The root `index.html` redirects to `https://tedzhao.notion.site/`; `frozen-dawn/` serves the walkthrough.
Read `MEMORY.md` when changing routing, guide references, or deployment, for prior decisions and known limits.
Keep rules here and append history to `MEMORY.md` using `## YYYY-MM-DD — title` entries of at most ten lines.

## Career Wording

Keep public career wording grounded in Ted's CV.

Use:

- AI engineer
- machine learning engineer
- production AI systems
- LLM applications
- agentic workflows
- RAG
- evaluation, observability, and MLOps

Do not call Ted a full-stack developer unless he explicitly asks for that wording.

Reference CV sources:

- `/Users/ted/workspace/tedzhao-resume/render_output/agentic/Ted_Zhao_CV.md`
- `/Users/ted/workspace/tedzhao-resume/render_output/ml/Ted_Zhao_CV.md`

## Post Filenames

Blog posts live in `content/posts/`.

Use zettelkasten-style filenames:

```text
YYYYMMDDHHMM-kebab-title.md
```

If a post is copied or adapted from `/Users/ted/workspace/obsidian/06-zettelkasten/`, keep the exact same basename as the source zettelkasten note.

Do not rename zettelkasten-derived posts to shorter marketing slugs.

When a post file is renamed, update all Quartz wikilinks that reference it.

## Drafts

Quartz publishes posts unless they are explicitly marked as drafts.

Excluded from output:

```yaml
draft: true
```

Also excluded:

```yaml
draft: "true"
```

Published:

```yaml
draft: false
```

For public posts, keep `draft: false` explicit.

## Frozen Dawn Artifact

Edit guide sources under `artifacts/frozen-dawn/` and regenerate the HTML with `npm run guide:build`.
Treat `frozen-dawn/assets/` as the canonical screenshot inputs; filenames record video seconds.
When changing gameplay instructions or screenshots, consult [the guide’s reference notes](artifacts/frozen-dawn/README.md) and verify the relevant video segment.
Preserve source attribution, chronological stages, and the distinction between example patterns and the player’s own puzzle values.
Keep raw research material under Git-ignored `private/`.

## Verification

Run `npm run check` for changes to the site or shared configuration.
For guide edits, run `npm run guide:build` first and check stage links, enlarged images, and the offline edition.
After an authorized deployment, wait for GitHub Pages success and verify the homepage destination and `/frozen-dawn/` URL.

For changes to Quartz sources or configuration, also run its build with Node.js 22:

```bash
npm run quartz -- build
```

Quartz is retained tooling and is not the active Pages build.
