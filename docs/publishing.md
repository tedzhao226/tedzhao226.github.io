# Publishing

This blog is published from `main` to GitHub Pages with GitHub Actions.

## URL

- Repository: `tedzhao226/blog`
- Public site: `https://tedzhao226.github.io/blog`
- Quartz `baseUrl`: `tedzhao226.github.io/blog`

The root `https://tedzhao226.github.io` site is reserved for a separate self-introduction page.

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
