const express = require("express");
const userRoutes = require("./routes/user.routes.js");
const productRoutes = require("./routes/product.routes.js");
const logger = require("./middlewares/logger.middleware.js");

const app = express();

app.use(logger);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
