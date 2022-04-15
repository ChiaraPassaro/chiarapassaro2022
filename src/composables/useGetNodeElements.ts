import { computed, toRefs } from "@vue/reactivity";
import { state } from "../store";

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
        color: state.label,
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
        color: state.label,
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
        color: state.labelSecondary,
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
        color: state.labelSecondary,
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
        color: state.labelSecondary,
      },
    },
    {
      data: {
        id: "6",
        label: "Teaching",
        name: "teaching",
        size: 6,
        aside: false,
        color: state.label,
      },
    },
    {
      data: {
        id: "7",
        label: "HTML",
        name: "html",
        size: 5,
        aside: false,
        color: state.labelSecondary,
      },
    },

    {
      data: {
        id: "8",
        label: "Laravel",
        name: "laravel",
        size: 5,
        aside: false,
        color: state.labelSecondary,
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
        color: state.labelSecondary,
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
        color: state.labelSecondary,
      },
    },
    {
      data: {
        id: "12",
        label: "SASS",
        name: "sass",
        size: 5,
        aside: false,
        color: state.labelSecondary,
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
        color: state.labelSecondary,
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

export default function useGetNodeElements() {
  return elements;
}
