/**
 * Coolor constructor.
 *
 * @param red   red value
 * @param green green value
 * @param blue  blue value
 * @param alpha optional alpha value
 */
var Coolor = function(red, green, blue, alpha) {

    if (red.charAt(0) === "#" || red.length === 6 || red.length === 8) {
        var components = this.hexToRgbComponents(red);
        this.red   = components.red;
        this.green = components.green;
        this.blue  = components.blue;
        this.alpha = components.alpha;
    } else {
        this.red   = red;
        this.green = green;
        this.blue  = blue;
        this.alpha = alpha || 1;
    }
};

Coolor.prototype = {

    hexToRgbComponents: function(hex) {

        // remove # if present
        hex = hex.charAt(0) === "#" ? hex.substring(1, hex.length) : hex;

        var components = {};
        if (hex.length === 6) {
            components.red   = parseInt(hex.substring(0, 2), 16);
            components.green = parseInt(hex.substring(2, 4), 16);
            components.blue  = parseInt(hex.substring(4, 6), 16);
            components.alpha = 1;
        } else if (hex.length === 8) {
            console.log(parseInt(hex.substring(0, 2), 16));
            components.alpha = parseInt(hex.substring(0, 2), 16) / 255;
            components.red   = parseInt(hex.substring(2, 4), 16);
            components.green = parseInt(hex.substring(4, 6), 16);
            components.blue  = parseInt(hex.substring(6, 8), 16);
        } else {
            throw 'Invalid hexadecimal color "' + hex + '"';
        }

        return components;
    },

    colorComponentToHex: function(value) {
        value = parseInt(value,10);
        if (isNaN(value)) {
            return "00";
        }
        value = Math.max(0, Math.min(value, 255));
        return "0123456789ABCDEF".charAt((value - value % 16) / 16)
             + "0123456789ABCDEF".charAt(value % 16);
    },

    toHexString: function(includeAlpha) {

        includeAlpha = !!includeAlpha;

        console.log(includeAlpha);

        var hex = this.colorComponentToHex(this.red)
                + this.colorComponentToHex(this.green)
                + this.colorComponentToHex(this.blue);

        if (includeAlpha === true) {
            hex = this.colorComponentToHex(this.alpha * 255) + hex;
        }

        hex = '#' + hex;

        return hex;
    },

    /**
     * Convert color to rgb representation
     * rgb(redValue, greenValue, blueValue, alphaValue)
     *
     * @return string
     */
    toRGBAString: function() {
        return this.toRGBString(true);
    },

    /**
     * Convert color to rgb representation
     * rgb(redValue, greenValue, blueValue)
     *
     * @return string
     */
    toRGBString: function(includeAlpha) {
        var colorstring = '(';
        colorstring += this.red;
        colorstring += ',';
        colorstring += this.green;
        colorstring += ',';
        colorstring += this.blue;
        if (!!includeAlpha === true) {
            colorstring += ',';
            colorstring += this.alpha;
        }
        colorstring += ')';

        if (!!includeAlpha === true) {
            colorstring = 'rgba' + colorstring;
        } else {
            colorstring = 'rgb' + colorstring;
        }

        return colorstring;
    },

    copy: function() {

        return new Coolor(this.red, this.green, this.blue, this.alpha);
    },

    blend: function(color, strength) {

        var redDelta   = color.red   - this.red,
            greenDelta = color.green - this.green,
            blueDelta  = color.blue  - this.blue,
            alphaDelta = color.alpha - this.alpha;

        this.red   = Math.round(this.red   + redDelta   * strength);
        this.green = Math.round(this.green + greenDelta * strength);
        this.blue  = Math.round(this.blue  + blueDelta  * strength);
        this.alpha = this.alpha + alphaDelta * strength;

        return this;
    }
};

/**
 * Return a color between color 1 and color 2.
 *
 * @param startColor start Color
 * @param endColor   end Color
 * @param position   "position" between the two colors
 */
Coolor.colorBetween = function(startColor, endColor, position) {

    return startColor.copy().blend(endColor, position);
};

/**
 * Return a random color between color 1 and color 2.
 *
 * @see Color::colorBetween
 * @param startColor start Color
 * @param endColor   end Color
 */
Coolor.randColorBetween = function(startColor, endColor) {

    return Coolor.colorBetween(startColor, endColor, Math.random());
};
