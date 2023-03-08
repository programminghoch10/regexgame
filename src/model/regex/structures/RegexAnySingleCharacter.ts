class RegexAnySingleCharacter extends RegexPartBase {
  generate(): string {
    return "."
  }
  generateCorrectAnswer(): string {
    return getRandomElementFromArray(this.charSet.split(""))
  }
}
