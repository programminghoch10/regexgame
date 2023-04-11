
/**
 * Generates an answer button.
 * @param answer the answer
 * @returns the button element of this answer to be inserted into div#answers
 */
function generateAnswerButton(answer: string): HTMLButtonElement {
  let button = document.createElement("button") as HTMLButtonElement
  button.classList.add("answer", "button", "box-glow-light")
  button.innerHTML = `<p>${answer}</p>`
  button.addEventListener("click", () => onAnswerSelected(button, answer))
  return button
}

const riddleDivP = document.querySelector("#riddle > p")! as HTMLParagraphElement
const answersDiv = document.querySelector("#answers")! as HTMLDivElement

/**
 * The current Riddle displayed to the user.
 */
var currentRiddle: Riddle | undefined

/**
 * the current round
 */
var round: number

/**
 * Display a riddle to the user
 * @param riddle the riddle to display
 */
async function displayRiddle(riddle: Riddle) {
  await gameBoxHeightTransitionBegin()
  setHidden(startPageDiv, true)
  setHidden(gameDiv, false)
  removeCurrentRiddle()
  currentRiddle = riddle
  riddleDivP.innerText = riddle.regex.generate()
  riddle.answers.forEach(answer =>
    answersDiv.appendChild(generateAnswerButton(answer))
  )
  await gameBoxHeightTransitionEnd()
}

function nextRiddle() {
  round++
  try {
    displayRiddle(generateRiddle(round))
  } catch (e) {
    console.error("error creating next riddle", e)
    //TODO: notify user?
    gameEnd()
  }
}

function gameEnd() {
  displayScore()
  switchToStartPage()
}

function removeCurrentRiddle() {
  riddleDivP.innerText = ""
  answersDiv.innerHTML = ""
  currentRiddle = undefined
}

let nextAnswerTimeout: number | undefined
function onAnswerSelected(button: HTMLButtonElement, answer: string) {
  if (!currentRiddle) throw "current riddle undefined"
  if (answersDiv.querySelector("button.selected")) {
    let correctAnswer = answersDiv.querySelector("button.selected.correct") != undefined
    if (correctAnswer && nextAnswerTimeout !== undefined) {
      clearTimeout(nextAnswerTimeout)
      nextAnswerTimeout = undefined
    }
    if (correctAnswer)
      nextRiddle()
    return
  }
  const riddleRegex: RegExp = currentRiddle.regex.generateRegExp()
  const answerMatchesRiddle: boolean = riddleRegex.test(answer)
  const correctAnswer = isRiddleSolved(answerMatchesRiddle, currentRiddle.solveType)
  button.classList.add(correctAnswer ? "correct" : "incorrect")
  button.classList.add("selected")
  nextAnswerTimeout = setTimeout(() => {
    if (correctAnswer)
      nextRiddle()
    else
      gameEnd()
  }, correctAnswer ? 1000 : 5000)
}
