interface Color {
  name: "HSL";
  getBrightness: () => string;
  getHue: () => string;
  getSaturation: () => string;
  printHex: () => string;
  printHsl: () => string;
  printRgb: () => string;
  setBrightness: (number: number) => string;
  setHue: (number: number) => string;
  setSaturation: (number: number) => string;
}

export interface baseColor {
  startColor: Color;
  endColor: Color;
}
