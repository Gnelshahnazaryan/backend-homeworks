const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

const {
    validateProduct,
} = require("../middlewares/validateProduct.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

router.get("/", authMiddleware, productController.getProducts);
router.get("/:id", authMiddleware, productController.getProduct);
router.post(
    "/",
    authMiddleware,
    isAdmin,
    validateProduct,
    productController.createProduct,
);

router.put(
    "/:id",
    authMiddleware,
    isAdmin,
    validateProduct,
    productController.updateProduct,
);

router.delete("/:id", authMiddleware, isAdmin, productController.deleteProduct);

module.exports = router;
