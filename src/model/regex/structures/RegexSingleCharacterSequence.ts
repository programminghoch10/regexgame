class RegexSingleCharacterSequence extends RegexSequence {
  regexStructure: RegexStructure = RegexStructure.CHARACTER_SEQUENCE
  constructor(charSet: Set<string>, nesting: number, complexity: number) {
    super(charSet, nesting, new Set([RegexStructure.SINGLE_CHARACTER]), complexity)
  }
}
