class RegexSingleCharacter extends RegexPartBase {
  character: string;

  constructor(charSet: string) {
    super(charSet)
    this.character = getRandomElementFromArray(charSet.split(""))
  }

  generate(): string {
    return this.character
  }

  generatePossibleAnswer(): string {
    return this.character
  }
}
