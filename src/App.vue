<script setup>
//Vue
import { reactive, computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import Wave from "@/components/Wave.vue";

// colorpalette
import ColorPalettesRange from "@chiarapassaro/color-palettes-range/src/js/index";
import { DateTime } from "luxon";

//cytoscape form Map
import cytoscape from "cytoscape";
import cola from "cytoscape-cola";
cytoscape.use(cola);

const router = useRouter();

//State
const state = reactive({
  aside: false,
  isDark: false,
  graph: {},
});

// Setup Colors for wave and fonts
const colorsWave = [
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

//colors depending on the time
const now = DateTime.now().setZone("Europe/Rome").hour;
const whatColor = Math.floor(now / 5);

//Set palettes
const palette = ColorPalettesRange.SetColorPalette(
  colorsWave[whatColor].startColor
);
const gradientWave1 = palette.gradient({
  numColors: 10,
  endColor: colorsWave[whatColor].endColor,
});

const waveColors = {
  wave1: [],
  wave2: [],
};
waveColors.wave1 = gradientWave1.map((element) => {
  return element.printHex();
});
waveColors.wave2 = gradientWave1.reverse().map((element) => {
  return element.printHex();
});

// computed
const start = computed(() => {
  return colorsWave[whatColor].startColor.printHex();
});
const stop = computed(() => {
  return colorsWave[whatColor].endColor.printHex();
});

//Setup Colors Map
const label = computed(() => {
  const baseColor = colorsWave[whatColor].endColor;
  baseColor.setBrightness(60);
  const palette = ColorPalettesRange.SetColorPalette(
    colorsWave[whatColor].endColor
  );
  const [, color] = palette.triad();
  return color.printHex();
});

const labelSecondary = computed(() => {
  return state.isDark ? "white" : "black";
});

const lineMap = computed(() => {
  const baseColor = colorsWave[whatColor].endColor;
  baseColor.setBrightness(90);
  return baseColor.printHex();
});

//Elements map
const elements = [
  {
    data: {
      id: "1",
      label: "Articles",
      name: "all",
      tag: "articles",
      size: 3,
      aside: true,
      color: label.value,
    },
    renderedPosition: {
      x: -10000,
      y: -2000,
    },
  },

  {
    data: {
      id: "2",
      label: "Projects",
      name: "project",
      tag: "project",
      size: 3,
      aside: false,
      color: label.value,
    },
    renderedPosition: {
      x: 10000,
      y: 500,
    },
  },
  {
    data: {
      id: "3",
      label: "Javascript",
      name: "javascript",
      tag: "articles",
      size: 2,
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
      size: 2,
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
      size: 2,
      aside: true,
      color: labelSecondary.value,
    },
  },
  {
    data: {
      id: "6",
      label: "Teaching",
      name: "teaching",
      size: 3,
      aside: false,
      color: label.value,
    },
  },
  {
    data: {
      id: "7",
      label: "HTML",
      name: "html",
      size: 2,
      aside: false,
      color: labelSecondary.value,
    },
  },

  {
    data: {
      id: "8",
      label: "Laravel",
      name: "laravel",
      size: 2,
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
      size: 2,
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
      size: 2,
      aside: true,
      color: labelSecondary.value,
    },
  },
  {
    data: {
      id: "12",
      label: "SASS",
      name: "sass",
      size: 2,
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
      size: 2,
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

//setup map
const map = ref(null);

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
          "font-size": "9",
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
    elements,
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
              width: element.data("size") + 4,
              height: element.data("size") + 4,
            },
            duration: 1000,
          });

          setTimeout(() => {
            jAni.play();
          }, 1100);
        });
    });
}

function reloadMap() {
  console.log(labelSecondary.value);
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

//aside
function closeAside() {
  router.push({
    name: "home",
  });
  state.aside = false;
}

onMounted(() => {
  setTimeout(() => {
    state.graph = initGraph();
  }, 300);
});
</script>

<template>
  <!-- ico dark mode -->
  <div
    class="dark-mode"
    @click="(state.isDark = !state.isDark), reloadMap()"
    :style="`--text-color: ${state.isDark ? 'white' : 'black'}; `"
  >
    <i class="fa-solid fa-lightbulb" v-show="!state.isDark"></i>
    <i class="fa-regular fa-lightbulb" v-show="state.isDark"></i>
  </div>
  <!-- /ico dark mode -->

  <!-- container top -->
  <div
    class="container"
    :style="`
    --start: ${start}; --stop: ${stop}; 
    --text-color: ${state.isDark ? 'white' : 'black'}; 
    --bg: ${state.isDark ? 'black' : 'white'};  
    --bg-aside: ${state.isDark ? '#212121' : 'black'};`"
  >
    <Header class="header" />

    <div class="wave">
      <Wave :colors="waveColors" />
    </div>

    <footer class="footer" id="map" ref="map"></footer>

    <aside :class="{ move: state.aside }" class="aside">
      <a class="close" @click.prevent="closeAside">
        <i class="fa-solid fa-arrow-right"></i> <span>Close</span>
      </a>
      <div class="aside__content">
        <!-- aside router view -->
        <RouterView name="aside" />
      </div>
    </aside>
  </div>
  <!-- /container top -->

  <!-- container bottom -->
  <div
    class="container-bottom"
    :class="{ fixed: state.aside, dark: state.isDark }"
    :style="`--start: ${start}; --stop: ${stop}; --text-color: ${
      state.isDark ? 'white' : 'black'
    }; --bg: ${state.isDark ? 'black' : 'white'};`"
  >
    <main class="main content">
      <!-- main router view -->
      <RouterView />
    </main>
  </div>
  <!-- /container bottom -->
</template>

<style lang="scss">
// variables
$xs: 798px;
$sm: 1200px;

:root {
  --start: "";
  --stop: "";
  --bg: white;
  --bg-aside: black;
  --text-color: white;
}

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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a:hover {
  filter: invert(0.8);
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

#app {
  overflow: hidden;
  background-color: var(--bg);
}

.dark-mode {
  position: fixed;
  top: 0.5em;
  left: 0.5em;
  z-index: 10;
  font-size: 1.7em;
  color: var(--text-color);
  cursor: pointer;
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
    grid-template-rows: 15% 30% 8% 47%;
  }

  .wave,
  .header,
  .footer {
    background-color: var(--bg);
  }

  .header {
    display: grid;
    align-items: center;
    grid-template-columns: 30% 1fr;
    grid-column: 2 / 3;
    grid-row: 1;

    gap: 1em;

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
      color: var(--stop);

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

    height: 100%;

    svg {
      filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
    }

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
  }
}

.aside {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 100%;
  width: 70%;
  height: 100vh;
  padding: 2em;
  background-color: var(--bg-aside);
  color: white;
  overflow: auto;
  @media screen and (max-width: $sm) {
    width: 100%;
    font-size: 0.6em;
  }
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

  .close {
    display: none;
    position: fixed;
    top: 1em;
    right: 1em;
    align-items: center;
    gap: 0.2em;
    font-size: 3em;
    z-index: 3;
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

// Container bottom zindex text content
.container-bottom {
  display: grid;
  grid-template-columns: 5% 80% 15%;
  grid-template-rows: 15% auto;
  z-index: 0;
  position: relative;
  height: 120vh;
  margin-bottom: 20%;

  background-color: var(--bg);
  color: var(--text-color);

  &.fixed {
    position: fixed;
  }

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
      @include radial;

      @media screen and (max-width: $sm) {
        text-align: left;
        padding-top: 1em;
      }

      font-weight: 400;
      font-size: 1.8em;
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
