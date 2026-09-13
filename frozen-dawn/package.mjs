import fs from "node:fs/promises"
import path from "node:path"
const root = path.dirname(new URL(import.meta.url).pathname)
let html = await fs.readFile(path.join(root, "index.html"), "utf8")
const frames = JSON.parse(await fs.readFile(path.join(root, "selected-frames.json"), "utf8"))
for (const t of frames) {
  const data = await fs.readFile(path.join(root, `assets/${t}.jpg`))
  html = html.replaceAll(
    `src="assets/${t}.jpg"`,
    `src="data:image/jpeg;base64,${data.toString("base64")}"`,
  )
}
if (html.includes('src="assets/')) throw Error("Offline image reference remains")
html = html.replace(
  /<a class="download"[^>]*>[\s\S]*?<\/a>/,
  '<span class="offline-badge" data-offline-badge>Offline edition · images included</span>',
)
const target = path.join(root, "frozen-dawn-walkthrough.html")
await fs.writeFile(target, html)
console.log(
  JSON.stringify({
    file: target,
    images: frames.length,
    megabytes: Number((Buffer.byteLength(html) / 1024 / 1024).toFixed(1)),
  }),
)
