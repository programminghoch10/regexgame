
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const quitButton = document.querySelector("#quitbutton")! as HTMLHeadingElement
function quit() {
  window.close()
  round = 0
  displayScore()
}
setHidden(quitButton, !(window.opener !== null || window.history.length === 1))

const playButton = document.querySelector("#playbutton")! as HTMLButtonElement
function play() {
  if (playButton.classList.contains("loading")) throw new Error("still loading, cant play")
  round = -1
  gameStartTimestamp = new Date()
  nextRiddle()
}

const globalContainer = document.querySelector("body > div.game-box")! as HTMLDivElement
const startPageContainer = document.querySelector("#startpage")! as HTMLDivElement
const gameContainer = document.querySelector("#game")! as HTMLDivElement
const settingsContainer = document.querySelector("#settings")! as HTMLDivElement
async function switchToStartPage() {
  await gameBoxHeightTransitionBegin()
  setHidden(startPageContainer, false)
  setHidden(gameContainer, true)
  setHidden(settingsContainer, true)
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
  setHidden(scorePercentageElement, (savedConfiguration ?? defaultConfiguration).minimumCompletedRounds === 0)
  scorePercentageElement.innerText = `Completion: ${calculateCompletionPercentage() * 100}%`
  startPageContainer.classList.add("finished")
  playButton.classList.add("again")
}

async function load() {
  loadSettings()
  // show the loading animation for a short time, because i really like it
  await sleep(100)
  playButton.classList.remove("loading")
}
load()

if ("serviceWorker" in navigator)
  navigator.serviceWorker.register("serviceworker.js")
