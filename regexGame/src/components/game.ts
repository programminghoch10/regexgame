//Classes

export class Game {
  quizzes: Quiz[] = [];
  points: number = 0;

  public constructor(quizzes: Quiz[]) {
    this.quizzes = quizzes;
  }

  public pointsUp(): void {
    this.points++;
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
    if (!isMatching(correct,regEx)||isMatching(incorrect1,regEx)||isMatching(incorrect2,regEx)) {
        console.log("The created quiz is incorrect");
        
    }
    // Arranges the 3 possible answers in a random order.
    let position: number = Math.floor(Math.random() * 3 + 1);

    switch (position) {
      case 0:
          this.answers = [correct,incorrect1,incorrect2];
        break;
      case 1:
        this.answers = [incorrect1,correct,incorrect2];
        break;
      case 2:
        this.answers = [incorrect2,incorrect1,correct];
        break;
      default:
        this.answers = [incorrect1,correct,incorrect2];
        break;
    }

    
  }

  
}

// methods

// The RegEp is not allowed to use the flag g
export function isMatching(text: String, regExp: RegExp) : Boolean{
    let match: RegExpMatchArray = text.match(regExp) || [];
    console.log(match);
    
    for (let index = 0; index < match.length; index++) {
        if ((match[index]!=undefined)&&(match[index].length===text.length)) {
            return true;
        }
    }
    return false;
}
