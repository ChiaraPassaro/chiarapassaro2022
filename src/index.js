//************************//
//********Utilities********//
//************************//

function isGreaterThan(num, max) {
    if (num > max) {
        return true;
    }
}

function isInRange(num, min, max) {
    if (num >= min && num <= max) {
        return true;
    }
}

function isEven(number) {
    let even = false;
    if (number % 2 === 0) {
        even = true;
    }
    return even;
}

function getIntRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function numberToHex(number) {
    let hex = number.toString(16);

    if (hex.length === 1) {
        hex = '0' + hex;
    }
    return hex;
}

function hexToNumber(hex) {
    return parseInt(hex, 16);
}

function isHex(str) {
    return /^[A-F0-9]+$/i.test(str)
}

//************************//
//********Functions********//
//************************//

const hueMin = 0;
const hueMax = 360;
const saturationMin = 0;
const saturationMax = 100;
const brightnessMin = 0;
const brightnessMax = 100;

function Hsl({ hue, saturation, brightness }) {
    if (isNaN(hue)) throw 'Hue in Not a Number';
    if (!isInRange(hue, hueMin, hueMax)) throw 'Hue number out of range';
    if (isNaN(saturation)) throw 'Saturation in Not a Number';
    if (!isInRange(saturation, saturationMin, saturationMax)) throw 'Saturation number out of range';
    if (isNaN(brightness)) throw 'Brightness in Not a Number';
    if (!isInRange(brightness, brightnessMin, brightnessMax)) throw 'Brightness number out of range';

    hue = parseFloat(hue.toFixed(2));
    saturation = parseFloat(saturation.toFixed(2));
    brightness = parseFloat(brightness.toFixed(2));

    this.getHue = function () {
        return hue;
    };
    this.getSaturation = function () {
        return saturation;
    };
    this.getBrightness = function () {
        return brightness;
    };
    this.printHsl = function () {
        return 'hsl(' + hue + ', ' + saturation + '%, ' + brightness + '%)';
    };

    this.printRgb = function () {
        const converter = new HslConvert({ hue: this.getHue(), saturation: this.getSaturation(), brightness: this.getBrightness() });
        return converter.getRgb().printRgb();
    };

    this.printHex = function () {
        const converter = new HslConvert({ hue: this.getHue(), saturation: this.getSaturation(), brightness: this.getBrightness() });
        return converter.getHex().printHex();
    };

    this.setHue = function (newHue) {
        if (isNaN(newHue)) throw 'Hue in Not a Number';
        if (!isInRange(newHue, hueMin, hueMax)) throw 'Hue number out of range';

        hue = parseFloat(newHue.toFixed(2));
        return hue;
    };

    this.setSaturation = function (newSaturation) {
        if (isNaN(newSaturation)) throw 'Saturation in Not a Number';
        if (!isInRange(newSaturation, saturationMin, saturationMax)) throw 'Saturation number out of range';

        saturation = parseFloat(newSaturation.toFixed(2));
        return saturation;
    };

    this.setBrightness = function (newBrightness) {
        if (isNaN(newBrightness)) throw 'Brightness in Not a Number';
        if (!isInRange(newBrightness, brightnessMin, brightnessMax)) throw 'Brightness number out of range';

        brightness = parseFloat(newBrightness.toFixed(2));
        return brightness;
    };

    return this;
}

