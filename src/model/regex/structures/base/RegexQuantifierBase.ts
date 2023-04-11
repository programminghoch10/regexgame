abstract class RegexQuantifierBase {
  abstract quantifierSymbol: string

  // generate a possible correct quantification
  abstract generateCorrectQuantification(lengthFactor: number): number

  // generate the quantifier symbol
  generate() { return this.quantifierSymbol }

  // same as in RegexPartBase
  generateCorrectAnswer(regexPart: RegexPartBase, lengthFactor: number): string {
    const quantification = this.generateCorrectQuantification(lengthFactor)
    let possibleAnswer = ""
    for (let i = 0; i < quantification; i++)
      possibleAnswer += regexPart.generateCorrectAnswer(lengthFactor)
    return possibleAnswer
  }

  // same as in RegexPartBase
  generatePossiblyWrongAnswer(regexPart: RegexPartBase, lengthFactor: number, wrongChance: number): string {
    let quantification: number
    if (chance(wrongChance))
      quantification = this.generateWrongQuantification(lengthFactor)
    else
      quantification = this.generateCorrectQuantification(lengthFactor)
    let answer = ""
    for (let i = 0; i < quantification; i++)
      answer += regexPart.generatePossiblyWrongAnswer(lengthFactor, wrongChance)
    return answer
  }

  abstract generateWrongQuantification(lengthFactor: number): number

}
