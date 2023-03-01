
function quit() {
  window.parent.postMessage("CLOSE ME", "*")
  window.close()
}

const exampleRiddle: Riddle = new Riddle(/ab(ab)*/, ["aba", "abb", "ababa", "abab"])

function play() {
  displayRiddle(exampleRiddle)
}

function setHidden(element: HTMLElement, hidden: boolean) {
  element.classList[hidden ? "add" : "remove"]("hidden")
}

const startPageDiv = document.querySelector("#startpage")! as HTMLDivElement
const gameDiv = document.querySelector("#game")! as HTMLDivElement
function switchToStartPage() {
  setHidden(gameDiv, true)
  setHidden(startPageDiv, false)
  removeCurrentRiddle()
}
function switchToGame() {
  setHidden(startPageDiv, true)
  setHidden(gameDiv, false)
}
