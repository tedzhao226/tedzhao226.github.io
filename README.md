# Ted Zhao’s GitHub Pages

Repository: [tedzhao226.github.io](https://github.com/tedzhao226/tedzhao226.github.io).
The local checkout is at `/Users/ted/workspace/blog`.

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
Edit the walkthrough in `artifacts/frozen-dawn/`; see its [README](artifacts/frozen-dawn/README.md) for sources and editing notes.
The build writes the two HTML editions to `frozen-dawn/` and uses the tracked screenshots in `frozen-dawn/assets/`.

## Publish

GitHub Pages serves the repository root from `main` with `.nojekyll`.
Run `npm run check`, commit the intended files, and push to `main` when publishing is authorized.
Wait for the Pages deployment to succeed, then verify the homepage redirect and guide URL.
Keep homepage routing in the root `index.html` so project pages retain their own paths.

## Project context

[AGENTS.md](AGENTS.md) contains agent instructions; [MEMORY.md](MEMORY.md) records decisions and verification history.
The original transcript, raw captures, contact sheets, and pre-move build remain locally under the Git-ignored `private/` directory.
The tracked source files, chapter metadata, and screenshots are sufficient to rebuild the guide on another computer.

The existing Quartz sources remain in `content/` and `quartz/`.
Quartz is not part of the current Pages deployment; use `npm run quartz -- build --serve` only when working on those sources.
