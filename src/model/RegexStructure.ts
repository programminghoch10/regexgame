/**
 * The same Enum as defined in the backend.
 * Please consult the backend for documentation of the fields.
 */
enum RegexStructure {
  SINGLE_CHARACTER,
  CHARACTER_SEQUENCE,
  ANY_SINGLE_CHARACTER,
  GROUP,
  CHARACTER_CLASS,
  DISJUNCTION,
  ANY_AMOUNT_QUANTIFIER,
  AT_LEAST_ONE_QUANTIFIER,
  OPTIONAL_QUANTIFIER,
}

// defines which of the structures are quantifiers
const REGEX_QUANTIFIERS: Set<RegexStructure> = new Set([
  RegexStructure.OPTIONAL_QUANTIFIER,
  RegexStructure.AT_LEAST_ONE_QUANTIFIER,
  RegexStructure.ANY_AMOUNT_QUANTIFIER,
])

/**
 * Convert a string into the RegexStructure equivalent
 *
 * E.g. `CHARACTER_CLASS` will map to `0`
 *
 * @param string any regex structure as a string
 * @returns the according RegexStructure enum
 */
function getRegexStructureFromString(string: string): RegexStructure {
  if (!Object.values(RegexStructure).includes(string)) throw "this regex structure doesnt exist"
  return Object.entries(RegexStructure).find(entry => entry[0] === string)![1] as RegexStructure
}

function getRegexStructureString(regexStructure: RegexStructure): string {
  return Object.entries(RegexStructure).find(entry => entry[1] === regexStructure)![0]
}
