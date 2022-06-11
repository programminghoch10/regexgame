<template>
  <div class="outer">
    <div class="innerGameBox">
      <regex-box
        class="box regExBox innerOuter"
        :regExp="game.currentQuiz.regEx"
      ></regex-box>
      <answer-box
        class="four columns box answerBox innerOuter"
        v-for="answer in game.currentQuiz.answers"
        v-bind:key="answer"
        v-bind:answer="answer"
        v-bind:clickAnswer="clickAnswer"
      >
      </answer-box>
      <div class="twelve columns pointsBox box innerOuter">
        <h3 class="inner pointsText">Points: {{ game.points }}</h3>
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
    };
  },
  mounted() {
    console.log(0);
    this.game = new Game();
  },
  methods: {
    clickAnswer(answer: string) {
      this.game.logAnswer(answer);
    },
  },
});
</script>
<style>
@import "@/assets-style/size.css";
@import "@/assets-style/skeleton.css";
@import "@/assets-style/normalize.css";
@import "@/assets-style/style.css";
</style>
