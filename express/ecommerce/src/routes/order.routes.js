const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller.js");

const { isAdmin } = require("../middlewares/isAdmin.middleware.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

router.get("/", authMiddleware, orderController.getUserOrders);
router.get("/all", authMiddleware, isAdmin, orderController.getOrders);
router.get("/:id", authMiddleware, isAdmin, orderController.getOrderById);
router.post("/", authMiddleware, orderController.createOrder);
router.put(
    "/:id/status",
    authMiddleware,
    isAdmin,
    orderController.updateOrderStatus,
);

module.exports = router;
