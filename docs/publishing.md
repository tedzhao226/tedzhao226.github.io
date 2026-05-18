# Publishing

This blog is published from `main` to GitHub Pages with GitHub Actions.

## URL

- Repository: `tedzhao226/tedzhao226.github.io`
- Public site: `https://tedzhao226.github.io`
- Quartz `baseUrl`: `tedzhao226.github.io`

## Flow

1. Write posts under `content/posts/`.
2. Keep public post frontmatter as `draft: false`.
3. Run `npm run check`.
4. Run the Quartz build with Node 22:

```bash
PATH=/opt/homebrew/opt/node@22/bin:$PATH npm_config_cache=/private/tmp/blog-npm-cache npx quartz build
```

5. Commit and push to `main`.

GitHub Actions deploys the generated `public` directory to Pages.
