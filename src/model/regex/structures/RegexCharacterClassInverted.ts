class RegexCharacterClassInverted extends RegexCharacterClass {
  constructor(charSet: Set<string>) {
    super(charSet)
    if (charSet.size == this.chars.size)
      this.chars.delete(RegexGenerator.getRandomCharFromCharSet(this.charSet))
  }
  generate(): string {
    if (this.chars.size == 0) return ""
    return "[^" + [...this.chars].join("") + "]"
  }
  generateCorrectAnswer(): string {
    const possibleCharacters = [...this.charSet].filter(char => !this.chars.has(char))
    return getRandomElementFromArray(possibleCharacters)
  }
  generatePossiblyWrongAnswer(_lengthFactor: number, wrongChance: number): string {
    if (chance(1 - wrongChance))
      return this.generateCorrectAnswer()
    if (chance(0.05))
      return [...this.chars].join("")
    const wrongChars = [...this.charSet].filter(char => this.chars.has(char))
    if (wrongChars.length == 0)
      return this.generateCorrectAnswer()
    return getRandomElementFromArray(wrongChars)
  }
}
