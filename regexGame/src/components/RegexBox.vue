<template>
  <div>
    <div class="headerbox">
      <h1>RegEx Game</h1>
      <div class="regexbox"><h2 class="regex" id="regex">{{regExp}}</h2></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    regExp: RegExp 
  },
  data() {
    return {
      check: Boolean
    };
  },
  mounted() {
   
  },
  methods: {
    newRegEx(){
        const rExp : RegExp = /[A-G]/g;
        console.log(rExp);
    }
  },
};
</script>

<style>
.headerbox {
  margin-top: 5%;
  text-align: center;
}
</style>
