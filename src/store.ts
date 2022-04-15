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
  stop: string;
  start: string;
  label: string;
  labelSecondary: string;
  lineMap: string;
  setAside(status: boolean): void;
  setIsDark(status: boolean): void;
  setIsLoading(status: boolean): void;
  setFooterIsOpen(status: boolean): void;
  setError(status: boolean): void;
  setArticles(articles: string[]): void;
  setWhatColor(color: number): void;
  setStart(color: string): void;
  setStop(color: string): void;
  setLabel(color: string): void;
  setLabelSecondary(color: string): void;
  setLineMap(color: string): void;
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
  start: "",
  stop: "",
  label: "",
  labelSecondary: "",
  lineMap: "",
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
  setWhatColor(number) {
    this.whatColor = number;
  },
  setStart(color) {
    this.start = color;
  },
  setStop(color) {
    this.stop = color;
  },
  setLabel(color) {
    this.label = color;
  },
  setLabelSecondary(color) {
    this.labelSecondary = color;
  },
  setLineMap(color) {
    this.lineMap = color;
  },
});
