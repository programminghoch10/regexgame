// wrapper around RegexPartBase for RegexParts which need to generate inner structures
abstract class RegexPartWrapperBase extends RegexPartBase {
  allowedRegexStructures: Set<RegexStructure>

  constructor(charSet: string, allowedRegexStructures: Set<RegexStructure>) {
    super(charSet)
    this.allowedRegexStructures = allowedRegexStructures
  }
}
