import stringToNLengthElementArray from "../../util/stringToNLengthElementArray";
import errors from "../../data/messages/errors";

describe("stringToNLengthElementArray", () => {
    it("throws when not passed anything.", () => {
        expect(stringToNLengthElementArray).toThrow(errors.noValueSupplied);
    });

    it("returns an array with one element of n length when passed a string of n length.", () => {
        expect(stringToNLengthElementArray("asdf", 4)).toEqual(["asdf"]);
    });
});
