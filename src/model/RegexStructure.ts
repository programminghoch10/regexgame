/**
 * The same Enum as defined in the backend.
 * Please consult the backend for documentation of the fields.
 */
enum RegexStructure {
  CHARACTER_CLASS,
  CHARACTER_CLASS_RANGE,
  NEGATED_CHARACTER_CLASS,
  SINGLE_CHARACTER_MATCH,

}

function getRegexStructureFromString(string: string): RegexStructure {
  if (!Object.values(RegexStructure).includes(string)) throw "this regex structure doesnt exist"
  return Object.entries(RegexStructure).find(entry => entry[0] === string)![1] as RegexStructure
}
