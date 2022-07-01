import { Quiz } from "./game";

export function quizData(): Quiz[] {
  const list: Quiz[] = [];
  //Very Easy for the Beginning

  list.push(new Quiz(new RegExp("((.ba)*a)*"), "", "ab", "laalaa"));
  /*
  list.push(new Quiz(new RegExp("hello"), "hello", "welcome", "hey :)"));
  list.push(new Quiz(new RegExp(".s"), "is", "the game", "easy"));
  list.push(new Quiz(new RegExp(".ha"), "aha", "haha", "ha"));
  list.push(new Quiz(new RegExp(".o."), "lol", "hello", "lo"));
  list.push(new Quiz(new RegExp(".a.a.a.a"), "hahahaha", "aaaa", "laalaa"));
  list.push(new Quiz(new RegExp("(ab)*"), "abab", "a", "la"));
 */ return list;
}
