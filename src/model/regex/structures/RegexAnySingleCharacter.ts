class RegexAnySingleCharacter extends RegexPartBase {
  generate(): string {
    return "."
  }
  generatePossibleAnswer(): string {
    return getRandomElementFromArray(this.charSet.split(""))
  }
}
