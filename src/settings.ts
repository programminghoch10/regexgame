
let savedConfiguration: GameConfiguration | undefined

async function switchToSettings() {
  await gameBoxHeightTransitionBegin()
  setHidden(startPageContainer, true)
  setHidden(gameContainer, true)
  setHidden(settingsContainer, false)
  loadSettings()
  await gameBoxHeightTransitionEnd()
}

function loadSettings() {
  if (localStorage.getItem("gameConfiguration"))
    savedConfiguration = GameConfiguration.fromJSON(localStorage.getItem("gameConfiguration")!)
  document.querySelectorAll("#settings > table tr").forEach(entry => {
    if (entry.getAttribute("id")!.split("-")[0] !== "settings") return
    const id = entry.getAttribute("id")!.split("-")[1];
    (entry.children[1] as HTMLTableCellElement).innerText = ((savedConfiguration ?? defaultConfiguration) as any)[id]
  })
}

function modifySetting(element: HTMLTableRowElement) {
  const nameElement = element.children[0] as HTMLTableCellElement
  const valueElement = element.children[1] as HTMLTableCellElement
  let result = prompt("Change value of " + nameElement.innerText, valueElement.innerText)
  if (result === "" || result === null) return
  valueElement.innerText = result
}

function saveSettings() {
  let configuration = defaultConfiguration.clone()
  document.querySelectorAll("#settings > table tr").forEach(entry => {
    if (entry.getAttribute("id")!.split("-")[0] !== "settings") return
    const id = entry.getAttribute("id")!.split("-")[1];
    (configuration as any)[id] = (entry.children[1] as HTMLTableCellElement).innerText
  })
  localStorage.setItem("gameConfiguration", configuration.toJSON())
  switchToStartPage()
  loadSettings()
}

function resetSettings() {
  localStorage.removeItem("gameConfiguration")
  localStorage.removeItem("noglow")
  document.body.classList.add("glow")
  switchToStartPage()
  loadSettings()
}

function changeGlow() {
  let glowEnabled = !document.body.classList.contains("glow")
  if (glowEnabled) {
    document.body.classList.add("glow")
    localStorage.removeItem("noglow")
  } else {
    document.body.classList.remove("glow")
    localStorage.setItem("noglow", "true")
  }
}
if (localStorage.getItem("noglow"))
  document.body.classList.remove("glow")
