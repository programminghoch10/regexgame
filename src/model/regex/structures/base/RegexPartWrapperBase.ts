// wrapper around RegexPartBase for RegexParts which need to generate inner structures
abstract class RegexPartWrapperBase extends RegexPartBase {
  allowedRegexStructures: Set<RegexStructure>
  nesting: number

  constructor(charSet: string, nesting: number, allowedRegexStructures: Set<RegexStructure>) {
    super(charSet)
    this.nesting = nesting
    this.allowedRegexStructures = allowedRegexStructures
  }
}
