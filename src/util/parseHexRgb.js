import errors from "../data/messages/errors";
import {hexToDec} from "./hexTools";

export default function parseHexRgb(color) {
    if (color) {
        const rgbObject = sixCharacterHexToDec(color.replace("#", ""));

        return rgbObject;
    }

    throw new Error(errors.noValueSupplied);
}

function sixCharacterHexToDec(hex) {
    const hexValues = hex.match(/.{1,2}/g);

    return {
        r: hexToDec(hexValues[0]),
        g: hexToDec(hexValues[1]),
        b: hexToDec(hexValues[2]),
    };
}
