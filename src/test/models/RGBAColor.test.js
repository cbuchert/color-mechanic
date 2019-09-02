import RGBAColor from "../../models/RGBAColor";
import errors from "../../data/messages/errors";

describe("RGBAColor", () => {
    it("throws an error if not passed a value.", () => {
        expect(() => new RGBAColor()).toThrow(errors.noValueSupplied);
    });
});
