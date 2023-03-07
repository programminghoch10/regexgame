class RegexSingleCharacterSequence extends RegexSequence {
  regexStructure: RegexStructure = RegexStructure.CHARACTER_SEQUENCE
  constructor(charSet: string, nesting: number, complexity: number) {
    super(charSet, nesting, new Set([RegexStructure.SINGLE_CHARACTER]), complexity)
  }
}
