const booksRoutes = require("./routes/booksRoutes.js");

function router(req, res) {
    res.setHeader("Content-Type", "application/json");
    if (req.url.startsWith("/books")) {
        return booksRoutes(req, res);
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not Found" }));
}

module.exports = router;