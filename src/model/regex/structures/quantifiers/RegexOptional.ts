class RegexOptional extends RegexQuantifierBase {
  quantifierSymbol: string = "?"
  generateCorrectQuantification(): number {
    return getRandomIntegerInRange(0, 1)
  }
  generateWrongQuantification(lengthFactor: number): number {
    return getRandomIntegerInRange(2, 2 + lengthFactor)
  }
}
