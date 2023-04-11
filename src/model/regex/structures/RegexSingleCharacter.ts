class RegexSingleCharacter extends RegexPartBase {
  character: string

  constructor(charSet: Set<string>) {
    super(charSet)
    this.character = RegexGenerator.getRandomCharFromCharSet(this.charSet)
  }

  generate(): string {
    return this.character
  }

  generateCorrectAnswer(): string {
    return this.character
  }

  generatePossiblyWrongAnswer(lengthFactor: number, wrongChance: number): string {
    if (!chance(wrongChance)) return this.generateCorrectAnswer()
    return getRandomElementFromArray([...this.charSet].filter(char => this.character !== char))
  }
}
