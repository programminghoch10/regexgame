abstract class RegexQuantifierBase {
  abstract quantifierSymbol: string

  // generate a possible quantification
  abstract generatePossibleQuantification(lengthFactor: number): number

  // generate the quantifier symbol
  generate() { return this.quantifierSymbol }

  generatePossibleAnswer(regexPart: RegexPartBase, lengthFactor: number): string {
    const quantification = this.generatePossibleQuantification(lengthFactor)
    let possibleAnswer = ""
    for (let i = 0; i < quantification; i++)
      possibleAnswer += regexPart.generatePossibleAnswer(lengthFactor)
    return possibleAnswer
  }

}
