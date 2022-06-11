import { Quiz } from "./game";

export function quizData(): Quiz[] {
  const list: Quiz[] = [];
  const quiz: Quiz = new Quiz(new RegExp("(ab)*"), "abab", "ba", "cccd");
  list.push(quiz);
  return list;
}
