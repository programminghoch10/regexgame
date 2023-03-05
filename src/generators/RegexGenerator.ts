
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
    let arr = [...allowedRegexStructures]
    return arr[getRandomInteger(arr.length)]
  }

  /**
   * Generate a random regex, given the following constraints
   * @param allowedRegexStructures which regex structures are allowed to be used for generation
   * @param complexity how complex the regex should be
   * @returns the generated regex
   */
  static generateRegex(allowedRegexStructures: Set<RegexStructure>, complexity: number): RegExp {
    let targetLength = this.minimumLength + getRandomIntegerFromRange(complexity / 2, complexity)
    targetLength = clamp(targetLength, this.minimumLength, this.maximumLength)
    console.log("target length", targetLength)
    let charSet = this.getRandomCharSet()
    let regex = ""
    while (regex.length < targetLength) {
      regex += this.getRandomCharFromCharSet(charSet)
    }
    console.log("generated regex", regex)
    return new RegExp(regex)
  }

}
