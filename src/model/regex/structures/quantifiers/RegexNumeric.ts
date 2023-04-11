
// the maximum value an numeric quantifier may have
const ABSOLUTE_MAXIMUM = 9

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
      this.absolute = getRandomIntegerInRange(0, ABSOLUTE_MAXIMUM)
    } else {
      this.absoluteMinimum = getRandomIntegerInRange(0, ABSOLUTE_MAXIMUM)
      if (chance(0.75)) {
        this.absoluteMaximum = getRandomIntegerInRange(this.absoluteMinimum, ABSOLUTE_MAXIMUM)
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
    lengthFactor = Math.max(lengthFactor, this.absoluteMinimum!)
    if (this.absoluteMaximum == undefined)
      return getRandomIntegerInRange(this.absoluteMinimum!, lengthFactor)
    return getRandomIntegerInRange(this.absoluteMinimum!, this.absoluteMaximum!)
  }
  generateWrongQuantification(lengthFactor: number): number {
    if (this.absolute != undefined)
      return Math.max(0, this.absolute + (chance(0.5) ? 1 : -1) * getRandomIntegerInRange(0, lengthFactor))
    if (this.absoluteMaximum == undefined)
      return getRandomIntegerInRange(Math.max(0, this.absoluteMinimum! - lengthFactor), this.absoluteMinimum!)
    if (chance(0.5))
      return getRandomIntegerInRange(Math.max(0, this.absoluteMinimum! - lengthFactor), this.absoluteMinimum!)
    else
      return getRandomIntegerInRange(this.absoluteMaximum, this.absoluteMaximum + lengthFactor)
  }
}
