
/**
 * Default configuration for offline gameplay,
 * if no game configuration id has been provided in the search query
 */
const defaultConfiguration: GameConfiguration = new GameConfiguration("", new Set<RegexStructure>([
  RegexStructure.SINGLE_CHARACTER,
  RegexStructure.CHARACTER_SEQUENCE,
  RegexStructure.GROUP,
  RegexStructure.OPTIONAL_QUANTIFIER,
  RegexStructure.ANY_AMOUNT_QUANTIFIER,
  RegexStructure.AT_LEAST_ONE_QUANTIFIER,
  RegexStructure.ANY_SINGLE_CHARACTER,
  RegexStructure.CHARACTER_CLASS,
  RegexStructure.CHARACTER_CLASS_INVERTED,
  RegexStructure.DISJUNCTION,
  RegexStructure.ABSOLUTE_NUMERIC_QUANTIFIER,
]))

/**
 * Generates a new riddle according to the game configuration
 * @param configuration The game configuration specifying the riddle
 * @returns the generated riddle
 */
function generateRiddle(round?: number, configuration?: GameConfiguration): Riddle {
  if (configuration === undefined) configuration = defaultConfiguration
  let complexity = configuration.complexity
  if (round != undefined) complexity += RegexComplexity.calculateRoundComplexityFactor(round)
  let regex = RegexGenerator.generateRegex(configuration.allowedRegexStructures, complexity)
  let answers = generateRegexAnswers(regex, configuration.answerCount)
  return new Riddle(regex.generateRegExp(), answers)
}
