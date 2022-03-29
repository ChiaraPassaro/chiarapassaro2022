<script setup>
//Vue
import { reactive, computed, onMounted, ref, watch, onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Wave from "@/components/Wave.vue";
import Night from "./components/icons/Night.vue";
import Graph from "./components/icons/Graph.vue";

// colorpalette
import ColorPalettesRange from "@chiarapassaro/color-palettes-range/src/js/index";
import { DateTime } from "luxon";

//cytoscape form Map
import cytoscape from "cytoscape";
import cola from "cytoscape-cola";
cytoscape.use(cola);

//router
const router = useRouter();
const route = useRoute();

//State
const state = reactive({
  aside: false,
  isDark: false,
  footerIsOpen: false,
  graph: {},
  baseColorsWave: [],
  now: {},
  waveColorsHex: {},
});

//ref DOM map
const map = ref(null);

// computed
const whatColor = computed(() => {
  return state.now ? Math.floor(state.now / 5) : 0;
});

const start = computed(() => {
  if (state.baseColorsWave.length) {
    return state.baseColorsWave[whatColor.value].startColor.printHex();
  }
  return "";
});

const stop = computed(() => {
  if (state.baseColorsWave.length) {
    return state.baseColorsWave[whatColor.value].endColor.printHex();
  }
  return "";
});

const label = computed(() => {
  if (state.baseColorsWave.length) {
    const baseColor = state.baseColorsWave[whatColor.value].endColor;
    baseColor.setBrightness(60);
    const palette = ColorPalettesRange.SetColorPalette(
      state.baseColorsWave[whatColor.value].endColor
    );
    const [, color] = palette.triad();
    return color.printHex();
  }
  return "";
});

const labelSecondary = computed(() => {
  return state.isDark ? "white" : "black";
});

const lineMap = computed(() => {
  const baseColor = state.baseColorsWave[whatColor.value].endColor;
  baseColor.setBrightness(90);
  return baseColor.printHex();
});

//Elements map
const elements = computed(() => {
  return [
    {
      data: {
        id: "1",
        label: "Articles",
        name: "all",
        tag: "articles",
        size: 6,
        aside: true,
        color: label.value,
      },
      renderedPosition: {
        x: -10000,
        y: window.innerHeight > 1200 ? -1000 : 3000,
      },
    },

    {
      data: {
        id: "2",
        label: "Projects",
        name: "project",
        tag: "project",
        size: 6,
        aside: false,
        color: label.value,
      },
      renderedPosition: {
        x: window.innerHeight > 1200 ? 0 : 20000,
        y: window.innerHeight > 1200 ? 0 : 10000,
      },
    },
    {
      data: {
        id: "3",
        label: "Javascript",
        name: "javascript",
        tag: "articles",
        size: 5,
        aside: true,
        color: labelSecondary.value,
      },
    },
    {
      data: {
        id: "4",
        label: "Ergonomics",
        name: "ergonomics",
        tag: "articles",
        size: 5,
        aside: true,
        color: labelSecondary.value,
      },
    },
    {
      data: {
        id: "5",
        label: "Vuejs",
        name: "vuejs",
        tag: "articles",
        size: 5,
        aside: true,
        color: labelSecondary.value,
      },
    },
    {
      data: {
        id: "6",
        label: "Teaching",
        name: "teaching",
        size: 6,
        aside: false,
        color: label.value,
      },
    },
    {
      data: {
        id: "7",
        label: "HTML",
        name: "html",
        size: 5,
        aside: false,
        color: labelSecondary.value,
      },
    },

    {
      data: {
        id: "8",
        label: "Laravel",
        name: "laravel",
        size: 5,
        aside: false,
        color: labelSecondary.value,
      },
    },
    {
      data: {
        id: "9",
        label: "Color Palettes Range NPM",
        name: "colorPalettesRangeNpm",
        tag: "project",
        size: 5,
        aside: true,
        color: labelSecondary.value,
      },
    },
    {
      data: {
        id: "10",
        label: "Vue Gantt",
        name: "vueGantt",
        tag: "project",
        size: 5,
        aside: true,
        color: labelSecondary.value,
      },
    },
    {
      data: {
        id: "12",
        label: "SASS",
        name: "sass",
        size: 5,
        aside: false,
        color: labelSecondary.value,
      },
    },
    {
      data: {
        id: "13",
        label: "Color Palettes Range App",
        name: "colorPalettesRangeApp",
        tag: "project",
        size: 5,
        aside: true,
        color: labelSecondary.value,
      },
    },
    {
      data: {
        source: "3",
        target: "1",
      },
    },
    {
      data: {
        source: "1",
        target: "4",
      },
    },

    {
      data: {
        source: "1",
        target: "5",
      },
    },
    {
      data: {
        source: "1",
        target: "4",
      },
    },
    {
      data: {
        source: "2",
        target: "5",
      },
    },
    {
      data: {
        source: "2",
        target: "12",
      },
    },
    {
      data: {
        source: "2",
        target: "9",
      },
    },
    {
      data: {
        source: "2",
        target: "10",
      },
    },

    {
      data: {
        source: "6",
        target: "3",
      },
    },
    {
      data: {
        source: "6",
        target: "7",
      },
    },
    {
      data: {
        source: "6",
        target: "12",
      },
    },
    {
      data: {
        source: "6",
        target: "8",
      },
    },
    {
      data: {
        source: "6",
        target: "5",
      },
    },
    {
      data: {
        source: "2",
        target: "13",
      },
    },
  ];
});

const nightColors = computed(() => {
  return (!state.footerIsOpen && state.isDark) ||
    (!state.isDark && state.footerIsOpen)
    ? false
    : state.waveColorsHex.wave1;
});

// methods
function initColors() {
  //Set palettes
  const palette = ColorPalettesRange.SetColorPalette(
    state.baseColorsWave[whatColor.value].startColor
  );
  const gradientWave1 = palette.gradient({
    numColors: 10,
    endColor: state.baseColorsWave[whatColor.value].endColor,
  });

  const waveColorsHex = {
    wave1: [],
    wave2: [],
  };

  waveColorsHex.wave1 = gradientWave1.map((element) => {
    return element.printHex();
  });
  waveColorsHex.wave2 = gradientWave1.reverse().map((element) => {
    return element.printHex();
  });
  state.waveColorsHex = waveColorsHex;
}

function initGraph() {
  return cytoscape({
    hideEdgesOnViewport: true,
    container: map.value,
    autounselectify: true,
    boxSelectionEnabled: false,
    pannable: false,
    userZoomingEnabled: false,
    layout: {
      name: "cola",
      animate: true,
      refresh: 1,
      maxSimulationTime: 30000,
      fit: true,
      padding: 30,
      nodeDimensionsIncludeLabels: false,
      randomize: false,
      avoidOverlap: true,
      handleDisconnected: true,
      convergenceThreshold: 0.01,
      flow:
        window.innerWidth < 1024 ? { axis: "x", minSeparation: 30 } : undefined,
      nodeSpacing: function (node) {
        return 18;
      },
      edgeLength: 40,
    },
    style: [
      {
        selector: "node",
        style: {
          "background-color": start.value,
          label: "data(label)",
          color: "data(color)",
          "font-size": window.innerWidth > 1024 ? "9" : "12",
          width: "data(size)",
          height: "data(size)",
          "border-width": "0.6",
          "border-style": "solid",
          "border-color": lineMap.value,
        },
      },
      {
        selector: "edge",
        css: {
          width: 0.4,
          "line-color": lineMap.value,
        },
      },
    ],
    elements: elements.value,
  })
    .on("mouseover", "node", function (event) {
      const node = event.target;
      if (node.data("aside")) {
        node.style("background-color", stop.value);
        const label = node.style("label");
        node.style("label", "Open " + label);
      }
    })
    .on("mouseout", "node", function (event) {
      const node = event.target;
      if (node.data("aside")) {
        node.style("background-color", start.value);
        const label = node.style("label").replace("Open", "");
        node.style("label", label);
      }
    })
    .on("tap", "node", function (event) {
      const node = event.target;
      //open modal
      if (node.data("aside")) {
        const name = node.data("name");
        const label = node.style("label").replace("Open", "");
        node.style("label", label);

        if (node.data("tag") === "articles") {
          router.push({
            name: "articles",
            params: {
              type: name,
            },
          });
        } else if (node.data("tag") === "project") {
          router.push({
            name: "projects",
            params: {
              name,
            },
          });
        }

        state.aside = true;
      }
    })
    .on("layoutstop", function () {
      this.nodes()
        .filter(function (element) {
          return element.data("aside");
        })
        .forEach((element) => {
          const jAni = element.animation({
            style: {
              width: element.data("size") + 10,
              height: element.data("size") + 10,
            },
            duration: 1000,
          });

          setTimeout(() => {
            jAni.play();
          }, 1100);
        });
    });
}

function reloadGraph() {
  state.graph
    .nodes()
    .forEach((element) =>
      element.data("color") !== label.value
        ? element.data("color", labelSecondary.value)
        : label.value
    );
  state.graph.destroy();
  state.graph = initGraph();
}

function closeAside() {
  router.push({
    name: "home",
  });
  state.aside = false;
}

//watchers
watch(
  () => whatColor.value, //if change reload colors and graph
  () => {
    initColors();
    state.graph = initGraph();
  }
);

watch(
  () =>
    (route.params.type || route.params.name) &&
    (Object.keys(route.params).includes("type") ||
      Object.keys(route.params).includes("name")),
  () => {
    let name = route.params.name || route.params.type;
    state.aside = elements.value.find((el) => el.data.name == name);
  }
);

watch(
  () => route.meta.title,
  () => {
    document.title = route.meta.title;
  }
);

// Lifecycle Hooks
onMounted(() => {
  //dark mode with prefers-color-scheme
  state.isDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // change dark mode listener
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      state.isDark = event.matches;
    });

  document.getElementById("app").style.backgroundColor = state.isDark
    ? "black"
    : "white";

  //set time
  state.now = DateTime.now().setZone("Europe/Rome").hour;

  //check time interval
  setInterval(() => {
    state.now = DateTime.now().setZone("Europe/Rome").hour;
  }, 30000);

  // Setup Colors for wave and fonts
  state.baseColorsWave = [
    {
      startColor: new ColorPalettesRange.Hsl({
        hue: 180,
        saturation: 59,
        brightness: 55,
      }),
      endColor: new ColorPalettesRange.Hsl({
        hue: 208,
        saturation: 45,
        brightness: 75,
      }),
    },
    {
      startColor: new ColorPalettesRange.Hsl({
        hue: 180,
        saturation: 79,
        brightness: 55,
      }),
      endColor: new ColorPalettesRange.Hsl({
        hue: 208,
        saturation: 65,
        brightness: 65,
      }),
    },
    {
      startColor: new ColorPalettesRange.Hsl({
        hue: 355,
        saturation: 97,
        brightness: 56,
      }),
      endColor: new ColorPalettesRange.Hsl({
        hue: 32,
        saturation: 76,
        brightness: 60,
      }),
    },
    {
      startColor: new ColorPalettesRange.Hsl({
        hue: 21,
        saturation: 46,
        brightness: 48,
      }),
      endColor: new ColorPalettesRange.Hsl({
        hue: 174,
        saturation: 25,
        brightness: 52,
      }),
    },
    {
      startColor: new ColorPalettesRange.Hsl({
        hue: 150,
        saturation: 25,
        brightness: 52,
      }),
      endColor: new ColorPalettesRange.Hsl({
        hue: 250,
        saturation: 25,
        brightness: 52,
      }),
    },
  ];

  //setup colors
  state.whatColor = Math.floor(state.now / 5);
  initColors();

  //start graph
  if (state.footerIsOpen) {
    setTimeout(() => {
      state.graph = initGraph();
    }, 300);
  }

  //resize graph
  window.addEventListener("resize", () => {
    state.footerIsOpen = false;
    if (state.graph) {
      state.graph.destroy();
    }
    state.graph = initGraph();
  });
});

