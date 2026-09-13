const viewer = document.querySelector("#viewer")
const title = document.querySelector("#viewer-title")
const content = document.querySelector("#viewer-content")
const link = document.querySelector("#viewer-link")
let opener
function showReference(button) {
  opener = button
  content.replaceChildren()
  link.replaceChildren()
  const videoLink = document.createElement("a")
  videoLink.target = "_blank"
  videoLink.rel = "noreferrer"
  videoLink.textContent = window.guideI18n.text("openVideo")
  if (button.hasAttribute("data-image")) {
    title.textContent = button.dataset.caption
    const img = new Image()
    img.src = button.querySelector("img").src
    img.alt = button.dataset.caption
    img.className = "dialog-image"
    content.append(img)
    videoLink.href = `https://www.youtube.com/watch?v=45dG6srGVMA&t=${button.dataset.time}s`
  } else {
    title.textContent = button.dataset.title
    const frame = document.createElement("iframe")
    frame.className = "video-frame"
    frame.title = window.guideI18n.text("videoTitle").replace("{title}", button.dataset.title)
    frame.src = `https://www.youtube-nocookie.com/embed/45dG6srGVMA?start=${button.dataset.start}&end=${button.dataset.end}&autoplay=1&rel=0`
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen"
    frame.allowFullscreen = true
    frame.referrerPolicy = "strict-origin-when-cross-origin"
    content.append(frame)
    const help = document.createElement("p")
    help.className = "video-help"
    help.textContent = window.guideI18n.text("videoHelp")
    content.append(help)
    videoLink.href = `https://www.youtube.com/watch?v=45dG6srGVMA&t=${button.dataset.start}s`
  }
  link.append(videoLink)
  viewer.showModal()
}
document.addEventListener("click", (event) => {
  const button = event.target.closest(".image-open,.play")
  if (button) showReference(button)
})
document.querySelector(".close").addEventListener("click", () => viewer.close())
viewer.addEventListener("click", (event) => {
  if (event.target === viewer) {
    const r = viewer.getBoundingClientRect()
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      viewer.close()
  }
})
viewer.addEventListener("close", () => {
  content.replaceChildren()
  opener?.focus()
})
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries)
      if (entry.isIntersecting) {
        document.querySelector("nav [aria-current]")?.removeAttribute("aria-current")
        document
          .querySelector(`nav a[href="#${entry.target.id}"]`)
          ?.setAttribute("aria-current", "location")
      }
  },
  { rootMargin: "0px 0px -70% 0px" },
)
document.querySelectorAll("main > .stage").forEach((section) => observer.observe(section))
window.addEventListener("beforeprint", () => {
  document.querySelectorAll(".atlas").forEach((el) => {
    el.dataset.printWasOpen = String(el.open)
    el.open = true
  })
})
window.addEventListener("afterprint", () => {
  document.querySelectorAll(".atlas").forEach((el) => {
    el.open = el.dataset.printWasOpen === "true"
    delete el.dataset.printWasOpen
  })
})
