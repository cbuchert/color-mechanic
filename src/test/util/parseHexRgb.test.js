import parseHexRgba from "../../util/parseHexRgba";
import errors from "../../data/messages/errors";

describe("parseHexRgba", () => {
    it("throws if passed nothing.", () => {
        expect(parseHexRgba).toThrow(errors.noValueSupplied);
    });

    it("parses a six character hex string.", () => {
        const decRgb1 = parseHexRgba("ffffff");
        const decRgb2 = parseHexRgba("000000");

        expect(decRgb1.r).toEqual(255);
        expect(decRgb1.g).toEqual(255);
        expect(decRgb1.b).toEqual(255);
        expect(decRgb1.a).toEqual(255);

        expect(decRgb2.r).toEqual(0);
        expect(decRgb2.g).toEqual(0);
        expect(decRgb2.b).toEqual(0);
        expect(decRgb1.a).toEqual(255);
    });

    it("parses three character hex strings.", () => {
        const decRgb1 = parseHexRgba("fff");
        const decRgb2 = parseHexRgba("#000");

        expect(decRgb1.r).toEqual(255);
        expect(decRgb1.g).toEqual(255);
        expect(decRgb1.b).toEqual(255);
        expect(decRgb1.a).toEqual(255);

        expect(decRgb2.r).toEqual(0);
        expect(decRgb2.g).toEqual(0);
        expect(decRgb2.b).toEqual(0);
        expect(decRgb2.a).toEqual(255);
    });

    it("strips off leading # symbols.", () => {
        expect(parseHexRgba("#ff0000").r).toEqual(255);
        expect(parseHexRgba("#f00").r).toEqual(255);
    });

    it("adds an alpha channel when passed one.", () => {
        expect(parseHexRgba("ffffff00").a).toEqual(0);
        expect(parseHexRgba("fff0").a).toEqual(0);
    });
});
