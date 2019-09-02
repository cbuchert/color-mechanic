const errors = {
    noValueSupplied: "No value supplied.",
    numberTooLarge: "The number supplied is too large.",
    noSuchChannel: channel => `The requested channel (${channel}) doesn't exist.`,
};

export default errors;
