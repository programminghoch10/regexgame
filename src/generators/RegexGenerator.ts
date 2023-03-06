
class RegexGenerator {

  // minimum length for regexes of complexity 1
  static minimumLength = 5

  // maximum length for regexes of any complexity
  static maximumLength = 15

  static charSets: string[] = [
    "abc",
    "xyz",
  ]

  static getRandomCharSet(): string {
    return getRandomElementFromArray(this.charSets)
  }

  static getRandomCharFromCharSet(charSet: string): string {
    return getRandomElementFromArray(charSet.split(""))
  }

  static getRandomRegexStructure(allowedRegexStructures: Set<RegexStructure>): RegexStructure {
    return [...allowedRegexStructures][getRandomInteger(allowedRegexStructures.size)]
  }

  /**
   * Generate a random regex, given the following constraints
   * @param allowedRegexStructures which regex structures are allowed to be used for generation
   * @param complexity how complex the regex should be
   * @returns the generated regex
   */
  static generateRegex(allowedRegexStructures: Set<RegexStructure>, complexity: number): Regex {
    let targetLength = this.minimumLength + getRandomIntegerFromRange(complexity / 2, complexity)
    targetLength = clamp(targetLength, this.minimumLength, this.maximumLength)
    let charSet = this.getRandomCharSet()
    let regex = new Regex(charSet, allowedRegexStructures, targetLength)
    console.log("generated regex", regex)
    // prevent regexes without any structures
    if (regex.generate().source.split("").filter(token => !charSet.includes(token)).length == 0)
      return this.generateRegex(allowedRegexStructures, complexity)
    return regex
  }

}
