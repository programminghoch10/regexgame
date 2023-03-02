
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function quit() {
  window.parent.postMessage("CLOSE ME", "*")
  window.close()
}

const exampleRiddle: Riddle = new Riddle(/ab(ab)*/, ["aba", "abb", "ababa", "abab"])

const playButton = document.querySelector("#playbutton")! as HTMLButtonElement
function play() {
  if (playButton.classList.contains("loading")) throw "still loading, cant play"
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

async function load() {
  try { await getGameConfigurationBySearchQuery() } catch { }
  console.log("game configuration by id", gameConfigurationBySearchQuery)
  if (!gameConfigurationBySearchQuery) {
    console.info("no game configuration found!")
    playButton.querySelector("h2")!.innerText = "Play"
    playButton.classList.add("offline")
  }
  playButton.classList.remove("loading")
}
load()
