import { reactive } from "vue";
import { baseColor } from "./types/baseColor";
import { waveColors } from "./types/waveColor";

interface stateInterface {
  aside: boolean;
  isDark: boolean;
  footerIsOpen: boolean;
  baseColorsWave: baseColor[];
  now: number;
  waveColorsHex: waveColors;
}

//State
export const state: stateInterface = reactive({
  aside: false,
  isDark: false,
  footerIsOpen: false,
  graph: {},
  baseColorsWave: [],
  now: 1,
  waveColorsHex: {
    wave1: [],
    wave2: [],
  },
  setAside(status) {
    this.aside = status;
  },
  setIsDark(status) {
    this.isDark = status;
  },
});
