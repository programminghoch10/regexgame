class RegexAnyAmount extends RegexQuantifierBase {
  quantifierSymbol: string = "*"
  generateCorrectQuantification(lengthFactor: number): number {
    return getRandomIntegerFromRange(0, lengthFactor)
  }
}
