class RegexDisjunction extends RegexSequence {
  constructor(charSet: string, allowedRegexStructures: Set<RegexStructure>, length: number) {
    super(charSet, allowedRegexStructures, length, false)
  }
  generate(): string {
    if (this.sequence.length == 1 && chance(0.75))
      return this.sequence[0].generate()
    return "(" + this.sequence.map(o => o.generate()).join("|") + ")"
  }
  generatePossibleAnswer(lengthFactor: number): string {
    return getRandomElementFromArray(this.sequence).generatePossibleAnswer(lengthFactor)
  }
}