function Rgb({ red, green, blue }) {
    const minValue = 0;
    const maxValue = 255;
    if (isNaN(red)) throw 'Red in Not a Number';
    if (!isInRange(red, minValue, maxValue)) throw 'Red number out of range';
    if (isNaN(green)) throw 'Green in Not a Number';
    if (!isInRange(green, minValue, maxValue)) throw 'Green number out of range';
    if (isNaN(blue)) throw 'Blue in Not a Number';
    if (!isInRange(blue, minValue, maxValue)) throw 'Blue number out of range';

    this.getRed = function () {
        return red;
    };

    this.getGreen = function () {
        return green;
    };

    this.getBlue = function () {
        return blue;
    };

    this.printRgb = function () {
        return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    };

    this.setRed = function (newRed) {
        if (isNaN(newRed)) throw 'Red in Not a Number';
        if (!isInRange(newRed, minValue, maxValue)) throw 'Red number out of range';

        red = newRed;
        return red;
    };

    this.setGreen = function (newGreen) {
        if (isNaN(newGreen)) throw 'Green in Not a Number';
        if (!isInRange(newGreen, minValue, maxValue)) throw 'Green number out of range';

        green = newGreen;
        return green;
    };

    this.setBlue = function (newBlue) {
        if (isNaN(newBlue)) throw 'Blue in Not a Number';
        if (!isInRange(newBlue, minValue, maxValue)) throw 'Blue number out of range';

        blue = newBlue;
        return blue;
    };

    return this;
}

function Hex(hex) {
    hex = hex.replace('#', '');

    if (!isHex(hex)) throw 'This is in Not a Hex ' + hex;

    this.printHex = function () {
        return '#' + hex;
    };

    this.setHex = function (newHex) {
        newHex = newHex.replace('#', '');
        if (!isHex(newHex)) throw 'This is in Not a Hex';

        hex = newHex;
        return hex;
    };

    return this;
}

