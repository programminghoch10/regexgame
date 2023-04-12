
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function quit() {
  window.parent.postMessage("CLOSE ME", "*")
  window.close()
  round = 0
  displayScore()
}

const playButton = document.querySelector("#playbutton")! as HTMLButtonElement
function play() {
  if (playButton.classList.contains("loading")) throw "still loading, cant play"
  round = -1
  nextRiddle()
}

const globalContainer = document.querySelector("body > div.game-box")! as HTMLDivElement
const startPageContainer = document.querySelector("#startpage")! as HTMLDivElement
const gameContainer = document.querySelector("#game")! as HTMLDivElement
async function switchToStartPage() {
  await gameBoxHeightTransitionBegin()
  setHidden(startPageContainer, false)
  setHidden(gameContainer, true)
  await gameBoxHeightTransitionEnd()
}

const scoreElement = document.querySelector("#startpage > h2#score")! as HTMLHeadingElement
const scorePercentageElement = document.querySelector("#startpage > h3#scorepercentage") as HTMLHeadingElement
function displayScore() {
  if (round == undefined || round <= 0) {
    startPageContainer.classList.remove("finished")
    playButton.classList.remove("again")
    return
  }
  scoreElement.innerText = `Score: ${round}`
  scorePercentageElement.innerText = `Completion: ${calculateCompletionPercentage() * 100}%`
  startPageContainer.classList.add("finished")
  playButton.classList.add("again")
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
