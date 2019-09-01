import parseHexRgb from "../../util/parseHexRgb";
import errors from "../../data/messages/errors";

describe("parseHexRgb", () => {
    it("throws if passed nothing.", () => {
        expect(parseHexRgb).toThrow(errors.noValueSupplied);
    });
});
