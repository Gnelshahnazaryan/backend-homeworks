const cartService = require("../services/cart.service.js");

async function getCart(req, res) {
    try {
        const cart = await cartService.getCartByUserId(req.user.id);

        res.status(200).json({
            cart,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

async function createCart(req, res) {
    try {
        const newCart = await cartService.createCart(req.user.id);

        res.status(201).json({
            newCart,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

async function addToCart(req, res) {
    try {
        const { product_id, quantity } = req.body;
        const cart = await cartService.addToCart(
            req.user.id,
            product_id,
            quantity,
        );

        res.status(201).json({
            cart,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

async function removeFromCart(req, res) {
    try {
        await cartService.removeFromCart(req.user.id, req.params.productId);
        res.status(204);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

async function clearCart(req, res) {
    try {
        await cartService.clearCart(req.user.id);

        res.status(204).send();
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

module.exports = {
    getCart,
    createCart,
    addToCart,
    removeFromCart,
    clearCart,
};
