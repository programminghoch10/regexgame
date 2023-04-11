class RegexAtLeastOne extends RegexQuantifierBase {
  quantifierSymbol: string = "+"
  generateCorrectQuantification(lengthFactor: number): number {
    return getRandomIntegerInRange(1, lengthFactor)
  }
  generateWrongQuantification(lengthFactor: number): number {
    // zero is the only wrong quantification
    return 0
  }
}
