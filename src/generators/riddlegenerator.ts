
/**
 * Default configuration for offline gameplay,
 * if no game configuration id has been provided in the search query
 */
const defaultConfiguration: GameConfiguration = new GameConfiguration("", new Set<RegexStructure>(
  [RegexStructure.CHARACTER_CLASS, RegexStructure.CHARACTER_CLASS_RANGE])
)

/**
 * Generates a new riddle according to the game configuration
 * @param configuration The game configuration specifying the riddle
 * @returns the generated riddle
 */
function generateRiddle(configuration?: GameConfiguration): Riddle {
  if (configuration === undefined) configuration = defaultConfiguration
  // TODO: replace stub with actual generation
  let regex = generateRegex(configuration.allowedRegexStructures, configuration.complexity)
  let answers = generateRegexAnswers(regex, configuration.answerCount)
  return new Riddle(regex, answers)
}
