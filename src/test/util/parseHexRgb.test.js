import parseHexRgb from "../../util/parseHexRgb";
import errors from "../../data/messages/errors";

describe("parseHexRgb", () => {
    it("throws if passed nothing.", () => {
        expect(parseHexRgb).toThrow(errors.noValueSupplied);
    });

    it("parses a six character hex string.", () => {
        const decRgb1 = parseHexRgb("ffffff");
        const decRgb2 = parseHexRgb("000000");

        expect(decRgb1.r).toEqual(255);
        expect(decRgb1.g).toEqual(255);
        expect(decRgb1.b).toEqual(255);

        expect(decRgb2.r).toEqual(0);
        expect(decRgb2.g).toEqual(0);
        expect(decRgb2.b).toEqual(0);
    });

    it("strips off leading # symbols.", () => {
        expect(parseHexRgb("#ff0000").r).toEqual(255);
    });

    // it("")
});
