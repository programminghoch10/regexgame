class RegexAtLeastOne extends RegexQuantifierBase {
  quantifierSymbol: string = "+"
  generateCorrectQuantification(lengthFactor: number): number {
    return getRandomIntegerFromRange(1, lengthFactor)
  }
}
