import fs from "node:fs/promises"
import path from "node:path"
import { createHash } from "node:crypto"
import { parse, parseFragment, serialize } from "parse5"

const root = path.dirname(new URL(import.meta.url).pathname)
export const languages = [
  { code: "en", label: "English", steam: "english" },
  { code: "zh-CN", label: "简体中文", steam: "schinese" },
  { code: "ja", label: "日本語", steam: "japanese" },
  { code: "ko", label: "한국어", steam: "koreana" },
  { code: "ru", label: "Русский", steam: "russian" },
  { code: "fr", label: "Français", steam: "french" },
  { code: "es", label: "Español", steam: "spanish" },
  { code: "zh-TW", label: "繁體中文", steam: "tchinese" },
]
const units = new Set([
  "title",
  "h1",
  "h2",
  "h3",
  "p",
  "li",
  "th",
  "td",
  "summary",
  "a",
  "span",
  "strong",
  "footer",
  "label",
  "button",
])
const attrs = new Set(["alt", "aria-label", "data-caption", "data-title"])
const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value
const setAttr = (node, name, value) => node.attrs.push({ name, value })
const textOf = (node) =>
  node.nodeName === "#text" ? node.value : (node.childNodes || []).map(textOf).join("")
const tags = (s) => s.match(/<[^>]+>/g) || []
const numberWords = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  ten: "10",
  twice: "2",
}
const numbers = (s) => {
  s = s.replace(/<[^>]+>/g, " ")
  return (s.match(/\d+(?:[,:.]\d+)*/g) || [])
    .map((value) => (/^\d{1,3}(,\d{3})+$/.test(value) ? value.replaceAll(",", "") : value))
    .sort()
}

export function validateTranslation(id, source, translated) {
  if (typeof translated !== "string" || !translated.trim())
    throw Error(`Missing translation: ${id}`)
  if (JSON.stringify(tags(source)) !== JSON.stringify(tags(translated)))
    throw Error(`Changed HTML markup: ${id}`)
  const required = numbers(source.replace(/\b\d+(?:st|nd|rd|th)\b/g, ""))
  const actual = numbers(translated)
  const optionalWords = {
    ...numberWords,
    both: "2",
    first: "1",
    second: "2",
    third: "3",
    fourth: "4",
    June: "6",
  }
  const optional = [...source.matchAll(/\b(\d+)(?:st|nd|rd|th)\b/g)]
    .map((match) => match[1])
    .concat(
      Object.entries(optionalWords).flatMap(([word, value]) =>
        Array.from(source.matchAll(new RegExp("\\b" + word + "\\b", "gi")), () => value),
      ),
    )
  for (const value of required) {
    const index = actual.indexOf(value)
    if (index < 0) throw Error(`Missing number ${value}: ${id}`)
    actual.splice(index, 1)
  }
  for (const value of actual) {
    const index = optional.indexOf(value)
    if (index < 0) throw Error(`Unexpected number ${value}: ${id}`)
    optional.splice(index, 1)
  }
  if (
    JSON.stringify(source.match(/\{[a-z]+\}/g) || []) !==
    JSON.stringify(translated.match(/\{[a-z]+\}/g) || [])
  )
    throw Error(`Changed placeholder: ${id}`)
  if (/ZXQ\d+ZXQ|\[\[\d+\]\]/.test(translated)) throw Error(`Unresolved translation marker: ${id}`)
}

