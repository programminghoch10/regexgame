<script lang="ts">

import { Quiz ,Game, isMatching } from "./components/game";
import AnswerBox from "./components/AnswerBox.vue";
import RegexBox from "./components/RegexBox.vue";

export default {
  name: "App",
  components: {
    AnswerBox,
    RegexBox,
  },
  data() {
    return {
      game: Game,
      currentQuiz: Quiz
    };
  },
  mounted() {
    console.log(0);
    this.game = new Game();
  },
  methods: {
    clickAnswer(answer : String){
      this.game.logAnswer(answer);   
    }
  },
};
</script>

<template>
  <div class="gamebox">
    <regex-box :regExp="game.currentQuiz.regEx"></regex-box>
    <div class="row" id="rowbox">
      <answer-box
        v-for="answer in game.currentQuiz.answers"
        :key="answer"
        :answer="answer"
        :clickAnswer="clickAnswer"
      ></answer-box>
    </div>
    <h4>Points: {{this.game.points}}</h4>
  </div>
</template>

<style>
@import "@/assets/base.css";
#app {
}
.gamebox {
  margin-top: 20%;
  margin-left: 20%;
  margin-right: 20%;
  border: 2px black solid;
}

.regex {
  padding-top: 2%;
  padding-bottom: 2%;
  margin-left: 20%;
  margin-right: 20%;
  border: 2px black solid;
}

#rowbox {
  margin-right: 0px;
  margin-left: 0px;
}
</style>
