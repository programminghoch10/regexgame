class RegexOptional extends RegexQuantifierBase {
  quantifierSymbol: string = "?"
  generateCorrectQuantification(): number {
    return getRandomIntegerFromRange(0, 1)
  }
}
