# regex-game

## Description
This game aims to improve a users understanding of regexes.

## Configuration
Open `/src/model/data.ts`. 
Here you can find the function `quizData()` which fills up a list of `Quiz` objects.
This allows you to enter regexes, which will be used inside the game.
The order of those regexes will also determine the order in which they appear in-game.

![alt image](src/assets/Screenshot%202022-06-15%20110836.png)

The first parameter is the regex (e.g. `new RegExp("(ab)*")`), 
the second parameter is the correct answer string, which matches the regex entirely.
The third and fourth parameters are alternative answers, which don't match the regex.

![alt](src/assets/Screenshot%202022-06-15%20125642.png)

Invalid Combinations of a regex and the answers will be logged into the browser console. 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
