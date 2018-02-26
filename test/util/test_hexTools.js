const chai = require("chai");
const expect = chai.expect;
const hexTools = require("../../src/util/hexTools");

describe("A decimal to hex converter", () => {
	it ("returns an empty string if given nothing.", () => {
		expect(hexTools.decToHex()).to.equal("");
	});

	it ("returns an empty string if given a number over 255.", () => {
		expect(hexTools.decToHex(256)).to.equal("");
	});
});