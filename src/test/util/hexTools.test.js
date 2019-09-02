import {decToHex, hexToDec} from "../../util/hexTools";
import errors from "../../data/messages/errors";

describe("decToHex", () => {
    it("throws when not passed anything.", () => {
        expect(decToHex).toThrow(errors.noValueSupplied);
    });

    it("returns a hex value when given a number.", () => {
        expect(decToHex(20)).toEqual("14");
    });

    it("zero pads when output digit count is less than digit character count.", () => {
        expect(decToHex(1)).toEqual("01");
        expect(decToHex(1, 4)).toEqual("0001");
    });
});

describe("hexToDec", () => {
    it("throws when not passed anything.", () => {
        expect(hexToDec).toThrow(errors.noValueSupplied);
    });

    it("returns a decimal value when given a hex value.", () =>{
        expect(hexToDec("ff")).toEqual(255);
    });
});
