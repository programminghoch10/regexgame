<script lang="ts">
import {Game} from './components/game';
import AnswerBox from './components/AnswerBox.vue';
import RegexBox from './components/RegexBox.vue';

export default {
  name: 'App',
  components: {
    AnswerBox,
    RegexBox
  },
  data() {
    return {
      answers: ["hallo","hey","ccol"],
      game : new Game(new RegExp("ab+c", "i"))
    }
  },
  methods: {},
    mounted(){}
  };
</script>


<template>
  <div class="gamebox">
    <regex-box :regExp="game.regEx"></regex-box>
      <div class="row" id="rowbox">
        <answer-box
        v-for="answer in answers"
        :key="answer"
        :answer="answer"
        ></answer-box>
      </div>
      <h4>Points: 5 {{}}</h4>
    </div>
</template>


<style>
@import "@/assets/base.css";
#app {}
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
