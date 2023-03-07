
/**
 * static probability maps
 * these list the probability of every structures occurence during generation
 * the entries dont have to add up to 1, they will be normalized before they are used
 * this only defines relative probabilities to each other, so 2 will be double as likely as 1
 */

const REGEX_PROBABILITY_QUANTIFIER = new Map<RegexStructure | undefined, number>([
  [undefined, 0.2],
  [RegexStructure.OPTIONAL_QUANTIFIER, 0.4],
  [RegexStructure.ANY_AMOUNT_QUANTIFIER, 0.4],
  [RegexStructure.AT_LEAST_ONE_QUANTIFIER, 0.4],
  [RegexStructure.ABSOLUTE_NUMERIC_QUANTIFIER, 0.2],
])

const REGEX_PROBABILITY_STRUCTURE = new Map<RegexStructure, number>([
  [RegexStructure.SINGLE_CHARACTER, 0],
  [RegexStructure.CHARACTER_SEQUENCE, 2],
  [RegexStructure.ANY_SINGLE_CHARACTER, 0.8],
  [RegexStructure.GROUP, 0.5],
  [RegexStructure.CHARACTER_CLASS, 0.4],
  [RegexStructure.DISJUNCTION, 0.3],
  [RegexStructure.CHARACTER_CLASS_INVERTED, 0.1],
])


/**
 * static complexity multiplier maps
 * every value here will be multiplied with the complexity factor and with the probability from above
 * a value of 1 will leave the probability of this structure unchanged from complexity
 * values < 1 will make the probability decrease with increasing complexity
 * values > 1 will make the probability increase with increasing complexity
 */

const REGEX_COMPLEXITY_QUANTIFIER = new Map<RegexStructure | undefined, number>([
  [undefined, 0.9],
  [RegexStructure.OPTIONAL_QUANTIFIER, 1],
  [RegexStructure.ANY_AMOUNT_QUANTIFIER, 1],
  [RegexStructure.AT_LEAST_ONE_QUANTIFIER, 1],
  [RegexStructure.ABSOLUTE_NUMERIC_QUANTIFIER, 1.1],
])

const REGEX_COMPLEXITY_STRUCTURE = new Map<RegexStructure, number>([
  [RegexStructure.SINGLE_CHARACTER, 0.5],
  [RegexStructure.CHARACTER_SEQUENCE, 0.9],
  [RegexStructure.ANY_SINGLE_CHARACTER, 1.1],
  [RegexStructure.GROUP, 1.1],
  [RegexStructure.CHARACTER_CLASS, 1],
  [RegexStructure.DISJUNCTION, 1.1],
  [RegexStructure.CHARACTER_CLASS_INVERTED, 1.05],
])


class RegexComplexity {

  /**
   * This neutralizes a map with uneven probabilities.
   * For example, it would convert two 0.7 probabilites to 0.5 each.
   * During this process the ratios are kept in tact,
   * so 0.4 and 0.8 are converted to 0.33 and 0.66 accordingly.
   * @param weightedRandomMap an unevenly weighted probablity map
   * @returns a correctly weighted probability map
   */
  private static neutralizeProbabilities<T>(weightedRandomMap: Map<T, number>): Map<T, number> {
    const probabilitySum = [...weightedRandomMap.values()].reduce((a, b) => a + b)
    if (probabilitySum == 0) {
      // if the sum is 0 we have to reset all contained probabilites to 1 in order for the calculation to work
      return this.neutralizeProbabilities(new Map(
        [...weightedRandomMap.entries()].map(entry => { entry[1] = 1; return entry })
      ))
    }
    const neutralizeFactor = 1 / probabilitySum
    const result = new Map(weightedRandomMap)
    weightedRandomMap.forEach((value, key) => {
      result.set(key, value * neutralizeFactor)
    })
    return result
  }

  /**
   * This converts a weighted probability map into cumulative probabilites
   * @param weightedRandomMap correctly weighted probability map
   * @returns cumulatively weighted probability map
   */
  private static convertToCumulativeProbabilities<T>(weightedRandomMap: Map<T, number>): Map<T, number> {
    const result = new Map(weightedRandomMap);
    [...weightedRandomMap.entries()].map((value, index, array) => {
      // calculate cumulative probabilites
      const previousProbability = index == 0 ? 0 : array[index - 1][1]
      value[1] = value[1] + previousProbability
      return value
    }).forEach(entry => result.set(entry[0], entry[1]))
    return result
  }

  /**
   * Filter all keys not included in allowedKeys from weightedRandomMap
   * It always keeps undefined if contained within the weighted random map.
   * @param weightedRandomMap a weighted random map
   * @param allowedKeys set of allowed keys
   * @returns the filtered unevenly weighted random map
   */
  private static filterKeys<T>(
    weightedRandomMap: Map<T | undefined, number>,
    allowedKeys: Set<T>
  ): Map<T | undefined, number> {
    const result = new Map(weightedRandomMap);
    [...weightedRandomMap.keys()]
      .filter(key => key == undefined ? false : !allowedKeys.has(key))
      .forEach(key => result.delete(key))
    return result
  }

