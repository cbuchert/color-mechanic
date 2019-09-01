import {decToHex} from "../../util/hexTools";

describe("decToHex", () => {
    it("returns an empty string if given nothing.", () => {
        expect(decToHex()).toEqual("");
    });

    it("returns an empty string if given a number over 255.", () => {
        expect(decToHex(256)).toEqual("");
    });

    it("returns a hex value when given a number.", () => {
        expect(decToHex(20)).toEqual("14");
    });
});
