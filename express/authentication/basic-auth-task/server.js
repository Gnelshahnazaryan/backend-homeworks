require("dotenv").config({ quiet: true });

const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
