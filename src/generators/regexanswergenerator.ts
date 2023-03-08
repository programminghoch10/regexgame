
/**
 * Generate possible answers for a given regex
 * @param regex the regex to generate answers for
 * @param answerCount how many answers to generate
 * @param correctAnswerMatches if true, one answer is correct, if false, one answer is incorrect
 * @returns an array of possible answers
 */
function generateRegexAnswers(regex: Regex, answerCount: number, correctAnswerMatches?: boolean): string[] {
  if (correctAnswerMatches == undefined) correctAnswerMatches = true
  if (answerCount < 1) throw "invalid answerCount " + answerCount
  let answers = []
  for (let i = 0; i < answerCount; i++)
    answers[i] = regex.generateCorrectAnswer()
  answers = removeDuplicatesFromArray(answers)
  answers = shuffleArray(answers)
  answers = answers.map(answer => answer.length == 0 ? "&nbsp;" : answer)
  return answers
}
