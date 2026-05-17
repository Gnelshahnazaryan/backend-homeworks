function validateCartItems(req, res, next) {
    const errors = [];
    const { product_id, quantity } = req.body;

    if (!product_id || typeof product_id !== "number") {
        errors.push("Product id is required and must be number");
    }

    if (!quantity || typeof quantity !== "number") {
        errors.push("Quantity is required and must be number");
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
    validateCartItems,
};
