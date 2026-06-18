---
name: new-post
description: Publish a new post to this Quartz blog correctly. Use whenever adding, creating, or publishing a blog post / writing here. Enforces the repo's post conventions so the post shows up everywhere (Explorer, intro list, search) and the site still builds.
---

# Publish a new post (Quartz blog)

Use this every time a post is added to `content/posts/`. It exists because two
listing surfaces behave differently and one is easy to forget:

- **Explorer** (left sidebar) and **search** are automatic. They are built
  client-side from `public/static/contentIndex.json`, which Quartz regenerates on
  every build. A new post appears there with no manual step. If it looks missing
  in the browser, it is stale cache: hard-refresh (Cmd+Shift+R) or clear site data.
  The Explorer uses `data-savestate` (localStorage), so a normal refresh can show
  the old tree.
- **The intro "Writing:" list** in `content/index.md` is a **hand-curated** list.
  Quartz does not auto-add posts to it. This is the step that gets missed, so it is
  step 3 below and is mandatory.

## Steps

1. **Create the file** at `content/posts/<basename>.md`.
   - Filename: timestamp + slug, e.g. `202606181714-<kebab-slug>.md` (see AGENTS.md
     `## Post Filenames`; keep the zettelkasten basename if adapted from one).
   - Frontmatter:
     ```yaml
     ---
     title: 'Title (single-quote if it contains : " or ( )'
     date: YYYY-MM-DD
     draft: false        # explicit; Quartz publishes non-drafts
     tags:
       - tag-one
       - tag-two
     description: one-line summary for previews and OG
     ---
     ```
2. **Images**: copy any embedded images into `content/attachments/` and reference
   them with Obsidian embeds `![[name.png]]` (Quartz resolves by filename).
3. **Add it to the intro list** (the easy-to-forget step): add a line to the
   `Writing:` list in `content/index.md`, newest first:
   ```text
   - [[posts/<basename>|Title]]
   ```
4. **Build-verify** before pushing:
   ```sh
   npx quartz build
   ```
   Confirm: 0 errors, the post HTML is emitted under `public/posts/`, every
   `![[...]]` embed became an `<img>` (grep the emitted HTML), and no `[[ ]]`
   wikilinks are left unresolved.
5. **Publish**: commit the post + attachments + `index.md`, then push `main`.
   `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push.
6. **Verify live** (allow a minute for the Pages deploy + CDN):
   ```sh
   curl -s -o /dev/null -w "%{http_code}" https://tedzhao226.github.io/posts/<basename>
   curl -s https://tedzhao226.github.io/static/contentIndex.json | grep -c <basename>
   ```

## Why isn't the intro list automatic?

It is a deliberate manual curation. If you want it to be a real convention with no
skill needed, replace the hand-written `Writing:` list in `content/index.md` with
an automatic listing: a Quartz `RecentNotes` component in the layout, or a folder
page at `/posts` (Quartz auto-lists a folder's contents), or a tag page. Until then,
step 3 is the enforcement.
