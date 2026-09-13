const guideCatalog = JSON.parse(document.querySelector("#guide-locales").textContent)
const languageSelect = document.querySelector("#guide-language")
let activeLanguage = "en"

function applyLanguage(code, updateURL = false) {
  if (!guideCatalog.translations[code]) code = "en"
  const dictionary = guideCatalog.translations[code]
  for (const node of document.querySelectorAll("[data-i18n]")) {
    node.innerHTML = dictionary[node.dataset.i18n]
  }
  for (const name of ["alt", "aria-label", "data-caption", "data-title", "content"]) {
    for (const node of document.querySelectorAll(`[data-i18n-${name}]`)) {
      node.setAttribute(name, dictionary[node.getAttribute(`data-i18n-${name}`)])
    }
  }
  const badge = document.querySelector("[data-offline-badge]")
  if (badge) badge.textContent = dictionary[guideCatalog.ui.offlineBadge]
  activeLanguage = code
  document.documentElement.lang = code
  languageSelect.value = code
  const language = guideCatalog.languages.find((item) => item.code === code)
  document.querySelector("#official-terms").href =
    `https://steamcommunity.com/stats/476620/achievements/?l=${language.steam}`
  if (updateURL && location.protocol !== "file:") {
    const url = new URL(location.href)
    if (code === "en") url.searchParams.delete("lang")
    else url.searchParams.set("lang", code)
    history.replaceState(null, "", url)
  }
}

window.guideI18n = {
  text(name) {
    return guideCatalog.translations[activeLanguage][guideCatalog.ui[name]]
  },
}
languageSelect.addEventListener("change", () => {
  const stage = [...document.querySelectorAll("main > .stage")].find((node) => {
    const bounds = node.getBoundingClientRect()
    return bounds.top <= 0 && bounds.bottom > 0
  })
  const offset = stage?.getBoundingClientRect().top
  applyLanguage(languageSelect.value, true)
  if (stage)
    window.scrollBy({ top: stage.getBoundingClientRect().top - offset, behavior: "instant" })
})
applyLanguage(new URLSearchParams(location.search).get("lang") || document.documentElement.lang)
