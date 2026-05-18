# Blog Agent Rules

This repo publishes Ted Zhao's Quartz site at `https://tedzhao226.github.io`.

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

If a post is copied or adapted from `/Users/ted/workspace/zettelkasten/zettelkasten/`, keep the exact same basename as the source zettelkasten note.

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

## Verification

Before claiming the site is ready, run:

```bash
npm run check
```

Then run the Quartz build with Node 22:

```bash
PATH=/opt/homebrew/opt/node@22/bin:$PATH npm_config_cache=/private/tmp/blog-npm-cache npx quartz build
```
