class RegexOptional extends RegexQuantifierBase {
  quantifierSymbol: string = "?"
  generateCorrectQuantification(): number {
    return getRandomIntegerFromRange(0, 1)
  }
  generateWrongQuantification(lengthFactor: number): number {
    return getRandomIntegerFromRange(2, 2 + lengthFactor)
  }
}
