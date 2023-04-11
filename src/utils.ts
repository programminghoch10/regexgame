
function getRandomElementFromArray<T>(array: Array<T>): T {
  if (array.length == 0) throw "array is empty"
  return array[getRandomInteger(array.length - 1)]
}

// return a random integer between and including zero and maximum
function getRandomInteger(maximum: number) {
  maximum = Math.round(maximum)
  if (maximum < 0) throw "invalid maximum number"
  return Math.round(getRandomNumber() * maximum)
}

/** Get a random integer between and including minimum and maximum */
function getRandomIntegerInRange(minimum: number, maximum: number) {
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
    const j = Math.floor(getRandomNumber() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

function removeDuplicatesFromArray<T>(array: Array<T>): Array<T> {
  return array.filter((value, index, array) => array.indexOf(value) == index)
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
  return getRandomNumber() < probability
}

/**
 * get a random number between 0 (inclusive) and 1 (exclusive)
 */
function getRandomNumber(): number {
  if (window.crypto) {
    let randomInt = window.crypto.getRandomValues(new Uint32Array([0]))[0]
    return randomInt / Math.pow(2, 32)
  } else {
    return Math.random()
  }
}