function SetColorPalette(baseColor) {

    if (baseColor.constructor !== Hsl) throw 'Basecolor is not an object';

    const totalDegree = 360;
    let triad;
    let complementar;
    const analogous = {
        'allArch': null,
        'cold': null,
        'warm': null,
    };
    let splitComplementar;
    let square;
    let tetradic;
    const mono = {
        'saturation': null,
        'brightness': null,
    };
    let randomDominant;
    let gradient;

    this.getBasecolor = function () {
        return baseColor;
    };

    this.updateColorPalette = function (newColor) {
        if (newColor.constructor !== Hsl) throw 'Basecolor is not an object';
        baseColor = newColor;
    };

    this.triad = function () {
        triad = getColors(240, 2, 60);
        return triad;
    };

    this.getTriad = function () {
        return triad;
    };

    this.complementar = function ({ numColor, stepDegree }) {
        if (!isEven(numColor)) throw 'The Colors must be even';
        complementar = getColors(140, numColor, stepDegree, 'complementary');
        return complementar;
    };

    this.getComplementar = function () {
        return complementar;
    };

    this.analogous = function ({ typeScheme, numColor, stepDegree }) {
        if (!isEven(numColor)) throw 'The Colors must be even';

        switch (typeScheme) {
            case 'allArch':
                analogous.allArch = getColors(120, numColor, stepDegree, 'analogous');
                return analogous.allArch;
            case 'cold':
                analogous.cold = getColors(120, numColor, stepDegree, 'analogousCold');
                return analogous.cold;
            case 'warm':
                analogous.warm = getColors(120, numColor, stepDegree, 'analogousWarm');
                return analogous.warm;
        }

    };

    this.getAnalogous = function () {
        return analogous;
    };

    this.splitComplementar = function () {
        splitComplementar = getColors(60, 2, 30, 'splitComplementary');
        return splitComplementar;
    };

    this.getSplitComplementar = function () {
        return splitComplementar;
    };

    this.square = function () {
        square = getColors(270, 3, 90, 'square');
        return square;
    };

    this.getSquare = function () {
        return square;
    };

    this.tetradic = function () {
        tetradic = getColors(330, 3, 30, 'tetradic');
        return tetradic;
    };

    this.getTetradic = function () {
        return tetradic;
    };

    this.mono = function ({ numColor, stepDegree, typeScheme }) {
        if (!isEven(numColor)) throw 'The Colors must be even';
        if (!typeScheme) throw "Type scheme isn't valid";
        switch (typeScheme) {
            case 'saturation':
                mono.saturation = getColorsMono({ numColor, stepDegree, scheme: 'monoSaturation' });
                return mono.saturation;
            case 'brightness':
                mono.brightness = getColorsMono({ numColor, stepDegree, scheme: 'monoBrightness' });
                return mono.brightness;
            default:
                throw "Type scheme isn't valid";
                break;
        }

    };

    this.getMono = function () {
        return mono;
    };

    this.randomDominant = function ({ numColor, percDominant }) {
        const minHue = 0;
        const maxHue = 360;
        const minPerc = 0;
        const maxPerc = 100;
        if (isNaN(numColor)) throw 'NumColor in Not a Number';
        if (!isInRange(numColor, minHue, maxHue)) throw 'Numcolor number out of range';
        if (isNaN(percDominant)) throw 'PercDominant in Not a Number';
        if (!isInRange(percDominant, minPerc, maxPerc)) throw 'PercDominant number out of range';

        randomDominant = getRandomColors({ numColor, percDominant });
        return randomDominant;
    };

    this.getRandomDominant = function () {
        return this.randomDominant;
    };


    this.gradient = function ({ numColors, endColor }) {
        const minColors = 2;
        const maxColors = 100;
        if (isNaN(numColors)) throw 'NumColor in Not a Number';
        if (!isInRange(numColors, minColors, maxColors)) throw 'Numcolors number out of range';
        if (endColor.constructor !== Hsl) throw 'EndColor is not an object Color';

        gradient = getGradientColors({ numColors, endColor });
        return gradient;
    };

    this.getGradient = function () {
        return gradient;
    };

    function getColors(rangeDegree, numColor = 2, stepDegree = 10, scheme = false) {
        rangeDegree = parseFloat(rangeDegree.toFixed(2));
        numColor = Math.floor(numColor);
        stepDegree = parseFloat(stepDegree.toFixed(2));

        if (stepDegree * numColor > rangeDegree) throw 'Out of range >' + rangeDegree;

        let firstSchemeColor = parseFloat((baseColor.getHue() + 180).toFixed(2));

        switch (scheme) {
            case 'complementary':
                firstSchemeColor = parseFloat((baseColor.getHue() + 180).toFixed(2));
                break;
            case 'square':
                firstSchemeColor = parseFloat((baseColor.getHue()).toFixed(2));
                break;
            case 'tetradic':
                firstSchemeColor = parseFloat((baseColor.getHue() - 30).toFixed(2));
                break;
            case 'analogous':
                firstSchemeColor = parseFloat((baseColor.getHue()).toFixed(2));
                break;
            case 'analogousCold':
                firstSchemeColor = parseFloat((baseColor.getHue()).toFixed(2));
                break;
            case 'analogousWarm':
                firstSchemeColor = parseFloat((baseColor.getHue()).toFixed(2));
                break;
        }

        if (isGreaterThan(firstSchemeColor, totalDegree)) {
            firstSchemeColor = firstSchemeColor - totalDegree;
        }

        const arrayColors = [firstSchemeColor];
        let newColor;
        for (let i = numColor / 2; i >= 1; i--) {
            newColor = parseFloat((arrayColors[arrayColors.length - 1] - stepDegree).toFixed(2));
            arrayColors.push(newColor);
        }

        for (let i = 0; i < (numColor / 2); i++) {
            newColor = parseFloat((arrayColors[0] + stepDegree).toFixed(2));
            arrayColors.unshift(newColor);
        }

        arrayColors.map(function (currentValue, index) {
            if (isGreaterThan(currentValue, totalDegree)) {
                arrayColors[index] = parseFloat((currentValue - totalDegree).toFixed(2));
            }

            if (currentValue < 0) {
                arrayColors[index] = parseFloat((currentValue + totalDegree).toFixed(2));
            }

            arrayColors[index] = new Hsl({ hue: arrayColors[index], saturation: baseColor.getSaturation(), brightness: baseColor.getBrightness() });
        });

        if (scheme === 'analogous' || scheme === 'analogousCold' || scheme === 'analogousWarm') {
            arrayColors.reverse();
        }

        return arrayColors;
    }

    function getColorsMono({ numColor = 4, stepDegree = 10, scheme = false }) {

        const totalColors = 100;
        numColor = Math.floor(numColor);
        stepDegree = parseFloat(stepDegree.toFixed(2));

        if (stepDegree * numColor > totalColors) throw 'Out of range >' + totalColors;

        let firstSchemeColor;

        switch (scheme) {
            case 'monoSaturation':
                firstSchemeColor = parseFloat((baseColor.getSaturation()).toFixed(2));
                break;
            case 'monoBrightness':
                firstSchemeColor = parseFloat((baseColor.getBrightness()).toFixed(2));
                break;
        }

        const arrayColors = [firstSchemeColor];
        let newColor;
        for (let i = numColor / 2; i >= 1; i--) {
            newColor = parseFloat((arrayColors[arrayColors.length - 1] - stepDegree).toFixed(2));
            arrayColors.push(newColor);
        }

        for (let i = 0; i < (numColor / 2); i++) {
            newColor = parseFloat((arrayColors[0] + stepDegree).toFixed(2));
            arrayColors.unshift(newColor);
        }

        arrayColors.map(function (currentValue, index) {

            if (isGreaterThan(currentValue, totalColors)) {
                arrayColors[index] = parseFloat((currentValue - totalColors).toFixed(2));
            }

            if (currentValue < 0) {
                arrayColors[index] = parseFloat((currentValue + totalColors).toFixed(2));
            }

            switch (scheme) {
                case 'monoSaturation':
                    arrayColors[index] = new Hsl({ hue: baseColor.getHue(), saturation: arrayColors[index], brightness: baseColor.getBrightness() });
                    break;
                case 'monoBrightness':
                    arrayColors[index] = new Hsl({ hue: baseColor.getHue(), saturation: baseColor.getSaturation(), brightness: arrayColors[index] });
                    break;
            }

        });
        return arrayColors.reverse();
    }

    function getGradientColors({ numColors, endColor }) {
        let stepDegree
        let degreeStart = parseFloat((baseColor.getHue()).toFixed(2)); /*?*/
        let degreeEnd = parseFloat((endColor.getHue()).toFixed(2));/*?*/
        
        if (Math.abs(degreeStart - degreeEnd) <= numColors) throw 'Out of range > ' + numColors;
        
        --numColors /*?*/
        if (degreeStart < degreeEnd) {
             stepDegree = parseFloat((Math.abs(degreeStart - degreeEnd) / numColors));/*?*/  
        } else {
             let diff = 360 - degreeStart;/*?*/ 
             stepDegree = parseFloat((diff + degreeEnd) / numColors);/*?*/ 
        }
        
        const saturationSteps = Math.floor((endColor.getSaturation() - baseColor.getSaturation()) / numColors); 
        const brightnessSteps = Math.floor((endColor.getBrightness() - baseColor.getBrightness()) / numColors); 

        const arrayColors = [{hue: baseColor.getHue(), saturation: baseColor.getSaturation(), brightness: baseColor.getBrightness() }];/*?*/
        

        for (let i = 1; i < numColors; i++) {
            let  hue = arrayColors[i - 1].hue + stepDegree;  /*?*/ 

            if (hue > 360) {
                hue = hue - 360;  /*?*/ 
            } 

            hue = parseFloat(hue.toFixed(2))/*?*/ 

            let newColor =
                {
                    hue,
                    saturation: Math.abs(arrayColors[i - 1].saturation + saturationSteps),
                    brightness: Math.abs(arrayColors[i - 1].brightness + brightnessSteps)
                }/*?*/  
                ; 
                    
            arrayColors.push(newColor);/*?*/  
        }
        
        
        const newArray = arrayColors.map(function (currentValue) {
            return new Hsl(currentValue);/*?*/ 
        });
        
        newArray.push(endColor);

        return newArray;

    }

    function getRandomColors({ numColor = 10, percDominant }) {
        const totalDegree = 360;
        numColor = Math.floor(numColor);
        percDominant = Math.floor(percDominant);
        const step = [];

        while (step.length < numColor) {
            var randomStep = getIntRandomNumber(0, totalDegree);
            if (!step.includes(randomStep)) {
                step.push(randomStep);
            }
        }

        let firstSchemeColor = Math.floor(baseColor.getHue());

        let complementary = firstSchemeColor + 180;

        if (complementary < 0) {
            complementary = Math.floor((complementary + totalDegree));
        }

        if (isGreaterThan(complementary, totalDegree)) {
            complementary = Math.floor((complementary - totalDegree));
        }

        const arrayColors = [firstSchemeColor];
        let newColor;
        for (let i = 1; i < numColor; i++) {
            newColor = firstSchemeColor + step[i];
            if (newColor < 0) {
                newColor = Math.floor((newColor + totalDegree));
            }

            if (isGreaterThan(newColor, totalDegree)) {
                newColor = Math.floor((newColor - totalDegree));
            }

            arrayColors.push(newColor);
        }

        const firstSchemeColorInPerc = firstSchemeColor * 100 / totalDegree;

        arrayColors.map(function (currentValue, index) {

            let thisColorInPerc = currentValue * 100 / totalDegree;
            let perc = (Math.abs(firstSchemeColorInPerc - thisColorInPerc) / 100) * percDominant;

            let newColorInPerc;

            if (thisColorInPerc > firstSchemeColorInPerc) {
                newColorInPerc = thisColorInPerc - perc;
            } else {
                newColorInPerc = thisColorInPerc + perc;
            }

            currentValue = newColorInPerc / 100 * totalDegree;

            arrayColors[index] = Math.trunc(currentValue);

            arrayColors[index] = new Hsl({ hue: arrayColors[index], saturation: baseColor.getSaturation(), brightness: baseColor.getBrightness() });

        });

        return arrayColors;

    }

    return this;
}

