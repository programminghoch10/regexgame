class Regex {
  private regex: RegexPartBase
  private complexity: number
  constructor(charSet: string, allowedRegexStructures: Set<RegexStructure>, complexity: number) {
    this.regex = new RegexSequence(charSet, 0, allowedRegexStructures, complexity, true)
    this.complexity = complexity
  }

  generate(): string {
    return this.regex.generate()
  }

  generateRegExp(): RegExp {
    return new RegExp(`^${this.generate()}$`)
  }

  generateCorrectAnswer(lengthFactor?: number): string {
    if (!lengthFactor) lengthFactor = this.generate().length / 2
    return this.regex.generateCorrectAnswer(lengthFactor)
  }

  static createRegexPart(
    charSet: string,
    nesting: number,
    allowedRegexStructures: Set<RegexStructure>,
    complexity: number,
    outerRegexPart?: RegexPartWrapperBase
  ): RegexPartBase {
    if (outerRegexPart != undefined && outerRegexPart.regexStructure != undefined)
      allowedRegexStructures = new Set([...allowedRegexStructures].filter(structure => structure != outerRegexPart.regexStructure))
    nesting++
    complexity = RegexComplexity.calculateNestedComplexity(complexity, nesting)
    let regexStructure = RegexComplexity.getRegexStructure(allowedRegexStructures, complexity)
    switch (regexStructure) {
      case RegexStructure.SINGLE_CHARACTER:
        return new RegexSingleCharacter(charSet)
      case RegexStructure.ANY_SINGLE_CHARACTER:
        return new RegexAnySingleCharacter(charSet)
      case RegexStructure.CHARACTER_SEQUENCE:
        return new RegexSingleCharacterSequence(charSet, nesting, complexity)
      case RegexStructure.GROUP:
        return new RegexGroup(charSet, nesting, allowedRegexStructures, complexity, this.createRandomQuantification(allowedRegexStructures))
      case RegexStructure.CHARACTER_CLASS:
        return new RegexCharacterClass(charSet)
      case RegexStructure.CHARACTER_CLASS_INVERTED:
        return new RegexCharacterClassInverted(charSet)
      case RegexStructure.DISJUNCTION:
        return new RegexDisjunction(charSet, nesting, allowedRegexStructures, complexity)
      default:
        throw "cant generate regex structure " + getRegexStructureString(regexStructure)
    }
  }

  static createRandomQuantification(allowedRegexStructures: Set<RegexStructure>): RegexQuantifierBase | undefined {
    const regexQuantifier = RegexComplexity.getRegexQuantifier(allowedRegexStructures)
    switch (regexQuantifier) {
      case RegexStructure.OPTIONAL_QUANTIFIER:
        return new RegexOptional()
      case RegexStructure.AT_LEAST_ONE_QUANTIFIER:
        return new RegexAtLeastOne()
      case RegexStructure.ANY_AMOUNT_QUANTIFIER:
        return new RegexAnyAmount()
      case RegexStructure.ABSOLUTE_NUMERIC_QUANTIFIER:
        return new RegexNumeric()
      case undefined:
        return undefined
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
