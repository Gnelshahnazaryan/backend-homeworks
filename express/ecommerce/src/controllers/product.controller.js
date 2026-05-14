const productService = require("../services/product.service.js");

async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

async function getProduct(req, res) {
    try {
        const product = await productService.getProductById(req.params.id);

        res.status(200).json({
            product,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

async function createProduct(req, res) {
    try {
        const newProduct = await productService.createProduct(req.body);

        res.status(201).json({
            newProduct,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

async function updateProduct(req, res) {
    try {
        const product = await productService.updateProduct(
            req.params.id,
            req.body,
        );

        res.status(200).json({
            product,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

async function deleteProduct(req, res) {
    try {
        await productService.deleteProduct(req.params.id);

        res.status(204).send();
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
