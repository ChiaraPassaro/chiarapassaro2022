import ColorPalettesRange from "@chiarapassaro/color-palettes-range/src/js/index";
import { state } from "../store";
import { useCreateGradientColors } from "./useCreateGradientColors";

export default function useInitColors(whatColor) {
  state.setWhatColor(whatColor);
  state.setStart(state.baseColorsWave[state.whatColor].startColor.printHex());
  state.setStop(state.baseColorsWave[state.whatColor].endColor.printHex());

  const paletteLabel = ColorPalettesRange.SetColorPalette(
    state.baseColorsWave[state.whatColor].endColor
  );
  const [, colorLabel] = paletteLabel.triad();
  colorLabel.setBrightness(30);
  state.setLabel(colorLabel.printHex());

  state.setLabelSecondary(state.isDark ? "white" : "black");

  const baseColorLineMap = new ColorPalettesRange.Hsl({
    hue: state.baseColorsWave[state.whatColor].endColor.getHue(),
    saturation: state.baseColorsWave[state.whatColor].endColor.getSaturation(),
    brightness: state.baseColorsWave[state.whatColor].endColor.getBrightness(),
  });
  baseColorLineMap.setBrightness(90);
  state.setLineMap(baseColorLineMap.printHex());

  const waveColorsHex = useCreateGradientColors({
    colorStart: state.baseColorsWave[state.whatColor].startColor,
    colorEnd: state.baseColorsWave[state.whatColor].endColor,
    numColors: 10,
  });

  state.setWaveColors(waveColorsHex);
}
