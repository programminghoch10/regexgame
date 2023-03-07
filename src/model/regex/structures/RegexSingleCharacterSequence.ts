class RegexSingleCharacterSequence extends RegexSequence {
  regexStructure: RegexStructure = RegexStructure.CHARACTER_SEQUENCE
  constructor(charSet: string, length: number) {
    super(charSet, new Set([RegexStructure.SINGLE_CHARACTER]), length)
  }
}
