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
  setAside(status: boolean): void;
  setIsDark(status: boolean): void;
  setIsLoading(status: boolean): void;
  setFooterIsOpen(status: boolean): void;
  setError(status: boolean): void;
  setArticles(articles: string[]): void;
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
  value: false,
  setAside(status) {
    this.aside = status;
  },
  setIsDark(status) {
    this.isDark = status;
  },
  setIsLoading(status) {
    this.isLoading = status;
  },
  setFooterIsOpen(status) {
    this.footerIsOpen = status;
  },
  setError(status) {
    this.error = status;
  },
  setArticles(articles) {
    this.articles = articles;
  },
});
