
class RegexGenerator {

  // minimum length for regexes of complexity 1
  static minimumLength = 5

  // maximum length for regexes of any complexity
  static maximumLength = 15

  static charSets: Set<string>[] = [
    new Set(["a", "b", "c"]),
    new Set(["x", "y", "z"]),
    new Set(["v", "w"]),
    new Set(["m", "n", "M", "N"]),
    new Set(["d", "b", "p", "q"]),
    new Set(["l", "I", "i", "j"]),
    new Set(["w", "t", "f"]),
    new Set(["o", "O", "Q", "C", "c"]),
    //new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]),
  ]

  static getRandomCharSet(): Set<string> {
    return getRandomElementFromArray([...this.charSets])
  }

  static getRandomCharFromCharSet(charSet: Set<string>): string {
    return getRandomElementFromArray([...charSet])
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
    let charSet = this.getRandomCharSet()
    let regex = new Regex(charSet, allowedRegexStructures, complexity)
    console.log("generated regex", regex)
    // prevent regexes without any structures
    if (regex.generate().split("").filter(token => !charSet.has(token)).length == 0)
      return this.generateRegex(allowedRegexStructures, complexity)
    return regex
  }

}
