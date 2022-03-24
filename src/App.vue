<script setup>
//Vue
import { reactive, computed, onMounted, ref } from "vue";
import Header from "@/components/Header.vue";
import Wave from "@/components/Wave.vue";

// colorpalette
import ColorPalettesRange from "@chiarapassaro/color-palettes-range/src/js/index";
import { DateTime } from "luxon";

import { useRouter } from "vue-router";

//cytoscape
import cytoscape from "cytoscape";
import cola from "cytoscape-cola";
cytoscape.use(cola);

//State
const state = reactive({
  aside: false,
});
const router = useRouter();

// Setup Colors
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

const now = DateTime.now().setZone("Europe/Rome").hour;
const whatColor = Math.floor(now / 5);

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

const lineMap = computed(() => {
  const baseColor = colorsWave[whatColor].endColor;
  baseColor.setBrightness(90);
  return baseColor.printHex();
});

//Elements map
const elements = {
  nodes: [
    {
      data: {
        id: "1",
        label: "Articles",
        name: "all",
        size: 3,
        aside: true,
        color: label.value,
      },
    },

    {
      data: {
        id: "2",
        label: "Projects",
        name: "project",
        size: 3,
        aside: false,
        color: label.value,
      },
    },
    {
      data: {
        id: "3",
        label: "Javascript",
        name: "javascript",
        size: 2,
        aside: true,
        color: "black",
      },
    },
    {
      data: {
        id: "4",
        label: "Ergonomics",
        name: "ergonomics",
        size: 2,
        aside: true,
        color: "black",
      },
    },
    {
      data: {
        id: "5",
        label: "Vuejs",
        name: "vuejs",
        size: 2,
        aside: true,
        color: "black",
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
        color: "black",
      },
    },

    {
      data: {
        id: "8",
        label: "Laravel",
        name: "laravel",
        size: 2,
        aside: false,
        color: "black",
      },
    },
    {
      data: {
        id: "9",
        label: "Color Palettes Range",
        name: "colorPalettesRange",
        size: 2,
        aside: true,
        color: "black",
      },
    },
    {
      data: {
        id: "10",
        label: "Vue Gantt",
        name: "vueGantt",
        size: 2,
        aside: true,
        color: "black",
      },
    },
    {
      data: {
        id: "11",
        label: "NPM",
        name: "npm",
        size: 3,
        aside: false,
        color: "black",
      },
    },
    {
      data: {
        id: "12",
        label: "SASS",
        name: "sass",
        size: 2,
        aside: false,
        color: "black",
      },
    },
  ],
  edges: [
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
        target: "11",
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
        target: "4",
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
        source: "4",
        target: "5",
      },
    },
  ],
};

//map container on mounted
const map = ref(null);
onMounted(() => {
  const graph = cytoscape({
    container: map.value,
    autounselectify: true,
    boxSelectionEnabled: false,
    pannable: false,
    layout: {
      name: "cola",
      animate: true,
      refresh: 1,
      maxSimulationTime: 30000,
      fit: true,
      padding: 20,
      nodeDimensionsIncludeLabels: false,
      randomize: false,
      avoidOverlap: true,
      handleDisconnected: true,
      convergenceThreshold: 0.01,
      nodeSpacing: function (node) {
        return 18;
      },
      edgeLength: 40, // sets edge length directly in simulation
    },
    style: [
      {
        selector: "node",
        style: {
          "background-color": start.value,
          label: "data(label)",
          color: "data(color)",
          "font-size": "8",
          width: "data(size)",
          height: "data(size)",
          "border-width": "0.2",
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
    .on("mouseover", "node", function (evt) {
      const node = evt.target;
      if (node.data("aside")) {
        const label = node.style("label");
        node.style("label", "Open " + label);
      }
    })
    .on("mouseout", "node", function (evt) {
      const node = evt.target;
      if (node.data("aside")) {
        const label = node.style("label").replace("Open", "");
        node.style("label", label);
      }
    })
    .on("tap", "node", function (evt) {
      const node = evt.target;
      //open modal
      if (node.data("aside")) {
        const type = node.data("name");

        router.push({
          name: "articles",
          params: {
            type: type,
          },
        });
        state.aside = true;
      }
    })
    .on("layoutstop", function () {
      this.nodes()
        .filter(function (ele) {
          return ele.data("aside");
        })
        .forEach((element) => {
          const jAni = element.animation({
            style: {
              width: element.data("size") + 4,
              height: element.data("size") + 4,
            },
            duration: 1000,
          });

          setInterval(() => {
            jAni.play().reverse();
          }, 3000);
        });
    });
});

//methods
function closeAside() {
  router.push({
    name: "home",
  });
  state.aside = false;
}
</script>

<template>
  <div class="container" :style="`--start: ${start}; --stop: ${stop};`">
    <Header class="header"></Header>

    <div class="wave">
      <!-- <div
        v-for="color in gradientWave1"
        :key="color"
        :style="`background: ${color.printHex()};`"
      >
        {{ color.printHsl() }}
      </div> -->
      <Wave :colors="waveColors"></Wave>
    </div>
    <footer class="footer" id="map" ref="map"></footer>
  </div>
  <div
    class="container-bottom"
    :class="{ fixed: state.aside }"
    :style="`--start: ${start}; --stop: ${stop};`"
  >
    <main class="main content">
      <RouterView />
    </main>
  </div>
  <aside v-show="state.aside" class="aside">
    <div class="close" @click="closeAside">
      <i class="fa-solid fa-circle-xmark"></i>
    </div>
    <div class="aside__content">
      <RouterView name="aside" />
    </div>
  </aside>
</template>

<style lang="scss">
//TODO add min height
@mixin title {
  background: radial-gradient(circle, var(--start) 0%, var(--stop) 100%);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;

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
    background-color: white;
  }
}

.aside {
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  width: 70%;
  min-height: 100vh;
  background-color: black;
  color: white;
  padding: 2em;
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
