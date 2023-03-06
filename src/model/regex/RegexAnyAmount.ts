class RegexAnyAmount extends RegexQuantifierBase {
  quantifierSymbol: string = "*"
  generatePossibleQuantification(lengthFactor: number): number {
    return getRandomIntegerFromRange(0, lengthFactor)
  }
}
