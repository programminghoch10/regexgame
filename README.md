# regexgame

This game aims to improve a users understanding of regexes.

## Build and run
```bash
docker compose up --build
```
then access
[`http://localhost/minigames/regexgame`](http://localhost/minigames/regexgame/)

## Run for development with hot reload
We recommend VSCode for development,
since it includes formatting
and the dev container is build to integrate
with the
[`Live Server`](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
extension directly.

```bash
docker compose -f docker-compose-dev.yaml up
```

Start the live server using the `Go Live` button in the bottom right corner of VSCode.

Then access
[`http://localhost/minigames/regexgame`](http://localhost/minigames/regexgame/)

### Local backend
For live integration of a locally running backend,
use `docker-compose-dev-e2e.yaml`
and start the backend from
[`regexgame-backend`](https://github.com/Gamify-IT/regexgame-backend)
directly.
