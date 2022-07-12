<template>
  <div class="outer">
    <div v-if="!game.lost" class="innerGameBox gamebox">
      <regex-box
        class="regExBox innerOuter"
        :regExp="game.currentQuiz.regEx"
      ></regex-box>
      <answer-box
        class="four columns answerBox innerOuter"
        v-for="answer in game.currentQuiz.answers"
        v-bind:key="answer"
        v-bind:answer="answer"
        v-bind:clickAnswer="clickAnswer"
      >
      </answer-box>
      <div class="twelve columns pointsBox innerOuter">
        <h3 class="inner pointsText">Points: {{ game.points }}</h3>
      </div>
    </div>
    <div v-if="game.lost" class="innerGameBox gamebox">
      <div class="regExBox innerOuter">
        <h2 v-if="!game.win && !game.played" class="textFormat inner regexText">
          THE REGEX GAME
        </h2>
        <h2 v-if="game.win" class="textFormat inner regexText">YOU MADE IT!</h2>
        <h2 v-if="!game.win && game.played" class="textFormat inner regexText">
          YOU FAILED
        </h2>
      </div>

      <div class="six columns answerBox innerOuter">
        <h3 @click="menuclick('help')" class="inner styleButton">Help</h3>
      </div>

      <div class="six columns answerBox innerOuter">
        <h3
          @click="menuclick('play')"
          v-if="!game.played"
          class="inner styleButton"
          id="start-game-button"
        >
          Play
        </h3>
        <h3
          @click="menuclick('play')"
          v-if="game.played"
          class="inner styleButton"
        >
          Try again
        </h3>
      </div>
      <div class="twelve columns pointsBox innerOuter">
        <h3 class="inner pointsText">Highscore: {{ highscore }}</h3>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Game } from "./model/game";
import AnswerBox from "./components/AnswerBox.vue";
import RegexBox from "./components/RegexBox.vue";
export default defineComponent({
  name: "App",
  components: {
    AnswerBox,
    RegexBox,
  },
  data() {
    return {
      game: new Game(),
      highscore: 0,
    };
  },
  mounted() {
    //this.highscore < JSON.parse(localStorage.getItem("highscore") || ""));
  },
  methods: {
    clickAnswer(answer: string) {
      this.game.logAnswer(answer);
      if (this.highscore < this.game.points) {
        this.highscore = this.game.points;
      }
      if (this.game.lost) {
        document.documentElement.style.setProperty("--clr-neon", "#FF0000");
      }
      if (this.game.win) {
        document.documentElement.style.setProperty("--clr-neon", "#FFd700");
      }
    },
    menuclick(info: string) {
      if (info === "play") {
        this.game.startGame();
        document.documentElement.style.setProperty("--clr-neon", "#00FF31");
      }
      if (info === "help") {
        window.location.href =
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp";
      }
    },
  },
});
</script>
<style>
:root {
  --clr-neon: rgb(0, 255, 51);
  --clr-bg: hsl(223 21% 16%);
}
@import "@/assets-style/size.css";
@import "@/assets-style/skeleton.css";
@import "@/assets-style/normalize.css";
@import "@/assets-style/style.css";
</style>
