export class Game {
    regEx: RegExp;
    answers: String[] = [];
    points: number = 0;

    public constructor(regEx: RegExp,answers: String[]){
        this.regEx = regEx;
        this.answers = answers;
    }

    public pointsUp(): void {
        this.points++;
    } 
}
