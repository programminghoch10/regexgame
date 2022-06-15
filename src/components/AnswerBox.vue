<template>
  <div @click="click()">
    <h3 class="inner styleButton">{{ answer }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    answer: String,
    clickAnswer: Function,
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    click() {
      this.$props.clickAnswer?.(this.answer);
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
