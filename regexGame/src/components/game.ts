export class Game {
    regEx: RegExp;
    answers: String[] = [];
    points: number = 0;

    public constructor(regEx: RegExp){
        this.regEx = regEx;
    }

    
}