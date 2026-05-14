function validateProduct(req, res, next) {
    const errors = [];
    const { name, price, description, stock_quantity } = req.body;

    if (!name || typeof name !== "string") {
        errors.push("Name is required and must be a string");
    }

    if (price === undefined || typeof price !== "number") {
        errors.push("Price is required and must be a number");
    }

    if (price < 0) {
        errors.push("Price cannot be negative");
    }

    if (description === undefined || typeof description !== "string") {
        errors.push("Description must be a string");
    }

    if (stock_quantity === undefined || typeof stock_quantity !== "number") {
        errors.push("Stock quantity must be a number");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Validation error",
            errors,
        });
    }

    next();
}

module.exports = {
    validateProduct,
};
