import errors from "../data/messages/errors";
import {hexToDec} from "./hexTools";
import stringToNLengthElementArray from "./stringToNLengthElementArray";

export default function parseHexRgb(color) {
    if (color) {
        const rgbObject = sixCharacterHexToDec(color.replace("#", ""));

        return rgbObject;
    }

    throw new Error(errors.noValueSupplied);
}

function sixCharacterHexToDec(hex) {
    const hexValues = stringToNLengthElementArray(hex, 2);

    return {
        r: hexToDec(hexValues[0]),
        g: hexToDec(hexValues[1]),
        b: hexToDec(hexValues[2]),
    };
}
