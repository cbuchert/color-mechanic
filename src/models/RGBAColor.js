import parseHexRgba from "../util/parseHexRgba";
import {decToHex} from "../util/hexTools";
import errors from "../data/messages/errors";

export default class RGBAColor {
    constructor(color) {
        if (!color) throw new Error(errors.noValueSupplied);

        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;

        if (typeof color === "string") {
            this.setRgba(parseHexRgba(color));
        } else if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
            this.setRgba(color);
        }
    }

    setRgba({r, g, b, a}) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    getRgbHex() {
        return `${decToHex(this.r)}${decToHex(this.g)}${decToHex(this.b)}`;
    }
}
