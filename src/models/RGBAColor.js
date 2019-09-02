import parseHexRgba from "../util/parseHexRgba";
import {decToHex} from "../util/hexTools";
import errors from "../data/messages/errors";

export default class RGBAColor {
    constructor(color) {
        if (typeof color === "undefined" || !color.length) throw new Error(errors.noValueSupplied);

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
        const channels = ["r", "g", "b"];

        return this.getHexStringFromChannels(channels);
    }

    getRgbaHex() {
        const channels = ["r", "g", "b", "a"];

        return this.getHexStringFromChannels(channels);
    }

    getHexStringFromChannels(channels) {
        return channels.map(channel => {
            if (this.hasOwnProperty(channel)) {
                return decToHex(this[channel]);
            }

            throw new Error(errors.noSuchChannel(channel));
        }).join("");
    }
}
