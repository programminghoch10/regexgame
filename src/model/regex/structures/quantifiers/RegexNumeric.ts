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
    if (chance(0.75)) {
      this.absolute = getRandomIntegerFromRange(0, 9)
    } else {
      this.absoluteMinimum = getRandomIntegerFromRange(0, 9)
      if (chance(0.75)) {
        this.absoluteMaximum = getRandomIntegerFromRange(this.absoluteMinimum, 9)
      }
      if (this.absoluteMinimum === this.absoluteMaximum && chance(0.95)) {
        this.absolute = this.absoluteMinimum
        this.absoluteMinimum = this.absoluteMaximum = undefined
      }
    }
  }
  generateCorrectQuantification(lengthFactor: number): number {
    if (this.absolute != undefined)
      return this.absolute
    if (lengthFactor < this.absoluteMinimum!)
      lengthFactor = this.absoluteMinimum!
    if (this.absoluteMaximum == undefined)
      return getRandomIntegerFromRange(this.absoluteMinimum!, lengthFactor)
    return getRandomIntegerFromRange(this.absoluteMinimum!, this.absoluteMaximum!)
  }
  generateWrongQuantification(lengthFactor: number): number {
    if (this.absolute != undefined)
      return this.absolute + getRandomIntegerFromRange(Math.max(-lengthFactor, 0), lengthFactor)
    if (this.absoluteMaximum == undefined)
      return getRandomIntegerFromRange(Math.max(0, this.absoluteMinimum! - lengthFactor), this.absoluteMinimum!)
    if (chance(0.5))
      return getRandomIntegerFromRange(Math.max(0, this.absoluteMinimum! - lengthFactor), this.absoluteMinimum!)
    else
      return getRandomIntegerFromRange(this.absoluteMaximum, this.absoluteMaximum + lengthFactor)
  }
}
