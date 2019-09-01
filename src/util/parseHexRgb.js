import errors from "../data/messages/errors";
import {hexToDec} from "./hexTools";
import stringToNLengthElementArray from "./stringToNLengthElementArray";

export default function parseHexRgb(color) {
    if (color) {
        const rgbObject = hexToRgbObject(color.replace("#", ""));

        return rgbObject;
    }

    throw new Error(errors.noValueSupplied);
}

function hexToRgbObject(hex) {
    const hexWordLength = hex.length / 3;
    const hexValues = stringToNLengthElementArray(hex, hexWordLength);
    const hexWordRepeatCount = hexWordLength === 1 ? 2 : 1;

    return {
        r: hexToDec(hexValues[0].repeat(hexWordRepeatCount)),
        g: hexToDec(hexValues[1].repeat(hexWordRepeatCount)),
        b: hexToDec(hexValues[2].repeat(hexWordRepeatCount)),
    };
}
