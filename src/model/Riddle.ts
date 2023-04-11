
// when this riddle is considered solved
enum SOLVE_TYPE {
  SOLVED_ON_MATCH, //solved if answer matches
  SOLVED_ON_MISMATCH, //solved if answer does not match
}

/**
 * This determines if a riddle is considered solved
 * @param answerMatches whether the answer matches the riddle's regex
 * @param solveType the solveType of the riddle
 * @returns whether this riddle has been solved
 */
function isRiddleSolved(answerMatches: boolean, solveType: SOLVE_TYPE) {
  switch (solveType) {
    case SOLVE_TYPE.SOLVED_ON_MATCH:
      return answerMatches
    case SOLVE_TYPE.SOLVED_ON_MISMATCH:
      return !answerMatches
  }
}

class Riddle {
  regex: Regex
  answers: Array<string>

  solveType: SOLVE_TYPE = SOLVE_TYPE.SOLVED_ON_MATCH

  constructor(regex: Regex, answers: Array<string>) {
    this.regex = regex
    this.answers = answers
  }
}
