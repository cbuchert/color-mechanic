export const decToHex = (number) => {
    const hexBase = 16;
    const maxHexValue = parseInt("ff", hexBase);

    if (number < maxHexValue) {
        return number.toString(hexBase);
    }

    return "";
};
