import errors from "../data/messages/errors";

const HEX_BASE = 16;

export const decToHex = (number, digits = 2) => {
    if (typeof number === "number") {
        return number.toString(HEX_BASE).padStart(digits, "0");
    }

    throw new Error(errors.noValueSupplied);
};

export const hexToDec = (value) => {
    if (value) {
        return parseInt(value, HEX_BASE);
    }

    throw new Error(errors.noValueSupplied);
};
