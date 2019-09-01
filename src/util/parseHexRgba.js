import errors from "../data/messages/errors";
import {hexToDec} from "./hexTools";
import stringToNLengthElementArray from "./stringToNLengthElementArray";

export default function parseHexRgba(color) {
    if (color) {
        const rgbObject = hexToRgbObject(color.replace("#", ""));

        return rgbObject;
    }

    throw new Error(errors.noValueSupplied);
}

function hexToRgbObject(hex) {
    const hexWordCount = hex.length % 3 === 0 ? 3 : 4;
    const hexWordLength = hex.length / hexWordCount;
    const hexValues = stringToNLengthElementArray(hex, hexWordLength);
    const hexObject = {
        r: hexWordToDec(hexValues[0]),
        g: hexWordToDec(hexValues[1]),
        b: hexWordToDec(hexValues[2]),
        a: hexWordCount === 3? 255 : hexWordToDec(hexValues[3]),
    };

    return hexObject;
}

function hexWordToDec(word) {
    const repeatCount = word.length === 1 ? 2 : 1;

    return (hexToDec(word.repeat(repeatCount)));
}
