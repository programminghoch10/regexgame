# RegexStructures

This lists Regex Structures covered in this game.

Source:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet

Name|Example|Description
-|-|-
Single character|`a`|Matches the given single character literally
Character sequence|`ab`|Matches the given character sequence literally
Any single character|`.`|Matches any single character
Group|`(ab)`|
Character class|`[ab]`|Matches any of the enclosed characters
Inverted character class|`[^ab]`|Match any character except the enclosed characters
Disjunction|`[a\|b]`|Match any of the sequences seperated by `\|`
Any-amount quantifier|`*`|Match previous sequence zero or more times
At-least-one quantifier|`+`|Match previous sequence one or more times
Optional quantifier|`?`|Match previous sequence zero or one time

## Uncovered Topics:
* Boundaries (`^`, `$`)
* Capturing groups and back references
* Absolute numeric quantifiers (`a{5}`)
* Interpreter specific character classes (`\s`)
* Character classes with range (`[a-c]`)
* Lookahead / Lookbehind
