<script lang="ts">
import { defineComponent } from "vue";
import {Question} from './components/question';


export default defineComponent({
  name: 'App',
  components: {},
  props: {
    question : Question
  },
  data() {
    return {

    }
  },
  methods: {
    selectAnswer(name: string ){
    // this.$refs[name].classList.add("flip-card-inner-animation");
    },
    mounted(){
      
    }
  }
});
</script>

<template>
  <div class="gamebox">
    <div class="headerbox">
      <h1>RegEx Game</h1>
      <div class="regexbox"><h2 class="regex" id="regex">d|a(b)*c</h2></div>
      <div class="row" id="rowbox">
        <div class="col-4 answerbox" @click="selectAnswer('answer0')">
          <div class="flip-card">
            <div class="flip-card-inner" ref="answer0">
              <div class="flip-card-front">
                <h3>ac</h3>
              </div>
              <div class="flip-card-back">
                <div class="wrong-flip-card-back">Wrong</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 answerbox"  @click="selectAnswer('answer1')">
          <div class="flip-card">
            <div class="flip-card-inner" ref="answer1">
              <div class="flip-card-front">
                <h3>dabbbc</h3>
              </div>
              <div class="flip-card-back">
                <div class="wrong-flip-card-back">
                  Wrong
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 answerbox" @click="selectAnswer('answer2')">
          <div class="flip-card">
            <div class="flip-card-inner" ref="answer2">
              <div class="flip-card-front">
                <h3>dbcc</h3>
              </div>
              <div class="flip-card-back">
                <div class="wrong-flip-card-back">
                  Wrong
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4>Points: 5 {{}}</h4>
    </div>
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

.headerbox {
  margin-top: 20px;
  text-align: center;
}

#rowbox {
  margin-right: 0px;
  margin-left: 0px;
}

.answerbox {
  height: 200px;
}
/* Answer Card Style */

.flip-card {
  border: solid black 2px;
  background-color: transparent;
  width: 100%;
  height: 100%;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  margin-top: 50%;

}

/* Do an horizontal flip when you move the mouse over the flip box container */
 .flip-card-inner-animation {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  color: black;
}

/* Style the back side */
.flip-card-back {
  transform: rotateY(180deg);
}

.wrong-flip-card-back {
  background-color: red;
  color: black;
}

.right-flip-card-back {
  background-color: green;
  color: black;
}
</style>
