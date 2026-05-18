const express = require("express");
const router = express.Router();

const basicAuthMiddleware = require("../middlewares/basicAuth.middleware.js");
const items = require("../data/items.js");

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Public Route",
    });
});

router.get("/profile", basicAuthMiddleware, (req, res) => {
    res.status(200).json({
        message: `Welcome ${req.user.username}`,
    });
});

router.get("/items", basicAuthMiddleware, (req, res) => {
    res.status(200).json({
        items,
    });
});

module.exports = router;
