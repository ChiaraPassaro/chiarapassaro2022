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

//todo modify colors
</script>
<template>
  <div class="container" :style="`--start: ${start}; --stop: ${stop};`">
    <Header class="header"></Header>
    <div class="wave">
      <Wave :colors="waveColors"></Wave>
    </div>

    <footer class="footer"></footer>
  </div>
  <div class="container-bottom" :style="`--start: ${start}; --stop: ${stop};`">
    <main class="main content">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
$sm: 1200px;

@mixin title {
  background: radial-gradient(circle, var(--start) 0%, var(--stop) 100%);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-align: right;
  padding-right: 1em;
}

:root {
  --bg-header: #fff;
  --start: "";
  --stop: "";
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
  @media screen and (max-width: $sm) {
    font-size: 2vmax;
  }
  font-size: 1vmax;
}

.container {
  position: fixed;
  z-index: 1;
  display: grid;
  grid-template-columns: 5% 80% 15%;
  grid-template-rows: 15% 30% 8% 47%;
  height: 100vh;
  width: 100%;
  @media screen and (max-width: 678px) {
    grid-template-rows: 15% 50% 8% 27%;
  }
}

.container-bottom {
  display: grid;
  grid-template-columns: 5% 80% 15%;
  grid-template-rows: 15% auto;
  z-index: 0;
  position: relative;
  height: 120vh;
  margin-bottom: 30%;
}

.header {
  display: grid;
  grid-template-columns: 30% 70%;
  grid-column: 2 / 3;
  grid-row: 1;
  background-color: white;

  @media screen and (max-width: $sm) {
    grid-template-columns: auto;
  }

  &__title {
    @include title;
    grid-column-start: 1;
    grid-row-start: 1;

    @media screen and (max-width: $sm) {
      text-align: left;
      grid-column-start: auto;
      grid-row-start: auto;
    }

    font-weight: 400;
    font-size: 2.5em;
    line-height: 2em;

    @media screen and (max-width: $sm) {
      line-height: 1em;
    }
  }

  &__subtitle {
    grid-column-start: 2;
    grid-row-start: 1;
    margin-top: 0.5em;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.1em;
    color: var(--orange);

    @media screen and (max-width: $sm) {
      text-align: left;
      grid-column-start: auto;
      grid-row-start: auto;
    }
  }
}

.main {
  padding-bottom: 100vh;
  grid-column: 2 / 3;
  grid-row-start: 2;
  grid-row-end: 5;
  z-index: 0;
  display: grid;
  grid-template-columns: 30% 70%;

  @media screen and (max-width: 678px) {
    grid-template-columns: auto;
  }
}

.wave {
  display: grid;
  grid-column: 1 / 4;
  grid-row: 3 / 5;
  background-color: white;
  height: 100%;
  @media screen and (max-width: 678px) {
    position: relative;
    grid-column: 3/5;
    grid-row: 1/5;
    .wave-container {
      transform: rotate(90deg);
      transform-origin: left top;
      position: absolute;
      z-index: 1;
      top: 0;
      right: -100vmax;
      width: 100vmax;
    }
  }
}

.content {
  &__title {
    @include title;
    @media screen and (max-width: $sm) {
      text-align: left;
      padding-top: 1em;
    }

    font-weight: 400;
    font-size: 1.8em;
  }
}

.footer {
  display: grid;
  z-index: 0;
  grid-column: 2 / 3;
  grid-row: 4;
  grid-template-columns: 30% 70%;
}
</style>
