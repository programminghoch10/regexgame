
/**
 * Generates an answer button.
 * @param answer the answer
 * @returns the button element of this answer to be inserted into div#answers
 */
function generateAnswerButton(answer: string): HTMLButtonElement {
  let button = document.createElement("button") as HTMLButtonElement
  button.classList.add("answer", "button", "box-glow-light")
  //replace empty string with non-breakable space to ensure correct button sizing with empty answers
  const buttonText = answer.length == 0 ? "&nbsp;" : answer
  button.innerHTML = `<p>${buttonText}</p>`
  button.addEventListener("click", () => onAnswerSelected(button, answer))
  return button
}

const riddleRegexElement = document.querySelector("#riddle > p")! as HTMLParagraphElement
const answersContainer = document.querySelector("#answers")! as HTMLDivElement

/**
 * The current Riddle displayed to the user.
 */
let currentRiddle: Riddle | undefined

/**
 * the current round
 */
let round: number

/**
 * Display a riddle to the user
 * @param riddle the riddle to display
 */
async function displayRiddle(riddle: Riddle) {
  await gameBoxHeightTransitionBegin()
  setHidden(startPageContainer, true)
  setHidden(gameContainer, false)
  removeCurrentRiddle()
  currentRiddle = riddle
  riddleRegexElement.innerText = riddle.regex.generate()
  riddle.answers.forEach(answer =>
    answersContainer.appendChild(generateAnswerButton(answer))
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
  riddleRegexElement.innerText = ""
  answersContainer.innerHTML = ""
  currentRiddle = undefined
}

let nextAnswerTimeout: number | undefined
function onAnswerSelected(button: HTMLButtonElement, answer: string) {
  let correctAnswer: boolean

  if (!currentRiddle) throw new Error("current riddle undefined")
  if (answersContainer.querySelector("button.selected")) {
    correctAnswer = answersContainer.querySelector("button.selected.correct") != undefined
    if (correctAnswer && nextAnswerTimeout !== undefined) {
      clearTimeout(nextAnswerTimeout)
      nextAnswerTimeout = undefined
    }
    if (correctAnswer)
      nextRiddle()
    return
  }
  const riddleRegex: RegExp = currentRiddle.regex.generateRegExp()
  console.log("selected answer", riddleRegex, answer)
  const answerMatchesRiddle: boolean = riddleRegex.test(answer)
  correctAnswer = isRiddleSolved(answerMatchesRiddle, currentRiddle.riddleType)
  button.classList.add(correctAnswer ? "correct" : "incorrect")
  button.classList.add("selected")
  nextAnswerTimeout = setTimeout(() => {
    if (correctAnswer)
      nextRiddle()
    else
      gameEnd()
  }, correctAnswer ? 1000 : 5000)
}
