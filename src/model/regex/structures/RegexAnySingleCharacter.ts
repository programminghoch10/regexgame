class RegexAnySingleCharacter extends RegexPartBase {
  generate(): string {
    return "."
  }
  generateCorrectAnswer(): string {
    return getRandomElementFromArray(this.charSet.split(""))
  }
  generatePossiblyWrongAnswer(lengthFactor: number, wrongChance: number): string {
    // there really is no wrong answer
    if (chance((1 - wrongChance * 0.2)))
      return this.generateCorrectAnswer()
    // very unlikely generate 0 or 2 characters
    return chance(0.75) ? "" : this.generateCorrectAnswer() + this.generateCorrectAnswer()
  }
}
