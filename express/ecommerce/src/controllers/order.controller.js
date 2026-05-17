const orderService = require("../services/order.service.js");

async function getOrders(req, res) {
    try {
        const orders = await orderService.getAllOrders();

        res.status(200).json({
            orders,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

async function getOrderById(req, res) {
    try {
        const order = await orderService.getOrderById(req.params.id);

        res.status(200).json({
            order,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

async function getUserOrders(req, res) {
    try {
        const orders = await orderService.getUserOrders(req.user.id);

        res.status(200).json({
            orders,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

async function createOrder(req, res) {
    try {
        const order = await orderService.createOrder(req.user.id);

        res.status(201).json({
            order,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

async function updateOrderStatus(req, res) {
    try {
        const { id, status } = req.params;
        await orderService.updateOrderStatus(id, status);

        res.status(200).send();
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

module.exports = {
    getOrders,
    getOrderById,
    getUserOrders,
    createOrder,
    updateOrderStatus,
};
