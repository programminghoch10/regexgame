class GameConfiguration {
  id: string

  allowedRegexStructures: Set<RegexStructure>

  complexity: number = 5

  increaseComplexity: boolean = true

  answerCount: number = 3

  constructor(id: string, allowedRegexStructures: Set<RegexStructure>) {
    this.id = id
    this.allowedRegexStructures = allowedRegexStructures
  }

  static fromJSON(json: string): GameConfiguration {
    const parsedJSON = JSON.parse(json)
    if (!parsedJSON.id) throw "missing id"
    if (!parsedJSON.allowedRegexStructures) throw "missing allowed regex structures"
    if (!(parsedJSON.allowedRegexStructures instanceof Array)) throw "regex structures invalid. Expected array but got " + parsedJSON.allowedRegexStructures
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
