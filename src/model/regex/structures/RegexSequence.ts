class RegexSequence extends RegexPartWrapperBase {

  sequence: Array<RegexPartBase>

  constructor(charSet: string, nesting: number, allowedRegexStructures: Set<RegexStructure>, complexity: number, maximumLength?: boolean) {
    super(charSet, nesting, allowedRegexStructures)
    if (maximumLength == undefined) maximumLength = false
    let splitCount = RegexComplexity.calculateSequenceSplitCount(complexity)
    if (!maximumLength) splitCount = getRandomInteger(splitCount)
    this.sequence = []
    let sequence: Array<RegexPartBase> = []
    for (let i = 0; i < splitCount; i++) {
      sequence.push(
        Regex.createRegexPart(
          charSet,
          nesting,
          this.allowedRegexStructures,
          RegexComplexity.calculateSequenceInnerComplexity(complexity, splitCount),
          this
        )
      )
    }
    sequence = sequence.filter(part => part.generate().length > 0)
    this.sequence = shuffleArray(sequence)
  }

  generate(): string {
    return this.sequence
      .map(regexPart => regexPart.generate())
      .join("")
  }

  generatePossibleAnswer(lengthFactor: number): string {
    return this.sequence
      .map(regexPart => regexPart.generatePossibleAnswer(lengthFactor))
      .join("")
  }
}
