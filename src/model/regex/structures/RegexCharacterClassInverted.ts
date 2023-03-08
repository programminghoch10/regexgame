class RegexCharacterClassInverted extends RegexCharacterClass {
  constructor(charSet: string) {
    super(charSet)
    // if (charSet.length == this.chars.size)
    //   this.chars.delete(getRandomElementFromArray(charSet.split("")))
  }
  generate(): string {
    if (this.chars.size == 0) return ""
    return "[^" + [...this.chars].join("") + "]"
  }
  generateCorrectAnswer(): string {
    const possibleCharacters = this.charSet.split("").filter(char => !this.chars.has(char))
    return getRandomElementFromArray(possibleCharacters)
  }
  generatePossiblyWrongAnswer(lengthFactor: number, wrongChance: number): string {
    if (chance(1 - wrongChance))
      return this.generateCorrectAnswer()
    if (chance(0.05))
      return [...this.chars].join("")
    const wrongChars = this.charSet.split("").filter(char => this.chars.has(char))
    if (wrongChars.length == 0)
      return this.generateCorrectAnswer()
    return getRandomElementFromArray(wrongChars)
  }
}
