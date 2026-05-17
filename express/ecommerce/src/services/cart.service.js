const AppError = require("../utils/appError.js");
const { readJSON, writeJSON } = require("../utils/file.js");
const productService = require("./product.service.js");

const FILE_NAME = "carts.json";

async function getAllCarts() {
    try {
        const carts = await readJSON(FILE_NAME);

        if (!carts) {
            return [];
        }

        return carts;
    } catch (err) {
        throw new Error(`Falied to get carts ${err.message}`);
    }
}

async function getCartByUserId(userId) {
    try {
        const carts = await getAllCarts();
        const targetCart = carts.find((c) => c.user_id === Number(userId));

        if (!targetCart) {
            throw new AppError("Cart not found", 404);
        }

        return targetCart;
    } catch (err) {
        throw err;
    }
}

async function createCart(userId) {
    try {
        const carts = await getAllCarts();
        const exists = carts.find((c) => c.user_id === Number(userId));

        if (exists) {
            throw new AppError("Cart already exist", 409);
        }

        const cart = {
            id: carts.length + 1,
            user_id: Number(userId),
            items: [],
        };

        carts.push(cart);
        await writeJSON(FILE_NAME, carts);

        return cart;
    } catch (err) {
        throw err;
    }
}

async function addToCart(userId, productId, quantity) {
    try {
        const carts = await getAllCarts();
        const products = await productService.getAllProducts();
        const productIndex = products.findIndex((p) => p.id === productId);
        const cartIndex = carts.findIndex((c) => c.user_id === userId);

        if (productIndex === -1) {
            throw new AppError("Product not found", 404);
        }

        if (cartIndex === -1) {
            throw new AppError("Cart not found", 404);
        }

        if (products[productIndex].stock_quantity < quantity) {
            throw AppError("Not enough stock", 400);
        }

        let isExists = false;
        for (let item of carts[cartIndex].items) {
            if (item.product_id === productId) {
                item.quantity += quantity;
                isExists = true;
            }
        }

        if (!isExists) {
            carts[cartIndex].items.push({
                product_id: productId,
                quantity,
            });
        }

        products[productIndex].stock_quantity -= quantity;
        await writeJSON("products.json", products);
        await writeJSON(FILE_NAME, carts);

        return carts[cartIndex];
    } catch (err) {
        throw err;
    }
}

async function removeFromCart(userId, productId) {
    try {
        const carts = await getAllCarts();
        const cartIndex = carts.findIndex((c) => c.user_id === Number(userId));

        if (cartIndex === -1) {
            throw new AppError("Cart not found", 404);
        }

        const productIndex = carts[cartIndex].items.findIndex(
            (p) => p.product_id === Number(productId),
        );

        if (productIndex === -1) {
            throw new AppError("Product not found", 404);
        }

        carts[cartIndex].items.splice(productIndex, 1);
        await writeJSON(FILE_NAME, carts);
    } catch (err) {
        throw err;
    }
}

async function clearCart(userId) {
    try {
        const carts = await getAllCarts();
        const cartIndex = carts.findIndex((c) => c.user_id === Number(userId));

        if (cartIndex === -1) {
            throw new AppError("Cart not found", 404);
        }

        carts[cartIndex].items = [];
        await writeJSON(FILE_NAME, carts);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getCartByUserId,
    createCart,
    addToCart,
    removeFromCart,
    clearCart,
};
