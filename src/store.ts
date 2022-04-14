import { reactive } from "vue";
import { baseColor } from "./types/baseColor";
import { waveColors } from "./types/waveColors";

interface stateInterface {
  aside: boolean;
  isDark: boolean;
  isLoading: boolean;
  footerIsOpen: boolean;
  baseColorsWave: baseColor[];
  now: number;
  waveColorsHex: waveColors;
  whatColor: number;
  graph: any;
  setAside(status: boolean): void;
  setIsDark(status: boolean): void;
}

//State
export const state: stateInterface = reactive({
  aside: false,
  isDark: false,
  isLoading: false,
  footerIsOpen: false,
  graph: {},
  baseColorsWave: [],
  now: 1,
  waveColorsHex: {
    wave1: [],
    wave2: [],
  },
  whatColor: 0,
  setAside(status) {
    this.aside = status;
  },
  setIsDark(status) {
    this.isDark = status;
  },
});
