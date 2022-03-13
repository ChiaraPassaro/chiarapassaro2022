<script setup>
import ColorPalettesRange from "@chiarapassaro/color-palettes-range/src/js";

// import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Wave from "@/components/Wave.vue";
import { computed } from "vue";

//rust color
const BrownRust = new ColorPalettesRange.Hsl({
  hue: 21,
  saturation: 46,
  brightness: 49,
});

const CadetBlue = new ColorPalettesRange.Hsl({
  hue: 174,
  saturation: 25,
  brightness: 56,
});

//TODO Color Palette add generate gradient from two colors - this is for waves

//TODO Genarate from this two colors different palettes
//TODO complementary rage and pick first and last
const colors = [
  {
    start: "#b46a41",
    stop: "#66a59f",
  },
  {
    start: "#b69b54",
    stop: "#b654af",
  },
  {
    start: "#b05858",
    stop: "#2895c8",
  },
];

// TODO change colors
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
  return colors[1].start;
});

const stop = computed(() => {
  return colors[1].stop;
});
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
//TODO add min height
@mixin title {
  background: radial-gradient(circle, var(--start) 0%, var(--stop) 100%);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-align: right;
}

// variables
$xs: 798px;
$sm: 1200px;

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
    font-size: 1.3vmax;
  }
  @media screen and (max-width: $xs) {
    font-size: 2vmax;
  }
  font-size: 1vmax;
}

// container top zindex
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

  .header {
    display: grid;
    align-items: center;
    grid-template-columns: 30% 1fr;
    grid-column: 2 / 3;
    grid-row: 1;
    background-color: white;
    gap: 1em;

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

  .wave {
    display: grid;
    grid-column: 1 / 4;
    grid-row: 3 / 5;
    background-color: white;
    height: 100%;

    @media screen and (max-width: $sm) {
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

  .footer {
    display: grid;
    z-index: 0;
    grid-column: 2 / 3;
    grid-row: 4;
    grid-template-columns: 30% 70%;
    background-color: white;
  }
}

// Container bottom zindex text content
.container-bottom {
  display: grid;
  grid-template-columns: 5% 80% 15%;
  grid-template-rows: 15% auto;
  z-index: 0;
  position: relative;
  height: 120vh;
  margin-bottom: 30%;

  .main {
    padding-bottom: 100vh;
    grid-column: 2 / 3;
    grid-row-start: 2;
    grid-row-end: 5;
    gap: 1em;
    z-index: 0;
    display: grid;
    grid-template-columns: 30% 1fr;

    @media screen and (max-width: $sm) {
      grid-template-columns: auto;
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
}
</style>
