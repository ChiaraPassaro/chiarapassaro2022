<script setup>
// import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Wave from "@/components/Wave.vue";
import { computed } from "vue";

const colors = [
  {
    start: "#b46a41",
    stop: "#66a59f",
  },
  {
    start: "#b42b41",
    stop: "#3b65b0",
  },
  {
    start: "#b05858",
    stop: "#2895c8",
  },
];

// wave1
const waveColors = {
  wave1: [
    "#c85b28",
    "#bd6335",
    "#a17857",
    "#749b8e",
    "#58b0b0",
    "#b46a41",
    "#a67552",
    "#81907e",
    "#66a59f",
  ],
  wave2: ["#58b0b0", "#749b8e", "#b46a41", "#a67552", "#81907e", "#66a59f"],
};

const start = computed(() => {
  return colors[0].start;
});

const stop = computed(() => {
  return colors[0].stop;
});
</script>

<template>
  <div class="container" :style="`--start: ${start}; --stop: ${stop};`">
    <Header></Header>

    <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->

    <div class="wave">
      <Wave></Wave>
    </div>
    <RouterView />
  </div>
</template>

<style lang="scss">
@import "@/assets/style.scss";
:root {
  --bg-header: #fff;
  --start: ;
  --stop: ;
}
</style>
