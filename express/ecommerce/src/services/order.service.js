const AppError = require("../utils/appError");
const { readJSON, writeJSON } = require("../utils/file.js");

const productService = require("./product.service.js");
const cartService = require("./cart.service.js");

const FILE_NAME = "orders.json";

async function getAllOrders() {
    try {
        const orders = await readJSON(FILE_NAME);

        if (!orders) {
            return [];
        }

        return orders;
    } catch (err) {
        throw new Error(`Falied to get orders ${err.message}`);
    }
}

async function getOrderById(orderId) {
    try {
        const orders = await getAllOrders();
        const order = orders.find((o) => o.id === Number(orderId));

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        return order;
    } catch (err) {
        throw err;
    }
}

async function getUserOrders(userId) {
    try {
        const orders = await getAllOrders();
        const userOrders = orders.filter((o) => o.user_id === Number(userId));

        return userOrders;
    } catch (err) {
        throw new Error(`Failed to get user orders ${err.message}`);
    }
}

async function createOrder(userId) {
    try {
        const orders = await getAllOrders();
        const userCart = await cartService.getCartByUserId(userId);

        if (userCart.items.length === 0) {
            throw new AppError("Cart is empty", 400);
        }

        let totalAmount = 0;
        const itemsOfOrder = [];
        for (const item of userCart.items) {
            const product = await productService.getProductById(
                item.product_id,
            );

            const totalPrice = product.price * item.quantity;

            product.stock_quantity -= item.quantity;
            await productService.updateProduct(product.id, product);

            const itemOfOrder = {
                product_id: item.product_id,
                quantity: item.quantity,
                price: totalPrice,
            };

            totalAmount += totalPrice;
            itemsOfOrder.push(itemOfOrder);
        }

        await cartService.clearCart(userId);

        const order = {
            id: orders.length + 1,
            user_id: Number(userId),
            order_date: new Date().toISOString(),
            total_amount: totalAmount,
            status: "pending",
            items: itemsOfOrder,
        };

        orders.push(order);
        await writeJSON(FILE_NAME, orders);
        return order;
    } catch (err) {
        throw err;
    }
}

async function updateOrderStatus(orderId, status) {
    try {
        const orders = await getAllOrders();
        const orderIndex = orders.findIndex((o) => o.id === Number(orderId));

        if (orderIndex === -1) {
            throw new AppError("Order not found", 404);
        }

        orders[orderIndex].status = status;
        await writeJSON(FILE_NAME, orders);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    getUserOrders,
    createOrder,
    updateOrderStatus,
};
