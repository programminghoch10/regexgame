# regex-game

## Beschreibung
Dieses Spiel soll Übung in das lesen und verstehen von Regex bringen. Außerdem bildet es eine Verbindung zwischen PSE und theoretische Informatik 1 bilden.

## Konfiguration 
Öffnen sie /src /model /data.ts hier finden sie eine Funktion quizdata() die einen Array Quiz[] befüllt hier können sie die Regex Eintragen, die in dem Spiel angezeigt werden. Die Reihenfolge, in der der Array befüllt wird, ist die Reihenfolge, in der die quizze im Game aufgeführt werden. 

![alt image](src/assets/Screenshot%202022-06-15%20110836.png)

Der erste Parameter ist der Regex also zum Beispiel.  new RegExp("(ab)*") der zweite Parameter ist eine Korrekte antwort also ein String, der mit voller länge den regex matcht also zum Beispiel. "abab" . Der dritte und der vierte Parameter sind alternative die den Regex nicht matchen, antworten auch Strings. Zum Beispiel "a" und "baba".

![alt](src/assets/Screenshot%202022-06-15%20125642.png)

Wenn bei den Parametern ein Fehler gemacht wird, kann man, dass in dem Browser log sehen. 

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
