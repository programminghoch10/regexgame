
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
 * Display a riddle to the user
 * @param riddle the riddle to display
 */
async function displayRiddle(riddle: Riddle) {
  await gameBoxHeightTransitionBegin()
  setHidden(startPageDiv, true)
  setHidden(gameDiv, false)
  removeCurrentRiddle()
  currentRiddle = riddle
  riddleDivP.innerText = riddle.regex.source
  riddle.answers.forEach(answer =>
    answersDiv.appendChild(generateAnswerButton(answer))
  )
  await gameBoxHeightTransitionEnd()
}

function nextRiddle() {
  try {
    displayRiddle(generateRiddle())
  } catch (e) {
    console.error("error creating next riddle", e)
    //TODO: notify user?
    switchToStartPage()
  }
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
    if (nextAnswerTimeout !== undefined) {
      clearTimeout(nextAnswerTimeout)
      nextAnswerTimeout = undefined
    }
    let correctAnswer = answersDiv.querySelector("button.selected.correct") != undefined
    if (correctAnswer)
      nextRiddle()
    else
      switchToStartPage()
    return
  }
  const riddleRegex: RegExp = new RegExp(`^${currentRiddle.regex.source}$`)
  const answerMatchesRiddle: boolean = riddleRegex.test(answer)
  const correctAnswer = answerMatchesRiddle == currentRiddle.solvedOnMatch
  button.classList.add(correctAnswer ? "correct" : "incorrect")
  button.classList.add("selected")
  nextAnswerTimeout = setTimeout(() => {
    if (correctAnswer)
      nextRiddle()
    else
      switchToStartPage()
  }, 3000)
}
