class Regex {
  private regex: RegexPartBase
  private length: number
  constructor(charSet: string, allowedRegexStructures: Set<RegexStructure>, length: number) {
    this.regex = new RegexSequence(charSet, allowedRegexStructures, length, true)
    this.length = length
  }

  generate(): RegExp {
    return new RegExp(this.regex.generate())
  }

  generatePossibleAnswer(lengthFactor?: number): string {
    if (!lengthFactor) lengthFactor = this.length / 2
    return this.regex.generatePossibleAnswer(lengthFactor)
  }

  static createRegexPart(
    charSet: string,
    allowedRegexStructures: Set<RegexStructure>,
    length: number,
    outerRegexPart?: RegexPartWrapperBase
  ): RegexPartBase {
    if (length == 0) throw "trying to create zero length regex part"
    if (outerRegexPart != undefined && outerRegexPart.regexStructure != undefined)
      allowedRegexStructures = new Set([...allowedRegexStructures].filter(structure => structure != outerRegexPart.regexStructure))
    let regexStructure: RegexStructure = this.getRandomRegexStructure(allowedRegexStructures)
    switch (regexStructure) {
      case RegexStructure.SINGLE_CHARACTER:
        return new RegexSingleCharacter(charSet)
      case RegexStructure.ANY_SINGLE_CHARACTER:
        return new RegexAnySingleCharacter(charSet)
      case RegexStructure.CHARACTER_SEQUENCE:
        return new RegexSingleCharacterSequence(charSet, length)
      case RegexStructure.GROUP:
        return new RegexGroup(charSet, allowedRegexStructures, length, this.createRandomQuantification(allowedRegexStructures))
      case RegexStructure.CHARACTER_CLASS:
        return new RegexCharacterClass(charSet)
      case RegexStructure.CHARACTER_CLASS_INVERTED:
        return new RegexCharacterClassInverted(charSet)
      case RegexStructure.DISJUNCTION:
        return new RegexDisjunction(charSet, allowedRegexStructures, length)
      default:
        throw "cant generate regex structure " + getRegexStructureString(regexStructure)
    }
  }

  static createRandomQuantification(allowedRegexStructures: Set<RegexStructure>): RegexQuantifierBase | undefined {
    allowedRegexStructures = new Set([...REGEX_QUANTIFIERS].filter(q => allowedRegexStructures.has(q)))
    if (chance(0.2)) return undefined
    const regexQuantifier = getRandomElementFromArray([...allowedRegexStructures])
    switch (regexQuantifier) {
      case RegexStructure.OPTIONAL_QUANTIFIER:
        return new RegexOptional()
      case RegexStructure.AT_LEAST_ONE_QUANTIFIER:
        return new RegexAtLeastOne()
      case RegexStructure.ANY_AMOUNT_QUANTIFIER:
        return new RegexAnyAmount()
      case RegexStructure.ABSOLUTE_NUMERIC_QUANTIFIER:
        return new RegexNumeric()
      default:
        throw "cant generate regex quantifier " + getRegexStructureString(regexQuantifier)
    }
  }

  static getRandomRegexStructure(allowedRegexStructures: Set<RegexStructure>) {
    // filter out quantifiers
    allowedRegexStructures = new Set([...allowedRegexStructures].filter(structure => !REGEX_QUANTIFIERS.has(structure)))
    return getRandomElementFromArray([...allowedRegexStructures])
  }
}
