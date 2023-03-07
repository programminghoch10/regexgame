
/**
 * static probability maps
 * these list the probability of every structures occurence during generation
 * the entries dont have to add up to 1, they will be normalized before they are used
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
   * @returns cumulatively weighted probabilty map
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
   * Return a random element from a cumulatively weighted probabilty map
   * @param cumulativelyWeightedRandomMap a cumulatively weighted probabilty map
   * @returns key from a random element in the map
   */
  private static retrieveWeightedRandomResultKey<T>(cumulativelyWeightedRandomMap: Map<T, number>): T {
    const random = Math.random();
    // get the first element where the cumulative probabilty is greater than random
    return [...cumulativelyWeightedRandomMap.entries()]
      .filter(value => value[1] > random) //filter every value smaller than random
      .sort((a, b) => a[1] - b[1]) //sort by accending probability
      .reduce((a, b) => a)[0] // get first element (smallest probability) key
  }

  /**
   * Retrieve a random regex structure from a weighted random map
   * @param weightedRandomMap a weighted random map
   * @param allowedRegexStructures a set of allowed regex structures
   * @returns a random regex structure, or undefined if it is contained in the map
   */
  private static retrieveRandomFilteredRegexStructure<T>(
    weightedRandomMap: Map<RegexStructure | undefined, number>,
    allowedRegexStructures: Set<RegexStructure>
  ): RegexStructure | undefined {
    return this.retrieveWeightedRandomResultKey(
      this.convertToCumulativeProbabilities(
        this.neutralizeProbabilities(
          this.filterKeys(weightedRandomMap, allowedRegexStructures)
        )
      )
    )
  }

  static getRegexQuantifier(allowedRegexQuantifiers?: Set<RegexStructure>) {
    if (allowedRegexQuantifiers == undefined)
      allowedRegexQuantifiers = REGEX_QUANTIFIERS
    return this.retrieveRandomFilteredRegexStructure(REGEX_PROBABILITY_QUANTIFIER, allowedRegexQuantifiers)
  }

  static getRegexStructure(allowedRegexStructures?: Set<RegexStructure>) {
    if (allowedRegexStructures == undefined)
      allowedRegexStructures = REGEX_STRUCTURES
    return this.retrieveRandomFilteredRegexStructure(REGEX_PROBABILITY_STRUCTURE, allowedRegexStructures)!
  }
}
