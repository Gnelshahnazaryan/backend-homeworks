const AppError = require("../utils/appError");
const { readJSON, writeJSON } = require("../utils/file.js");

const FILE_NAME = "products.json";

async function getAllProducts() {
    try {
        const products = await readJSON(FILE_NAME);

        if (!products) {
            return [];
        }

        return products;
    } catch (err) {
        throw new Error(`Failed to get products: ${err.message}`);
    }
}

async function getProductById(id) {
    try {
        const products = await getAllProducts();

        const targetProduct = products.find((p) => p.id === Number(id));

        if (!targetProduct) {
            throw new AppError("Product not found", 404);
        }

        return targetProduct;
    } catch (err) {
        throw err;
    }
}

async function createProduct(data) {
    try {
        const products = await getAllProducts();

        const newProduct = {
            id: products.length + 1,
            name: data.name,
            description: data.description,
            price: data.price,
            stock_quantity: data.stock_quantity,
        };

        products.push(newProduct);

        await writeJSON(FILE_NAME, products);
        return newProduct;
    } catch (err) {
        throw new Error(`Failed to create product: ${err.message}`);
    }
}

async function updateProduct(id, data) {
    try {
        const products = await getAllProducts();
        const index = products.findIndex((p) => p.id === Number(id));

        if (index === -1) {
            throw new AppError("Product not found", 404);
        }

        Object.assign(products[index], data);

        await writeJSON(FILE_NAME, products);
        return products[index];
    } catch (err) {
        throw err;
    }
}

async function deleteProduct(id) {
    try {
        const products = await getAllProducts();
        const index = products.findIndex((p) => p.id === Number(id));

        if (index === -1) {
            throw new AppError("Product not found", 404);
        }

        const filtered = products.filter((p) => p.id !== Number(id));
        await writeJSON(FILE_NAME, filtered);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
