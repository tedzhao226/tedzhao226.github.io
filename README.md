# Ted Zhao’s GitHub Pages

Repository: [tedzhao226.github.io](https://github.com/tedzhao226/tedzhao226.github.io).
The local checkout is at `/Users/ted/workspace/tedzhao226.github.io`.

- [Homepage](https://tedzhao226.github.io/) redirects directly to [Ted’s Notion site](https://tedzhao.notion.site/).
- [Frozen Dawn guide](https://tedzhao226.github.io/frozen-dawn/) provides a chronological Easter egg walkthrough with puzzle references and expandable screenshots.
- [Offline guide](https://tedzhao226.github.io/frozen-dawn/frozen-dawn-walkthrough.html) includes all reference images in one HTML file; video playback requires internet.

## Edit and preview the guide

Use Node.js 22 or later and Python 3 for the local server.

```bash
npm ci
npm run guide:build
npm run guide:serve
```

Open [the local guide](http://127.0.0.1:8765/frozen-dawn/).
Edit the walkthrough in `frozen-dawn/`; see its [README](frozen-dawn/README.md) for sources and editing notes.
Use the language selector for English, Simplified Chinese, Japanese, Korean, Russian, French, or Spanish; the offline download includes every language.
This single artifact folder holds its editable source, screenshots, and both generated HTML editions.

## Publish

GitHub Pages serves the repository root from `main` with `.nojekyll`.
Run `npm run check`, commit the intended files, and push to `main` when publishing is authorized.
Wait for the Pages deployment to succeed, then verify the homepage redirect and guide URL.
Keep homepage routing in the root `index.html` so project pages retain their own paths.

## Project context

[AGENTS.md](AGENTS.md) contains agent instructions; [MEMORY.md](MEMORY.md) records decisions and verification history.
The original transcript, raw captures and contact sheets remain locally under the Git-ignored `private/` directory.
The tracked source files, chapter metadata, and screenshots are sufficient to rebuild the guide on another computer.
