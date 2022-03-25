# [Download From NPM](https://www.npmjs.com/package/@chiarapassaro/color-palettes-range) @chiarapassaro/color-palettes-range

![Color Palette](https://raw.githubusercontent.com/ChiaraPassaro/color-palettes-range/master/screen/screen141.jpg)

# Are you bored with classic color palettes?
Now you can generate more than three or five colors palette:
take a Complementary Palette or a Random Dominant Palette, and you can decide how many colors you want!

V2.0.3

## Update
Added Gradient from BaseColor to EndColor

## Install
```JS
$ npm init
$ npm install @chiarapassaro/color-palettes-range
```

## Usage
```
var ColorPalettesRange = require("@chiarapassaro/color-palettes-range/src/js");
```

## Functionality

### Create Hsl color:<br/>
```JS
var baseColor = new ColorPalettesRange.Hsl(
    {
        hue, 
        saturation, 
        brightness
    }
);
```

##### Props: <br/>
Hue degree (1-360)<br/>
Saturation (1-100)<br/>
Brightness (1-100)<br/>

##### Methods:
```JS
baseColor.getHue() -> number
baseColor.getSaturation() -> number
baseColor.getBrightness() -> number
baseColor.setHue(number)
baseColor.setSaturation(number)
baseColor.setBrightness(number)
baseColor.printHsl() -> string hsl(hue, saturation% , brightness%)
baseColor.printRgb() -> string rgb(value, value , value)
baseColor.printHex() -> string #RRGGBB

```

### Create palettes:<br/>
```JS
var palettes = new ColorPalettesRange.SetColorPalette(baseColor)
```
##### Arguments: <br/>
Base Color  [obj Hsl]

##### Methods:

### Base Color
```JS
palettes.getBasecolor() -> obj Hsl()
updateColorPalette(newColor)
```
### Triadic:<br/>
#### Create Triadic scheme:<br/>
```JS
palettes.triad()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl(), ...]
```
#### Get palettes Triadic
```JS
palettes.getTriad()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl(), ...]
```


### Create Complementary palettes:<br/>
```JS
palettes.complementar(
    {
        numColor, 
        stepDegree
    }
);
```
##### Props:<br/>
Color number - even <br/>
Step degree between colors<br/>
Max degree numColor*step = 140<br/>
##### Return:
```JS
Array [obj Hsl(), obj Hsl(), ...]
```
#### Get palettes complementary colors
```JS
palettes.getComplementar()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl(), ...]
```


### Create Split complementary palettes:<br/>
```JS
palettes.splitComplementar()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl()]
```
#### Get palettes Split complementary colors
```JS
palettes.splitComplementar()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl(), ...]
```


### Create Analogous palettes:<br/>
```JS
palettes.analogous(
    {
        typeScheme, 
        numColor, 
        stepDegree
    }
);
```
##### Props:<br/>
Scheme Type: 'allArch', 'cold', 'warm'<br/>
Colors number - even<br/>
Step degree between colors<br/>
Max degree numColor*step = 60<br/>
##### Return:
```JS
Array [obj Hsl(), obj Hsl(), ...]
```
#### Get analogous colors
```JS
palettes.getAnalogous()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl(), ...]
```


### Create tetradic palettes:<br/>
```JS
palettes.tetradic()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl()]
```
#### Get Tradic Colors
```JS
palettes.getTetradic()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl(), ...]
```


### Create Square palettes:<br/>
```JS
palettes.square()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl()]
```
#### Get Square colors
```JS
palettes.getSquare()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl(), ...]
```

### Create Monochrome palettes:<br/>
```JS
palettes.mono (
    {
        numColor, 
        stepDegree, 
        typeScheme
    }
)'
```
##### Props:<br/>
Colors number - even<br/>
Step degree between colors<br/>
Max degree numColor*step = 100<br/>
Scheme type = saturation / brightness
##### Return:
```JS
Array [obj Hsl(), obj Hsl()]
```
#### Get Monochrome colors
```JS
palettes.getMono()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl(), ...]
```


### Create Random with Dominat Color palettes
```JS
palettes.randomDominant(
    {
        numColor, 
        percDominant
    }
);
```
##### Props:<br/>
Colors number - even (1-360)<br/>
Color Dominant Percentage (1-100)<br/>
##### Return:
```JS
Array [obj Hsl(), obj Hsl()]
```
#### Get Random Dominant colors
```JS
palettes.getRandomDominant()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl(), ...]
```

### Create Gradient Palette
```JS
palette.gradient({ numColors, endColor })
```
##### Props:<br/>
Colors number (1-100)<br/>
EndColor obj Hsl()<br/>
##### Return:
```JS
Array [obj Hsl(), obj Hsl()]
```
#### Get Gradient Palette
```JS
palettes.getGradient()
```
##### Return:
```JS
Array [obj Hsl(), obj Hsl(), ...]
```


## Conversion Utilities
### Convert Hsl color:<br/>
```JS
var color = new ColorPalettesRange.HslConvert(
    {
        hue, 
        saturation, 
        brightness
    }
)
```

##### Props: <br/>
hue (1-360)<br/>
saturation (1-100)<br/>
brightness (1-100)<br/>

##### Methods:
```JS
color.getRgb() -> [Obj] new Rgb(r, g, b)
color.getRed() -> number
color.getGreen() -> number
color.getBlue() -> number
color.getHex() -> [Obj] new Hex(#RRGGBB)
```

### Convert Rgb color:<br/>
```JS
var color = new ColorPalettesRange.RgbConvert(
    {
        red, 
        green,
        blue
    }
);
```

##### Props: <br/>
red (1-255)<br/>
green (1-255)<br/>
blue (1-255)<br/>

##### Methods:
```JS
color.getHsl() -> [Obj] new Hsl({hue, saturation, brightness})
color.getHue() -> number
color.getSaturation() -> number
color.getBrightness() -> number
color.getHex() -> [Obj] new Hex(#RRGGBB)
```

### Convert Hex color:<br/>
```JS
var color = new ColorPalettesRange.HexConvert(#RRGGBB)
```

##### Arguments: <br/>
hex (#RRGGBB)<br/>

##### Methods:
```JS
color.getRgb() -> [Obj] new Rgb(r, g, b)
color.getRed() -> number
color.getGreen() -> number
color.getBlue() -> number
color.getHsl() -> [Obj] new Hsl({hue, saturation, brightness})
color.getHue() -> number
color.getSaturation() -> number
color.getBrightness() -> number
```

### Create Rgb color:<br/>
```JS
var color = new ColorPalettesRange.Rgb(
    {
        red, 
        green, 
        blue
    }
);
```

##### Props: <br/>
Red (1-255)<br/>
Green (1-255)<br/>
Blue (1-255)<br/>

##### Methods:
```JS
color.getRed() -> number
color.getGreen() -> number
color.getBlue() -> number
color.printHsl() -> string rgb(r, g , b)
color.setRed(number)
color.setBlue(number)
color.setGreen(number)

```

### Create Hex color:<br/>
```JS
var color = new ColorPalettesRange.Hex(#RRGGBB)
```

##### Arguments: <br/>
\#RRGGBB

##### Methods:
```JS
color.printHex() -> string #RRGGBB
color.setHex(#RRGGBB)
```

