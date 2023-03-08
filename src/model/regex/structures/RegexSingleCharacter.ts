class RegexSingleCharacter extends RegexPartBase {
  character: string;

  constructor(charSet: string) {
    super(charSet)
    this.character = getRandomElementFromArray(charSet.split(""))
  }

  generate(): string {
    return this.character
  }

  generateCorrectAnswer(): string {
    return this.character
  }

  generatePossiblyWrongAnswer(lengthFactor: number, wrongChance: number): string {
    if (!chance(wrongChance)) return this.generateCorrectAnswer()
    return getRandomElementFromArray(this.charSet.split("").filter(char => this.character !== char))
  }
}