export async function localize(html, { collect = false } = {}) {
  const tree = parse(html)
  let body
  const findBody = (node) => {
    if (node.tagName === "body") body = node
    for (const child of node.childNodes || []) findBody(child)
  }
  findBody(tree)
  const masthead = body.childNodes.find((node) => node.tagName === "header")
  const controls = parseFragment(
    `<div class="language-bar"><label for="guide-language">Guide language</label><select id="guide-language" data-translation-ignore>${languages.map((lang) => `<option value="${lang.code}" lang="${lang.code}">${lang.label}</option>`).join("")}</select><a class="language-notes" href="#language-notes">Translation notes</a></div>`,
  ).childNodes[0]
  controls.parentNode = body
  body.childNodes.splice(body.childNodes.indexOf(masthead), 0, controls)
  const notes = parseFragment(
    `<details id="language-notes" class="localization-note"><summary>Game terminology</summary><p>Map and achievement names follow the official PC localization. Other location and equipment labels include English references when the official wording could not be verified. The source video and screenshots remain in English.</p><a id="official-terms" href="https://steamcommunity.com/stats/476620/achievements/?l=english" target="_blank" rel="noreferrer">Official game achievements</a></details>`,
  ).childNodes[0]
  notes.parentNode = body
  body.childNodes.splice(body.childNodes.indexOf(masthead) + 1, 0, notes)
  const messages = {}
  function register(source, kind = "html") {
    const id = `${kind[0]}_${createHash("sha256").update(source).digest("hex").slice(0, 12)}`
    if (messages[id] && messages[id].source !== source)
      throw Error(`Translation key collision: ${id}`)
    messages[id] = { source, kind }
    return id
  }
  function visit(node) {
    if (
      ["script", "style"].includes(node.tagName) ||
      attr(node, "data-translation-ignore") !== undefined
    )
      return
    for (const a of [...(node.attrs || [])]) {
      if (
        (attrs.has(a.name) ||
          (node.tagName === "meta" &&
            attr(node, "name") === "description" &&
            a.name === "content")) &&
        /[A-Za-z]{2}/.test(a.value)
      ) {
        setAttr(node, `data-i18n-${a.name}`, register(a.value, "text"))
      }
    }
    const imageButton = node.tagName === "button" && attr(node, "data-image") !== undefined
    if (units.has(node.tagName) && !imageButton && /[A-Za-z]{2}/.test(textOf(node))) {
      setAttr(node, "data-i18n", register(serialize(node)))
      return
    }
    for (const child of node.childNodes || []) visit(child)
  }
  visit(tree)
  const ui = Object.fromEntries(
    Object.entries({
      openVideo: "Open this moment on YouTube ↗",
      videoTitle: "SchleyerZ walkthrough: {title}",
      videoHelp:
        "If YouTube blocks playback in this browser or a saved local file, use the timestamped link below. Video needs internet.",
      offlineBadge: "Offline edition · images included",
    }).map(([name, value]) => [name, register(value, "text")]),
  )
  const translations = {
    en: Object.fromEntries(Object.entries(messages).map(([id, message]) => [id, message.source])),
  }
  await fs.mkdir(path.join(root, "locales"), { recursive: true })
  await fs.writeFile(
    path.join(root, "locales/catalog.json"),
    JSON.stringify(messages, null, 2) + "\n",
  )
  if (!collect) {
    for (const lang of languages.slice(1)) {
      const data = JSON.parse(
        await fs.readFile(path.join(root, `locales/${lang.code}.json`), "utf8"),
      )
      for (const [id, message] of Object.entries(messages))
        validateTranslation(`${lang.code}/${id}`, message.source, data[id])
      const stale = Object.keys(data).filter((key) => !messages[key])
      if (stale.length) throw Error(`Stale translations in ${lang.code}: ${stale.join(", ")}`)
      translations[lang.code] = data
    }
  }
  const payload = JSON.stringify({ languages, translations, ui }).replaceAll("<", "\\u003c")
  const runtime = await fs.readFile(path.join(root, "i18n.js"), "utf8")
  const output = serialize(tree)
  const insertion = `<script id="guide-locales" type="application/json">${payload}</script><script>${runtime}</script>`
  const marker = "<script>const viewer"
  if (!output.includes(marker)) throw Error("Reader script insertion point missing")
  console.log(
    JSON.stringify({
      localizationUnits: Object.keys(messages).length,
      languages: Object.keys(translations).length,
    }),
  )
  return output.replace(marker, insertion + marker)
}
