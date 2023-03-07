class RegexOptional extends RegexQuantifierBase {
  quantifierSymbol: string = "?"
  generatePossibleQuantification(): number {
    return getRandomIntegerFromRange(0, 1)
  }
}
