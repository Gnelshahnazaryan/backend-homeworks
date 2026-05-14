const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const {
    validateProduct,
} = require("../middlewares/validateProduct.middleware");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/", validateProduct, productController.createProduct);
router.put("/:id", validateProduct, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
