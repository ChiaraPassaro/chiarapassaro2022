import ColorPalettesRange from "@chiarapassaro/color-palettes-range/src/js/index";
import { baseColor } from "../types/baseColor";

export function useGenerateBaseColors() {
  const colors = [
    [
      { hue: 180, saturation: 59, brightness: 55 },
      { hue: 208, saturation: 45, brightness: 75 },
    ],
    [
      { hue: 180, saturation: 79, brightness: 55 },
      { hue: 208, saturation: 65, brightness: 65 },
    ],
    [
      { hue: 355, saturation: 97, brightness: 56 },
      { hue: 32, saturation: 76, brightness: 60 },
    ],
    [
      { hue: 21, saturation: 46, brightness: 48 },
      { hue: 174, saturation: 25, brightness: 52 },
    ],

    [
      { hue: 150, saturation: 25, brightness: 52 },
      { hue: 250, saturation: 25, brightness: 52 },
    ],
  ];

  const waveColors = colors.map((color) => {
    return {
      startColor: new ColorPalettesRange.Hsl(color[0]),
      endColor: new ColorPalettesRange.Hsl(color[1]),
    } as baseColor;
  });

  return waveColors;
}
