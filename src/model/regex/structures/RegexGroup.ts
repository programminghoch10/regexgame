class RegexGroup extends RegexPartWrapperBase {
  regexStructure: RegexStructure = RegexStructure.GROUP
  innerRegex: RegexPartBase
  quantifier?: RegexQuantifierBase

  constructor(charSet: string, allowedRegexStructures: Set<RegexStructure>, length: number, quantifier?: RegexQuantifierBase) {
    super(charSet, allowedRegexStructures)
    this.quantifier = quantifier
    this.innerRegex = Regex.createRegexPart(charSet, allowedRegexStructures, length, this)
  }

  generate(): string {
    const generatedInnerRegex = this.innerRegex.generate()
    if (!this.quantifier) return generatedInnerRegex
    const generatedQuantifier = this.quantifier.generate()
    if (generatedInnerRegex.length == 1)
      return generatedInnerRegex + generatedQuantifier
    return "(" + generatedInnerRegex + ")" + generatedQuantifier
  }

  generatePossibleAnswer(lengthFactor: number): string {
    if (!this.quantifier)
      return this.innerRegex.generatePossibleAnswer(lengthFactor)
    return this.quantifier.generatePossibleAnswer(this.innerRegex, lengthFactor)
  }
}
