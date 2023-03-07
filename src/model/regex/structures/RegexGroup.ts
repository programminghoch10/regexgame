class RegexGroup extends RegexPartWrapperBase {
  regexStructure: RegexStructure = RegexStructure.GROUP
  innerRegex: RegexPartBase
  quantifier?: RegexQuantifierBase

  constructor(charSet: string, nesting: number, allowedRegexStructures: Set<RegexStructure>, complexity: number, quantifier?: RegexQuantifierBase) {
    super(charSet, nesting, allowedRegexStructures)
    this.quantifier = quantifier
    this.innerRegex = Regex.createRegexPart(charSet, nesting, allowedRegexStructures, complexity, this)
  }

  generate(): string {
    const generatedInnerRegex = this.innerRegex.generate()
    if (generatedInnerRegex.length == 0)
      return ""
    if (!this.quantifier) return generatedInnerRegex
    const generatedQuantifier = this.quantifier.generate()
    if (generatedInnerRegex.length == 1 || this.innerRegex instanceof RegexCharacterClass)
      return generatedInnerRegex + generatedQuantifier
    return "(" + generatedInnerRegex + ")" + generatedQuantifier
  }

  generatePossibleAnswer(lengthFactor: number): string {
    if (!this.quantifier)
      return this.innerRegex.generatePossibleAnswer(lengthFactor)
    return this.quantifier.generatePossibleAnswer(this.innerRegex, lengthFactor)
  }
}
