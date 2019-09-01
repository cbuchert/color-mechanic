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
    const  hexObject = {
        r: hexWordToDec(hexValues[0]),
        g: hexWordToDec(hexValues[1]),
        b: hexWordToDec(hexValues[2]),
    };

    return hexObject;
}

function hexWordToDec(word) {
    const repeatCount = word.length === 1? 2: 1;

    return (hexToDec(word.repeat(repeatCount)));
}
