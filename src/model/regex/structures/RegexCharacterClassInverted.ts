class RegexCharacterClassInverted extends RegexCharacterClass {
  constructor(charSet: string) {
    super(charSet)
    if (charSet.length == this.chars.size)
      this.chars.delete(getRandomElementFromArray(charSet.split("")))
  }
  generate(): string {
    return "[^" + [...this.chars].join("") + "]"
  }
  generateCorrectAnswer(): string {
    const possibleCharacters = this.charSet.split("").filter(char => !this.chars.has(char))
    return getRandomElementFromArray(possibleCharacters)
  }
}
