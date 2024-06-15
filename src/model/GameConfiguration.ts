class GameConfiguration {

  allowedRegexStructures: Set<RegexStructure>

  complexity: number = 5

  increaseComplexity: boolean = true

  minimumCompletedRounds: number = 0

  /**
   * how many seconds the user has to solve a given riddle
   * the timeout will accumulate over the riddles,
   * so the remaining time will be carried over to the next riddle
   */
  riddleTimeoutSeconds: number = 10

  answerCount: number = 3

  constructor(allowedRegexStructures: Set<RegexStructure>) {
    this.allowedRegexStructures = allowedRegexStructures
  }

  static fromJSON(json: string): GameConfiguration {
    const parsedJSON = JSON.parse(json)
    if (!parsedJSON.allowedRegexStructures) throw new Error("missing allowed regex structures")
    if (!(parsedJSON.allowedRegexStructures instanceof Array)) throw new Error("regex structures invalid. Expected array but got " + parsedJSON.allowedRegexStructures)
    let allowedRegexStructures = new Set<RegexStructure>();
    (parsedJSON.allowedRegexStructures as Array<string>).forEach(regexStructureString => {
      allowedRegexStructures.add(getRegexStructureFromString(regexStructureString))
    })
    let gameconfiguration: GameConfiguration = new GameConfiguration(allowedRegexStructures)
    if (parsedJSON.complexity) gameconfiguration.complexity = parseInt(parsedJSON.complexity)
    if (parsedJSON.increaseComplexity) gameconfiguration.increaseComplexity = parsedJSON.increaseComplexity === true
    if (parsedJSON.answerCount) gameconfiguration.answerCount = parseInt(parsedJSON.answerCount)
    if (parsedJSON.riddleTimeoutSeconds) gameconfiguration.riddleTimeoutSeconds = parseInt(parsedJSON.riddleTimeoutSeconds)
    if (parsedJSON.minimumCompletedRounds) gameconfiguration.minimumCompletedRounds = parseInt(parsedJSON.minimumCompletedRounds)
    return gameconfiguration
  }

  toJSON(): string {
    let sanitized = new Object() as any
    sanitized.allowedRegexStructures = Array.from(this.allowedRegexStructures.values()).map(regexStructure => getRegexStructureString(regexStructure))
    sanitized.answerCount = this.answerCount
    sanitized.complexity = this.complexity
    sanitized.increaseComplexity = this.increaseComplexity
    sanitized.minimumCompletedRounds = this.minimumCompletedRounds
    sanitized.riddleTimeoutSeconds = this.riddleTimeoutSeconds
    return JSON.stringify(sanitized)
  }

  clone(): GameConfiguration {
    let clonedConfiguration = new GameConfiguration(this.allowedRegexStructures)
    clonedConfiguration.allowedRegexStructures = this.allowedRegexStructures
    clonedConfiguration.answerCount = this.answerCount
    clonedConfiguration.complexity = this.complexity
    clonedConfiguration.increaseComplexity = this.increaseComplexity
    clonedConfiguration.minimumCompletedRounds = this.minimumCompletedRounds
    clonedConfiguration.riddleTimeoutSeconds = this.riddleTimeoutSeconds
    return clonedConfiguration
  }
}
