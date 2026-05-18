const express = require("express");
const router = express.Router();

const keyMiddleware = require("../middlewares/key.middleware.js");
const checkPermission = require("../middlewares/permission.middleware.js");

const products = require("../data/products.js");

router.get("/status", (req, res) => {
    res.status(200).json({
        message: "Server is running",
    });
});

router.get("/products", keyMiddleware, checkPermission, (req, res) => {
    res.status(200).json({
        products,
    });
});

router.post("/products", keyMiddleware, checkPermission, (req, res) => {
    //fake creation
    res.status(201).json({
        message: "Successfully created",
    });
});

module.exports = router;
