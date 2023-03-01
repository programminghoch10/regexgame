
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function quit() {
  window.parent.postMessage("CLOSE ME", "*")
  window.close()
}

const exampleRiddle: Riddle = new Riddle(/ab(ab)*/, ["aba", "abb", "ababa", "abab"])

function play() {
  displayRiddle(exampleRiddle)
}

const gameBoxDiv = document.querySelector("body > div.game-box")! as HTMLDivElement
const startPageDiv = document.querySelector("#startpage")! as HTMLDivElement
const gameDiv = document.querySelector("#game")! as HTMLDivElement
async function switchToStartPage() {
  await gameBoxHeightTransitionBegin()
  setHidden(startPageDiv, false)
  setHidden(gameDiv, true)
  await gameBoxHeightTransitionEnd()
}
