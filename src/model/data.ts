import { Quiz } from "./game";

export function quizData(): Quiz[] {
  const list: Quiz[] = [];
  //Very Easy for the Beginning

  list.push(new Quiz(/((.ba)*a)*/, "", "ab", "laalaa"));
  return list;
}