  /**
   * Return a random element from a weighted probability map
   * @param weightedRandomMap a weighted probability map
   * @returns key from a random element in the map
   */
  private static retrieveWeightedRandomResultKey<T>(weightedRandomMap: Map<T, number>): T {
    const neutralizedRandomMap = this.neutralizeProbabilities(weightedRandomMap)
    const cumulativeRandomMap = this.convertToCumulativeProbabilities(neutralizedRandomMap)
    const random = Math.random();
    // get the first element where the cumulative probability is greater than random
    return [...cumulativeRandomMap.entries()]
      .filter(value => value[1] > random) //filter every value smaller than random
      .sort((a, b) => a[1] - b[1]) //sort by accending probability
      .reduce((a, b) => a)[0] // get first element (smallest probability) key
  }

  /**
   * Retrieve a random regex structure from a weighted random map
   * @param weightedRandomMap a weighted random map
   * @param allowedRegexStructures a set of allowed regex structures
   * @param complexityMap a map of complexity transformations
   * @param complexity the complexity factor
   * @returns a random regex structure, or undefined if it is contained in the map
   */
  private static retrieveRandomFilteredRegexStructure(
    weightedRandomMap: Map<RegexStructure | undefined, number>,
    allowedRegexStructures: Set<RegexStructure>,
    complexityMap?: Map<RegexStructure | undefined, number>,
    complexity?: number
  ): RegexStructure | undefined {
    return this.retrieveWeightedRandomResultKey(
      this.applyComplexityFactor(
        this.filterKeys(weightedRandomMap, allowedRegexStructures),
        complexityMap ?? new Map<RegexStructure | undefined, number>(),
        complexity ?? 0
      )
    )
  }

  /**
   * Calculate a complexity factor to be multiplied with a probability
   * @param complexityMapValue a complexity factor from a complexity map
   * @param complexity the complexity factor
   * @returns a factor to be multiplied with the original probability
   */
  private static calulateComplexityFactorForComplexityMap(complexityMapValue: number, complexity: number): number {
    if (complexity < 0) throw "invalid complexity " + complexity
    if (complexity == 0) return 1
    // normalize the complexity using log to dampen its effect
    const normalizedComplexity = Math.log(complexity * 0.5) * 0.5
    if (normalizedComplexity < 0) return 0
    // the nearer normalizedComplexity is to zero, the more complexityMapValue is to 1
    // this will make the complexityMapValue more effective the higher the complexity is
    const normalizedComplexityMapValue = ((complexityMapValue - 1) * normalizedComplexity) + 1
    return normalizedComplexityMapValue
  }

  /**
   * Apply a complexity to a weighted random map
   * @param weightedRandomMap a weighted random map
   * @param complexityMap a complexity map with complexity factors
   * @param complexity the complexity
   * @returns an unevenly weighted random map
   */
  private static applyComplexityFactor<T>(weightedRandomMap: Map<T, number>, complexityMap: Map<T, number>, complexity: number): Map<T, number> {
    if (complexity == 0)
      return weightedRandomMap
    const result = new Map(weightedRandomMap)
    weightedRandomMap.forEach((value, key) => {
      let complexityMapFactor = complexityMap.get(key) ?? 1
      result.set(key, value * this.calulateComplexityFactorForComplexityMap(complexityMapFactor, complexity))
    })
    return result
  }

  static getRegexQuantifier(allowedRegexQuantifiers?: Set<RegexStructure>, complexity?: number): RegexStructure | undefined {
    if (allowedRegexQuantifiers == undefined)
      allowedRegexQuantifiers = REGEX_QUANTIFIERS
    return this.retrieveRandomFilteredRegexStructure(
      REGEX_PROBABILITY_QUANTIFIER,
      allowedRegexQuantifiers,
      REGEX_COMPLEXITY_QUANTIFIER,
      complexity
    )
  }

  static getRegexStructure(allowedRegexStructures?: Set<RegexStructure>, complexity?: number): RegexStructure {
    if (allowedRegexStructures == undefined)
      allowedRegexStructures = REGEX_STRUCTURES
    return this.retrieveRandomFilteredRegexStructure(
      REGEX_PROBABILITY_STRUCTURE,
      allowedRegexStructures,
      REGEX_COMPLEXITY_STRUCTURE,
      complexity
    )!
  }

  /**
   * calculate the complexity factor for this round
   * @param round which round this is
   * @returns the complexity for this round
   */
  static calculateNextComplexityFactor(round: number) {
    // linearly increase the complexity by 50% per round
    return round * 1.5
  }

  // calculate complexity for a certain nesting level
  static calculateNestedComplexity(complexity: number, nestingLevel: number) {
    // decrease the complexity by one for every nesting level
    return Math.max(complexity - nestingLevel, 0)
  }

  static calculateLengthFromComplexity(complexity: number): number {
    if (complexity == 0) return 1
    return Math.round(Math.log(Math.pow(complexity, 2)) + 1)
  }
}
