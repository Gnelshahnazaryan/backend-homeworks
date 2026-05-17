const express = require("express");
const app = express();

const userRoutes = require("./routes/user.routes.js");
const cartRoutes = require("./routes/cart.routes.js");
const orderRoutes = require("./routes/order.routes.js");
const productRoutes = require("./routes/product.routes.js");

const logger = require("./middlewares/logger.middleware.js");

app.use(logger);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
