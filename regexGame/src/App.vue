<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
var a = 0;
</script>

<template>
  <div class="gamebox col-8">
    <div class="headerbox">
      <h1>RegEx Game</h1>
      <div class="regexbox"><h2 class="regex" id="regex">a*b</h2></div>
      <div class="row" id="rowbox">
        <div class="col-4 answerbox" onclick="selectAnswer('answer-0')">
          <div class="flip-card">
            <div class="flip-card-inner" id="answer-0">
              <div class="flip-card-front">
                <h3>abbba</h3>
              </div>
              <div class="flip-card-back">
                <div class="wrong-flip-card-back">Wrong</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 answerbox" onclick="selectAnswer('answer-1')">
          <div class="flip-card">
            <div class="flip-card-inner" id="answer-1">
              <div class="flip-card-front">
                <h3>abbba</h3>
              </div>
              <div class="flip-card-back">
                <div class="wrong-flip-card-back">
                  Wrong
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 answerbox" onclick="selectAnswer('answer-2')">
          <div class="flip-card">
            <div class="flip-card-inner" id="answer-2">
              <div class="flip-card-front">
                <h3>abbba</h3>
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
      <h4>Points: {{a}}</h4>
    </div>
  </div>
</template>

<style>
@import "@/assets/base.css";

#app {
}

.gamebox {
  margin-left: 20%;
  margin-right: 20%;
  border: 2px black solid;
}

.regex {
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
