class GameConfiguration {
  id: string

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

  constructor(id: string, allowedRegexStructures: Set<RegexStructure>) {
    this.id = id
    this.allowedRegexStructures = allowedRegexStructures
  }

  static fromJSON(json: string): GameConfiguration {
    const parsedJSON = JSON.parse(json)
    if (!parsedJSON.id) throw new Error("missing id")
    if (!parsedJSON.allowedRegexStructures) throw new Error("missing allowed regex structures")
    if (!(parsedJSON.allowedRegexStructures instanceof Array)) throw new Error("regex structures invalid. Expected array but got " + parsedJSON.allowedRegexStructures)
    let allowedRegexStructures = new Set<RegexStructure>();
    (parsedJSON.allowedRegexStructures as Array<string>).forEach(regexStructureString => {
      allowedRegexStructures.add(getRegexStructureFromString(regexStructureString))
    })
    let gameconfiguration: GameConfiguration = new GameConfiguration(parsedJSON.id, allowedRegexStructures)
    if (parsedJSON.complexity) gameconfiguration.complexity = parsedJSON.complexity
    if (parsedJSON.increaseComplexity) gameconfiguration.increaseComplexity = parsedJSON.increaseComplexity
    if (parsedJSON.answerCount) gameconfiguration.answerCount = parsedJSON.answerCount
    return gameconfiguration
  }
}
