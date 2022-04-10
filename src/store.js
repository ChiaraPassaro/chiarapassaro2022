import { reactive } from "vue";

//State
export const state = reactive({
  aside: false,
  isDark: false,
  footerIsOpen: false,
  graph: {},
  baseColorsWave: [],
  now: {},
  waveColorsHex: {},
  setAside(status) {
    this.aside = status;
  },
  setIsDark(status) {
    this.isDark = status;
  },
});
