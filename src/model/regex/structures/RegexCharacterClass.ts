class RegexCharacterClass extends RegexPartBase {
  chars: Set<string>
  constructor(charSet: Set<string>) {
    super(charSet)
    let amount = getRandomIntegerInRange(1, charSet.size)
    this.chars = new Set()
    for (let i = 0; i < amount; i++) {
      this.chars.add(RegexGenerator.getRandomCharFromCharSet(this.charSet))
    }
  }
  generate(): string {
    if (this.chars.size == 1 && chance(0.99))
      return [...this.chars][0]
    return "[" + [...this.chars].join("") + "]"
  }
  generateCorrectAnswer(): string {
    return getRandomElementFromArray([...this.chars])
  }
  generatePossiblyWrongAnswer(lengthFactor: number, wrongChance: number): string {
    if (chance(1 - wrongChance))
      return this.generateCorrectAnswer()
    if (chance(0.05))
      return [...this.chars].join("")
    const wrongChars = [...this.charSet].filter(char => !this.chars.has(char))
    if (wrongChars.length == 0)
      return this.generateCorrectAnswer()
    return getRandomElementFromArray(wrongChars)
  }
}
