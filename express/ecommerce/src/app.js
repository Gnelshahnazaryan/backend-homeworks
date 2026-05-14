const express = require("express");
const logger = require("./middlewares/logger.middleware.js");
const productRoutes = require("./routes/product.routes.js");

const app = express();

app.use(express.json());
app.use(logger);


app.use("/api/products", productRoutes);

module.exports = app;