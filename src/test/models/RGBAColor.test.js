import RGBAColor from "../../models/RGBAColor";
import errors from "../../data/messages/errors";

describe("RGBAColor", () => {
    it("throws an error if not passed a value.", () => {
        expect(() => new RGBAColor()).toThrow(errors.noValueSupplied);
    });

    it("builds a RGBA color when passed a hex string.", () => {
        const color = new RGBAColor("AABBCCDD");

        expect(color.r).toEqual(170);
        expect(color.g).toEqual(187);
        expect(color.b).toEqual(204);
        expect(color.a).toEqual(221);
    });

    it("builds a RGBA color when passed a color object.", () => {
        const sourceObject = {r: 1, g: 10, b: 100};
        const color = new RGBAColor(sourceObject);

        expect(color.r).toEqual(sourceObject.r);
        expect(color.g).toEqual(sourceObject.g);
        expect(color.b).toEqual(sourceObject.b);
    });

    it("generates an RGB hex string.", () => {
        const color = new RGBAColor("010203");

        expect(color.getRgbHex()).toEqual("010203");
    });

    it("generates a RGBA hex string.", () => {
        const color = new RGBAColor("ff00ff00");

        expect(color.getRgbaHex()).toEqual("ff00ff00");
    });

    it("throws when trying to generate hex for a channel that doesn't exist.", () => {
        const color = new RGBAColor("008080");
        const badChannel = "nope";

        expect(() => color.getHexStringFromChannels([badChannel])).toThrow(errors.noSuchChannel(badChannel));
    });
});
