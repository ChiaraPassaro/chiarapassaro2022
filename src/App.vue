<script setup lang="ts">
//Vue
import { computed, onMounted, ref, watch, onUnmounted } from "vue";
import { state } from "./store";

import { useRouter, useRoute } from "vue-router";

import Header from "./components/Header.vue";
import Wave from "./components/Wave.vue";
import Night from "./components/icons/Night.vue";
import Graph from "./components/icons/Graph.vue";

//date
import { DateTime } from "luxon";

//composables
import useInitColors from "./composables/useInitColors";
import { useGenerateBaseColors } from "./composables/useGenerateBaseColors";
import { useInitGraph } from "./composables/useInitGraph";
import useGetNodeElements from "./composables/useGetNodeElements";

//router
const router = useRouter();
const route = useRoute();

//ref DOM map
const map = ref(null);

/** ---------------------------
 * computed
 * --------------------------- */
const elements = useGetNodeElements();

const whatColor = computed(() => {
  return state.now ? Math.floor(state.now / 5) : 0;
});

const iconDarkModeColor = computed(() => {
  return (!state.footerIsOpen && state.isDark) ||
    (!state.isDark && state.footerIsOpen)
    ? false
    : state.waveColorsHex.wave1;
});

/** ---------------------------
 * methods
 * --------------------------- */

const reloadGraph = () => {
  //change color labels
  state.graph
    .nodes()
    .forEach((element) =>
      element.data("color") !== state.label
        ? element.data("color", state.labelSecondary)
        : state.label
    );

  state.graph.destroy();

  state.graph = useInitGraph({
    elementDOM: map.value,
    bgColorStart: state.start,
    bgColorEnd: state.stop,
    lineMapColor: state.lineMap,
    elements,
    callback: openAside,
  });
};

const closeAside = () => {
  router.push({
    name: "home",
  });
};

const openAside = ({ tag, name }) => {
  if (tag == "articles") {
    router.push({
      name: "articles",
      params: {
        type: name,
      },
    });
  } else if (tag == "project") {
    router.push({
      name: "projects",
      params: {
        name,
      },
    });
  }
};

const resizeWindow = () => {
  state.setFooterIsOpen(false);
  state.graph?.destroy();

  state.graph = useInitGraph({
    elementDOM: map.value,
    bgColorStart: state.start,
    bgColorEnd: state.stop,
    lineMapColor: state.lineMap,
    elements,
    callback: openAside,
  });
};

const changeDark = (event) => {
  state.setIsDark(event?.matches || !state.isDark);
};

/**
 * watchers
 */
watch(
  () => whatColor.value, //if change reload colors and graph
  () => {
    useInitColors(whatColor.value);
    state.graph = useInitGraph({
      elementDOM: map.value,
      bgColorStart: state.start,
      bgColorEnd: state.stop,
      lineMapColor: state.lineMap,
      elements,
      callback: openAside,
    });
  }
);

watch(
  () => route.params,
  () => {
    let name = route.params?.name || route.params?.type;

    const status = name
      ? !!elements.value.find((el) => el.data.name == name)
      : false;

    state.setAside(status);
  }
);

watch(
  () => route.meta.title,
  () => {
    document.title = route.meta.title;
    const description = route.meta.description;

    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", description);
  }
);

watch(
  () => state.isDark, //reset colors if change DarkMode
  () => {
    state.setLabelSecondary(state.isDark ? "white" : "black");
    reloadGraph();
  }
);

/**
 * Lifecycle Hooks
 */
onMounted(() => {
  //dark mode with prefers-color-scheme
  state.setIsDark(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // change dark mode listener
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", changeDark);

  document.getElementById("app").style.backgroundColor = state.isDark
    ? "black"
    : "white";

  //set time for colors
  state.now = DateTime.now().setZone("Europe/Rome").hour;

  //check time interval
  setInterval(() => {
    state.now = DateTime.now().setZone("Europe/Rome").hour;
  }, 30000);

  // Setup Colors for wave and fonts
  state.baseColorsWave = useGenerateBaseColors();

  //setup now colors
  state.whatColor = Math.floor(state.now / 5);

  //start graph
  if (state.footerIsOpen) {
    setTimeout(() => {
      state.graph = useInitGraph({
        elementDOM: map.value,
        bgColorStart: state.start,
        bgColorEnd: state.stop,
        lineMapColor: state.lineMap,
        elements,
        callback: openAside,
      });
    }, 300);
  }

  window.addEventListener("resize", resizeWindow);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeWindow);
  window.removeEventListener("change", changeDark);
});
</script>

