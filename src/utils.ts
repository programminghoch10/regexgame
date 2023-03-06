
function getRandomElementFromArray<T>(array: Array<T>): T {
  if (array.length == 0) throw "array is empty"
  return array[getRandomInteger(array.length - 1)]
}

// return a random integer between and including zero and maximum
function getRandomInteger(maximum: number) {
  maximum = Math.round(maximum)
  if (maximum < 0) throw "invalid maximum number"
  return Math.round(Math.random() * maximum)
}

// return a random integer between and including minimum and maximum
function getRandomIntegerFromRange(minimum: number, maximum: number) {
  if (isNaN(minimum) || isNaN(maximum)) throw "invalid range"
  minimum = Math.round(minimum)
  maximum = Math.round(maximum)
  if (minimum > maximum) throw "invalid range"
  if (minimum == maximum) return minimum
  return minimum + getRandomInteger(maximum - minimum)
}

function shuffleArray<T>(array: Array<T>): Array<T> {
  let newArray = new Array(...array)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [array[j], array[i]];
  }
  return newArray
}

function removeDuplicatesFromArray<T>(array: Array<T>): Array<T> {
  return array.filter((value, index) => array.indexOf(value) == index)
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.max(minimum, Math.min(maximum, value))
}

/**
 * Return a boolean which has a certian probability of being true
 * @param probability how probable true should be
 */
function chance(probability: number): boolean {
  if (probability > 1 || probability < 0) throw "invalid chance range"
  return Math.random() < probability
}
