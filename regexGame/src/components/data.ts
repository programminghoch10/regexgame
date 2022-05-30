import { Quiz } from "./game";

export function quizData() : Quiz[]{
   let list: Quiz[] =[];
   let quiz: Quiz = new Quiz(new RegExp("(ab)*"),"abab","ba","cccd");
   list.push(quiz);
   return list;
}