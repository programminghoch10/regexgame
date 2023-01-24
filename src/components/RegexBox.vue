<template>
  <div>
    <h2 class="textFormat inner regexText">
      {{ regExp?.toString().substring(1, regExp?.toString().length - 1) }}
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    regExp: RegExp,
  },
  components: {},
  data() {
    return {
      check: Boolean,
    };
  },
  methods: {},
});
</script>
<style>
@import "@/assets-style/size.css";
@import "@/assets-style/skeleton.css";
@import "@/assets-style/normalize.css";
@import "@/assets-style/style.css";
</style>
