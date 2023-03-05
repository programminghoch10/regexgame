
/**
 * Generate possible answers for a given regex
 * @param regex the regex to generate answers for
 * @param answerCount how many answers to generate
 * @param correctAnswerMatches if true, one answer is correct, if false, one answer is incorrect
 * @returns an array of possible answers
 */
function generateRegexAnswers(regex: RegExp, answerCount: number, correctAnswerMatches?: boolean): string[] {
  if (correctAnswerMatches == undefined) correctAnswerMatches = true
  if (answerCount < 1) throw "invalid answerCount " + answerCount
  let answers = []
  answers[0] = regex.source
  for (let i = 1; i < answerCount; i++) answers[i] = RegexGenerator.getRandomCharSet()
  answers = shuffleArray(answers)
  return answers
}
