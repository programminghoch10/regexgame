
// defines what answer the user is supposed to click
enum RIDDLE_TYPE {
  FIND_MATCHING, // the user should find any correct regex
  FIND_NON_MATCHING, // the user should find any incorrect regex
}

/**
 * This determines if a riddle is considered solved
 * @param answerMatches whether the answer matches the riddle's regex
 * @param riddleType the riddleType of the riddle
 * @returns whether this riddle has been solved
 */
function isRiddleSolved(answerMatches: boolean, riddleType: RIDDLE_TYPE) {
  switch (riddleType) {
    case RIDDLE_TYPE.FIND_MATCHING:
      return answerMatches
    case RIDDLE_TYPE.FIND_NON_MATCHING:
      return !answerMatches
  }
}

class Riddle {
  regex: Regex
  answers: Array<string>

  riddleType: RIDDLE_TYPE = RIDDLE_TYPE.FIND_MATCHING

  constructor(regex: Regex, answers: Array<string>) {
    this.regex = regex
    this.answers = answers
  }
}
