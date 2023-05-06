const apiPath: string = "api/v1/"

async function fetchGameConfigration(id: string): Promise<GameConfiguration> {
  let fetchResponse = await fetch(apiPath + "configurations/" + id)
  if (fetchResponse.status != 200) throw fetchResponse.status
  let json = await fetchResponse.text()
  return GameConfiguration.fromJSON(json)
}

async function saveGameResult(id: string, score: number, completedRounds: number) {
  let formData = new FormData()
  formData.set("configurationId", id)
  formData.set("score", score.toFixed(0))
  formData.set("completedRounds", completedRounds.toFixed(0))
  formData.set("userId", "") //will be replaced with actual userId in the backend
  let fetchResponse = await fetch(apiPath + "results", {
    method: "post",
    body: formData
  })
  if (fetchResponse.status != 200) throw fetchResponse.status
  return await fetchResponse.text()
}

let gameConfigurationBySearchQuery: GameConfiguration | undefined
async function getGameConfigurationBySearchQuery(): Promise<GameConfiguration> {
  if (gameConfigurationBySearchQuery) return gameConfigurationBySearchQuery
  let id = new URLSearchParams(document.location.search).get("id")
  if (!id) throw new Error("no id specified")
  gameConfigurationBySearchQuery = await fetchGameConfigration(id)
  return gameConfigurationBySearchQuery
}
