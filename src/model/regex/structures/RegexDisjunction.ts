class RegexDisjunction extends RegexSequence {
  constructor(charSet: Set<string>, nesting: number, allowedRegexStructures: Set<RegexStructure>, complexity: number) {
    super(charSet, nesting, allowedRegexStructures, complexity, false)
  }
  generate(): string {
    if (this.sequence.length == 1 && chance(0.75))
      return this.sequence[0].generate()
    if (this.sequence.length == 0)
      return ""
    return "(" + this.sequence.map(o => o.generate()).join("|") + ")"
  }
  generateCorrectAnswer(lengthFactor: number): string {
    if (this.sequence.length == 0)
      return ""
    return getRandomElementFromArray(this.sequence).generateCorrectAnswer(lengthFactor)
  }
}
