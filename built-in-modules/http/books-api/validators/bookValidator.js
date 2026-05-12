const required = ["title", "author", "year"];

function validateCreateBook(data) {
    for (const field of required) {
        if (!(field in data)) {
            return { isValid: false, error: `${field} is required` };
        }
    }

    return { isValid: true };
}

function validatePatchBook(data) {
    if (
        data.title === undefined &&
        data.author === undefined &&
        data.year === undefined
    ) {
        return {
            isValid: false,
            error: "Title, Author, Year: At least one of this field is required",
        };
    }

    return { isValid: true };
}

module.exports = {
    validateCreateBook,
    validatePatchBook,
};
