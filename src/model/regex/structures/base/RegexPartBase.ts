/**
 * The abstract definition of a RegexPart
 */
abstract class RegexPartBase {
  regexStructure?: RegexStructure

  charSet: Set<string>

  constructor(charSet: Set<string>) {
    this.charSet = charSet
  }

  /**
   * generate this regex structure to a regex
   */
  abstract generate(): string

  /**
   * generate a possible answer that would solve this regex
   */
  abstract generateCorrectAnswer(lengthFactor: number): string

  /**
   * Generate an answer that is likely to be wrong
   * returns a correct answer or by chance an answer that may be wrong
   * @param wrongChance probability for the answer to be tainted
   */
  abstract generatePossiblyWrongAnswer(lengthFactor: number, wrongChance: number): string
}
