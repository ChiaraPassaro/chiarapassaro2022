import ColorPalettesRange from "@chiarapassaro/color-palettes-range/src/js/index";

export function useGenerateBaseColors() {
  return [
    {
      startColor: new ColorPalettesRange.Hsl({
        hue: 180,
        saturation: 59,
        brightness: 55,
      }),
      endColor: new ColorPalettesRange.Hsl({
        hue: 208,
        saturation: 45,
        brightness: 75,
      }),
    },
    {
      startColor: new ColorPalettesRange.Hsl({
        hue: 180,
        saturation: 79,
        brightness: 55,
      }),
      endColor: new ColorPalettesRange.Hsl({
        hue: 208,
        saturation: 65,
        brightness: 65,
      }),
    },
    {
      startColor: new ColorPalettesRange.Hsl({
        hue: 355,
        saturation: 97,
        brightness: 56,
      }),
      endColor: new ColorPalettesRange.Hsl({
        hue: 32,
        saturation: 76,
        brightness: 60,
      }),
    },
    {
      startColor: new ColorPalettesRange.Hsl({
        hue: 21,
        saturation: 46,
        brightness: 48,
      }),
      endColor: new ColorPalettesRange.Hsl({
        hue: 174,
        saturation: 25,
        brightness: 52,
      }),
    },
    {
      startColor: new ColorPalettesRange.Hsl({
        hue: 150,
        saturation: 25,
        brightness: 52,
      }),
      endColor: new ColorPalettesRange.Hsl({
        hue: 250,
        saturation: 25,
        brightness: 52,
      }),
    },
  ];
}
