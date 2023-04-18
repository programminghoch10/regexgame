const apiPath: string = "api/v1/"

async function fetchGameConfigration(id: string): Promise<GameConfiguration> {
  let fetchResponse = await fetch(apiPath + "configurations/" + id)
  if (fetchResponse.status != 200) throw fetchResponse.status
  let json = await fetchResponse.text()
  return GameConfiguration.fromJSON(json)
}

let gameConfigurationBySearchQuery: GameConfiguration | undefined
async function getGameConfigurationBySearchQuery(): Promise<GameConfiguration> {
  if (gameConfigurationBySearchQuery) return gameConfigurationBySearchQuery
  let id = new URLSearchParams(document.location.search).get("id")
  if (!id) throw new Error("no id specified")
  gameConfigurationBySearchQuery = await fetchGameConfigration(id)
  return gameConfigurationBySearchQuery
}