<template>
  <!-- container  -->
  <div
    class="container"
    :class="{ dark: state.isDark }"
    :style="`
    --start: ${state.start}; 
    --stop: ${state.stop}; 
    --text-color: ${!state.footerIsOpen && state.isDark ? 'white' : 'black'}; 
    --bg-aside: ${state.isDark ? '#212121' : 'black'};
    --bg: ${
      (state.isDark && !state.footerIsOpen) ||
      (!state.isDark && state.footerIsOpen)
        ? 'black'
        : 'white'
    };
    `"
  >
    <Header class="header" />

    <!-- main router view -->
    <main
      class="main"
      :style="`
      --start: ${state.start};
      --stop: ${state.stop};
      `"
    >
      <RouterView />
    </main>
    <!-- /main router view -->

    <div class="wave" v-if="state.waveColorsHex?.wave1">
      <Wave :colors="state.waveColorsHex" />
    </div>

    <!-- graph -->
    <div
      class="open-footer"
      @click="state.setFooterIsOpen(!state.footerIsOpen)"
      :class="{ open: state.footerIsOpen }"
      :style="`
        --bg: ${
          (state.isDark && !state.footerIsOpen) ||
          (!state.isDark && state.footerIsOpen)
            ? 'white'
            : 'black'
        }; 
       `"
    >
      <Graph
        class="ico-graph"
        :color="
          (state.isDark && !state.footerIsOpen) ||
          (!state.isDark && state.footerIsOpen)
            ? 'black'
            : 'white'
        "
      />
      <span>{{ !state.footerIsOpen ? "Open" : "Close" }} Graph</span>
    </div>
    <footer
      class="footer"
      :class="{ open: state.footerIsOpen }"
      :style="`
        --bg: ${state.isDark ? 'black' : 'white'}`"
      id="map"
      ref="map"
    ></footer>
    <!-- /graph -->

    <!-- aside -->
    <aside :class="{ move: state.aside }" class="aside">
      <a class="close" @click.prevent="closeAside">
        <i class="fa-solid fa-arrow-right"></i> <span>Close</span>
      </a>
      <div class="aside__content">
        <!-- aside router view -->
        <RouterView
          name="aside"
          :color="{ start: state.start, stop: state.stop }"
        />
      </div>
    </aside>
    <!-- /aside -->

    <!-- ico dark mode -->
    <div class="dark-mode" @click="changeDark">
      <Night class="dark-mode__ico" :colors="iconDarkModeColor" />
    </div>
    <!-- /ico dark mode -->
  </div>
  <!-- /container -->
</template>

<style lang="scss">
@import "./assets/partials/variables";
@import "./assets/partials/commons";

//Custom Properties
:root {
  --start: "";
  --stop: "";
  --bg: white;
  --bg-aside: black;
  --text-color: white;
}

//Mixins
@mixin radial {
  text-align: right;
  animation-name: gradient;
  animation-direction: alternate;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  background: radial-gradient(circle, var(--start) 0, var(--stop) 100%);
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: var(--start);
  -webkit-background-clip: text;
}

.dark-mode {
  position: fixed;
  top: 1%;
  left: 1%;
  z-index: 4;
  font-size: 1.5em;
  color: var(--text-color);
  cursor: pointer;
  &__ico {
    width: 1em;
  }
}

.container {
  position: fixed;
  z-index: 1;
  display: grid;
  grid-template-columns: 5% 80% 15%;
  grid-template-rows: 15% 30% 8% 47%;
  height: 100%;
  width: 100%;
  background-color: var(--bg);
  transition: all 2s;
  font-size: 1em;
  @media screen and (max-width: $sm) {
    grid-template-columns: 8% 80% 15%;
    grid-template-rows: 15% auto;
  }

  .header,
  .footer,
  .main {
    background-color: var(--bg);
    transition: all 2s;
  }

  .header {
    display: grid;
    align-items: center;
    grid-template-columns: 30% 1fr;
    grid-column: 2 / 3;
    grid-row: 1;
    gap: 1em;
    z-index: 2;
    @media screen and (max-width: $sm) {
      grid-template-columns: auto;
    }

    &__title {
      @include radial;
      grid-column-start: 1;
      grid-row-start: 1;

      @media screen and (max-width: $sm) {
        text-align: left;
        grid-column-start: auto;
        grid-row-start: auto;
      }

      font-weight: 400;
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
      color: var(--stop);

      @media screen and (max-width: $sm) {
        grid-column-start: auto;
        grid-row-start: auto;
        text-align: left;
      }
    }
  }

  .wave {
    display: grid;
    grid-column: 1 / 4;
    grid-row: 3;
    height: 100%;
    z-index: 3;

    svg {
      filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
    }

    @media screen and (max-width: $sm) {
      position: relative;
      grid-column: 3/5;
      grid-row: 1/6;

      .wave-container {
        position: absolute;
        top: 0;
        right: -100vmax;
        width: 100vmax;
        transform: rotate(90deg);
        transform-origin: left top;
      }
    }
  }

  .main {
    grid-column: 2 / 4;
    grid-row-start: 2;
    grid-row-end: 6;
    gap: 1em;
    display: grid;
    grid-template-columns: 30% 1fr;
    z-index: 1;
    padding-bottom: 30%;
    padding-right: 15%;
    overflow: auto;
    color: var(--text-color);
    @media screen and (max-width: $sm) {
      grid-template-columns: auto;
    }
  }

  .content {
    &__title {
      @include radial;

      @media screen and (max-width: $sm) {
        padding-top: 1em;
        text-align: left;
      }

      font-weight: 400;
    }
  }

  .footer {
    display: grid;
    grid-template-columns: 30% 70%;
    grid-column: 2 / 3;
    grid-row: 4;
    z-index: 2;

    @media screen and (max-width: $sm) {
      display: block;
      position: fixed;
      top: 100%;
      left: 0;
      width: 100%;
      height: 79%;
      padding-right: 4%;
      will-change: top;
      transition: 2s top;
      &.open {
        top: 21%;
      }
    }
  }

  .open-footer {
    display: none;
    position: fixed;
    z-index: 3;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    min-width: 20vw;
    padding: 0.2em;
    background-color: var(--bg);
    border-radius: 0.2em 0.2em 0 0;
    color: var(--text-color);
    font-size: 2em;
    cursor: pointer;
    will-change: bottom;
    transition: 2s bottom;
    &.open {
      bottom: 79%;
    }
    .ico-graph {
      width: 1em;
    }
    span {
      @include radial;
      font-size: 0.7em;
    }
    @media screen and (max-width: $sm) {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5em;
    }
  }
}

.aside {
  position: absolute;
  z-index: 5;
  top: 0;
  left: 100%;
  width: 70%;
  height: 100%;
  padding: 2em;
  background-color: var(--bg-aside);
  color: white;
  overflow: auto;
  @media screen and (max-width: $sm) {
    width: 100%;
    font-size: 1.5em;
  }
  will-change: left;
  transition: left 1s;
  &.move {
    left: 30%;
    @media screen and (max-width: $sm) {
      left: 0;
    }
    .close {
      display: flex;
    }
  }
  &__content {
    height: calc(100% - 6em);
  }
  .close {
    display: none;
    position: fixed;
    top: 1em;
    right: 1em;
    z-index: 3;
    align-items: center;
    gap: 0.2em;
    font-size: 2rem;
    cursor: pointer;
    span {
      font-size: 0.5em;
    }
  }

  a {
    @include radial;
    &:hover {
      color: var(--stop);
    }
    svg {
      color: var(--stop);
    }
  }
}

// animation
@keyframes gradient {
  0% {
    background: radial-gradient(circle, var(--start) 0%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  5% {
    background: radial-gradient(circle, var(--start) 5%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  10% {
    background: radial-gradient(circle, var(--start) 10%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  15% {
    background: radial-gradient(circle, var(--start) 15%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  20% {
    background: radial-gradient(circle, var(--start) 20%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  25% {
    background: radial-gradient(circle, var(--start) 25%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  30% {
    background: radial-gradient(circle, var(--start) 30%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  35% {
    background: radial-gradient(circle, var(--start) 35%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  40% {
    background: radial-gradient(circle, var(--start) 40%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  45% {
    background: radial-gradient(circle, var(--start) 45%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  50% {
    background: radial-gradient(circle, var(--start) 50%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  55% {
    background: radial-gradient(circle, var(--start) 55%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  60% {
    background: radial-gradient(circle, var(--start) 60%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  65% {
    background: radial-gradient(circle, var(--start) 65%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  70% {
    background: radial-gradient(circle, var(--start) 70%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  75% {
    background: radial-gradient(circle, var(--start) 75%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  80% {
    background: radial-gradient(circle, var(--start) 80%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  85% {
    background: radial-gradient(circle, var(--start) 85%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  90% {
    background: radial-gradient(circle, var(--start) 90%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  95% {
    background: radial-gradient(circle, var(--start) 95%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  100% {
    background: radial-gradient(circle, var(--start) 100%, var(--stop) 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
