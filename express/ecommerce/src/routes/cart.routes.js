const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/auth.middleware.js");
const {
    validateCartItems,
} = require("../middlewares/validateCartItems.middleware.js");

const cartController = require("../controllers/cart.controller.js");

router.get("/", authMiddleware, cartController.getCart);
router.post("/", authMiddleware, cartController.createCart);

router.post(
    "/add",
    authMiddleware,
    validateCartItems,
    cartController.addToCart,
);

router.delete("/", authMiddleware, cartController.clearCart);
router.delete(
    "/items/:productId",
    authMiddleware,
    cartController.removeFromCart,
);

module.exports = router;
