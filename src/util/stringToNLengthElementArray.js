import errors from "../data/messages/errors";

export default function (characters, length) {
    if (characters) {
        const regex = new RegExp(`.{1,${length}}`, "g");
        return characters.match(regex);
    }

    throw new Error(errors.noValueSupplied);
}
