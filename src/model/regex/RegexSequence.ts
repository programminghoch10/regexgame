class RegexSequence extends RegexPartWrapperBase {

  sequence: Array<RegexPartBase>

  // target length of this regex part
  length: number

  constructor(charSet: string, allowedRegexStructures: Set<RegexStructure>, length: number, fillLength?: boolean) {
    super(charSet, allowedRegexStructures)
    if (fillLength == undefined) fillLength = false
    if (!fillLength) length = getRandomIntegerFromRange(length / 2, length)
    this.length = length
    this.sequence = []
    let sequence: Array<RegexPartBase> = []
    let sequenceLength = 0
    while (sequenceLength < length) {
      sequence.push(
        Regex.createRegexPart(
          charSet,
          this.allowedRegexStructures,
          getRandomIntegerFromRange(1, length - sequenceLength)
        )
      )
      sequenceLength = RegexSequence.getSequenceLength(sequence)
    }
    this.sequence = shuffleArray(sequence)
  }

  static getSequenceLength(sequence: Array<RegexPartBase>) {
    return sequence.map(e => e.generate().length).reduce((a, b) => a + b, 0)
  }

  generate(): string {
    return this.sequence
      .map(regexPart => regexPart.generate())
      .join("")
  }

  generatePossibleAnswer(lengthFactor?: number): string {
    return this.sequence
      .map(regexPart => regexPart.generatePossibleAnswer(lengthFactor))
      .join("")
  }
}
