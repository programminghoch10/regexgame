import { quizData } from "./data";

//Classes

export class Game {
  quizList: Quiz[] = [];
  points: number = 0;
  currentQuiz: Quiz;
  quizIndex : number;

  public constructor() {
    this.quizList = quizData();
    this.quizIndex = 0;
    this.currentQuiz = this.quizList[this.quizIndex];
    console.log(this.currentQuiz);
    
  }


  public logAnswer(answer : String) : boolean{
    if (this.currentQuiz.checkAnswer(answer)) {
      this.nextQuiz();
      this.points ++;
      return true;
    }else{
      this.points = 0;
      return false;
    }
  }

  private nextQuiz() :void {
    this.quizIndex ++;
    if (this.quizList[this.quizIndex] != null) {
      this.currentQuiz = this.quizList[this.quizIndex];
    }else{
      this.currentQuiz = new Quiz(new RegExp("keine weitern Spiele"),"ok","schade","hmm");
    }
  }

}

export class Quiz {
  regEx: RegExp;
  answers: String[] = [];

  public constructor(
    regEx: RegExp,
    correct: String,
    incorrect1: String,
    incorrect2: String
  ) {
    this.regEx = regEx;
    //Checks if the quiz is valid
    if (
      !isMatching(correct, regEx) ||
      isMatching(incorrect1, regEx) ||
      isMatching(incorrect2, regEx)
    ) {
      console.log("The created quiz is incorrect");
    }
    // Arranges the 3 possible answers in a random order.
    let position: number = Math.floor(Math.random() * 3 + 1);

    switch (position) {
      case 0:
        this.answers = [correct, incorrect1, incorrect2];
        break;
      case 1:
        this.answers = [incorrect1, correct, incorrect2];
        break;
      case 2:
        this.answers = [incorrect2, incorrect1, correct];
        break;
      default:
        this.answers = [incorrect1, correct, incorrect2];
        break;
    }
  }

  public checkAnswer(answer: String): Boolean {
    if (isMatching(answer, this.regEx)) {
      return true;
    }
    return false;
  }
}

// methods

// The RegEp is not allowed to use the flag g
export function isMatching(text: String, regExp: RegExp): Boolean {
  let match: RegExpMatchArray = text.match(regExp) || [];

  for (let index = 0; index < match.length; index++) {
    if (match[index] != undefined && match[index].length === text.length) {
      return true;
    }
  }
  return false;
}
