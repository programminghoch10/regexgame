<script lang="ts">
import { defineComponent } from "vue";
import {Question} from './components/question';
import AnswerBox from './components/AnswerBox.vue';

export default {
  name: 'App',
  components: {
    AnswerBox
  },
  props: {
    question : Question
  },
  data() {
    return {
    }
  },
  methods: {},
    mounted(){}
  };
</script>


<template>
  <div class="gamebox">
    <div class="headerbox">
      
      <h1>RegEx Game</h1>
      <div class="regexbox"><h2 class="regex" id="regex">d|a(b)*c</h2></div>
      <div class="row" id="rowbox">
        <answer-box></answer-box>
        <answer-box></answer-box>
        <answer-box></answer-box>
      </div>
      <h4>Points: 5 {{}}</h4>
    </div>
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

.headerbox {
  margin-top: 20px;
  text-align: center;
}

#rowbox {
  margin-right: 0px;
  margin-left: 0px;
}
</style>
