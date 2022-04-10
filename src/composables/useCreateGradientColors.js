import ColorPalettesRange from "@chiarapassaro/color-palettes-range/src/js/index";

export function useCreateGradientColors({ colorStart, colorEnd, numColors }) {
  const palette = ColorPalettesRange.SetColorPalette(colorStart);

  const gradient = palette.gradient({
    numColors,
    endColor: colorEnd,
  });

  return gradient;
}