onUpdated(() => {
  state.aside = !!route.params.name || !!route.params.type;
});
</script>

<template>
  <!-- container  -->
  <div
    v-if="!state.isLoading"
    class="container"
    :class="{ dark: state.isDark }"
    :style="`
    --start: ${start}; 
    --stop: ${stop}; 
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
      --start: ${start};
      --stop: ${stop};
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
      @click="(state.footerIsOpen = !state.footerIsOpen), reloadGraph()"
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
        <RouterView name="aside" :color="{ start, stop }" />
      </div>
    </aside>
    <!-- /aside -->

    <!-- ico dark mode -->
    <div
      class="dark-mode"
      @click="(state.isDark = !state.isDark), reloadGraph()"
    >
      <Night class="dark-mode__ico" :colors="nightColors" />
    </div>
    <!-- /ico dark mode -->
  </div>
  <!-- /container -->
</template>

<style lang="scss">
@import "./assets/partials/variables";

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
  animation: alternate;
  animation-duration: 2s;
  animation-name: gradient;
  animation-iteration-count: infinite;
  background: radial-gradient(circle, var(--start) 0, var(--stop) 100%);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

//Commons
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a:hover {
  filter: invert(0.8);
}

html {
  font-size: 100%;
  height: -webkit-fill-available;
}

body {
  min-height: 100vh;
  min-height: -webkit-fill-available;

  font-family: "Roboto", sans-serif;
  font-size: 1vmax;

  @media screen and (max-width: $md) {
    font-size: 1.4vmax;
  }

  @media screen and (max-width: $sm) {
    font-size: 2vmax;
  }

  @media screen and (max-width: $xs) {
    font-size: 4.3vmin;
  }
}

#app {
  overflow: hidden;
}

.dark-mode {
  position: fixed;
  top: 1%;
  left: 1%;
  z-index: 4;
  font-size: 1.7em;
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
      @include radial();
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