function HslConvert({ hue, saturation, brightness }) {

    if (isNaN(hue)) throw 'Hue in Not a Number';
    if (!isInRange(hue, hueMin, hueMax)) throw 'Hue number out of range';
    if (isNaN(saturation)) throw 'Saturation in Not a Number';
    if (!isInRange(saturation, saturationMin, saturationMax)) throw 'Saturation number out of range';
    if (isNaN(brightness)) throw 'Brightness in Not a Number';
    if (!isInRange(brightness, saturationMin, saturationMax)) throw 'Brightness number out of range';

    saturation = saturation / 100;
    brightness = brightness / 100;

    /*
    Frome code by
    Vahid Kazemi https://gist.github.com/vahidk/05184faf3d92a0aa1b46aeaa93b07786
    */

    let c = (1 - Math.abs(2 * brightness - 1)) * saturation;
    let hp = hue / 60.0;
    let x = c * (1 - Math.abs((hp % 2) - 1));
    let rgb1;

    if (isNaN(hue)) rgb1 = [0, 0, 0];
    else if (hp <= 1) rgb1 = [c, x, 0];
    else if (hp <= 2) rgb1 = [x, c, 0];
    else if (hp <= 3) rgb1 = [0, c, x];
    else if (hp <= 4) rgb1 = [0, x, c];
    else if (hp <= 5) rgb1 = [x, 0, c];
    else if (hp <= 6) rgb1 = [c, 0, x];

    let m = brightness - c * 0.5;

    let r = Math.round(255 * (rgb1[0] + m));
    let g = Math.round(255 * (rgb1[1] + m));
    let b = Math.round(255 * (rgb1[2] + m));

    /*
        End code from  Vahid Kazemi
    */

    let rToHex = numberToHex(r);
    let gToHex = numberToHex(g);
    let bToHex = numberToHex(b);

    this.getRgb = function () {
        return new Rgb({ red: r, green: g, blue: b })
    };

    this.getRed = function () {
        return r;
    };

    this.getGreen = function () {
        return g;
    };

    this.getBlue = function () {
        return b;
    };

    this.getHex = function () {
        return new Hex('#' + rToHex + gToHex + bToHex);
    };

    return this;

}

