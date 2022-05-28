//Classes

export class Game {
  regEx: RegExp;
  answers: String[] = [];
  points: number = 0;

  public constructor(regEx: RegExp, answers: String[]) {
    this.regEx = regEx;
    this.answers = answers;
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
    incorrect1: String,
    incorrect2: String,
    correct: String
  ) {

    this.regEx = regEx;
    //Checks if the quiz is valid
    if (!isMatching(correct,regEx)) {
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
        this.answers = [incorrect1,incorrect2,correct];
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
    for (let index = 0; index < match.length; index++) {
        if ((match[index]!=undefined)&&(match[index].length===text.length)) {
            return true;
        }
    }
    return false;
}
