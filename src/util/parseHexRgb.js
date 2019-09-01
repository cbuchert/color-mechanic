import errors from "../data/messages/errors";
import {hexToDec} from "./hexTools";

export default function parseHexRgb(color) {
    if (color) {
        const rgbObject = {
            r: hexToDec(color.substr(0, 2)),
            g: hexToDec(color.substr(2, 2)),
            b: hexToDec(color.substr(4, 2)),
        };

        return rgbObject;
    }

    throw new Error(errors.noValueSupplied);
}