function RgbConvert({ red, green, blue }) {
    const minValue = 0;
    const maxValue = 255;

    if (isNaN(red)) throw 'Red in Not a Number';
    if (!isInRange(red, minValue, maxValue)) throw 'Red number out of range';
    if (isNaN(green)) throw 'Green in Not a Number';
    if (!isInRange(green, minValue, maxValue)) throw 'Green number out of range';
    if (isNaN(blue)) throw 'Blue in Not a Number';
    if (!isInRange(blue, minValue, maxValue)) throw 'Blue number out of range';

    let rToHex = numberToHex(red);
    let gToHex = numberToHex(green);
    let bToHex = numberToHex(blue);

    /*
      Frome code by
      Vahid Kazemi https://gist.github.com/vahidk/05184faf3d92a0aa1b46aeaa93b07786
    */

    let r = red / 255;
    let g = green / 255;
    let b = blue / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let d = max - min;
    let hue;

    if (d === 0) hue = 0;
    else if (max === r) hue = ((((g - b) / d) % 6) + 6) % 6;
    else if (max === g) hue = (b - r) / d + 2;
    else if (max === b) hue = (r - g) / d + 4;

    let brightness = (min + max) / 2;
    let saturation = d === 0 ? 0 : d / (1 - Math.abs(2 * brightness - 1));
    hue = hue * 60;

    brightness = Math.floor(brightness * 100);
    saturation = Math.floor(saturation * 100);

    /*
        End code from  Vahid Kazemi
    */


    this.getHue = function () {
        return hue;
    };

    this.getSaturation = function () {
        return saturation;
    };

    this.getBrightness = function () {
        return brightness;
    };

    this.getHsl = function () {
        return new Hsl({ hue: hue, saturation: saturation, brightness: brightness })
    };

    this.getHex = function () {
        return new Hex('#' + rToHex + gToHex + bToHex);
    };

    return this;
}

