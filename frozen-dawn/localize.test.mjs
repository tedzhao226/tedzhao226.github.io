import assert from "node:assert/strict"
import fs from "node:fs/promises"
import test from "node:test"
import { languages, validateTranslation } from "./localize.mjs"

const catalog = JSON.parse(
  await fs.readFile(new URL("./locales/catalog.json", import.meta.url), "utf8"),
)
for (const { code } of languages.slice(1)) {
  test(code + " covers every guide passage and preserves protected data", async () => {
    const translations = JSON.parse(
      await fs.readFile(new URL("./locales/" + code + ".json", import.meta.url), "utf8"),
    )
    assert.deepEqual(Object.keys(translations).sort(), Object.keys(catalog).sort())
    for (const [id, { source }] of Object.entries(catalog))
      validateTranslation(code + "/" + id, source, translations[id])
  })
}

test("a changed required kill count is rejected", () => {
  assert.throws(
    () => validateTranslation("fixture", "Kill 5 zombies.", "击杀 4 只僵尸。"),
    /Missing number 5/,
  )
})
test("missing passages and leftover draft markers are rejected", () => {
  assert.throws(() => validateTranslation("fixture", "Left", undefined), /Missing translation/)
  assert.throws(() => validateTranslation("fixture", "Left", "ZXQ0ZXQ"))
})
test("translated captions keep their links and emphasis markup", () => {
  assert.throws(
    () =>
      validateTranslation(
        "fixture",
        '<a href="https://www.youtube.com/watch?v=45dG6srGVMA">Watch</a>',
        '<a href="https://example.com/">Voir</a>',
      ),
    /Changed HTML/,
  )
  assert.throws(
    () => validateTranslation("fixture", "<strong>5 kills</strong>", "5 éliminations"),
    /Changed HTML/,
  )
})
test("dynamic video titles must keep the title placeholder", () => {
  assert.throws(
    () => validateTranslation("fixture", "Video: {title}", "Vidéo : {titre}"),
    /Changed placeholder/,
  )
})
test("native ordinals and thousands separators are accepted", () => {
  validateTranslation("fixture", "First pool: 1,250 points", "第 1 个血池：1250 点数")
  validateTranslation("fixture", "1st stone", "첫 번째 돌")
})
