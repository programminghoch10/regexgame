
const invisibleTransitionTime = 500
const heightTransitionTime = 250
async function gameBoxHeightTransitionBegin() {
  setHeight(globalContainer, getHeightOfBiggestVisibileChild(globalContainer) + "px")
  document.querySelectorAll(".game-box > div").forEach(node => setInvisible(node as HTMLElement, true))
  await sleep(invisibleTransitionTime)
}
async function gameBoxHeightTransitionEnd() {
  setHeight(globalContainer, getHeightOfBiggestVisibileChild(globalContainer) + "px")
  await sleep(heightTransitionTime)
  setHeight(globalContainer)
  setInvisible(document.querySelector(".game-box > div:not(.hidden)")! as HTMLElement, false)
  await sleep(invisibleTransitionTime)
}

function setClassFlag(element: HTMLElement, flagName: string, flagValue: boolean) {
  element.classList[flagValue ? "add" : "remove"](flagName)
}
const setHidden = (element: HTMLElement, hidden: boolean) => setClassFlag(element, "hidden", hidden)
const setInvisible = (element: HTMLElement, invisible: boolean) => setClassFlag(element, "invisible", invisible)

function getHeight(element: HTMLElement) {
  return element.scrollHeight
}
function getHeightOfBiggestVisibileChild(div: HTMLDivElement): number {
  return Array.from(div.children)
    .filter(n => !n.classList.contains("hidden"))
    .map(n => getHeight(n as HTMLElement))
    .reduce((a, b) => Math.max(a, b))
}
function setHeight(element: HTMLElement, height?: number | string) {
  if (height === undefined) height = ""
  element.style.height = height?.toString()!
}
