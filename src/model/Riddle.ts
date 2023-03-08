
class Riddle {
  regex: Regex
  answers: Array<string>

  // whether this riddle is solved correctly if the regex matched
  solvedOnMatch: boolean = true

  constructor(regex: Regex, answers: Array<string>) {
    this.regex = regex
    this.answers = answers
  }
}
