
/**
 * Generate possible answers for a given regex
 * @param regex the regex to generate answers for
 * @param answerCount how many answers to generate
 * @param correctAnswerRatio how many answers should be correct, 0 = one correct answer, 1 = all answers are correct
 * @returns an array of possible answers
 */
function generateRegexAnswers(regex: Regex, answerCount: number, correctAnswerRatio?: number): string[] {
  if (correctAnswerRatio == undefined) correctAnswerRatio = 0
  if (answerCount < 1) throw new Error("invalid answerCount " + answerCount)
  const correctAnswerCount = Math.max(Math.round(answerCount * correctAnswerRatio), 1)
  const incorrectAnswerCount = answerCount - correctAnswerCount
  let answers = []
  for (let i = 0; i < correctAnswerCount; i++)
    answers.push(regex.generateCorrectAnswer())
  for (let i = 0; i < incorrectAnswerCount; i++)
    answers.push(regex.generateWrongAnswer())
  answers = removeDuplicatesFromArray(answers)
  answers = shuffleArray(answers)
  return answers
}
