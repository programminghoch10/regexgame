class RegexNumeric extends RegexQuantifierBase {
  absoluteMinimum?: number
  absoluteMaximum?: number
  absolute?: number
  get quantifierSymbol(): string {
    if (this.absolute != undefined)
      return "{" + this.absolute + "}"
    if (this.absoluteMaximum == undefined)
      return "{" + this.absoluteMinimum + ",}"
    return "{" + this.absoluteMinimum! + "," + this.absoluteMaximum! + "}"
  }
  constructor() {
    super()
    if (chance(0.5)) {
      this.absolute = getRandomIntegerFromRange(0, 9)
    } else {
      this.absoluteMinimum = getRandomIntegerFromRange(0, 9)
      if (chance(0.5)) {
        this.absoluteMaximum = getRandomIntegerFromRange(this.absoluteMinimum, 9)
      }
    }
  }
  generatePossibleQuantification(lengthFactor: number): number {
    if (this.absolute != undefined)
      return this.absolute
    if (lengthFactor < this.absoluteMinimum!)
      lengthFactor = this.absoluteMinimum!
    if (this.absoluteMaximum == undefined)
      return getRandomIntegerFromRange(this.absoluteMinimum!, lengthFactor)
    return getRandomIntegerFromRange(this.absoluteMinimum!, this.absoluteMaximum!)
  }
}
