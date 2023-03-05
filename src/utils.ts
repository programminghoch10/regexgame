
function getRandomElementFromArray(array: Array<any>): any {
  if (array.length == 0) throw "array is empty"
  return array[getRandomInteger(array.length)]
}

function getRandomInteger(maximum: number) {
  maximum = Math.round(maximum)
  if (maximum < 0) throw "invalid maximum number"
  return Math.floor(Math.random() * maximum)
}

function getRandomIntegerFromRange(minimum: number, maximum: number) {
  minimum = Math.round(minimum)
  maximum = Math.round(maximum)
  if (minimum > maximum) throw "invalid range"
  return minimum + getRandomInteger(maximum - minimum)
}

function shuffleArray(array: Array<any>): any {
  let newArray = new Array(...array)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [array[j], array[i]];
  }
  return newArray
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.max(minimum, Math.min(maximum, value))
}
