<script lang="ts">
import { Game, isMatching } from "./components/game";
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
      game: new Game(new RegExp("(ab)*",), ["abab", "b", "c"]),
    };
  },
  mounted() {},
  methods: {
    clickAnswer(answer : String){
      this.game.points++;
      //console.log(answer);
      
      console.log(isMatching(answer,this.game.regEx));
      
      //console.log("new Game");
      
    }
  },
};
</script>

<template>
  <div class="gamebox">
    <regex-box :regExp="game.regEx"></regex-box>
    <div class="row" id="rowbox">
      <answer-box
        v-for="answer in game.answers"
        :key="answer"
        :answer="answer"
        :game="game"
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
