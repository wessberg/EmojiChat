/**
 * A map between HTML color names and their hex values.
 * @type {Object}
 */
const COLOR_NAMES = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgrey: "#d3d3d3",
    lightgreen: "#90ee90",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370d8",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#d87093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};
export class ColorOperations {
    isLight(color, luminance = 60) {
        const lum = parseFloat(this.hslStringToHslTuple(this.toHsl(color))[2]);
        return lum > luminance;
    }
    lighten(color, percentage = 10) {
        if (this.isRGBA(color))
            return this.lightenRgba(color, percentage);
        if (this.isHSLA(color))
            return this.lightenHsla(color, percentage);
        if (this.isRGB(color))
            return this.lightenRgb(color, percentage);
        if (this.isHSL(color))
            return this.lightenHsl(color, percentage);
        if (this.isHSV(color))
            return this.lightenHsv(color, percentage);
        else
            return this.lightenHex(color, percentage);
    }
    saturate(color, percentage = 10) {
        if (this.isRGBA(color))
            return this.saturateRgba(color, percentage);
        if (this.isHSLA(color))
            return this.saturateHsla(color, percentage);
        if (this.isRGB(color))
            return this.saturateRgb(color, percentage);
        if (this.isHSL(color))
            return this.saturateHsl(color, percentage);
        if (this.isHSV(color))
            return this.saturateHsv(color, percentage);
        else
            return this.saturateHex(color, percentage);
    }
    takeInner(color) {
        if (this.isHex(color))
            return color;
        const firstParenthesisIndex = color.indexOf("(");
        const lastParenthesisIndex = color.lastIndexOf(")");
        return color.slice(firstParenthesisIndex + 1, lastParenthesisIndex);
    }
    randomRgbColor() {
        return this.hexToRgb(this.randomHexColor());
    }
    randomHslColor() {
        return this.hexToHsl(this.randomHexColor());
    }
    randomHsvColor() {
        return this.rgbToHsv(this.randomRgbColor());
    }
    toHex(color) {
        if (this.isHex(color)) {
            if (color.length !== 4 && color.length !== 7)
                throw TypeError(`first argument to 'toHex()' must be a valid color. What appears to be a hex color was given: '${color}', but it doesn't have a valid amount of characters!`);
            return color;
        }
        else if (this.isHSL(color)) {
            return this.rgbToHex(this.hslToRgb(color));
        }
        else if (this.isHSLA(color)) {
            return this.rgbaToHex(this.hslaToRgba(color));
        }
        else if (this.isHSV(color)) {
            return this.rgbToHex(this.hsvToRgb(color));
        }
        else if (this.isRGB(color)) {
            return this.rgbToHex(color);
        }
        else if (this.isRGBA(color)) {
            return this.rgbaToHex(color);
        }
        const colorNameMatch = COLOR_NAMES[color.toLowerCase()];
        if (colorNameMatch)
            return colorNameMatch;
        else if (/^[0-9A-F]{3}$|^[0-9A-F]{6}$/i.test(color)) {
            // Must be a hex color without a '#' in front of it.
            if (color.length !== 3 && color.length !== 6)
                throw TypeError(`first argument to 'toHex()' must be a valid color. '${color}' was given!`);
            return `#${color}`;
        }
        else
            throw TypeError(`Couldn't decode color for input: ${color}`);
    }
    toRgb(color) {
        if (this.isHex(color)) {
            if (color.length !== 4 && color.length !== 7) {
                throw TypeError(`first argument to 'toRgb()' must be a valid color. What appears to be a hex color was given: '${color}', but it doesn't have a valid amount of characters!`);
            }
            return this.hexToRgb(color);
        }
        else if (this.isHSL(color)) {
            return this.hslToRgb(color);
        }
        else if (this.isHSLA(color)) {
            return this.hslToRgb(color);
        }
        else if (this.isHSV(color)) {
            return this.hsvToRgb(color);
        }
        else if (this.isRGB(color)) {
            // Only call 'rgbStringToRgbTuple' to validate the actual rgb color. Will throw errors if something is missing.
            this.rgbStringToRgbTuple(color);
            return color;
        }
        else if (this.isRGBA(color)) {
            return this.hexToRgb(this.rgbaToHex(color));
        }
        const colorNameMatch = COLOR_NAMES[color.toLowerCase()];
        if (colorNameMatch)
            return this.hexToRgb(colorNameMatch);
        else if (/^[0-9A-F]{3}$|^[0-9A-F]{6}$/i.test(color)) {
            // Must be a hex color without a '#' in front of it.
            if (color.length !== 3 && color.length !== 6) {
                throw TypeError(`first argument to 'toRgb()' must be a valid color. '${color}' was given!`);
            }
            return this.hexToRgb(`#${color}`);
        }
        else
            throw TypeError(`Couldn't decode color for input: ${color}`);
    }
    toHsl(color) {
        if (this.isHex(color)) {
            if (color.length !== 4 && color.length !== 7) {
                throw TypeError(`first argument to 'toHsl()' must be a valid color. What appears to be a hex color was given: '${color}', but it doesn't have a valid amount of characters!`);
            }
            return this.hexToHsl(color);
        }
        else if (this.isHSL(color)) {
            // Validate the HSL and add missing '%' symbols if required.
            const [H, S, L] = this.hslStringToHslTuple(color);
            return `hsl(${H}, ${S}, ${L})`;
        }
        else if (this.isHSLA(color)) {
            return this.hslaToHsl(color);
        }
        else if (this.isHSV(color)) {
            return this.rgbToHsl(this.hsvToRgb(color));
        }
        else if (this.isRGB(color)) {
            return this.rgbToHsl(color);
        }
        else if (this.isRGBA(color)) {
            return this.hexToHsl(this.rgbaToHex(color));
        }
        const colorNameMatch = COLOR_NAMES[color.toLowerCase()];
        if (colorNameMatch)
            return this.hexToHsl(colorNameMatch);
        else if (/^[0-9A-F]{3}$|^[0-9A-F]{6}$/i.test(color)) {
            // Must be a hex color without a '#' in front of it.
            if (color.length !== 3 && color.length !== 6) {
                throw TypeError(`first argument to 'toHsl()' must be a valid color. '${color}' was given!`);
            }
            return this.hexToHsl(`#${color}`);
        }
        else
            throw TypeError(`Couldn't decode color for input: ${color}`);
    }
    toHsv(color) {
        if (this.isHex(color)) {
            if (color.length !== 4 && color.length !== 7) {
                throw TypeError(`first argument to 'toHsv()' must be a valid color. What appears to be a hex color was given: '${color}', but it doesn't have a valid amount of characters!`);
            }
            return this.rgbToHsv(this.hexToRgb(color));
        }
        else if (this.isHSL(color)) {
            return this.rgbToHsv(this.hslToRgb(color));
        }
        else if (this.isHSLA(color)) {
            return this.rgbToHsv(this.hexToRgb(this.rgbaToHex(this.hslaToRgba(color))));
        }
        else if (this.isHSV(color)) {
            // Only used for validating the input HSB/HSV color.
            this.hsvStringToHsvTuple(color);
            return color;
        }
        else if (this.isRGB(color)) {
            return this.rgbToHsv(color);
        }
        else if (this.isRGBA(color)) {
            return this.rgbToHsv(this.hexToRgb(this.rgbaToHex(color)));
        }
        const colorNameMatch = COLOR_NAMES[color.toLowerCase()];
        if (colorNameMatch)
            return this.rgbToHsv(this.hexToRgb(colorNameMatch));
        else if (/^[0-9A-F]{3}$|^[0-9A-F]{6}$/i.test(color)) {
            // Must be a hex color without a '#' in front of it.
            if (color.length !== 3 && color.length !== 6) {
                throw TypeError(`first argument to 'toHsv()' must be a valid color. '${color}' was given!`);
            }
            return this.rgbToHsv(this.hexToRgb(`#${color}`));
        }
        else
            throw TypeError(`Couldn't decode color for input: ${color}`);
    }
    randomHexColor() {
        const color = (Math.random() * ColorOperations.WHITE_HEX << 0).toString(ColorOperations.RADIX);
        if (color.length < 6)
            return this.randomHexColor();
        else
            return `#${color}`;
    }
    isHSL(color) {
        return color.slice(0, 3) === "hsl";
    }
    isHSLA(color) {
        return color.slice(0, 4) === "hsla";
    }
    isHSV(color) {
        return color.slice(0, 3) === "hsb" || color.slice(0, 3) === "hsv";
    }
    isRGB(color) {
        return color.slice(0, 3) === "rgb";
    }
    isRGBA(color) {
        return color.slice(0, 4) === "rgba";
    }
    isHex(color) {
        return color[0] === "#";
    }
    /*
    private hslToHsla (hsl: string, alpha: number = 1): string {
        const [H, S, L] = this.hslStringToHslTuple(hsl);
        return `hsla(${H}, ${S}, ${L}, ${alpha})`;
    }
    */
    hslStringToHslTuple(hsl) {
        const result = hsl.slice(hsl.indexOf("(") + 1, hsl.lastIndexOf(")")).split(",");
        const HUE = parseInt(result[0]);
        const SATURATION = result[1].trim();
        const LIGHTNESS = result[2].trim();
        if (isNaN(HUE))
            throw TypeError(`Couldn't decode the 'hue' value for the given hsl color: ${hsl}`);
        if (isNaN(parseInt(SATURATION)))
            throw TypeError(`Couldn't decode the 'saturation' value for the given hsl color: ${hsl}`);
        if (isNaN(parseInt(LIGHTNESS)))
            throw TypeError(`Couldn't decode the 'lightness' value for the given hsl color: ${hsl}`);
        return [
            HUE,
            SATURATION.slice(SATURATION.length - 1) !== "%" ? `${SATURATION}%` : SATURATION,
            LIGHTNESS.slice(LIGHTNESS.length - 1) !== "%" ? `${LIGHTNESS}%` : LIGHTNESS
        ];
    }
    hslaStringToHslaTuple(hsla) {
        const [HUE, SATURATION, LIGHTNESS] = this.hslStringToHslTuple(hsla);
        const result = hsla.slice(hsla.indexOf("(") + 1, hsla.lastIndexOf(")")).split(",");
        const ALPHA = parseFloat(result[result.length - 1]);
        if (isNaN(ALPHA))
            throw TypeError(`Couldn't decode the 'alpha' value for the given hsla color: ${hsla}`);
        return [
            HUE,
            SATURATION.slice(SATURATION.length - 1) !== "%" ? `${SATURATION}%` : SATURATION,
            LIGHTNESS.slice(LIGHTNESS.length - 1) !== "%" ? `${LIGHTNESS}%` : LIGHTNESS,
            ALPHA
        ];
    }
    hslToRgbTuple(hsl, rounding = true) {
        const [h, SATURATION, LIGHTNESS] = this.hslStringToHslTuple(hsl);
        // Convert the saturation into a floating point number (in decimals, original is given as percentage)
        const s = parseFloat(SATURATION) / 100;
        // Convert the lightness into floating point number (in decimals, original is given as percentage)
        const l = parseFloat(LIGHTNESS) / 100;
        // Initialize all rgb values to zero.
        let r = 0;
        let g = 0;
        let b = 0;
        // If there is no saturation, we only need to multiply the lightness by 255, the maximum span of the RGB color space.
        if (s === 0) {
            r = g = b = l * ColorOperations.MAX_RGB_VALUE;
            return rounding ? [Math.round(r), Math.round(g), Math.round(b)] : [r, g, b];
        }
        // Depending on whether or not the lightness is less than 0.5 (50%), different formulas should be used.
        const temp1 = l < 0.5
            ? l * (1 + s)
            : l + s - l * s;
        const temp2 = 2 * l - temp1;
        // Convert the 360 degrees in a circle to 1 by dividing the hue by 360.
        const calculatedHue = h / ColorOperations.CIRCLE_DEGREES;
        let temporaryRed = calculatedHue + (1 / 3);
        let temporaryGreen = calculatedHue;
        let temporaryBlue = calculatedHue - (1 / 3);
        // All values need to be between 0 and 1. For negative values, we must add 1.
        // For negative values, we must subtract 1.
        if (temporaryRed < 0)
            ++temporaryRed;
        else if (temporaryRed > 1)
            --temporaryRed;
        if (temporaryGreen < 0)
            ++temporaryGreen;
        else if (temporaryGreen > 1)
            --temporaryGreen;
        if (temporaryBlue < 0)
            ++temporaryBlue;
        else if (temporaryBlue > 1)
            --temporaryBlue;
        // Find the 'red' value.
        if ((6 * temporaryRed) < 1)
            r = temp2 + (temp1 - temp2) * 6 * temporaryRed;
        else if ((2 * temporaryRed) < 1)
            r = temp1;
        else if ((3 * temporaryRed) < 2)
            r = temp2 + (temp1 - temp2) * ((2 / 3) - temporaryRed) * 6;
        else
            r = temp2;
        // Find the 'green' value.
        if ((6 * temporaryGreen) < 1)
            g = temp2 + (temp1 - temp2) * 6 * temporaryGreen;
        else if ((2 * temporaryGreen) < 1)
            g = temp1;
        else if ((3 * temporaryGreen) < 2)
            g = temp2 + (temp1 - temp2) * ((2 / 3) - temporaryGreen) * 6;
        else
            g = temp2;
        // Find the 'blue' value.
        if ((6 * temporaryBlue) < 1)
            b = temp2 + (temp1 - temp2) * 6 * temporaryBlue;
        else if ((2 * temporaryBlue) < 1)
            b = temp1;
        else if ((3 * temporaryBlue) < 2)
            b = temp2 + (temp1 - temp2) * ((2 / 3) - temporaryBlue) * 6;
        else
            b = temp2;
        if (rounding)
            return [Math.round(r * ColorOperations.MAX_RGB_VALUE), Math.round(g * ColorOperations.MAX_RGB_VALUE), Math.round(b * ColorOperations.MAX_RGB_VALUE)];
        else
            return [r * ColorOperations.MAX_RGB_VALUE, g * ColorOperations.MAX_RGB_VALUE, b * ColorOperations.MAX_RGB_VALUE];
    }
    hslToRgb(hsl, rounding = true) {
        const [R, G, B] = this.hslToRgbTuple(hsl, rounding);
        return `rgb(${R}, ${G}, ${B})`;
    }
    hslaToRgbaTuple(hsla) {
        const [R, G, B] = this.hslToRgbTuple(hsla);
        // Extract the alpha value from the hsla string.
        const result = this.hslaStringToHslaTuple(hsla);
        return [R, G, B, result[3]];
    }
    hslaToRgba(hsla) {
        const [R, G, B, A] = this.hslaToRgbaTuple(hsla);
        return `rgba(${R}, ${G}, ${B}, ${A})`;
    }
    hslaToHsl(hsla) {
        const [H, S, L] = this.hslaStringToHslaTuple(hsla);
        return `hsl(${H}, ${S}, ${L})`;
    }
    rgbStringToRgbTuple(rgbString) {
        const rgb = rgbString.match(/rgb\((.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (rgb == null) {
            throw TypeError(`'rgbToHex()' couldn't decode an RGB color from the given input: ${rgbString}`);
        }
        const r = parseFloat(rgb[1]);
        const g = parseFloat(rgb[2]);
        const b = parseFloat(rgb[3]);
        if (isNaN(r))
            throw TypeError(`'rgbToString()' couldn't decode the 'red' value of the given RGB color: '${rgbString}'.`);
        if (isNaN(g))
            throw TypeError(`'rgbToString()' couldn't decode the 'green' value of the given RGB color: '${rgbString}'.`);
        if (isNaN(b))
            throw TypeError(`'rgbToString()' couldn't decode the 'blue' value of the given RGB color: '${rgbString}'.`);
        return [r, g, b];
    }
    rgbaStringToRgbaTuple(rgbaString) {
        const rgba = rgbaString.match(/rgba\((.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (rgba == null) {
            throw TypeError(`Couldn't decode an RGBa color from the given input: ${rgbaString}`);
        }
        const r = parseFloat(rgba[1]);
        const g = parseFloat(rgba[2]);
        const b = parseFloat(rgba[3]);
        const a = parseFloat(rgba[4]);
        if (isNaN(r))
            throw TypeError(`Couldn't decode the 'red' value of the given RGBa color: '${rgbaString}'.`);
        if (isNaN(g))
            throw TypeError(`Couldn't decode the 'green' value of the given RGBa color: '${rgbaString}'.`);
        if (isNaN(b))
            throw TypeError(`Couldn't decode the 'blue' value of the given RGBa color: '${rgbaString}'.`);
        if (isNaN(a))
            throw TypeError(`Couldn't decode the 'alpha' value of the given RGBa color: '${rgbaString}'.`);
        return [r, g, b, a];
    }
    rgbToHex(rgbString) {
        const [r, g, b] = this.rgbStringToRgbTuple(rgbString);
        const bin = r << ColorOperations.RADIX | g << ColorOperations.RADIX / 2 | b;
        return (function (h) {
            return `#${new Array(7 - h.length).join("0") + h}`;
        })(bin.toString(ColorOperations.RADIX).toLowerCase());
    }
    rgbaToHex(rgbaString, againstColor) {
        const [r, g, b, a] = this.rgbaStringToRgbaTuple(rgbaString);
        if (againstColor != null) {
            const [referenceR, referenceG, referenceB] = this.rgbStringToRgbTuple(this.toRgb(againstColor));
            return this.rgbToHex(`rgb(${r * a + referenceR * (1 - a)}, ${g * a + referenceG * (1 - a)}, ${b * a + referenceB * (1 - a)})`);
        }
        else
            return this.rgbToHex(`rgb(${r}, ${g}, ${b})`);
    }
    hsvStringToHsvTuple(hsvString) {
        let hsv = hsvString.match(/hsv\((.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (hsv == null)
            hsv = hsvString.match(/hsb\((.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (hsv == null) {
            throw TypeError(`Couldn't decode an HSV color from the given input: ${hsvString}`);
        }
        const h = parseFloat(hsv[1]);
        const s = parseFloat(hsv[2]);
        const v = parseFloat(hsv[3]);
        if (isNaN(h))
            throw TypeError(`Couldn't decode the 'Hue' value of the given HSV color: '${hsvString}'.`);
        if (isNaN(s))
            throw TypeError(`Couldn't decode the 'Saturation' value of the given HSV color: '${hsvString}'.`);
        if (isNaN(v))
            throw TypeError(`Couldn't decode the 'Value/Brightness' value of the given HSV color: '${hsvString}'.`);
        return [h, s, v];
    }
    hsvToRgbTuple(hsv) {
        const [H, S, V] = this.hsvStringToHsvTuple(hsv);
        const normalizedH = (H === ColorOperations.CIRCLE_DEGREES) ? 1 : (H % ColorOperations.CIRCLE_DEGREES / ColorOperations.CIRCLE_DEGREES * 6);
        const normalizedS = (S === 100) ? 1 : (S % 100 / 100);
        const normalizedV = (V === 100) ? 1 : (V % 100 / 100);
        const hFloor = Math.floor(normalizedH);
        const hFloorDiff = normalizedH - hFloor;
        const p = normalizedV * (1 - normalizedS);
        const q = normalizedV * (1 - hFloorDiff * normalizedS);
        const t = normalizedV * (1 - (1 - hFloorDiff) * normalizedS);
        const mod = hFloor % 6;
        const R = [normalizedV, q, p, p, t, normalizedV][mod];
        const G = [t, normalizedV, normalizedV, q, p, p][mod];
        const B = [p, p, t, normalizedV, normalizedV, q][mod];
        return [Math.round(R * ColorOperations.MAX_RGB_VALUE), Math.round(G * ColorOperations.MAX_RGB_VALUE), Math.round(B * ColorOperations.MAX_RGB_VALUE)];
    }
    hsvToRgb(hsv) {
        const [R, G, B] = this.hsvToRgbTuple(hsv);
        return `rgb(${R}, ${G}, ${B})`;
    }
    hexToRgbTuple(hex) {
        const properHex = this.toHex(hex);
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const normalizedHex = properHex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizedHex);
        if (!result) {
            throw TypeError(`first argument to 'hexToRgb': '${hex}' could not be decoded as a hex color!`);
        }
        const RED = parseInt(result[1], ColorOperations.RADIX);
        const GREEN = parseInt(result[2], ColorOperations.RADIX);
        const BLUE = parseInt(result[3], ColorOperations.RADIX);
        return [RED, GREEN, BLUE];
    }
    hexToRgb(hex) {
        const [RED, GREEN, BLUE] = this.hexToRgbTuple(this.toHex(hex));
        return `rgb(${RED}, ${GREEN}, ${BLUE})`;
    }
    /*
    private hexToHslaTuple (hex: string, alpha: number = 1): [number, string, string, number] {
        const [HUE, SATURATION, LIGHTNESS] = this.hexToHslTuple(hex);
        return [HUE, SATURATION, LIGHTNESS, alpha];
    }

    private hexToHsla (hex: string, alpha: number = 1): string {
        const [HUE, SATURATION, LIGHTNESS, ALPHA] = this.hexToHslaTuple(hex, alpha);
        return `hsla(${HUE}, ${SATURATION}, ${LIGHTNESS}, ${ALPHA})`;
    }
    */
    hexToHslTuple(hex, rounding = true) {
        let [r, g, b] = this.hexToRgbTuple(this.toHex(hex));
        r /= ColorOperations.MAX_RGB_VALUE;
        g /= ColorOperations.MAX_RGB_VALUE;
        b /= ColorOperations.MAX_RGB_VALUE;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;
        let s = 0;
        let l = (max + min) / 2;
        if (max === min)
            h = s = 0;
        else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        h = rounding ? Math.round(h * ColorOperations.CIRCLE_DEGREES) : h * ColorOperations.CIRCLE_DEGREES;
        s = rounding ? Math.round(s * 100) : s * 100;
        l = rounding ? Math.round(l * 100) : l * 100;
        return [h, `${s}%`, `${l}%`];
    }
    hexToHsl(hex) {
        const [HUE, SATURATION, LIGHTNESS] = this.hexToHslTuple(hex);
        return `hsl(${HUE}, ${SATURATION}, ${LIGHTNESS})`;
    }
    rgbToHslTuple(rgb, rounding = true) {
        const [R, G, B] = this.rgbStringToRgbTuple(rgb);
        const normalizedRed = (R === ColorOperations.MAX_RGB_VALUE) ? 1 : (R % ColorOperations.MAX_RGB_VALUE / ColorOperations.MAX_RGB_VALUE);
        const normalizedGreen = (G === ColorOperations.MAX_RGB_VALUE) ? 1 : (G % ColorOperations.MAX_RGB_VALUE / ColorOperations.MAX_RGB_VALUE);
        const normalizedBlue = (B === ColorOperations.MAX_RGB_VALUE) ? 1 : (B % ColorOperations.MAX_RGB_VALUE / ColorOperations.MAX_RGB_VALUE);
        const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
        const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
        let h = 0;
        let s = 0;
        const l = (max + min) / 2;
        if (max !== min) {
            const diff = max - min;
            s = l > 0.5
                ? diff / (2 - max - min)
                : diff / (max + min);
            switch (max) {
                case normalizedRed:
                    h = (normalizedGreen - normalizedBlue) / diff + (normalizedGreen < normalizedBlue ? 6 : 0);
                    break;
                case normalizedGreen:
                    h = (normalizedBlue - normalizedRed) / diff + 2;
                    break;
                case normalizedBlue:
                    h = (normalizedRed - normalizedGreen) / diff + 4;
                    break;
            }
            h /= 6;
        }
        if (rounding)
            return [Math.round(h * ColorOperations.CIRCLE_DEGREES), `${Math.round(s * 100)}%`, `${Math.round(l * 100)}%`];
        else
            return [h * ColorOperations.CIRCLE_DEGREES, `${s * 100}%`, `${l * 100}%`];
    }
    rgbToHsl(rgb) {
        const [H, S, L] = this.rgbToHslTuple(rgb);
        return `hsl(${H}, ${S}, ${L})`;
    }
    rgbToHsvTuple(rgb) {
        const [R, G, B] = this.rgbStringToRgbTuple(rgb);
        const normalizedRed = (R === ColorOperations.MAX_RGB_VALUE) ? 1 : (R % ColorOperations.MAX_RGB_VALUE / ColorOperations.MAX_RGB_VALUE);
        const normalizedGreen = (G === ColorOperations.MAX_RGB_VALUE) ? 1 : (G % ColorOperations.MAX_RGB_VALUE / ColorOperations.MAX_RGB_VALUE);
        const normalizedBlue = (B === ColorOperations.MAX_RGB_VALUE) ? 1 : (B % ColorOperations.MAX_RGB_VALUE / ColorOperations.MAX_RGB_VALUE);
        const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
        const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
        let h = 0;
        const v = max;
        const diff = max - min;
        const s = max === 0 ? 0 : diff / max;
        if (max === min)
            h = 0;
        else {
            switch (max) {
                case normalizedRed:
                    h = (normalizedGreen - normalizedBlue) / diff + (normalizedGreen < normalizedBlue ? 6 : 0);
                    break;
                case normalizedGreen:
                    h = (normalizedBlue - normalizedRed) / diff + 2;
                    break;
                case normalizedBlue:
                    h = (normalizedRed - normalizedGreen) / diff + 4;
                    break;
            }
            h /= 6;
        }
        return [Math.round(h * ColorOperations.CIRCLE_DEGREES), Math.round(s * 100), Math.round(v * 100)];
    }
    rgbToHsv(rgb) {
        const [H, S, V] = this.rgbToHsvTuple(rgb);
        return `hsb(${H}, ${S}, ${V})`;
    }
    /**
     * Changes the saturation of a HSL color.
     * @param   {string} hsl              - The HSL color. For instance, hsl(50, 100%, 100%).
     * @param   {number} [percentage=10]  - The percentage with which to saturate the color.
     * @returns {string}                    The new HSL color.
     */
    saturateHsl(hsl, percentage = 10) {
        const [H, S, L] = this.hslStringToHslTuple(hsl);
        return `hsl(${H}, ${Math.max(0, Math.min(100, (100 + percentage) * parseFloat(S) / 100))}%, ${L})`;
    }
    lightenHsl(hsl, percentage = 10) {
        const [H, S, L] = this.hslStringToHslTuple(hsl);
        return `hsl(${H}, ${S}, ${Math.max(0, Math.min(100, (100 + percentage) * parseFloat(L) / 100))}%)`;
    }
    saturateHsla(hsla, percentage = 10) {
        const [H, S, L, A] = this.hslaStringToHslaTuple(hsla);
        return `hsla(${H}, ${Math.max(0, Math.min(100, (100 + percentage) * parseFloat(S) / 100))}%, ${L}, ${A})`;
    }
    lightenHsla(hsla, percentage = 10) {
        const [H, S, L, A] = this.hslaStringToHslaTuple(hsla);
        return `hsla(${H}, ${S}, ${Math.max(0, Math.min(100, (100 + percentage) * parseFloat(L) / 100))}%, ${A})`;
    }
    saturateRgb(rgb, percentage = 10) {
        const [H, S, L] = this.rgbToHslTuple(rgb);
        return this.hslToRgb(`hsl(${H}, ${Math.max(0, Math.min(100, (100 + percentage) * parseFloat(S) / 100))}%, ${L})`);
    }
    lightenRgb(rgb, percentage = 10) {
        const [H, S, L] = this.rgbToHslTuple(rgb);
        return this.hslToRgb(`hsl(${H}, ${S}, ${Math.max(0, Math.min(100, (100 + percentage) * parseFloat(L) / 100))}%)`);
    }
    saturateRgba(rgba, percentage = 10) {
        const [R, G, B, A] = this.rgbaStringToRgbaTuple(rgba);
        const [H, S, L] = this.rgbToHslTuple(`rgb(${R}, ${G}, ${B})`);
        const [NEW_R, NEW_G, NEW_B] = this.hslToRgbTuple(`hsl(${H}, ${Math.max(0, Math.min(100, (100 + percentage) * parseFloat(S) / 100))}%, ${L})`);
        return `rgba(${NEW_R}, ${NEW_G}, ${NEW_B}, ${A})`;
    }
    lightenRgba(rgba, percentage = 10) {
        const [R, G, B, A] = this.rgbaStringToRgbaTuple(rgba);
        const [H, S, L] = this.rgbToHslTuple(`rgb(${R}, ${G}, ${B})`);
        const [NEW_R, NEW_G, NEW_B] = this.hslToRgbTuple(`hsl(${H}, ${S}, ${Math.max(0, Math.min(100, (100 + percentage) * parseFloat(L) / 100))}%)`);
        return `rgba(${NEW_R}, ${NEW_G}, ${NEW_B}, ${A})`;
    }
    saturateHex(hex, percentage = 10) {
        const [H, S, L] = this.hexToHslTuple(hex);
        return this.rgbToHex(this.hslToRgb(`hsl(${H}, ${Math.max(0, Math.min(100, (100 + percentage) * parseFloat(S) / 100))}%, ${L})`));
    }
    lightenHex(hex, percentage = 10) {
        const [H, S, L] = this.hexToHslTuple(hex);
        return this.rgbToHex(this.hslToRgb(`hsl(${H}, ${S}, ${Math.max(0, Math.min(100, (100 + percentage) * parseFloat(L) / 100))}%)`));
    }
    saturateHsv(hsv, percentage = 10) {
        const [H, S, V] = this.hsvStringToHsvTuple(hsv);
        const hsbOrHsv = hsv.slice(0, 3) === "hsb" ? "hsb" : "hsv";
        return `${hsbOrHsv}(${H}, ${Math.max(0, Math.min(100, (100 + percentage) * S / 100))}, ${V})`;
    }
    lightenHsv(hsv, percentage = 10) {
        const [H, S, L] = this.rgbToHslTuple(this.hsvToRgb(hsv));
        return this.rgbToHsv(this.hslToRgb(`hsl(${H}, ${S}, ${Math.max(0, Math.min(100, (100 + percentage) * parseFloat(L) / 100))})`));
    }
}
ColorOperations.MAX_RGB_VALUE = 255;
ColorOperations.CIRCLE_DEGREES = 360;
ColorOperations.RADIX = 16;
ColorOperations.WHITE_HEX = 0xFFFFFF;
//# sourceMappingURL=ColorOperations.js.map