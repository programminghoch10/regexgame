class RegexAtLeastOne extends RegexQuantifierBase {
  quantifierSymbol: string = "+"
  generatePossibleQuantification(lengthFactor: number): number {
    return getRandomIntegerFromRange(1, lengthFactor)
  }
}
