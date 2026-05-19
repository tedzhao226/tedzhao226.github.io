# Ted's Blog

A simple Markdown blog scaffold using [Quartz](https://quartz.jzhao.xyz/) and GitHub Pages.

## Write from Obsidian

Open this folder as an Obsidian vault:

```text
/Users/ted/workspace/blog
```

Write public posts under:

```text
content/posts/
```

Put post assets under:

```text
content/attachments/
```

Example image syntax:

```md
![Alt text](../attachments/example.png)
```

Quartz also understands many Obsidian features, including wikilinks and callouts.

## Local preview

```bash
npm install
npx quartz build --serve
```

Then open the local URL printed by Quartz, usually `http://localhost:8080`.

## Publish to GitHub Pages

1. Create a GitHub repo for this folder.
2. Update `baseUrl` in `quartz.config.ts`:
   - user/organization site: `yourname.github.io`
   - project site: `yourname.github.io/repo-name`
   - custom domain: `blog.yourdomain.com`
3. Push to `main`.
4. In GitHub repo settings: **Pages → Source → GitHub Actions**.

After that, every push to `main` deploys the blog.
