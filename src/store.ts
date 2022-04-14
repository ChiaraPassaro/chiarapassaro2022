import { reactive } from "vue";
import { baseColor } from "./types/baseColor";
import { waveColors } from "./types/waveColors";

interface stateInterface {
  aside: boolean;
  isDark: boolean;
  isLoading: boolean;
  footerIsOpen: boolean;
  error: boolean;
  articles: string[];
  graph: any;
  baseColorsWave: baseColor[];
  now: number;
  waveColorsHex: waveColors;
  whatColor: number;
}

//State
export const state: stateInterface = reactive({
  aside: false,
  isDark: false,
  isLoading: false,
  footerIsOpen: false,
  error: false,
  articles: [],
  graph: {},
  baseColorsWave: [],
  now: 1,
  waveColorsHex: {
    wave1: [],
    wave2: [],
  },
  whatColor: 0,
});
