import {decToHex, hexToDec} from "../../util/hexTools";
import errors from "../../data/messages/errors";

describe("decToHex", () => {
    it("throws when not passed anything.", () => {
        expect(decToHex).toThrow(errors.noValueSupplied);
    });

    it("returns a hex value when given a number.", () => {
        expect(decToHex(20)).toEqual("14");
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
