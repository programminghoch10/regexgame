/**
 * The abstract definition of a RegexPart
 */
abstract class RegexPartBase {
  regexStructure?: RegexStructure

  charSet: string

  constructor(charSet: string) {
    this.charSet = charSet
  }

  /**
   * generate this regex structure to a regex
   */
  abstract generate(): string

  /**
   * generate a possible answer that would solve this regex
   */
  abstract generatePossibleAnswer(lengthFactor?: number): string
}
