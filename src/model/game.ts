import { quizData } from "./data";

//Classes

export class Game {
  quizList: GameObject[] = [];
  points = 0;
  currentQuiz: Quiz;
  quizIndex: number;

  public constructor() {
    this.quizList = quizData();
    this.quizIndex = 0;
    this.currentQuiz = this.quizList[this.quizIndex];
    console.log(this.currentQuiz);
  }

  public logAnswer(answer: string): boolean {
    if (this.currentQuiz.checkAnswer(answer)) {
      this.nextQuiz();
      this.points++;
      return true;
    } else {
      this.points = 0;
      return false;
    }
  }

  private nextQuiz(): void {
    this.quizIndex++;
    if (this.quizList[this.quizIndex] != null) {
      this.currentQuiz = this.quizList[this.quizIndex];
    } else {
      this.currentQuiz = new Quiz(
        new RegExp("keine weitern Spiele"),
        "ok",
        "schade",
        "hmm"
      );
    }
  }
}

interface GameObject {
  regEx: RegExp;
  answers: string[];
  checkAnswer(answer: string): boolean;
}

export class Quiz implements GameObject {
  regEx: RegExp;
  answers: string[] = [];

  public constructor(
    regEx: RegExp,
    correct: string,
    incorrect1: string,
    incorrect2: string
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
    const position: number = Math.floor(Math.random() * 3 + 1);

    switch (position) {
      case 1:
        this.answers = [correct, incorrect1, incorrect2];
        break;
      case 2:
        this.answers = [incorrect1, correct, incorrect2];
        break;
      case 3:
        this.answers = [incorrect2, incorrect1, correct];
        break;
      default:
        this.answers = ["incorrect1", "correct", "incorrect2"];
        break;
    }
  }

  public checkAnswer(answer: string): boolean {
    if (isMatching(answer, this.regEx)) {
      return true;
    }
    return false;
  }
}

// methods

// The RegEp is not allowed to use the flag g
export function isMatching(text: string, regExp: RegExp): boolean {
  const match: RegExpMatchArray = text.match(regExp) || [];

  for (let index = 0; index < match.length; index++) {
    if (match[index] != undefined && match[index].length === text.length) {
      return true;
    }
  }
  return false;
}
