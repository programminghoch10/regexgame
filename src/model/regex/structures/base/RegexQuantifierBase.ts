abstract class RegexQuantifierBase {
  abstract quantifierSymbol: string

  // generate a possible correct quantification
  abstract generateCorrectQuantification(lengthFactor: number): number

  // generate the quantifier symbol
  generate() { return this.quantifierSymbol }

  generateCorrectAnswer(regexPart: RegexPartBase, lengthFactor: number): string {
    const quantification = this.generateCorrectQuantification(lengthFactor)
    let possibleAnswer = ""
    for (let i = 0; i < quantification; i++)
      possibleAnswer += regexPart.generateCorrectAnswer(lengthFactor)
    return possibleAnswer
  }

}