function HexConvert(hex) {
    hex = hex.replace('#', '');

    if (!isHex(hex)) throw 'This is in Not a Hex';

    const rgb = {
        'r': '',
        'g': '',
        'b': ''
    };

    rgb.r = parseInt(hex.slice(0, 2), 16);
    rgb.g = parseInt(hex.slice(2, 4), 16);
    rgb.b = parseInt(hex.slice(4, 6), 16);

    this.getRgb = function () {
        return new Rgb({ red: rgb.r, green: rgb.g, blue: rgb.b });
    };

    this.getRed = function () {
        return rgb.r;
    };

    this.getGreen = function () {
        return rgb.g;
    };

    this.getBlue = function () {
        return rgb.b;
    };

    let hslConvert = new RgbConvert({ red: rgb.r, green: rgb.g, blue: rgb.b });

    this.getHsl = function () {
        return hslConvert.getHsl();
    };

    this.getHue = function () {
        return hslConvert.getHue();
    };

    this.getSaturation = function () {
        return hslConvert.getSaturation();
    };

    this.getBrightness = function () {
        return hslConvert.getBrightness();
    };
}

export default {
    Hsl: Hsl,
    Rgb: Rgb,
    Hex: Hex,
    SetColorPalette: SetColorPalette,
    HslConvert: HslConvert,
    RgbConvert: RgbConvert,
    HexConvert: HexConvert
};

