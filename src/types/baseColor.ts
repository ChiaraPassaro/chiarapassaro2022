interface Color {
  name: "HSL";
  getBrightness: () => string;
  getHue: () => string;
  getSaturation: () => string;
  printHex: () => string;
  printHsl: () => string;
  printRgb: () => string;
  setBrightness: () => string;
  setHue: () => string;
  setSaturation: () => string;
}

export interface baseColor {
  startColor: Color;
  endColor: Color;
}
