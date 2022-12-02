# regex-game

This game aims to improve a users understanding of regexes.

## Development

### configuration
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

### Getting started

Clone the repository  
```sh
git clone https://github.com/Gamify-IT/regex-game.git
```

Install the dependencies  
```sh
npm install
```

#### Run with Docker-compose

Start all dependencies with our docker-compose files.
Check the [manual for docker-compose](https://github.com/Gamify-IT/docs/blob/main/dev-manuals/languages/docker/docker-compose.md).

### Compile and Hot-Reload for Development

```sh
npm run serve
```

### Build

Build the Docker-Container
```sh
docker build -t regex-game-dev .
```
And run it at port 8000 with
```sh
docker run -d -p 8000:80 --name regex-game-dev regex-game-dev
```

To monitor, stop and remove the container you can use the following commands:
```sh
docker ps -a -f name=regex-game-dev
```
```sh
docker stop regex-game-dev
```
```sh
docker rm regex-game-dev
```


## User manual

Run the docker container with the following command at port 8000:
```sh
docker run -d -p 8000:80 --name regex-game ghcr.io/gamify-it/regex-game:latest
```
Now you can access it at [http://localhost:8000](http://localhost:8000).  
To access it externally replace localhost with your IP.  

To monitor the container you can use the following command:
```sh
docker ps -a -f name=regex-game
```
To stop the container you can use the following command:
```sh
docker stop regex-game
```
To remove the container you can use the following command:
```sh
docker rm regex-game
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
